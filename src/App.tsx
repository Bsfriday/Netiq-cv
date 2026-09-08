import React, { useState, useEffect } from 'react';
import { ResumeData } from './types/cv';
import { generateRandomCv } from './data/randomCvs';
import { DEFAULT_BLANK_CV } from './data/defaultCv';
import { loadDraftFromStorage, getSavedResumesList } from './utils/storage';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { EmbeddedContent } from './components/common/EmbeddedContent';
import { AdManager } from './components/common/AdManager';
import { HomePage } from './pages/HomePage';
import { RandomPage } from './pages/RandomPage';
import { CreatePage } from './pages/CreatePage';
import { SamplesPage } from './pages/SamplesPage';
import { SavedPage } from './pages/SavedPage';
import { AiGeneratorPage } from './pages/AiGeneratorPage';
import { RoboticResumePage } from './pages/RoboticResumePage';
import { ResumeTypeSelectionPage } from './pages/ResumeTypeSelectionPage';
import { GeneratedCvPage } from './pages/GeneratedCvPage';
import { ResumeTypeItem, resolveResumeRoute } from './data/resumeTypes';
import { ReviewPromptModal } from './components/common/ReviewPromptModal';
import { UserReview } from './utils/reviewStorage';
import { saveResumeToList } from './utils/storage';

