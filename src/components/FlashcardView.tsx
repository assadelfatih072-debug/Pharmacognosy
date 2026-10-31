import React, { useState } from 'react';
import { RotateCw, ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Shuffle, Sparkles, BookOpen } from 'lucide-react';
import { Question } from '../types';

interface FlashcardViewProps {
  questions: Question[];
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ questions }) => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  const currentQ = questions[index];
  const correctOption = currentQ?.options.find((o) => o.label === currentQ.correctAnswer);

  const handleNext = () => {
    setIsFlipped(false);
    setIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * questions.length);
    setIndex(rand);
  };

  const handleToggleMastered = () => {
    if (!currentQ) return;
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  if (!currentQ) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Header controls */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <div className="flex items-center gap-2 font-mono tabular-nums">
          <span className="font-bold text-slate-900 dark:text-white">
            Card {index + 1} of {questions.length}
          </span>
          <span aria-hidden="true">·</span>
          <span>{masteredIds.size} Mastered</span>
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center gap-1.5 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Shuffle Card</span>
        </button>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-[320px] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 cursor-pointer shadow-sm hover:border-emerald-400 dark:hover:border-emerald-600 transition-all flex flex-col justify-between select-none relative group"
      >
        {/* Top bar inside card */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            {currentQ.moduleTitle}
          </span>
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            <span>Click card to flip</span>
          </span>
        </div>

        {/* Card Content Area */}
        <div className="py-8 text-center space-y-4">
          {!isFlipped ? (
            /* FRONT: Question */
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {currentQ.part}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {currentQ.question}
              </h3>
              <p className="text-xs text-slate-400">
                Think of the best answer, then tap to check the verified answer and explanation.
              </p>
            </div>
          ) : (
            /* BACK: Answer & Rationale */
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Correct Option {currentQ.correctAnswer}</span>
              </div>

              <div className="text-xl sm:text-2xl font-extrabold text-emerald-900 dark:text-emerald-200">
                {correctOption?.text}
              </div>

              {currentQ.explanation && (
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-left bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Rationale:
                  </span>
                  {currentQ.explanation}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer inside */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span>Q{currentQ.questionNumber}</span>
          <span>{isFlipped ? 'Answer View' : 'Prompt View'}</span>
        </div>
      </div>

      {/* Navigation and Mastery Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleToggleMastered}
          className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            masteredIds.has(currentQ.id)
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <CheckCircle className={`w-4 h-4 ${masteredIds.has(currentQ.id) ? 'fill-emerald-500 text-white' : ''}`} />
          <span>{masteredIds.has(currentQ.id) ? 'Mastered!' : 'Mark as Mastered'}</span>
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <span>Next Card</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
