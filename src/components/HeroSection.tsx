import React from 'react';
import { BookOpen, CheckCircle, Bookmark, Compass, Sparkles, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { ALL_MODULES } from '../data/allQuestions';

interface HeroSectionProps {
  totalQuestions: number;
  solvedCount: number;
  bookmarkedCount: number;
  onSelectModule: (modId: string) => void;
  onStartExam: () => void;
  onOpenTips: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalQuestions,
  solvedCount,
  bookmarkedCount,
  onSelectModule,
  onStartExam,
  onOpenTips,
}) => {
  const percentComplete = Math.round((solvedCount / totalQuestions) * 100) || 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial & Action Anchor */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <span>Pharmacognosy II Official Course</span>
              <span aria-hidden="true">·</span>
              <span>358 Verified Examination MCQs</span>
              <span aria-hidden="true">·</span>
              <span>Full Answer Keys &amp; Rationale</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Master Pharmacognosy II for Your Upcoming Exam
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Complete question banks sourced directly from official course lectures — covering definitions, crude drug sources, plant anatomy, history &amp; scientists, formulation &amp; cGMP, phytohormones, adulteration, and botanical monographs with mechanisms of action.
            </p>

            {/* Quick Arabic Encouragement & Key Focus */}
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
              <p className="font-semibold mb-1 flex items-center justify-between">
                <span>توجيهات المراجعة قبل الامتحان:</span>
                <button
                  onClick={onOpenTips}
                  className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>عرض جميع الملاحظات</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-normal">
                ركّز خصوصاً على تعريفات الـ Crude Drugs، والجزء النباتي لكل دواء، وأسماء العلماء وتواريخهم (Seydler 1815)، وهرمونات النمو الخمسة، وجدول الفرق بين Gums و Mucilages، وحالات الغش الأربعة، وآليات التأثير الدوائي (Digitalis, Senna, Vinca, Belladonna).
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onStartExam}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Launch Timed Mock Exam</span>
              </button>

              <button
                onClick={() => onSelectModule('mod10')}
                className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>High-Yield Monographs (Pharma 10)</span>
              </button>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {totalQuestions}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total MCQs</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                  {solvedCount} <span className="text-xs font-normal text-slate-400">({percentComplete}%)</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Answered</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                  {bookmarkedCount}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Bookmarked</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Botanical Plate Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-800">
              <img
                src="/src/assets/images/hero_pharmacognosy_botanical_1793475202334.jpg"
                alt="Digitalis purpurea, Cinchona bark and botanical pharmacognosy specimens"
                className="w-full h-72 sm:h-80 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white dark:bg-slate-800/90 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Botanical Pharmacognosy Plate</span>
                  <span className="block text-slate-500 dark:text-slate-400 text-[11px]">
                    Digitalis purpurea · Cinchona bark · Papaver somniferum
                  </span>
                </div>
                <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-medium">
                  10 Modules
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
