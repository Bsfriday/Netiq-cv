package com.example.netiqcv.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.netiqcv.data.CountriesAndOccupations
import com.example.netiqcv.data.CvRepository
import com.example.netiqcv.data.DefaultCvData
import com.example.netiqcv.data.SampleCvsData
import com.example.netiqcv.model.*
import com.example.netiqcv.service.GeminiService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class CvViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = CvRepository(application)
    val geminiService = GeminiService()

    private val _activeCv = MutableStateFlow<ResumeData>(repository.loadDraft())
    val activeCv: StateFlow<ResumeData> = _activeCv.asStateFlow()

    private val _savedResumes = MutableStateFlow<List<ResumeData>>(repository.getSavedResumes())
    val savedResumes: StateFlow<List<ResumeData>> = _savedResumes.asStateFlow()

    private val _aiGeneratedCv = MutableStateFlow<ResumeData?>(null)
    val aiGeneratedCv: StateFlow<ResumeData?> = _aiGeneratedCv.asStateFlow()

    private val _isAiGenerating = MutableStateFlow(false)
    val isAiGenerating: StateFlow<Boolean> = _isAiGenerating.asStateFlow()

    private val _statusMessage = MutableStateFlow<String?>(null)
    val statusMessage: StateFlow<String?> = _statusMessage.asStateFlow()

    init {
        // Initialize an initial high quality AI resume sample if none
        val initialAiCv = CountriesAndOccupations.generateTailoredAiResume(
            AiGeneratorInput(
                country = "United States",
                ageGroup = "23-29",
                occupation = "Software Engineer",
                employmentStatus = "employed"
            )
        )
        _aiGeneratedCv.value = initialAiCv
    }

    fun updateActiveCv(transform: (ResumeData) -> ResumeData) {
        val updated = transform(_activeCv.value).copy(updatedAt = System.currentTimeMillis())
        _activeCv.value = updated
        repository.saveDraft(updated)
    }

    fun setActiveCv(cv: ResumeData) {
        _activeCv.value = cv
        repository.saveDraft(cv)
    }

    fun createNewBlankResume() {
        val newCv = DefaultCvData.DEFAULT_BLANK_CV.copy(
            id = "cv-${System.currentTimeMillis()}",
            title = "My Professional Resume",
            updatedAt = System.currentTimeMillis()
        )
        setActiveCv(newCv)
    }

    fun saveActiveCvToList(): Boolean {
        val cv = _activeCv.value
        val success = repository.saveResume(cv)
        if (success) {
            _savedResumes.value = repository.getSavedResumes()
            _statusMessage.value = "Saved to My Resumes!"
        }
        return success
    }

    fun saveResumeToList(cv: ResumeData): Boolean {
        val success = repository.saveResume(cv)
        if (success) {
            _savedResumes.value = repository.getSavedResumes()
            _statusMessage.value = "Saved successfully!"
        }
        return success
    }

    fun deleteResume(id: String) {
        if (repository.deleteResume(id)) {
            _savedResumes.value = repository.getSavedResumes()
            _statusMessage.value = "Resume deleted"
        }
    }

    fun duplicateResume(id: String): ResumeData? {
        val duplicated = repository.duplicateResume(id)
        if (duplicated != null) {
            _savedResumes.value = repository.getSavedResumes()
            _statusMessage.value = "Duplicated successfully"
        }
        return duplicated
    }

    fun renameResume(id: String, newTitle: String) {
        if (repository.renameResume(id, newTitle)) {
            _savedResumes.value = repository.getSavedResumes()
        }
    }

    fun generateTailoredAiResume(input: AiGeneratorInput) {
        viewModelScope.launch {
            _isAiGenerating.value = true
            try {
                val cv = CountriesAndOccupations.generateTailoredAiResume(input)
                _aiGeneratedCv.value = cv
            } finally {
                _isAiGenerating.value = false
            }
        }
    }

    fun updateAiGeneratedCv(transform: (ResumeData) -> ResumeData) {
        val current = _aiGeneratedCv.value ?: return
        _aiGeneratedCv.value = transform(current)
    }

    fun generateRandomCv(industry: String? = null): ResumeData {
        val rand = SampleCvsData.generateRandomCv(industry)
        return rand
    }

    fun clearStatusMessage() {
        _statusMessage.value = null
    }
}