export default function App() {
  const VALID_ROUTES = [
    '/create', 
    '/random', 
    '/samples', 
    '/saved', 
    '/ai-generator', 
    '/robotic-resume',
    '/resume/type-selection',
    '/select-type',
    '/resume-type-selection',
    '/view-cv',
    '/generated-cv'
  ];

  // Simple, robust client-side routing supporting both pathname and hash
  const getInitialRoute = (): string => {
    const hash = window.location.hash.replace('#', '');
    if (hash && VALID_ROUTES.includes(hash)) {
      return hash;
    }
    const path = window.location.pathname;
    if (VALID_ROUTES.includes(path)) {
      return path;
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [activeCv, setActiveCv] = useState<ResumeData>(() => {
    const savedDraft = loadDraftFromStorage();
    return savedDraft || DEFAULT_BLANK_CV;
  });
  const [randomSeedCv, setRandomSeedCv] = useState<ResumeData | undefined>(undefined);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [reviewTrigger, setReviewTrigger] = useState<UserReview['actionTrigger']>('cv_download');
  const [aiGeneratorProfession, setAiGeneratorProfession] = useState<string | undefined>(undefined);
  const [autoOpenGeneratorInCreate, setAutoOpenGeneratorInCreate] = useState<boolean>(false);

  // Listen for automatic review prompt events from CV generator and export triggers
  useEffect(() => {
    const handleShowReview = (e: Event) => {
      const customEvent = e as CustomEvent<{ actionTrigger?: UserReview['actionTrigger'] }>;
      if (customEvent.detail?.actionTrigger) {
        setReviewTrigger(customEvent.detail.actionTrigger);
      }
      setIsReviewModalOpen(true);
    };

    window.addEventListener('netiqcv:show-review-prompt', handleShowReview);
    return () => {
      window.removeEventListener('netiqcv:show-review-prompt', handleShowReview);
    };
  }, []);

  // Sync saved count
  useEffect(() => {
    setSavedCount(getSavedResumesList().length);
  }, [currentRoute]);

  // Sync route on popstate / hashchange
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User triggers Option 1: Generate Random CV from homepage
  const handleGenerateRandom = () => {
    const generated = generateRandomCv();
    setRandomSeedCv(generated);
    navigateTo('/random');
  };

  // User triggers Option 2: Create My CV from homepage
  const handleCreateMyCv = () => {
    const existing = loadDraftFromStorage();
    if (existing) {
      setActiveCv(existing);
    } else {
      setActiveCv({ ...DEFAULT_BLANK_CV, id: `user-${Date.now()}` });
    }
    setAutoOpenGeneratorInCreate(true);
    navigateTo('/create');
  };

  // Immediate redirection to generated CV page
  const handleCvGenerated = (newCv: ResumeData) => {
    setActiveCv(newCv);
    saveResumeToList(newCv);
    setSavedCount(getSavedResumesList().length);
    setAutoOpenGeneratorInCreate(false);
    navigateTo('/view-cv');
  };

  // User chooses to edit a random CV or a sample CV in builder
  const handleEditCvInBuilder = (cvToEdit: ResumeData) => {
    setActiveCv(cvToEdit);
    navigateTo('/create');
  };

  // Resume Type Selection handler
  const handleSelectResumeType = (item: ResumeTypeItem) => {
    const resolution = resolveResumeRoute(item);
    if (resolution.type === 'dedicated') {
      navigateTo(resolution.route);
    } else {
      setAiGeneratorProfession(resolution.profession);
      navigateTo('/ai-generator');
    }
  };

  const handleSelectCustomProfession = (profession: string) => {
    setAiGeneratorProfession(profession);
    navigateTo('/ai-generator');
  };

  const isSelectionRoute = ['/resume/type-selection', '/select-type', '/resume-type-selection'].includes(currentRoute);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Header 
        currentRoute={currentRoute} 
        onNavigate={navigateTo} 
        savedCount={savedCount}
      />

      {/* Page Routing */}
      {currentRoute === '/' && (
        <HomePage 
          onNavigate={navigateTo}
          onGenerateRandom={handleGenerateRandom}
          onCreateNew={handleCreateMyCv}
          onCvGenerated={handleCvGenerated}
        />
      )}

      {isSelectionRoute && (
        <ResumeTypeSelectionPage 
          onNavigate={navigateTo}
          onSelectResumeType={handleSelectResumeType}
          onSelectCustomProfession={handleSelectCustomProfession}
        />
      )}

      {currentRoute === '/robotic-resume' && (
        <RoboticResumePage 
          onEditCv={handleEditCvInBuilder}
          onNavigate={navigateTo}
        />
      )}

      {currentRoute === '/ai-generator' && (
        <AiGeneratorPage 
          onEditCv={handleEditCvInBuilder}
          onNavigate={navigateTo}
          initialProfession={aiGeneratorProfession}
          onCvGenerated={handleCvGenerated}
        />
      )}

      {currentRoute === '/random' && (
        <RandomPage 
          initialCv={randomSeedCv}
          onEditCv={handleEditCvInBuilder}
          onNavigate={navigateTo}
        />
      )}

      {currentRoute === '/create' && (
        <CreatePage 
          initialCv={activeCv}
          onNavigate={navigateTo}
          initialOpenGenerator={autoOpenGeneratorInCreate}
          onCloseGenerator={() => setAutoOpenGeneratorInCreate(false)}
          onCvGenerated={handleCvGenerated}
        />
      )}

      {(currentRoute === '/view-cv' || currentRoute === '/generated-cv') && (
        <GeneratedCvPage 
          cv={activeCv}
          onUpdateCv={(updated) => {
            setActiveCv(updated);
            saveResumeToList(updated);
          }}
          onEditInStudio={(cvToEdit) => {
            setActiveCv(cvToEdit);
            navigateTo('/create');
          }}
          onNavigate={navigateTo}
        />
      )}

      {currentRoute === '/samples' && (
        <SamplesPage 
          onSelectSample={handleEditCvInBuilder}
          onNavigate={navigateTo}
        />
      )}

      {currentRoute === '/saved' && (
        <SavedPage 
          onSelectResume={handleEditCvInBuilder}
          onNavigate={navigateTo}
          onCreateNew={handleCreateMyCv}
        />
      )}

      {/* Centralized Advertisement Slot Manager */}
      <AdManager />

      {/* Embedded Partner Content */}
      <EmbeddedContent />

      {/* Persistent Global Footer */}
      <Footer />

      {/* Automatic Review Prompt Modal */}
      <ReviewPromptModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        actionTrigger={reviewTrigger}
      />
    </div>
  );
}
