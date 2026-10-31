import React from 'react';
import { Sparkles, Moon, Sun, BookOpen, Layers, Award, FileText, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  currentTab: 'practice' | 'mock-exam' | 'cheat-sheet' | 'flashcards' | 'exam-tips';
  onSelectTab: (tab: 'practice' | 'mock-exam' | 'cheat-sheet' | 'flashcards' | 'exam-tips') => void;
  onStartQuickMock: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  bookmarkedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onStartQuickMock,
  isDark,
  onToggleTheme,
  bookmarkedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('practice')}
            className="text-left group cursor-pointer focus-visible:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400 whitespace-nowrap shrink-0 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
              PharmaCognos II
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              Exam Suite
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('practice')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              currentTab === 'practice'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Question Bank (358)
          </button>

          <button
            onClick={() => onSelectTab('mock-exam')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              currentTab === 'mock-exam'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Mock Simulator
          </button>

          <button
            onClick={() => onSelectTab('cheat-sheet')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              currentTab === 'cheat-sheet'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            High-Yield Tables
          </button>

          <button
            onClick={() => onSelectTab('flashcards')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              currentTab === 'flashcards'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Quick Flashcards
          </button>

          <button
            onClick={() => onSelectTab('exam-tips')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
              currentTab === 'exam-tips'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            نصائح الامتحان
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onStartQuickMock}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Mock Exam</span>
          </button>
        </div>
      </div>

      {/* Mobile subnav row */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-400 gap-4 scrollbar-none">
        <button
          onClick={() => onSelectTab('practice')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'practice' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}
        >
          Questions
        </button>
        <button
          onClick={() => onSelectTab('mock-exam')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'mock-exam' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}
        >
          Mock Exam
        </button>
        <button
          onClick={() => onSelectTab('cheat-sheet')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'cheat-sheet' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}
        >
          Tables
        </button>
        <button
          onClick={() => onSelectTab('flashcards')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'flashcards' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}
        >
          Flashcards
        </button>
        <button
          onClick={() => onSelectTab('exam-tips')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'exam-tips' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}
        >
          نصائح الامتحان
        </button>
      </div>
    </header>
  );
};
