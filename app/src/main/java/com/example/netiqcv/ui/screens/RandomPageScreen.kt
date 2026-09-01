package com.example.netiqcv.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.netiqcv.model.CvTemplate
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.service.PdfExporter
import com.example.netiqcv.ui.components.CvRenderer
import com.example.netiqcv.ui.viewmodel.CvViewModel

private val INDUSTRIES = listOf("All", "Technology", "Finance", "Healthcare", "Design", "Marketing", "Cybersecurity", "Project Management")

@Composable
fun RandomPageScreen(
    viewModel: CvViewModel,
    onEditInBuilder: (ResumeData) -> Unit
) {
    val context = LocalContext.current
    var selectedIndustry by remember { mutableStateOf("All") }
    var currentRandomCv by remember {
        mutableStateOf<ResumeData>(viewModel.generateRandomCv(null))
    }

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Hero Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF0FDF4)),
            border = CardDefaults.outlinedCardBorder()
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Random CV Generator",
                            fontWeight = FontWeight.Black,
                            fontSize = 16.sp,
                            color = Color(0xFF065F46)
                        )
                        Text(
                            text = "Instantly explore realistic resumes across industries.",
                            fontSize = 11.5.sp,
                            color = Color(0xFF047857)
                        )
                    }

                    Button(
                        onClick = {
                            currentRandomCv = viewModel.generateRandomCv(selectedIndustry)
                            Toast.makeText(context, "Generated new resume!", Toast.LENGTH_SHORT).show()
                        },
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669)),
                        modifier = Modifier.testTag("btn_shuffle_random")
                    ) {
                        Icon(Icons.Default.Shuffle, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Shuffle", fontSize = 12.5.sp, fontWeight = FontWeight.Bold)
                    }
                }

                // Industry Filter Chips
                val chipScroll = rememberScrollState()
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(chipScroll),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    INDUSTRIES.forEach { ind ->
                        FilterChip(
                            selected = selectedIndustry == ind,
                            onClick = {
                                selectedIndustry = ind
                                currentRandomCv = viewModel.generateRandomCv(if (ind == "All") null else ind)
                            },
                            label = { Text(ind, fontSize = 11.5.sp) }
                        )
                    }
                }
            }
        }

        // Quick Template Switcher
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            border = CardDefaults.outlinedCardBorder()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Template: ${currentRandomCv.themeConfig.template.replaceFirstChar { it.uppercase() }}",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.5.sp,
                    color = Color(0xFF0F172A)
                )

                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    CvTemplate.entries.take(4).forEach { t ->
                        FilterChip(
                            selected = currentRandomCv.themeConfig.getTemplateEnum() == t,
                            onClick = {
                                currentRandomCv = currentRandomCv.copy(
                                    themeConfig = currentRandomCv.themeConfig.copy(
                                        template = t.idName,
                                        font = if (t == CvTemplate.CLASSIC || t == CvTemplate.EXECUTIVE) "serif" else "sans"
                                    )
                                )
                            },
                            label = { Text(t.title, fontSize = 10.5.sp) }
                        )
                    }
                }
            }
        }

        // Live Rendered CV
        CvRenderer(data = currentRandomCv)

        // Action Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = {
                    viewModel.setActiveCv(currentRandomCv)
                    onEditInBuilder(currentRandomCv)
                },
                modifier = Modifier
                    .weight(1f)
                    .height(46.dp)
                    .testTag("btn_edit_random_in_builder"),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
            ) {
                Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Edit in Builder", fontSize = 12.5.sp, fontWeight = FontWeight.Bold)
            }

            OutlinedButton(
                onClick = {
                    viewModel.saveResumeToList(currentRandomCv)
                    Toast.makeText(context, "Saved to My Resumes!", Toast.LENGTH_SHORT).show()
                },
                modifier = Modifier
                    .weight(1f)
                    .height(46.dp)
                    .testTag("btn_save_random_cv"),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(Icons.Default.BookmarkBorder, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Save CV", fontSize = 12.5.sp, fontWeight = FontWeight.Bold)
            }
        }

        // Export Actions
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilledTonalButton(
                onClick = { PdfExporter.sharePdf(context, currentRandomCv) },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(Icons.Default.PictureAsPdf, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Share PDF", fontSize = 12.sp)
            }

            FilledTonalButton(
                onClick = { PdfExporter.printCv(context, currentRandomCv) },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(Icons.Default.Print, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Print", fontSize = 12.sp)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))
    }
}
