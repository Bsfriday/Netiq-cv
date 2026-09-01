package com.example.netiqcv.service

import com.example.netiqcv.BuildConfig
import com.example.netiqcv.model.ResumeData
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.util.concurrent.TimeUnit

@Serializable
private data class GeminiPart(val text: String)

@Serializable
private data class GeminiContent(val parts: List<GeminiPart>, val role: String = "user")

@Serializable
private data class GeminiRequest(val contents: List<GeminiContent>)

@Serializable
private data class GeminiCandidate(val content: GeminiContentResponse?)

@Serializable
private data class GeminiContentResponse(val parts: List<GeminiPartResponse>?)

@Serializable
private data class GeminiPartResponse(val text: String? = null)

@Serializable
private data class GeminiResponse(val candidates: List<GeminiCandidate>? = null)

class GeminiService {

    private val client = OkHttpClient.Builder()
        .connectTimeout(20, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    private val json = Json { ignoreUnknownKeys = true }
    private val apiKey: String = BuildConfig.GEMINI_API_KEY.trim()

    fun isApiKeyConfigured(): Boolean = apiKey.isNotBlank() && apiKey != "YOUR_GEMINI_API_KEY"

    suspend fun enhanceSummary(jobTitle: String, currentSummary: String, industry: String): Result<String> = withContext(Dispatchers.IO) {
        if (!isApiKeyConfigured()) {
            return@withContext Result.success(
                generateLocalEnhancedSummary(jobTitle, currentSummary, industry)
            )
        }

        try {
            val prompt = """
                You are an expert executive resume writer. Rewrite and polish the following professional summary for a '$jobTitle' in the '$industry' sector.
                Make it punchy, metric-driven, professional, and ATS-friendly (approx 3-4 sentences). Do NOT include markdown bold or bullet prefixes. Just return the clean text summary.
                
                Current summary: "$currentSummary"
            """.trimIndent()

            val responseText = callGeminiApi(prompt)
            Result.success(responseText.trim().removeSurrounding("\""))
        } catch (e: Exception) {
            e.printStackTrace()
            // Fallback to high quality rule based generator
            Result.success(generateLocalEnhancedSummary(jobTitle, currentSummary, industry))
        }
    }

    suspend fun generateBulletPoints(jobTitle: String, company: String, roleOverview: String): Result<List<String>> = withContext(Dispatchers.IO) {
        if (!isApiKeyConfigured()) {
            return@withContext Result.success(
                generateLocalBulletPoints(jobTitle, company)
            )
        }

        try {
            val prompt = """
                Generate 3 high-impact, ATS-optimized resume bullet points for a '$jobTitle' at '$company'.
                Use strong action verbs (e.g. Spearheaded, Engineered, Orchestrated, Optimized) and realistic metrics (percentages, dollar amounts, time saved).
                Return ONLY the 3 bullet points separated by newlines. Do not include numbering or bullet characters like • or *.
                Context: $roleOverview
            """.trimIndent()

            val responseText = callGeminiApi(prompt)
            val bullets = responseText.lines()
                .map { it.trim().removePrefix("•").removePrefix("-").removePrefix("*").trim() }
                .filter { it.isNotBlank() }
                .take(4)

            Result.success(if (bullets.isNotEmpty()) bullets else generateLocalBulletPoints(jobTitle, company))
        } catch (e: Exception) {
            e.printStackTrace()
            Result.success(generateLocalBulletPoints(jobTitle, company))
        }
    }

    private fun callGeminiApi(promptText: String): String {
        val url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$apiKey"
        val requestBodyObj = GeminiRequest(
            contents = listOf(
                GeminiContent(
                    parts = listOf(GeminiPart(text = promptText))
                )
            )
        )
        val bodyJson = json.encodeToString(requestBodyObj)
        val request = Request.Builder()
            .url(url)
            .post(bodyJson.toRequestBody("application/json".toMediaType()))
            .build()

        val response = client.newCall(request).execute()
        if (!response.isSuccessful) {
            throw RuntimeException("Gemini API error code: ${response.code}")
        }

        val resBody = response.body?.string() ?: throw RuntimeException("Empty response body")
        val parsed = json.decodeFromString<GeminiResponse>(resBody)
        val text = parsed.candidates?.firstOrNull()?.content?.parts?.firstOrNull()?.text
            ?: throw RuntimeException("No text in Gemini response")

        return text
    }

    private fun generateLocalEnhancedSummary(jobTitle: String, current: String, industry: String): String {
        val title = jobTitle.ifBlank { "Professional" }
        return if (current.isNotBlank()) {
            "Results-driven $title with proven success in $industry. Demonstrates a strong track record of optimizing operational workflows, delivering key business milestones, and leading cross-functional teams to exceed benchmark KPIs with high precision and measurable impact."
        } else {
            "Dedicated and innovative $title equipped with comprehensive domain mastery in $industry. Proven track record of architecting scalable solutions, collaborating across cross-functional teams, and consistently driving high-impact deliverables in fast-paced environments."
        }
    }

    private fun generateLocalBulletPoints(jobTitle: String, company: String): List<String> {
        val comp = company.ifBlank { "the organization" }
        return listOf(
            "Spearheaded key strategic initiatives at $comp, accelerating project delivery timelines by 28% while maintaining exceptional quality standards.",
            "Optimized cross-functional communication and operational processes, reducing annual overhead costs by $45,000.",
            "Mentored and supported junior team members, fostering a collaborative culture of continuous improvement and technical excellence."
        )
    }
}
