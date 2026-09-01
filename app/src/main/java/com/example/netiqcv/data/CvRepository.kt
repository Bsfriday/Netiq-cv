package com.example.netiqcv.data

import android.content.Context
import android.content.SharedPreferences
import com.example.netiqcv.model.ResumeData
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.util.UUID

class CvRepository(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("netiqcv_storage", Context.MODE_PRIVATE)

    private val json = Json {
        ignoreUnknownKeys = true
        prettyPrint = false
        encodeDefaults = true
    }

    companion object {
        private const val KEY_DRAFT = "key_active_cv_draft"
        private const val KEY_SAVED_LIST = "key_saved_resumes_list"
    }

    fun saveDraft(cv: ResumeData) {
        try {
            val str = json.encodeToString(cv)
            prefs.edit().putString(KEY_DRAFT, str).apply()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun loadDraft(): ResumeData {
        try {
            val str = prefs.getString(KEY_DRAFT, null)
            if (!str.isNullOrBlank()) {
                return json.decodeFromString<ResumeData>(str)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return DefaultCvData.DEFAULT_BLANK_CV
    }

    fun clearDraft() {
        prefs.edit().remove(KEY_DRAFT).apply()
    }

    fun getSavedResumes(): List<ResumeData> {
        try {
            val str = prefs.getString(KEY_SAVED_LIST, null)
            if (!str.isNullOrBlank()) {
                val list = json.decodeFromString<List<ResumeData>>(str)
                if (list.isNotEmpty()) return list
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        // If first launch, preload sample CVs
        val samples = SampleCvsData.SAMPLE_CVS
        saveSavedList(samples)
        return samples
    }

    fun saveResume(cv: ResumeData): Boolean {
        return try {
            val currentList = getSavedResumes().toMutableList()
            val existingIdx = currentList.indexOfFirst { it.id == cv.id }
            val updated = cv.copy(updatedAt = System.currentTimeMillis())

            if (existingIdx >= 0) {
                currentList[existingIdx] = updated
            } else {
                currentList.add(0, updated)
            }

            // Limit to 30 saved resumes
            val trimmed = currentList.take(30)
            saveSavedList(trimmed)
            saveDraft(updated)
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    fun deleteResume(id: String): Boolean {
        return try {
            val currentList = getSavedResumes().filter { it.id != id }
            saveSavedList(currentList)
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    fun duplicateResume(id: String): ResumeData? {
        return try {
            val list = getSavedResumes()
            val source = list.find { it.id == id } ?: return null
            val newId = "cv-${System.currentTimeMillis()}-${UUID.randomUUID().toString().take(6)}"
            val copy = source.copy(
                id = newId,
                title = "${source.title} (Copy)",
                updatedAt = System.currentTimeMillis()
            )
            saveResume(copy)
            copy
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    fun renameResume(id: String, newTitle: String): Boolean {
        return try {
            val list = getSavedResumes().toMutableList()
            val idx = list.indexOfFirst { it.id == id }
            if (idx >= 0) {
                list[idx] = list[idx].copy(title = newTitle, updatedAt = System.currentTimeMillis())
                saveSavedList(list)
                true
            } else {
                false
            }
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    private fun saveSavedList(list: List<ResumeData>) {
        val str = json.encodeToString(list)
        prefs.edit().putString(KEY_SAVED_LIST, str).apply()
    }
}
