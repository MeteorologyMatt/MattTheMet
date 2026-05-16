import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import HurricaneSandyPage from './HurricaneSandyPage';

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Badge({ children, tone = "sky" }) {
  const tones = {
    sky: "bg-sky-50 text-sky-800 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:ring-sky-900/60",
    emerald:
      "bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-900/60",
    slate:
      "bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-900/40 dark:text-slate-200 dark:ring-slate-700/60",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        tones[tone] ?? tones.slate
      )}
    >
      {children}
    </span>
  );
}

export default function Research() {
  const [expandedSandy, setExpandedSandy] = useState(false);

  return (
    <div className="space-y-8">
      {/* --- Primary Research Section --- */}
      <div className="rounded-2xl bg-white/70 dark:bg-slate-950/60 backdrop-blur p-8 ring-1 ring-black/5 dark:ring-white/10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Research</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Honors Thesis */}
          <div>
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">
              Honors Thesis
            </h3>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Investigating how international students at Mississippi State University perceive severe weather risks, warning comprehension, and trusted information channels.
            </p>
          </div>

          {/* SEMBRAR Role */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
              SEMBRAR Mississippi & Florida
            </h3>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Working with Dr. Cardozo Gaibisso on a multidisciplinary initiative fostering environmental literacy and communicating localized environmental risks.
            </p>
          </div>
        </div>
      </div>

      {/* --- Academic & Class Projects Section --- */}
      <div className="rounded-2xl bg-white/70 dark:bg-slate-950/60 backdrop-blur p-8 ring-1 ring-black/5 dark:ring-white/10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          Academic & Class Projects
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Meteorological case studies and dashboards developed during coursework.
        </p>

        {/* Set to single column so the Sandy dashboard has room to breathe */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Hurricane Sandy Project Container */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
            
            {/* Clickable Header to Expand/Collapse */}
            <button 
              onClick={() => setExpandedSandy(!expandedSandy)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  Hurricane Sandy Weather Event Analysis
                </h2>
                <div className="mt-2 flex gap-2">
                  <Badge tone="sky">Meteorology</Badge>
                  <Badge tone="emerald">Class Project</Badge>
                </div>
              </div>
              <ChevronDownIcon 
                className={cx(
                  "h-6 w-6 text-slate-400 transition-transform duration-300", 
                  expandedSandy ? "rotate-180" : ""
                )} 
              />
            </button>

            {/* Expanding Content using Framer Motion */}
            <AnimatePresence>
              {expandedSandy && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="border-t border-slate-700">
                    <HurricaneSandyPage />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* May 16th Case Study Placeholder */}
          <div className="flex flex-col rounded-xl bg-slate-50 p-6 shadow-sm ring-1 ring-black/5 border border-dashed border-slate-300 dark:bg-slate-900/50 dark:ring-white/5 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400">
              May 16, 2025 Severe Weather Outbreak
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">
              Case Study (Coming Soon)
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Analyzing synoptic features and structural damage from the major May 16th severe weather event.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                In Progress...
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
