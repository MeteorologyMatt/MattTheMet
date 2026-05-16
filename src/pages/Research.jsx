import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
  const BASE = import.meta.env.BASE_URL;
  const assetPath = `${BASE}sandy-assets`;

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Sandy Project Card - Expandable */}
          <div className="flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition dark:bg-slate-900 dark:ring-white/10 overflow-hidden">
            <button
              onClick={() => setExpandedSandy(!expandedSandy)}
              className="p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-sky-700 dark:text-sky-300">
                    Hurricane Sandy Event Analysis
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Group Synoptic & Mesoscale Project
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedSandy ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                </motion.div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed mt-4">
                A comprehensive meteorological dashboard chronicling Hurricane Sandy's formation, unprecedented path, and complex transition into a powerful extratropical storm using Matplotlib and Cartopy.
              </p>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {expandedSandy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-950/30">
                    
                    {/* Event Overview */}
                    <div>
                      <h4 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-3">
                        The Event: Hurricane Sandy (Oct 22 - Nov 1, 2012)
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                        Sandy was one of the most impactful Atlantic hurricanes of the 21st century, with an unprecedented path and hybrid warm-core/cold-core structure during transition.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc pl-5">
                        <li><strong>Oct 22:</strong> Forms as tropical depression in central Caribbean</li>
                        <li><strong>Oct 24-25:</strong> Rapidly intensifies to Category 3 hurricane</li>
                        <li><strong>Oct 26-28:</strong> Travels north-northeast, paralleling US East Coast</li>
                        <li><strong>Oct 28-29:</strong> Anomalous westward turn toward Mid-Atlantic</li>
                        <li><strong>Oct 29:</strong> Landfall near Atlantic City, NJ as post-tropical cyclone</li>
                      </ul>
                    </div>

                    {/* MSLP Evolution */}
                    <div>
                      <h4 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-3">
                        Mean Sea Level Pressure (MSLP) Evolution
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                        The MSLP analysis reveals Sandy's intensification phase and dramatic pressure drop approaching the US East Coast.
                      </p>
                      {assetPath && (
                        <div className="rounded-lg overflow-hidden bg-white dark:bg-slate-900 p-2">
                          <img
                            src={`${assetPath}/GIFs/MSLP_Sandy.gif`}
                            alt="MSLP Evolution"
                            className="w-full h-auto rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* 500 hPa Heights */}
                    <div>
                      <h4 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-3">
                        500 hPa Heights & Upper-Level Dynamics
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                        Upper-level trough interaction with Sandy's warm core drove the anomalous westward turn and intensification.
                      </p>
                      {assetPath && (
                        <div className="rounded-lg overflow-hidden bg-white dark:bg-slate-900 p-2">
                          <img
                            src={`${assetPath}/GIFs/500hPa_Heights.gif`}
                            alt="500 hPa Heights"
                            className="w-full h-auto rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Radar Reflectivity */}
                    <div>
                      <h4 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-3">
                        Radar Reflectivity & Storm Structure
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                        Radar imagery captures Sandy's transitional structure during interaction with mid-latitude systems.
                      </p>
                      {assetPath && (
                        <div className="rounded-lg overflow-hidden bg-white dark:bg-slate-900 p-2">
                          <img
                            src={`${assetPath}/GIFs/Radar_Reflectivity.gif`}
                            alt="Radar Reflectivity"
                            className="w-full h-auto rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Soundings */}
                    <div>
                      <h4 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-3">
                        Atmospheric Soundings
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                        Radiosonde profiles show the thermodynamic environment supporting Sandy's development and transition.
                      </p>
                      {assetPath && (
                        <div className="rounded-lg overflow-hidden bg-white dark:bg-slate-900 p-2">
                          <img
                            src={`${assetPath}/GIFs/Soundings.gif`}
                            alt="Atmospheric Soundings"
                            className="w-full h-auto rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Meteogram */}
                    <div>
                      <h4 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-3">
                        Surface Observations & Time Series
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                        Meteogram data tracks Sandy's approach and impact at land-based observation stations.
                      </p>
                      {assetPath && (
                        <div className="rounded-lg overflow-hidden bg-white dark:bg-slate-900 p-2">
                          <img
                            src={`${assetPath}/GIFs/Meteogram.gif`}
                            alt="Surface Observations"
                            className="w-full h-auto rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Key Insights */}
                    <div className="rounded-lg bg-gradient-to-r from-sky-100/50 to-emerald-100/50 dark:from-sky-950/30 dark:to-emerald-950/30 p-4 border border-sky-200 dark:border-sky-900/50">
                      <h5 className="font-bold text-sky-900 dark:text-sky-200 mb-3">
                        Key Meteorological Insights
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                          <p className="text-slate-700 dark:text-slate-200">
                            <strong>Synoptic Evolution:</strong> Upper-level trough forced westward track anomaly steering toward densely populated US East Coast
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                          <p className="text-slate-700 dark:text-slate-200">
                            <strong>Hybrid Structure:</strong> Merger with mid-latitude systems created warm-core/cold-core hybrid, amplifying wind fields
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                          <p className="text-slate-700 dark:text-slate-200">
                            <strong>Mesoscale Dynamics:</strong> Asymmetric convection made intensity forecasting exceptionally challenging
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                          <p className="text-slate-700 dark:text-slate-200">
                            <strong>Impact Scale:</strong> Largest hurricane by diameter on record, generating multi-state impacts
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Methodology */}
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-slate-50 mb-3">
                        Methodology & Data Sources
                      </h5>
                      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc pl-5">
                        <li><strong>NOAA/NWS WPC:</strong> Surface analyses and forecasts</li>
                        <li><strong>NOAA/NCEP EMC:</strong> GFS and NAM model output</li>
                        <li><strong>University of Wyoming:</strong> Radiosonde database</li>
                        <li><strong>NOAA/NHC:</strong> Official hurricane tracking and intensity</li>
                        <li><strong>Tools:</strong> Python, Matplotlib, Cartopy for visualization</li>
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge tone="sky">Synoptic Meteorology</Badge>
                        <Badge tone="emerald">Hurricane Dynamics</Badge>
                        <Badge tone="slate">Data Visualization</Badge>
                      </div>
                    </div>
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
