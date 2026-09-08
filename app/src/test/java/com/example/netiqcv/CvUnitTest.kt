package com.example.netiqcv

import com.example.netiqcv.data.CountriesAndOccupations
import com.example.netiqcv.data.DefaultCvData
import com.example.netiqcv.data.SampleCvsData
import com.example.netiqcv.model.AiGeneratorInput
import com.example.netiqcv.utils.CompletionCalculator
import org.junit.Assert.*
import org.junit.Test

class CvUnitTest {

    @Test
    fun testCompletionCalculator_blankCv() {
        val blank = DefaultCvData.DEFAULT_BLANK_CV
        val result = CompletionCalculator.calculateResumeStrength(blank)
        assertTrue(result.score < 50)
        assertNotNull(result.level)
    }

    @Test
    fun testCompletionCalculator_completeCv() {
        val sample = SampleCvsData.SAMPLE_CVS.first()
        val result = CompletionCalculator.calculateResumeStrength(sample)
        assertTrue(result.score >= 80)
        assertEquals("All-Star Quality", result.level)
    }

    @Test
    fun testAiResumeGeneration() {
        val input = AiGeneratorInput(
            country = "Canada",
            ageGroup = "23-29",
            occupation = "Product Manager",
            employmentStatus = "employed"
        )
        val cv = CountriesAndOccupations.generateTailoredAiResume(input)
        assertNotNull(cv)
        assertEquals("Canada", cv.country)
        assertTrue(cv.experience.isNotEmpty())
        assertTrue(cv.skills.isNotEmpty())
        assertTrue(cv.education.isNotEmpty())
    }

    @Test
    fun testRandomCvGeneration() {
        val cv = SampleCvsData.generateRandomCv("Technology")
        assertNotNull(cv)
        assertTrue(cv.personalInfo.fullName.isNotBlank())
        assertTrue(cv.personalInfo.jobTitle.isNotBlank())
        assertTrue(cv.skills.isNotEmpty())
    }

    @Test
    fun testRoboticAtsScoreCalculation() {
        val sample = SampleCvsData.SAMPLE_CVS.first()
        val ats = com.example.netiqcv.data.RoboticResumeData.calculateAtsScore(sample, "Software Engineer")
        assertNotNull(ats)
        assertTrue(ats.overallScore in 0..100)
        assertTrue(ats.recommendations.isNotEmpty())
    }

    @Test
    fun testRoboticBulletEnhancement() {
        val raw = "helped with data tagging\ntested edge cases"
        val polished = com.example.netiqcv.data.RoboticResumeData.enhanceBulletPoints(raw)
        assertEquals(2, polished.size)
        assertTrue(polished[0].endsWith("."))
    }

    @Test
    fun testResumeTypesCatalog() {
        val types = com.example.netiqcv.data.ResumeTypesData.RESUME_TYPES
        assertTrue(types.isNotEmpty())
        assertTrue(types.any { it.isDedicated })
        assertTrue(types.any { it.category == "Technology & AI" })
    }
}
