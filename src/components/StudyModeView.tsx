import React, { useState, useMemo } from 'react';
import { Search, Filter, Shuffle, RefreshCw, Bookmark, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { Question } from '../types';
import { ALL_MODULES } from '../data/allQuestions';
import { QuizCard } from './QuizCard';

interface StudyModeViewProps {
  questions: Question[];
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  onAnswerQuestion: (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => void;
  bookmarks: Set<string>;
  onToggleBookmark: (questionId: string) => void;
  selectedModuleId: string;
  onSelectModule: (modId: string) => void;
  onResetProgress: () => void;
}

export const StudyModeView: React.FC<StudyModeViewProps> = ({
  questions,
  userAnswers,
  onAnswerQuestion,
  bookmarks,
  onToggleBookmark,
  selectedModuleId,
  onSelectModule,
  onResetProgress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unanswered' | 'incorrect' | 'bookmarked'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const currentModule = useMemo(() => {
    return ALL_MODULES.find((m) => m.id === selectedModuleId);
  }, [selectedModuleId]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Module filter
      if (selectedModuleId !== 'all' && q.moduleId !== selectedModuleId) {
        return false;
      }

      // Status filter
      const ans = userAnswers[q.id];
      if (statusFilter === 'unanswered' && ans !== undefined) return false;
      if (statusFilter === 'incorrect' && (ans === undefined || ans === q.correctAnswer)) return false;
      if (statusFilter === 'bookmarked' && !bookmarks.has(q.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesOpts = q.options.some((o) => o.text.toLowerCase().includes(query));
        const matchesPart = q.part.toLowerCase().includes(query);
        const matchesExpl = q.explanation?.toLowerCase().includes(query) ?? false;
        if (!matchesQ && !matchesOpts && !matchesPart && !matchesExpl) return false;
      }

      return true;
    });
  }, [questions, selectedModuleId, statusFilter, searchQuery, userAnswers, bookmarks]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedModuleId, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(start, start + itemsPerPage);
  }, [filteredQuestions, currentPage]);

  const stats = useMemo(() => {
    const currentPool = selectedModuleId === 'all' ? questions : questions.filter(q => q.moduleId === selectedModuleId);
    let answered = 0;
    let correct = 0;
    currentPool.forEach(q => {
      const a = userAnswers[q.id];
      if (a !== undefined) {
        answered++;
        if (a === q.correctAnswer) correct++;
      }
    });
    return {
      total: currentPool.length,
      answered,
      correct,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    };
  }, [questions, selectedModuleId, userAnswers]);

  return (
    <div className="space-y-6">
      {/* Module Selector Bar (Interactive Segmented Tabs) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-2.5 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Select Lecture / Module
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            {stats.answered} of {stats.total} Answered · {stats.accuracy}% Accuracy
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectModule('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedModuleId === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
            }`}
          >
            All Questions (358)
          </button>

          {ALL_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedModuleId === mod.id
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {mod.shortCode} ({mod.questionCount})
            </button>
          ))}
        </div>
      </div>

      {/* Active Module Banner & Arabic Lecture Tip */}
      {currentModule && (
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-300">
                {currentModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                {currentModule.description}
              </p>
            </div>
            <div className="text-xs font-mono tabular-nums font-semibold px-2.5 py-1 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 rounded-md shrink-0 self-start sm:self-auto text-emerald-800 dark:text-emerald-300">
              {currentModule.questionCount} Questions
            </div>
          </div>

          {currentModule.arabicTip && (
            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
              <span className="font-bold shrink-0">💡 ملاحظة الامتحان:</span>
              <span>{currentModule.arabicTip}</span>
            </div>
          )}
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search keywords (e.g. quinine, Na+/K+-ATPase, auxin, AAS, Salmonella)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg shrink-0 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              statusFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('unanswered')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              statusFilter === 'unanswered'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Unanswered
          </button>
          <button
            onClick={() => setStatusFilter('incorrect')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              statusFilter === 'incorrect'
                ? 'bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Incorrect Only
          </button>
          <button
            onClick={() => setStatusFilter('bookmarked')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
              statusFilter === 'bookmarked'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Bookmarked ({bookmarks.size})</span>
          </button>
        </div>
      </div>

      {/* Results Count & Reset Affordance */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredQuestions.length}</span> question{filteredQuestions.length !== 1 ? 's' : ''}
        </span>
        {Object.keys(userAnswers).length > 0 && (
          <button
            onClick={onResetProgress}
            className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Answer History</span>
          </button>
        )}
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-12 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            No questions match this filter
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try resetting your search query or switching to "All" to view all available MCQs.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              onSelectModule('all');
            }}
            className="px-4 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedQuestions.map((q) => (
            <QuizCard
              key={q.id}
              question={q}
              selectedAnswer={userAnswers[q.id]}
              onSelectAnswer={(ans) => onAnswerQuestion(q.id, ans)}
              isBookmarked={bookmarks.has(q.id)}
              onToggleBookmark={() => onToggleBookmark(q.id)}
              mode="practice"
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 px-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Previous
          </button>

          <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
