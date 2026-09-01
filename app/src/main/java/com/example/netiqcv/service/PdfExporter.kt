package com.example.netiqcv.service

import android.content.Context
import android.content.Intent
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import android.net.Uri
import android.os.Bundle
import android.os.CancellationSignal
import android.os.ParcelFileDescriptor
import android.print.PageRange
import android.print.PrintAttributes
import android.print.PrintDocumentAdapter
import android.print.PrintDocumentInfo
import android.print.PrintManager
import android.widget.Toast
import androidx.core.content.FileProvider
import com.example.netiqcv.model.ResumeData
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.io.File
import java.io.FileOutputStream
import java.io.FileInputStream

object PdfExporter {

    // Standard A4 dimensions at 72 DPI: 595 x 842 points
    private const val PAGE_WIDTH = 595
    private const val PAGE_HEIGHT = 842
    private const val MARGIN = 36f

    fun generatePdfFile(context: Context, cv: ResumeData): File {
        val pdfDoc = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(PAGE_WIDTH, PAGE_HEIGHT, 1).create()
        val page = pdfDoc.startPage(pageInfo)
        val canvas = page.canvas

        drawCvOnCanvas(canvas, cv)

        pdfDoc.finishPage(page)

        val cleanTitle = (cv.personalInfo.fullName.ifBlank { cv.title })
            .replace(Regex("[^a-zA-Z0-9_]"), "_")
        val fileName = "NetiqCV_${cleanTitle}_${System.currentTimeMillis()}.pdf"
        val cacheDir = File(context.cacheDir, "resumes")
        if (!cacheDir.exists()) cacheDir.mkdirs()

        val pdfFile = File(cacheDir, fileName)
        FileOutputStream(pdfFile).use { out ->
            pdfDoc.writeTo(out)
        }
        pdfDoc.close()

        return pdfFile
    }

    fun sharePdf(context: Context, cv: ResumeData) {
        try {
            val file = generatePdfFile(context, cv)
            val uri: Uri = FileProvider.getUriForFile(
                context,
                "${context.packageName}.fileprovider",
                file
            )

            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "application/pdf"
                putExtra(Intent.EXTRA_STREAM, uri)
                putExtra(Intent.EXTRA_SUBJECT, "${cv.personalInfo.fullName.ifBlank { "Resume" }} - NetiqCV")
                putExtra(Intent.EXTRA_TEXT, "Here is my professional resume generated with NetiqCV.")
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }

            val chooser = Intent.createChooser(shareIntent, "Share Resume PDF")
            chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(chooser)
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(context, "Failed to share PDF: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
        }
    }

    fun printCv(context: Context, cv: ResumeData) {
        val printManager = context.getSystemService(Context.PRINT_SERVICE) as? PrintManager
        if (printManager == null) {
            Toast.makeText(context, "Printing service unavailable", Toast.LENGTH_SHORT).show()
            return
        }

        val jobName = "NetiqCV - ${cv.personalInfo.fullName.ifBlank { cv.title }}"
        printManager.print(
            jobName,
            object : PrintDocumentAdapter() {
                override fun onLayout(
                    oldAttributes: PrintAttributes?,
                    newAttributes: PrintAttributes?,
                    cancellationSignal: CancellationSignal?,
                    callback: LayoutResultCallback?,
                    extras: Bundle?
                ) {
                    if (cancellationSignal?.isCanceled == true) {
                        callback?.onLayoutCancelled()
                        return
                    }
                    val pdi = PrintDocumentInfo.Builder(jobName)
                        .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
                        .setPageCount(1)
                        .build()
                    callback?.onLayoutFinished(pdi, true)
                }

                override fun onWrite(
                    pages: Array<out PageRange>?,
                    destination: ParcelFileDescriptor?,
                    cancellationSignal: CancellationSignal?,
                    callback: WriteResultCallback?
                ) {
                    try {
                        val pdfFile = generatePdfFile(context, cv)
                        FileInputStream(pdfFile).use { input ->
                            FileOutputStream(destination?.fileDescriptor).use { output ->
                                input.copyTo(output)
                            }
                        }
                        callback?.onWriteFinished(arrayOf(PageRange.ALL_PAGES))
                    } catch (e: Exception) {
                        callback?.onWriteFailed(e.message)
                    }
                }
            },
            PrintAttributes.Builder()
                .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                .build()
        )
    }

