export interface UserReview {
  id: string;
  rating: number; // 1 to 5
  feedbackCategory?: string;
  comment: string;
  submittedAt: number;
  actionTrigger?: 'cv_download' | 'cv_generated' | 'ai_generated' | 'random_generated' | 'manual';
}

const REVIEW_SUBMITTED_KEY = 'netiqcv_review_submitted';
const REVIEW_DISMISSED_KEY = 'netiqcv_review_dismissed_until';
const REVIEWS_STORE_KEY = 'netiqcv_user_reviews';

/**
 * Checks whether the review modal should be shown to the current user.
 * Avoids repeatedly prompting users if they've already submitted a review
 * or dismissed it recently (7 days cool-off).
 */
export function shouldShowReviewPrompt(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    
    // If already submitted review, do not prompt again
    const isSubmitted = localStorage.getItem(REVIEW_SUBMITTED_KEY);
    if (isSubmitted === 'true') return false;

    // If dismissed with "Maybe later", check if cooling off period has passed
    const dismissedUntil = localStorage.getItem(REVIEW_DISMISSED_KEY);
    if (dismissedUntil) {
      const untilTimestamp = parseInt(dismissedUntil, 10);
      if (Date.now() < untilTimestamp) {
        return false;
      }
    }

    return true;
  } catch (e) {
    console.warn('Error checking review prompt status:', e);
    return false;
  }
}

/**
 * Saves a submitted user review into local persistence and marks submitted status.
 */
export function saveUserReview(review: Omit<UserReview, 'id' | 'submittedAt'>): UserReview {
  const fullReview: UserReview = {
    ...review,
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    submittedAt: Date.now(),
  };

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingRaw = localStorage.getItem(REVIEWS_STORE_KEY);
      const reviews: UserReview[] = existingRaw ? JSON.parse(existingRaw) : [];
      reviews.unshift(fullReview);
      localStorage.setItem(REVIEWS_STORE_KEY, JSON.stringify(reviews.slice(0, 50)));
      localStorage.setItem(REVIEW_SUBMITTED_KEY, 'true');
    }
  } catch (e) {
    console.warn('Failed to save review in localStorage', e);
  }

  return fullReview;
}

/**
 * Dismisses the review prompt for 7 days when user selects "Maybe later" or closes it.
 */
export function dismissReviewPrompt(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(REVIEW_DISMISSED_KEY, (Date.now() + sevenDays).toString());
    }
  } catch (e) {
    console.warn('Failed to set review dismissal in localStorage', e);
  }
}

/**
 * Retrieves all locally saved user reviews (for diagnostics or admin views).
 */
export function getSavedUserReviews(): UserReview[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const raw = localStorage.getItem(REVIEWS_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to read saved reviews', e);
    return [];
  }
}

/**
 * Triggers the automatic review prompt event with an optional delay.
 */
export function triggerReviewPrompt(actionTrigger: UserReview['actionTrigger'] = 'cv_download', delayMs: number = 1000): void {
  if (!shouldShowReviewPrompt()) return;

  setTimeout(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('netiqcv:show-review-prompt', {
        detail: { actionTrigger }
      }));
    }
  }, delayMs);
}
