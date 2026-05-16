import React from "react";
import { Link } from "react-router-dom"; 

export default function Research() {
  return (
    <div className="space-y-8">
      {/* --- Primary Research Section (Your current code, upgraded to a grid) --- */}
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

      {/* --- NEW: Academic & Class Projects Section --- */}
      <div className="rounded-2xl bg-white/70 dark:bg-slate-950/60 backdrop-blur p-8 ring-1 ring-black/5 dark:ring-white/10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          Academic & Class Projects
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Meteorological case studies and dashboards developed during coursework.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Sandy Project Card */}
          <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md transition dark:bg-slate-900 dark:ring-white/10">
            <h3 className="text-lg font-bold text-sky-700 dark:text-sky-300">
              Hurricane Sandy Event Analysis
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Group Synoptic & Mesoscale Project
            </p>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
              A comprehensive meteorological dashboard chronicling Hurricane Sandy's formation, unprecedented path, and complex transition into a powerful extratropical storm using Matplotlib and Cartopy.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link 
                to="/sandy" 
                className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
              >
                View Dashboard &rarr;
              </Link>
            </div>
          </div>

          {/* Optional: Placeholder for your upcoming May 16th Case Study */}
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
