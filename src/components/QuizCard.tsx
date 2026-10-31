import React, { useState } from 'react';
import { CheckCircle2, XCircle, Bookmark, BookmarkCheck, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  mode: 'practice' | 'exam';
  showFeedbackDeferred?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isBookmarked,
  onToggleBookmark,
  mode,
  showFeedbackDeferred = false,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const isAnswered = selectedAnswer !== undefined;
  const isPractice = mode === 'practice';
  const showFeedback = isPractice ? isAnswered : showFeedbackDeferred;

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
      {/* Card Header: Metadata & Actions */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{question.moduleTitle}</span>
          <span aria-hidden="true">·</span>
          <span>{question.part}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">Q{question.questionNumber}</span>
        </div>

        <button
          onClick={onToggleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
          className={`p-1.5 rounded-md transition-colors cursor-pointer ${
            isBookmarked
              ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500 dark:fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Body: Question text */}
      <div className="p-5 sm:p-6 space-y-5">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
          {question.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2.5">
          {question.options.map((opt) => {
            const isThisSelected = selectedAnswer === opt.label;
            const isThisCorrect = opt.label === question.correctAnswer;

            let optionStyle = 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';
            let circleStyle = 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800';

            if (showFeedback) {
              if (isThisCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium shadow-sm';
                circleStyle = 'border-emerald-500 bg-emerald-600 text-white font-bold';
              } else if (isThisSelected && !isThisCorrect) {
                optionStyle = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                circleStyle = 'border-rose-400 bg-rose-600 text-white font-bold';
              } else {
                optionStyle = 'border-slate-150 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 dark:text-slate-500 opacity-70';
                circleStyle = 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 bg-transparent';
              }
            } else if (isThisSelected) {
              optionStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium';
              circleStyle = 'border-emerald-600 bg-emerald-600 text-white font-bold';
            }

            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onSelectAnswer(opt.label)}
                disabled={isPractice && isAnswered}
                className={`w-full text-left p-3.5 sm:p-4 rounded-lg border transition-all duration-150 flex items-start gap-3 cursor-pointer ${optionStyle} ${
                  isPractice && isAnswered ? 'cursor-default' : ''
                }`}
              >
                <span
                  className={`w-7 h-7 shrink-0 rounded-md border flex items-center justify-center text-xs font-mono tabular-nums transition-colors ${circleStyle}`}
                >
                  {opt.label}
                </span>
                <span className="flex-1 text-sm sm:text-base pt-0.5 leading-normal">
                  {opt.text}
                </span>
                {showFeedback && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 self-center" />
                )}
                {showFeedback && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Practice Mode Feedback Callout */}
        {showFeedback && (
          <div className="pt-2">
            <div
              className={`p-4 rounded-xl border ${
                isCorrect
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'}>
                  {isCorrect ? '✓ Correct Answer: Option ' + question.correctAnswer : '✗ Incorrect. Correct Answer: Option ' + question.correctAnswer}
                </span>

                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showExplanation ? 'Hide Rationale' : 'Explain Why'}</span>
                  {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Collapsible or default visible explanation */}
              {(showExplanation || !isCorrect) && question.explanation && (
                <p className="mt-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Key Explanation: </span>
                  {question.explanation}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
