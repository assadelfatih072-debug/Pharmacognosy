import React from 'react';
import { ARABIC_EXAM_TIPS } from '../data/highYieldData';
import { Lightbulb, CheckCircle2, Bookmark, Award, HelpCircle } from 'lucide-react';

export const ExamTipsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          Essential High-Yield Highlights
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          توجيهات وملاحظات المراجعة النهائية للامتحان
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          أهم الملاحظات والنقاط الذهبية المستخلصة مباشرة من ملفات المحاضرات وأسئلة الامتحانات لمراجعتها قبل دخول قاعة الاختبار.
        </p>
      </div>

      <div className="space-y-4">
        {ARABIC_EXAM_TIPS.map((tip, idx) => (
          <div
            key={idx}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-2 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
          >
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm sm:text-base border-b border-slate-100 dark:border-slate-800 pb-2">
              <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{tip.title}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {tip.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Scientist Summary Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>جدول العلماء وتواريخهم في علم العقاقير (History &amp; Scientists)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[11px] border-b border-slate-200 dark:border-slate-700">
                <th className="p-3">Scientist / Scholar</th>
                <th className="p-3">Era / Date</th>
                <th className="p-3">Contribution / Landmark Achievement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Hippocrates</td>
                <td className="p-3 font-mono">460–377 BC</td>
                <td className="p-3">Known as the <strong>Father of Medicine</strong>. Established medicine as a rational science.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Aristotle</td>
                <td className="p-3 font-mono">384–322 BC</td>
                <td className="p-3">Made foundational contributions to <strong>Zoology</strong> and knowledge of the animal kingdom.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Theophrastus</td>
                <td className="p-3 font-mono">370–287 BC</td>
                <td className="p-3">Known as the <strong>Father of Botany</strong>. Wrote early treatises on plant morphology and taxonomy.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Dioscorides</td>
                <td className="p-3 font-mono">1st Century AD</td>
                <td className="p-3">Wrote <strong>De Materia Medica</strong> describing over 600 medicinal plant drugs and their actions.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Galen</td>
                <td className="p-3 font-mono">130–200 AD</td>
                <td className="p-3">Developed early pharmaceutical formulas and extraction methods for plants/animals (<strong>Galenicals</strong>).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">C.A. Seydler</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">1815 AD</td>
                <td className="p-3">Coined the term <strong>"Pharmacognosy"</strong> in his doctoral work <em>Analecta Pharmacognostica</em>.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Charaka &amp; Sushrutha</td>
                <td className="p-3 font-mono">Ancient India</td>
                <td className="p-3">Compiled monumental works on Ayurvedic medicinal plants and surgical/botanical remedies.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
