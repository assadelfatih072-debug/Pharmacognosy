import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Flag, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, RefreshCw, Award, XCircle, HelpCircle } from 'lucide-react';
import { Question } from '../types';
import { ALL_MODULES } from '../data/allQuestions';
import { QuizCard } from './QuizCard';

interface MockExamViewProps {
  allQuestions: Question[];
  onExitExam: () => void;
  bookmarks: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  allQuestions,
  onExitExam,
  bookmarks,
  onToggleBookmark,
}) => {
  // Setup state
  const [examStarted, setExamStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(30);
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);

  // Active exam state
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Initialize Exam
  const handleStartExam = () => {
    let pool = [...allQuestions];
    if (selectedModule !== 'all') {
      pool = pool.filter((q) => q.moduleId === selectedModule);
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setExamQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedIds(new Set());
    setSecondsRemaining(timeLimitMinutes * 60);
    setIsSubmitted(false);
    setExamStarted(true);
  };

  // Timer countdown
  useEffect(() => {
    if (!examStarted || isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, isSubmitted]);

  // Format timer
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIndex];

  const handleSelectAnswer = (ans: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted || !currentQ) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: ans,
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  // Submission Calculation
  const results = useMemo(() => {
    if (!isSubmitted) return null;
    let correct = 0;
    const moduleBreakdown: Record<string, { total: number; correct: number; title: string }> = {};

    examQuestions.forEach((q) => {
      if (!moduleBreakdown[q.moduleId]) {
        moduleBreakdown[q.moduleId] = { total: 0, correct: 0, title: q.moduleTitle };
      }
      moduleBreakdown[q.moduleId].total++;

      const chosen = selectedAnswers[q.id];
      if (chosen === q.correctAnswer) {
        correct++;
        moduleBreakdown[q.moduleId].correct++;
      }
    });

    const percent = Math.round((correct / examQuestions.length) * 100);
    return {
      total: examQuestions.length,
      correct,
      incorrect: examQuestions.length - correct,
      percent,
      moduleBreakdown,
    };
  }, [isSubmitted, examQuestions, selectedAnswers]);

  // Configuration Screen
  if (!examStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Real Examination Environment
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Pharmacognosy II Mock Exam Simulator
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Test yourself under timed test conditions. Questions are randomized, answers are hidden until submission, and full explanations are delivered upon completion.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Option 1: Module Scope */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Exam Scope / Subject
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
            >
              <option value="all">All Modules Combined (Full Course • 358 Qs)</option>
              {ALL_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.questionCount} Qs)
                </option>
              ))}
            </select>
          </div>

          {/* Option 2: Number of questions */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Number of Questions
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {[15, 25, 40, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setQuestionCount(num);
                    setTimeLimitMinutes(num); // Default 1 min/q
                  }}
                  className={`p-3 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                    questionCount === num
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>

          {/* Option 3: Time limit */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Time Allowed: <span className="font-mono text-emerald-700 dark:text-emerald-400">{timeLimitMinutes} Minutes</span>
            </label>
            <input
              type="range"
              min="5"
              max="90"
              step="5"
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>5 min (Rapid sprint)</span>
              <span>30 min (Standard)</span>
              <span>90 min (Extended)</span>
            </div>
          </div>

          {/* Start CTA */}
          <div className="pt-2">
            <button
              onClick={handleStartExam}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Begin Examination Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active / Submitted Screen
  return (
    <div className="space-y-6">
      {/* Exam Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
            <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400 text-base">
              Question {currentIndex + 1}
            </span>
            <span className="text-slate-400">/</span>
            <span className="font-mono tabular-nums text-slate-500">{examQuestions.length}</span>
          </div>

          <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400">
            {Object.keys(selectedAnswers).length} answered
          </span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          {!isSubmitted && (
            <div
              className={`flex items-center gap-2 font-mono text-sm font-bold px-3 py-1 rounded-md border ${
                secondsRemaining < 300
                  ? 'border-rose-400 text-rose-600 bg-rose-50 dark:bg-rose-950/40 animate-pulse'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          )}

          {!isSubmitted ? (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={handleStartExam}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Score Banner if submitted */}
      {isSubmitted && results && (
        <div className="p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Exam Report &amp; Scorecard</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {results.percent >= 75
                  ? 'Excellent Performance! 🎉'
                  : results.percent >= 50
                  ? 'Good Effort — Ready for Targeted Revision'
                  : 'Needs Review — Check Rationales Below'}
              </h3>
            </div>

            <div className="text-right sm:text-center p-3 sm:px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shrink-0">
              <div className="text-3xl font-mono font-black tabular-nums text-emerald-700 dark:text-emerald-400">
                {results.percent}%
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {results.correct} of {results.total} correct
              </div>
            </div>
          </div>

          {/* Module Breakdown */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Score by Lecture Section:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(results.moduleBreakdown).map(([modId, data]) => {
                const acc = Math.round((data.correct / data.total) * 100);
                return (
                  <div
                    key={modId}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/50 flex items-center justify-between"
                  >
                    <span className="truncate pr-2 font-medium text-slate-700 dark:text-slate-300">
                      {data.title}
                    </span>
                    <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white shrink-0">
                      {data.correct}/{data.total} ({acc}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Examination Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Question Stage */}
        <div className="lg:col-span-8 space-y-4">
          {currentQ && (
            <QuizCard
              question={currentQ}
              selectedAnswer={selectedAnswers[currentQ.id]}
              onSelectAnswer={handleSelectAnswer}
              isBookmarked={bookmarks.has(currentQ.id)}
              onToggleBookmark={() => onToggleBookmark(currentQ.id)}
              mode="exam"
              showFeedbackDeferred={isSubmitted}
            />
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleToggleFlag}
              className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                currentQ && flaggedIds.has(currentQ.id)
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${currentQ && flaggedIds.has(currentQ.id) ? 'fill-amber-500' : ''}`} />
              <span>{currentQ && flaggedIds.has(currentQ.id) ? 'Flagged for Review' : 'Flag Question'}</span>
            </button>

            <button
              onClick={() => setCurrentIndex((i) => Math.min(examQuestions.length - 1, i + 1))}
              disabled={currentIndex === examQuestions.length - 1}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Question Navigator Grid */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Question Navigator</span>
            <span className="font-mono tabular-nums text-slate-500">
              {Object.keys(selectedAnswers).length}/{examQuestions.length}
            </span>
          </div>

          {/* Grid of question buttons */}
          <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
            {examQuestions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const hasAnswered = selectedAnswers[q.id] !== undefined;
              const isFlagged = flaggedIds.has(q.id);

              let style = 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300';

              if (isSubmitted) {
                const correct = selectedAnswers[q.id] === q.correctAnswer;
                if (correct) {
                  style = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold';
                } else {
                  style = 'border-rose-400 bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold';
                }
              } else if (hasAnswered) {
                style = 'border-emerald-600 bg-emerald-600 text-white font-semibold';
              }

              if (isCurrent) {
                style += ' ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-md border text-xs font-mono tabular-nums transition-all relative cursor-pointer flex items-center justify-center ${style}`}
                >
                  {idx + 1}
                  {isFlagged && !isSubmitted && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-600" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600" />
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Flagged for Review</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onExitExam}
              className="w-full py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Exit to Question Bank
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal before Submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Ready to Submit?</h4>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              You have answered{' '}
              <strong className="text-slate-900 dark:text-white">
                {Object.keys(selectedAnswers).length}
              </strong>{' '}
              out of <strong className="text-slate-900 dark:text-white">{examQuestions.length}</strong> questions.
              {examQuestions.length - Object.keys(selectedAnswers).length > 0 && (
                <span className="block mt-1 text-rose-600 dark:text-rose-400">
                  {examQuestions.length - Object.keys(selectedAnswers).length} questions remain unanswered.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Keep Testing
              </button>

              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setIsSubmitted(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
              >
                Confirm &amp; See Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
