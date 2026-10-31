import React, { useState } from 'react';
import { Search, FileText, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import {
  PLANT_MONOGRAPHS,
  PHYTOHORMONES_SUMMARY,
  GUMS_VS_MUCILAGES,
  ORGANIZED_VS_UNORGANIZED,
  ADULTERATION_TYPES,
} from '../data/highYieldData';

export const HighYieldCheatSheet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monographs' | 'hormones' | 'gums' | 'organized' | 'adulteration'>('monographs');
  const [search, setSearch] = useState('');

  const filteredMonographs = PLANT_MONOGRAPHS.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.botanicalSource.toLowerCase().includes(q) ||
      m.family.toLowerCase().includes(q) ||
      m.activeConstituents.toLowerCase().includes(q) ||
      m.mechanismOrAction.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Visual Scientific Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-900 text-white">
        <img
          src="/src/assets/images/banner_pharma_laboratory_1793475202040.jpg"
          alt="Phytochemistry laboratory with chromatography and herbal extracts"
          className="w-full h-48 sm:h-56 object-cover object-center opacity-40 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-6 sm:p-8 flex flex-col justify-end">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span>High-Yield Revision Suite</span>
            <span aria-hidden="true">·</span>
            <span>Comparative Pharmacology Matrices</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Pharmacognosy II Cheat Sheets &amp; Diagnostic Tables
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Quick reference matrices summarizing the exact botanical sources, chemical constituent structures, cellular mechanisms of action, and differential tables tested on the exam.
          </p>
        </div>
      </div>

      {/* Segmented Category Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('monographs')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'monographs'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Botanical Monographs &amp; MOA ({PLANT_MONOGRAPHS.length})
        </button>

        <button
          onClick={() => setActiveTab('hormones')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'hormones'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Phytohormones Master (5 Classes)
        </button>

        <button
          onClick={() => setActiveTab('gums')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'gums'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Gums vs. Mucilages
        </button>

        <button
          onClick={() => setActiveTab('organized')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'organized'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Organized vs. Unorganized
        </button>

        <button
          onClick={() => setActiveTab('adulteration')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'adulteration'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Adulteration Conditions
        </button>
      </div>

      {/* Tab 1: Botanical Monographs Table */}
      {activeTab === 'monographs' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search botanical name, family, constituent or MOA..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5">Plant Drug</th>
                  <th className="p-3.5">Botanical Source &amp; Family</th>
                  <th className="p-3.5">Part Used</th>
                  <th className="p-3.5">Major Active Constituents</th>
                  <th className="p-3.5">Mechanism of Action (MOA)</th>
                  <th className="p-3.5">Clinical Therapeutic Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMonographs.map((m, idx) => (
                  <tr
                    key={m.name}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {m.name}
                    </td>
                    <td className="p-3.5 space-y-0.5">
                      <div className="italic font-medium text-slate-800 dark:text-slate-200">
                        {m.botanicalSource}
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                        Fam: {m.family}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {m.partUsed}
                    </td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200 font-medium">
                      {m.activeConstituents}
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 leading-relaxed max-w-xs">
                      {m.mechanismOrAction}
                    </td>
                    <td className="p-3.5 text-emerald-800 dark:text-emerald-300 font-medium leading-relaxed max-w-xs">
                      {m.clinicalUse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Phytohormones Summary */}
      {activeTab === 'hormones' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>ملخص سريع للحفظ:</strong> ركّز على هذا الجدول لأنه يجمع أهم الفروق بين الهرمونات النباتية الخمسة الواردة بالمحاضرة (الأوكسينات، الجبريلينات، السيتوكينينات، حمض الأبسيسيك، والإيثيلين).
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHYTOHORMONES_SUMMARY.map((h) => (
              <div
                key={h.name}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {h.name}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {h.category}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Natural Form: </span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400">{h.naturalForm}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Synthetic / Analogue: </span>
                    <span className="font-mono">{h.syntheticExample}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">Primary Function:</span>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-300">{h.primaryFunctions}</p>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">Key Stress / Commercial Application:</span>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-300">{h.keyStressOrRipeningEffect}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Gums vs Mucilages */}
      {activeTab === 'gums' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>نقطة امتحانية متكررة:</strong> Gums ناتجة عن إصابة (Injury/Pathological) وتتكون خارج الخلايا وتذوب بالماء (Acacia)، بينما Mucilages ناتجة عن نمو فسيولوجي طبيعي (Physiological) وتتكون داخل الخلايا وتكون غروية زلقة مع الماء (Agar).
          </div>

          <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5">Property / Comparison</th>
                  <th className="p-3.5 text-emerald-800 dark:text-emerald-400">Gums (الصموغ)</th>
                  <th className="p-3.5 text-blue-800 dark:text-blue-400">Mucilages (اللعاب النباتي)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {GUMS_VS_MUCILAGES.map((row) => (
                  <tr key={row.property} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {row.property}
                    </td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {row.gum}
                    </td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {row.mucilage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Organized vs Unorganized */}
      {activeTab === 'organized' && (
        <div className="space-y-4">
          <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5">Comparison Parameter</th>
                  <th className="p-3.5 text-emerald-800 dark:text-emerald-400">Organized Crude Drugs</th>
                  <th className="p-3.5 text-purple-800 dark:text-purple-400">Unorganized Crude Drugs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ORGANIZED_VS_UNORGANIZED.map((row) => (
                  <tr key={row.property} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {row.property}
                    </td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {row.organized}
                    </td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {row.unorganized}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Adulteration */}
      {activeTab === 'adulteration' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ADULTERATION_TYPES.map((a) => (
              <div
                key={a.type}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-rose-700 dark:text-rose-400">
                    {a.type}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">Condition of Adulteration</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">Definition: </strong>
                  {a.definition}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <strong>Underlying Cause: </strong>
                  {a.cause}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
