import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudyModeView } from './components/StudyModeView';
import { MockExamView } from './components/MockExamView';
import { HighYieldCheatSheet } from './components/HighYieldCheatSheet';
import { FlashcardView } from './components/FlashcardView';
import { ExamTipsView } from './components/ExamTipsView';
import { ALL_QUESTIONS } from './data/allQuestions';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'practice' | 'mock-exam' | 'cheat-sheet' | 'flashcards' | 'exam-tips'>('practice');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pharma_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // User answered questions in practice mode
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pharma_user_answers');
        return stored ? JSON.parse(stored) : {};
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pharma_bookmarks');
        return stored ? new Set(JSON.parse(stored)) : new Set();
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pharma_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pharma_theme', 'light');
    }
  }, [isDark]);

  // Persist answers
  const handleAnswerQuestion = (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => {
      const next = { ...prev, [questionId]: answer };
      try {
        localStorage.setItem('pharma_user_answers', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  // Persist bookmarks
  const handleToggleBookmark = (questionId: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      try {
        localStorage.setItem('pharma_bookmarks', JSON.stringify(Array.from(next)));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your practice answer history?')) {
      setUserAnswers({});
      localStorage.removeItem('pharma_user_answers');
    }
  };

  const handleStartQuickMock = () => {
    setCurrentTab('mock-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartQuickMock={handleStartQuickMock}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        bookmarkedCount={bookmarks.size}
      />

      {/* Show Hero banner on practice tab */}
      {currentTab === 'practice' && (
        <HeroSection
          totalQuestions={ALL_QUESTIONS.length}
          solvedCount={Object.keys(userAnswers).length}
          bookmarkedCount={bookmarks.size}
          onSelectModule={(modId) => {
            setSelectedModuleId(modId);
          }}
          onStartExam={handleStartQuickMock}
          onOpenTips={() => {
            setCurrentTab('exam-tips');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'practice' && (
          <StudyModeView
            questions={ALL_QUESTIONS}
            userAnswers={userAnswers}
            onAnswerQuestion={handleAnswerQuestion}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            selectedModuleId={selectedModuleId}
            onSelectModule={setSelectedModuleId}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentTab === 'mock-exam' && (
          <MockExamView
            allQuestions={ALL_QUESTIONS}
            onExitExam={() => {
              setCurrentTab('practice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'cheat-sheet' && <HighYieldCheatSheet />}

        {currentTab === 'flashcards' && (
          <FlashcardView questions={ALL_QUESTIONS} />
        )}

        {currentTab === 'exam-tips' && <ExamTipsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">PharmaCognos II</span>
            <span aria-hidden="true">·</span>
            <span>Comprehensive Pharmacy Examination Revision Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentTab('cheat-sheet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors"
            >
              Diagnostic Tables
            </button>
            <button
              onClick={() => {
                setCurrentTab('exam-tips');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors"
            >
              ملاحظات الامتحان
            </button>
            <button
              onClick={() => {
                setCurrentTab('mock-exam');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors"
            >
              Mock Simulator
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
