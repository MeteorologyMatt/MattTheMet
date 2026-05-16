import React from "react";
import { motion } from "framer-motion";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

// Import shared components and hooks
// These are defined in PersonalWebsite.jsx but we'll recreate the minimal context here
// In a real app, you'd want to extract these to a shared utils file

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function useMotionPresets() {
  const reduce = false; // Simplified for this component

  return {
    page: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.35 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
}

function Container({ className, children }) {
  return <div className={cx("mx-auto w-full max-w-6xl", className)}>{children}</div>;
}

function SectionHeading({ icon: Icon, title, subtitle, align = "left" }) {
  return (
    <div className={cx("mb-6", align === "center" && "text-center")}>
      <div
        className={cx(
          "inline-flex items-center gap-2",
          align === "center" && "justify-center w-full"
        )}
      >
        {Icon ? <Icon className="h-5 w-5 text-sky-600" /> : null}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p
          className={cx(
            "mt-2 text-slate-600 dark:text-slate-300",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
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

export function HurricaneSandyPage() {
  const { page, fadeInUp } = useMotionPresets();
  const BASE = import.meta.env.BASE_URL;
  const assetPath = `${BASE}sandy-assets`;

  return (
    <motion.div {...page}>
      <Container className="px-6 lg:px-12 py-12">
        <motion.div {...fadeInUp}>
          <SectionHeading
            icon={DocumentTextIcon}
            title="Hurricane Sandy Weather Event Analysis"
            subtitle="A Synoptic & Mesoscale Overview using Matplotlib and Cartopy | Group 3: Noelle Davis, Matthew Lentz, Gabe Slade"
          />

          <div className="mt-10 flex flex-col gap-10">
            {/* Event Overview */}
            <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
              <h3 className="mb-4 text-xl font-bold text-sky-700 dark:text-sky-300 border-b border-black/5 dark:border-white/10 pb-4">
                The Event: Hurricane Sandy (Oct 22 - Nov 1, 2012)
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-200">
                This dashboard provides a comprehensive meteorological analysis of the devastating Hurricane Sandy, chronicling its formation, unprecedented path, and complex transition into a powerful extratropical storm before US landfall.
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-200 list-disc pl-5">
                <li><strong>October 22, 2012:</strong> Sandy forms as a tropical depression in the central Caribbean Sea.</li>
                <li><strong>October 24-25:</strong> Rapidly intensifies, becoming a Category 3 hurricane as it traverses Jamaica, eastern Cuba, and the Bahamas.</li>
                <li><strong>October 26-28:</strong> Sandy travels north-northeast, paralleling the US East Coast. Interacts with an upper-level trough, fueling its unique structure.</li>
                <li><strong>October 28-29:</strong> Instead of continuing out to sea, the storm takes an anomalous, sharp westward turn toward the Mid-Atlantic.</li>
                <li><strong>Landfall (Oct 29):</strong> Makes landfall near Atlantic City, NJ, in the evening as a post-tropical cyclone, having transitioned into a vast midlatitude low pressure system.</li>
              </ul>
            </section>

            {/* MSLP Analysis */}
            <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
              <h3 className="mb-4 text-xl font-bold text-sky-700 dark:text-sky-300 border-b border-black/5 dark:border-white/10 pb-4">
                Mean Sea Level Pressure (MSLP) Evolution
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-200">
                The MSLP analysis reveals Sandy's intensification phase and the dramatic pressure drop as it approached the US East Coast.
              </p>
              {assetPath && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${assetPath}/GIFs/MSLP_Sandy.gif`}
                    alt="MSLP Evolution"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </section>

            {/* 500 hPa Heights */}
            <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
              <h3 className="mb-4 text-xl font-bold text-sky-700 dark:text-sky-300 border-b border-black/5 dark:border-white/10 pb-4">
                500 hPa Heights & Upper-Level Dynamics
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-200">
                Upper-level trough interaction with Sandy's warm core structure drove the anomalous westward turn and intensification.
              </p>
              {assetPath && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${assetPath}/GIFs/500hPa_Heights.gif`}
                    alt="500 hPa Heights"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </section>

            {/* Radar Reflectivity */}
            <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
              <h3 className="mb-4 text-xl font-bold text-sky-700 dark:text-sky-300 border-b border-black/5 dark:border-white/10 pb-4">
                Radar Reflectivity & Storm Structure
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-200">
                Radar imagery captures Sandy's transitional structure during its interaction with mid-latitude systems.
              </p>
              {assetPath && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${assetPath}/GIFs/Radar_Reflectivity.gif`}
                    alt="Radar Reflectivity"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </section>

            {/* Soundings */}
            <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
              <h3 className="mb-4 text-xl font-bold text-sky-700 dark:text-sky-300 border-b border-black/5 dark:border-white/10 pb-4">
                Atmospheric Soundings
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-200">
                Radiosonde profiles show the thermodynamic environment that supported Sandy's development and transition.
              </p>
              {assetPath && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${assetPath}/GIFs/Soundings.gif`}
                    alt="Atmospheric Soundings"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </section>

            {/* Meteogram */}
            <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
              <h3 className="mb-4 text-xl font-bold text-sky-700 dark:text-sky-300 border-b border-black/5 dark:border-white/10 pb-4">
                Time Series: Surface Observations
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-200">
                Meteogram data tracks Sandy's approach and impact at land-based observation stations.
              </p>
              {assetPath && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${assetPath}/GIFs/Meteogram.gif`}
                    alt="Surface Observations Meteogram"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </section>

            {/* Key Insights */}
            <section className="rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 p-8 shadow-sm ring-1 ring-sky-200 dark:bg-slate-950/50 dark:ring-slate-800">
              <h3 className="mb-4 text-xl font-bold text-sky-900 dark:text-sky-200">
                Key Meteorological Insights
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                  <p className="text-slate-700 dark:text-slate-200">
                    <strong>Synoptic Evolution:</strong> Sandy's interaction with an upper-level trough forced a westward track anomaly, steering the storm toward the densely populated US East Coast.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <p className="text-slate-700 dark:text-slate-200">
                    <strong>Hybrid Structure:</strong> The merger with mid-latitude systems created a hybrid warm-core/cold-core structure, amplifying wind fields and precipitation potential.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                  <p className="text-slate-700 dark:text-slate-200">
                    <strong>Mesoscale Dynamics:</strong> Asymmetric convection and inner-core vortex interactions during transition made intensity forecasting exceptionally challenging.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <p className="text-slate-700 dark:text-slate-200">
                    <strong>Impact Scale:</strong> The largest hurricane by diameter on record, generating widespread multi-state impacts from wind, surge, and precipitation.
                  </p>
                </div>
              </div>
            </section>

            {/* References & Methods */}
            <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-50">
                Methodology & Data Sources
              </h3>
              <p className="mb-4 text-slate-700 dark:text-slate-200">
                This analysis integrates data from:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-200 list-disc pl-5">
                <li><strong>NOAA/NWS Weather Prediction Center (WPC):</strong> Surface analyses and forecasts</li>
                <li><strong>NOAA/NCEP Environmental Modeling Center:</strong> GFS and NAM model output</li>
                <li><strong>University of Wyoming Department of Atmospheric Science:</strong> Radiosonde database</li>
                <li><strong>NOAA/NHC:</strong> Official hurricane tracking and intensity estimates</li>
                <li><strong>Python Libraries:</strong> Matplotlib for visualization; Cartopy for geospatial mapping</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge tone="sky">Synoptic Meteorology</Badge>
                <Badge tone="emerald">Hurricane Dynamics</Badge>
                <Badge tone="slate">Data Visualization</Badge>
              </div>
            </section>
          </div>
        </motion.div>
      </Container>
    </motion.div>
  );
}