    fun exportToJson(context: Context, cv: ResumeData) {
        try {
            val json = Json { prettyPrint = true }
            val jsonStr = json.encodeToString(cv)

            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"
                putExtra(Intent.EXTRA_SUBJECT, "NetiqCV_${cv.title}.json")
                putExtra(Intent.EXTRA_TEXT, jsonStr)
            }
            val chooser = Intent.createChooser(shareIntent, "Share Resume JSON")
            chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(chooser)
        } catch (e: Exception) {
            Toast.makeText(context, "Error exporting JSON: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
        }
    }

    fun exportToPlainText(context: Context, cv: ResumeData) {
        val sb = StringBuilder()
        val p = cv.personalInfo
        sb.appendLine("==================================================")
        sb.appendLine(p.fullName.uppercase())
        sb.appendLine(p.jobTitle)
        sb.appendLine("${p.email} | ${p.phone} | ${p.location}")
        if (p.linkedin.isNotBlank()) sb.appendLine("LinkedIn: ${p.linkedin}")
        if (p.website.isNotBlank()) sb.appendLine("Website: ${p.website}")
        sb.appendLine("==================================================")
        sb.appendLine()

        if (cv.summary.isNotBlank()) {
            sb.appendLine("PROFESSIONAL SUMMARY")
            sb.appendLine("--------------------------------------------------")
            sb.appendLine(cv.summary)
            sb.appendLine()
        }

        if (cv.experience.isNotEmpty()) {
            sb.appendLine("WORK EXPERIENCE")
            sb.appendLine("--------------------------------------------------")
            cv.experience.forEach { exp ->
                sb.appendLine("${exp.jobTitle} - ${exp.company} (${exp.location})")
                sb.appendLine("${exp.startDate} - ${if (exp.current) "Present" else exp.endDate}")
                sb.appendLine(exp.description)
                sb.appendLine()
            }
        }

        if (cv.education.isNotEmpty()) {
            sb.appendLine("EDUCATION")
            sb.appendLine("--------------------------------------------------")
            cv.education.forEach { edu ->
                sb.appendLine("${edu.degree} in ${edu.fieldOfStudy}")
                sb.appendLine("${edu.school} (${edu.location})")
                sb.appendLine("${edu.startDate} - ${if (edu.current) "Present" else edu.endDate}")
                if (edu.description.isNotBlank()) sb.appendLine(edu.description)
                sb.appendLine()
            }
        }

        if (cv.skills.isNotEmpty()) {
            sb.appendLine("SKILLS & EXPERTISE")
            sb.appendLine("--------------------------------------------------")
            sb.appendLine(cv.skills.joinToString(", ") { "${it.name} (${it.level})" })
            sb.appendLine()
        }

        if (cv.certifications.isNotEmpty()) {
            sb.appendLine("CERTIFICATIONS")
            sb.appendLine("--------------------------------------------------")
            cv.certifications.forEach { cert ->
                sb.appendLine("${cert.name} - ${cert.issuer} (${cert.date})")
            }
            sb.appendLine()
        }

        val shareIntent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_SUBJECT, "Resume - ${p.fullName.ifBlank { "NetiqCV" }}")
            putExtra(Intent.EXTRA_TEXT, sb.toString())
        }
        val chooser = Intent.createChooser(shareIntent, "Share Resume Text")
        chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(chooser)
    }

    private fun drawCvOnCanvas(canvas: Canvas, cv: ResumeData) {
        val accentHex = cv.themeConfig.accentColor.ifBlank { "#2563EB" }
        val accentColor = try {
            Color.parseColor(accentHex)
        } catch (e: Exception) {
            Color.parseColor("#2563EB")
        }

        val isSerif = cv.themeConfig.font == "serif"
        val typefaceBold = if (isSerif) Typeface.create(Typeface.SERIF, Typeface.BOLD) else Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
        val typefaceNormal = if (isSerif) Typeface.create(Typeface.SERIF, Typeface.NORMAL) else Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL)
        val typefaceItalic = if (isSerif) Typeface.create(Typeface.SERIF, Typeface.ITALIC) else Typeface.create(Typeface.SANS_SERIF, Typeface.ITALIC)

        // Background
        val bgPaint = Paint().apply { color = Color.WHITE; style = Paint.Style.FILL }
        canvas.drawRect(0f, 0f, PAGE_WIDTH.toFloat(), PAGE_HEIGHT.toFloat(), bgPaint)

        var y = MARGIN + 10f

        // Professional Banner if professional template
        val template = cv.themeConfig.template
        if (template == "professional") {
            val bannerPaint = Paint().apply { color = accentColor; style = Paint.Style.FILL }
            canvas.drawRect(0f, 0f, PAGE_WIDTH.toFloat(), 95f, bannerPaint)

            val namePaint = Paint().apply {
                color = Color.WHITE
                textSize = 20f
                typeface = typefaceBold
                isAntiAlias = true
            }
            canvas.drawText(cv.personalInfo.fullName.ifBlank { "Your Name" }, MARGIN, 40f, namePaint)

            val titlePaint = Paint().apply {
                color = Color.parseColor("#E0E7FF")
                textSize = 12f
                typeface = typefaceNormal
                isAntiAlias = true
            }
            canvas.drawText(cv.personalInfo.jobTitle.ifBlank { "Professional Title" }, MARGIN, 58f, titlePaint)

            val contactPaint = Paint().apply {
                color = Color.parseColor("#F1F5F9")
                textSize = 8.5f
                typeface = typefaceNormal
                isAntiAlias = true
            }
            val contactLine = listOfNotNull(
                cv.personalInfo.email.takeIf { it.isNotBlank() },
                cv.personalInfo.phone.takeIf { it.isNotBlank() },
                cv.personalInfo.location.takeIf { it.isNotBlank() }
            ).joinToString("   |   ")
            canvas.drawText(contactLine, MARGIN, 76f, contactPaint)

            y = 112f
        } else {
            // Header for Modern / Classic / Minimal / Executive / Creative
            val namePaint = Paint().apply {
                color = if (template == "classic" || template == "executive") Color.parseColor("#0F172A") else accentColor
                textSize = 22f
                typeface = typefaceBold
                isAntiAlias = true
            }
            canvas.drawText(cv.personalInfo.fullName.ifBlank { "Your Full Name" }, MARGIN, y + 10f, namePaint)
            y += 24f

            val titlePaint = Paint().apply {
                color = Color.parseColor("#334155")
                textSize = 11f
                typeface = typefaceBold
                isAntiAlias = true
            }
            canvas.drawText(cv.personalInfo.jobTitle.ifBlank { "Professional Title" }, MARGIN, y, titlePaint)
            y += 14f

            val contactPaint = Paint().apply {
                color = Color.parseColor("#64748B")
                textSize = 8.5f
                typeface = typefaceNormal
                isAntiAlias = true
            }
            val contactItems = listOfNotNull(
                cv.personalInfo.email.takeIf { it.isNotBlank() },
                cv.personalInfo.phone.takeIf { it.isNotBlank() },
                cv.personalInfo.location.takeIf { it.isNotBlank() },
                cv.personalInfo.linkedin.takeIf { it.isNotBlank() }
            )
            canvas.drawText(contactItems.joinToString("   •   "), MARGIN, y, contactPaint)
            y += 10f

            // Underline bar
            val linePaint = Paint().apply {
                color = if (template == "classic") Color.parseColor("#CBD5E1") else accentColor
                strokeWidth = if (template == "classic") 1.2f else 2f
            }
            canvas.drawLine(MARGIN, y, PAGE_WIDTH - MARGIN, y, linePaint)
            y += 16f
        }

        fun drawSectionHeader(title: String) {
            val headerPaint = Paint().apply {
                color = accentColor
                textSize = 10f
                typeface = typefaceBold
                isAntiAlias = true
            }
            canvas.drawText(title.uppercase(), MARGIN, y, headerPaint)

            val linePaint = Paint().apply {
                color = Color.parseColor("#E2E8F0")
                strokeWidth = 1f
            }
            val textWidth = headerPaint.measureText(title.uppercase())
            canvas.drawLine(MARGIN + textWidth + 10f, y - 3f, PAGE_WIDTH - MARGIN, y - 3f, linePaint)
            y += 12f
        }

        val bodyPaint = Paint().apply {
            color = Color.parseColor("#334155")
            textSize = 8.5f
            typeface = typefaceNormal
            isAntiAlias = true
        }

        val subPaint = Paint().apply {
            color = Color.parseColor("#64748B")
            textSize = 8f
            typeface = typefaceItalic
            isAntiAlias = true
        }

        // Summary
        if (cv.summary.isNotBlank() && y < PAGE_HEIGHT - 60) {
            drawSectionHeader("Professional Summary")
            val lines = wrapText(cv.summary, bodyPaint, PAGE_WIDTH - 2 * MARGIN)
            for (line in lines.take(5)) {
                canvas.drawText(line, MARGIN, y, bodyPaint)
                y += 11f
            }
            y += 6f
        }

        // Experience
        if (cv.experience.isNotEmpty() && y < PAGE_HEIGHT - 100) {
            drawSectionHeader("Work Experience")
            for (exp in cv.experience) {
                if (y > PAGE_HEIGHT - 60) break
                val jobTitlePaint = Paint().apply {
                    color = Color.parseColor("#0F172A")
                    textSize = 9.5f
                    typeface = typefaceBold
                    isAntiAlias = true
                }
                canvas.drawText("${exp.jobTitle} — ${exp.company}", MARGIN, y, jobTitlePaint)

                val dateStr = "${exp.startDate} - ${if (exp.current) "Present" else exp.endDate}"
                val datePaint = Paint().apply {
                    color = Color.parseColor("#64748B")
                    textSize = 8f
                    typeface = typefaceNormal
                    isAntiAlias = true
                    textAlign = Paint.Align.RIGHT
                }
                canvas.drawText(dateStr, PAGE_WIDTH - MARGIN, y, datePaint)
                y += 11f

                if (exp.description.isNotBlank()) {
                    val descLines = exp.description.lines()
                    for (dLine in descLines.take(4)) {
                        if (y > PAGE_HEIGHT - 40) break
                        val wrapped = wrapText(dLine, bodyPaint, PAGE_WIDTH - 2 * MARGIN - 8f)
                        for (w in wrapped) {
                            if (y > PAGE_HEIGHT - 35) break
                            canvas.drawText(w, MARGIN + 8f, y, bodyPaint)
                            y += 10.5f
                        }
                    }
                }
                y += 4f
            }
            y += 4f
        }

        // Education
        if (cv.education.isNotEmpty() && y < PAGE_HEIGHT - 80) {
            drawSectionHeader("Education")
            for (edu in cv.education) {
                if (y > PAGE_HEIGHT - 50) break
                val eduTitlePaint = Paint().apply {
                    color = Color.parseColor("#0F172A")
                    textSize = 9f
                    typeface = typefaceBold
                    isAntiAlias = true
                }
                val degreeText = "${edu.degree}${if (edu.fieldOfStudy.isNotBlank()) " in ${edu.fieldOfStudy}" else ""}"
                canvas.drawText(degreeText, MARGIN, y, eduTitlePaint)

                val datePaint = Paint().apply {
                    color = Color.parseColor("#64748B")
                    textSize = 8f
                    typeface = typefaceNormal
                    isAntiAlias = true
                    textAlign = Paint.Align.RIGHT
                }
                canvas.drawText("${edu.startDate} - ${if (edu.current) "Present" else edu.endDate}", PAGE_WIDTH - MARGIN, y, datePaint)
                y += 10.5f

                canvas.drawText("${edu.school} (${edu.location})", MARGIN, y, subPaint)
                y += 12f
            }
            y += 4f
        }

        // Skills
        if (cv.skills.isNotEmpty() && y < PAGE_HEIGHT - 60) {
            drawSectionHeader("Skills & Competencies")
            val skillNames = cv.skills.joinToString("   •   ") { it.name }
            val wrappedSkills = wrapText(skillNames, bodyPaint, PAGE_WIDTH - 2 * MARGIN)
            for (line in wrappedSkills.take(3)) {
                if (y > PAGE_HEIGHT - 30) break
                canvas.drawText(line, MARGIN, y, bodyPaint)
                y += 11f
            }
            y += 4f
        }

        // Certifications
        if (cv.certifications.isNotEmpty() && y < PAGE_HEIGHT - 50) {
            drawSectionHeader("Certifications")
            for (cert in cv.certifications.take(3)) {
                if (y > PAGE_HEIGHT - 30) break
                canvas.drawText("${cert.name} — ${cert.issuer} (${cert.date})", MARGIN, y, bodyPaint)
                y += 11f
            }
        }
    }

    private fun wrapText(text: String, paint: Paint, maxWidth: Float): List<String> {
        val words = text.split(" ")
        val lines = mutableListOf<String>()
        var currentLine = StringBuilder()

        for (word in words) {
            val testLine = if (currentLine.isEmpty()) word else "$currentLine $word"
            val width = paint.measureText(testLine)
            if (width > maxWidth) {
                if (currentLine.isNotEmpty()) {
                    lines.add(currentLine.toString())
                    currentLine = StringBuilder(word)
                } else {
                    lines.add(word)
                }
            } else {
                currentLine = StringBuilder(testLine)
            }
        }
        if (currentLine.isNotEmpty()) {
            lines.add(currentLine.toString())
        }
        return lines
    }
}
