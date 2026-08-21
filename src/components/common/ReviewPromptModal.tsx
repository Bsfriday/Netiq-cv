import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle2, MessageSquareHeart, Sparkles, Send, ThumbsUp } from 'lucide-react';
import { saveUserReview, dismissReviewPrompt, UserReview } from '../../utils/reviewStorage';

interface ReviewPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionTrigger?: UserReview['actionTrigger'];
}

export const ReviewPromptModal: React.FC<ReviewPromptModalProps> = ({
  isOpen,
  onClose,
  actionTrigger = 'cv_download'
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<string>('Great experience');
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setRating(5);
      setHoverRating(0);
      setCategory('Great experience');
      setComment('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDismiss = () => {
    dismissReviewPrompt();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserReview({
      rating,
      feedbackCategory: category,
      comment: comment.trim(),
      actionTrigger
    });
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  const FEEDBACK_TAGS = [
    { id: 'Great experience', label: 'Great experience', emoji: '⭐' },
    { id: 'Needs improvement', label: 'Needs improvement', emoji: '🔧' },
    { id: 'I have a suggestion', label: 'I have a suggestion', emoji: '💡' },
    { id: 'Fast & easy', label: 'Fast & easy', emoji: '⚡' },
    { id: 'Love the templates', label: 'Love the templates', emoji: '🎨' },
  ];

  const RATING_LABELS: Record<number, string> = {
    1: 'Needs significant improvement',
    2: 'Fair — room for improvement',
    3: 'Good experience',
    4: 'Very good & helpful',
    5: 'Excellent! Loved it'
  };

  const activeRating = hoverRating || rating;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      id="review-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200"
        id="review-prompt-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 w-full" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-hidden"
          title="Close review"
          id="btn-close-review"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Thank you state */
          <div className="p-8 sm:p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Thank You for Your Feedback!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your review directly helps us improve <strong className="text-slate-800">NetiqCV</strong> by <strong className="text-blue-600">CreatIQ Products</strong> for everyone.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form state */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div className="text-center space-y-1.5 pr-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>How was your experience?</span>
              </div>
              <h2 id="review-modal-title" className="text-xl sm:text-2xl font-black text-slate-900">
                Rate & Review NetiqCV
              </h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {actionTrigger === 'cv_download' 
                  ? 'Your CV download is complete! Please let us know how your experience was.'
                  : 'Your CV has been generated! Help us continue improving the studio.'}
              </p>
            </div>

            {/* 1-5 Star Rating */}
            <div className="flex flex-col items-center justify-center space-y-2 py-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled = starValue <= activeRating;
                  return (
                    <button
                      type="button"
                      key={starValue}
                      id={`btn-review-star-${starValue}`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-lg transition-transform hover:scale-115 active:scale-95 focus:outline-hidden"
                      aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                    >
                      <Star 
                        className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                          isFilled 
                            ? 'text-amber-400 fill-amber-400 drop-shadow-xs' 
                            : 'text-slate-300 stroke-slate-300'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-slate-700 min-h-[18px]">
                {RATING_LABELS[activeRating]}
              </span>
            </div>

            {/* Category Tags */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                What describes your experience best?
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {FEEDBACK_TAGS.map((tag) => {
                  const isSelected = category === tag.id;
                  return (
                    <button
                      type="button"
                      key={tag.id}
                      id={`btn-review-tag-${tag.id.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => setCategory(tag.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                      }`}
                    >
                      <span>{tag.emoji}</span>
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Comment Box */}
            <div className="space-y-1.5">
              <label htmlFor="review-comment-input" className="block text-xs font-bold text-slate-700">
                Comments & Suggestions <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="review-comment-input"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write what you liked, what could be improved, any problems you experienced, or suggestions for the website..."
                className="w-full text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl p-3 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all resize-none font-medium"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="submit"
                id="btn-submit-review"
                className="w-full sm:w-auto flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white rounded-xl font-bold text-xs shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                id="btn-maybe-later"
                className="w-full sm:w-auto py-3 px-4 bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl font-semibold text-xs transition-colors"
              >
                Maybe later
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
