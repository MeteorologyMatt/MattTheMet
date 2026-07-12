import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  EnvelopeIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowDownTrayIcon,
  LinkIcon,
  ArrowUpIcon,
  MapPinIcon,
  CalendarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import Sandy from './pages/sandy.jsx';
import SandyCode from './pages/SandyCode.jsx';
/* -------------------------------------------------------------------------- */
/* Utilities                                                                   */
/* -------------------------------------------------------------------------- */

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function safeJson(obj) {
  try {
    return JSON.stringify(obj);
  } catch {
    return "";
  }
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* -------------------------------------------------------------------------- */
/* Hooks                                                                       */
/* -------------------------------------------------------------------------- */

function useOnEscape(onEscape, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onEscape?.(e);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onEscape, enabled]);
}

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}

function useFocusTrap(isOpen, containerRef, { initialFocusSelector } = {}) {
  useEffect(() => {
    if (!isOpen) return;
    const container = containerRef?.current;
    if (!container) return;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const getFocusable = () =>
      Array.from(container.querySelectorAll(focusableSelector)).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
      );

    const prevActive = document.activeElement;

    const initial =
      (initialFocusSelector ? container.querySelector(initialFocusSelector) : null) ||
      getFocusable()[0];

    if (initial && typeof initial.focus === "function") initial.focus();

    function onKeyDown(e) {
      if (e.key !== "Tab") return;

      const focusables = getFocusable();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      const isShift = e.shiftKey;
      const active = document.activeElement;

      if (!isShift && active === last) {
        e.preventDefault();
        first.focus();
      } else if (isShift && active === first) {
        e.preventDefault();
        last.focus();
      }
    }

    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      if (prevActive && typeof prevActive.focus === "function") prevActive.focus();
    };
  }, [isOpen, containerRef, initialFocusSelector]);
}

/* -------------------------------------------------------------------------- */
/* Motion presets                                                              */
/* -------------------------------------------------------------------------- */

function useMotionPresets() {
  const reduce = useReducedMotion();

  const page = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: reduce ? 0 : 0.35 },
    }),
    [reduce]
  );

  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: reduce ? 0 : 0.5, ease: "easeOut" },
    }),
    [reduce]
  );

  const stagger = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: reduce ? 0 : 0.07,
          delayChildren: reduce ? 0 : 0.06,
        },
      },
    }),
    [reduce]
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14 },
      show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.35 } },
    }),
    [reduce]
  );

  return { reduce, page, fadeInUp, stagger, item };
}

/* -------------------------------------------------------------------------- */
/* Small components                                                            */
/* -------------------------------------------------------------------------- */

function SkipToContentButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const main = document.getElementById("main");
        if (main) {
          main.scrollIntoView({ behavior: "smooth" });
          // try to focus for keyboard users
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
        }
      }}
      className={cx(
        "sr-only focus:not-sr-only",
        "fixed left-4 top-4 z-[100] rounded-lg",
        "bg-white text-slate-900 shadow ring-1 ring-slate-200",
        "px-4 py-2 font-semibold"
      )}
    >
      Skip to content
    </button>
  );
}

function Container({ className, children }) {
  return <div className={cx("mx-auto w-full max-w-7xl", className)}>{children}</div>;
}

function SectionHeading({ icon: Icon, title, subtitle, align = "left" }) {
  return (
    <div className={cx("mb-8", align === "center" && "text-center")}>
      <div
        className={cx(
          "inline-flex items-center gap-2",
          align === "center" && "justify-center w-full"
        )}
      >
        {Icon ? <Icon className="h-5 w-5 text-sky-600 dark:text-sky-300" /> : null}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p
          className={cx(
            "mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300",
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
    sky: "bg-sky-50 text-sky-800 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:ring-sky-800/60",
    emerald:
      "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800/60",
    slate:
      "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/70",
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

function IconButton({ label, onClick, children, className, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center rounded-lg p-2 cursor-pointer",
        "bg-white/85 text-slate-700 shadow-sm ring-1 ring-slate-200/80 backdrop-blur",
        "hover:bg-sky-50 hover:text-sky-800 hover:ring-sky-200",
        "dark:bg-slate-900/80 dark:text-slate-100 dark:ring-white/10 dark:hover:bg-slate-800",
        "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ onClick, children, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center gap-2",
        "px-5 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-900/15",
        "bg-sky-700 hover:bg-sky-800 dark:bg-sky-500 dark:hover:bg-sky-400",
        "hover:-translate-y-[1px] transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PrimaryLink({ to, children, className, ...props }) {
  return (
    <Link
      to={to}
      className={cx(
        "inline-flex items-center justify-center gap-2",
        "px-5 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-900/15",
        "bg-sky-700 hover:bg-sky-800 dark:bg-sky-500 dark:hover:bg-sky-400",
        "hover:-translate-y-[1px] transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

function OutlineButton({ onClick, children, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center gap-2",
        "px-5 py-3 rounded-lg font-semibold",
        "border border-slate-300 bg-white/80 text-slate-800 shadow-sm",
        "hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 transition",
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-sky-600 dark:hover:bg-sky-950/40",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function OutlineLink({ to, children, className, ...props }) {
  return (
    <Link
      to={to}
      className={cx(
        "inline-flex items-center justify-center gap-2",
        "px-5 py-3 rounded-lg font-semibold",
        "border border-slate-300 bg-white/80 text-slate-800 shadow-sm",
        "hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 transition",
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-sky-600 dark:hover:bg-sky-950/40",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

function ExternalLink({ href, children, className }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex items-center gap-2",
        "text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200",
        "underline underline-offset-4 decoration-sky-300/70 hover:decoration-sky-500 transition",
        className
      )}
    >
      <LinkIcon className="h-4 w-4" />
      {children}
    </a>
  );
}

function InfoCard({ title, children }) {
  return (
    <div
      className={cx(
        "rounded-lg bg-white/90 p-5 shadow-sm shadow-slate-200/60 ring-1 ring-slate-200/80 backdrop-blur",
        "hover:-translate-y-[1px] hover:shadow-lg hover:shadow-slate-200/70 transition",
        "dark:bg-slate-950/80 dark:shadow-none dark:ring-white/10"
      )}
    >
      <h4 className="font-semibold text-sky-800 dark:text-sky-300">{title}</h4>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{children}</div>
    </div>
  );
}

function Callout({ icon: Icon, title, children, tone = "sky" }) {
  const tones = {
    sky: "bg-sky-50/90 ring-sky-100 dark:bg-sky-950/35 dark:ring-sky-800/50",
    emerald: "bg-amber-50/90 ring-amber-100 dark:bg-amber-950/35 dark:ring-amber-800/50",
    slate: "bg-white/85 ring-slate-200/80 dark:bg-slate-950/70 dark:ring-white/10",
  };

  const iconTones = {
    sky: "text-sky-700 dark:text-sky-200",
    emerald: "text-amber-700 dark:text-amber-200",
    slate: "text-slate-700 dark:text-slate-200",
  };

  return (
    <div className={cx("rounded-lg p-5 shadow-sm shadow-slate-200/60 ring-1 backdrop-blur dark:shadow-none", tones[tone] ?? tones.slate)}>
      <div className="flex items-start gap-3">
        {Icon ? <Icon className={cx("h-6 w-6 mt-0.5", iconTones[tone] ?? iconTones.slate)} /> : null}
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{title}</p>
          <div className="mt-1 text-sm text-slate-700 dark:text-slate-300">{children}</div>
        </div>
      </div>
    </div>
  );
}

function WeatherHeroVisual() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 -z-20 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect className="fill-stone-100 dark:fill-slate-950" width="1600" height="900" />
      <path
        className="fill-amber-200/55 dark:fill-amber-500/20"
        d="M916 0h684v900H724c78-119 124-249 138-390C878 344 864 184 916 0Z"
      />
      <path
        className="fill-slate-500/35 dark:fill-slate-700/65"
        d="M0 0h1600v362c-137-68-270-85-399-51-93 25-170 73-256 62-109-13-177-111-289-126-138-18-235 95-370 75C177 306 96 217 0 207Z"
      />
      <path
        className="fill-cyan-700/18 dark:fill-cyan-400/12"
        d="M1600 128v394c-99-33-181-23-248 29-85 66-169 71-252 16-81-54-165-61-251-21-100 47-187 32-261-43-74-76-159-104-255-83-118 26-229 2-333-71V166c104 64 210 91 319 82 106-8 208-50 307-124 107-80 212-102 316-64 84 31 160 88 250 91 120 3 240-64 408-23Z"
      />
      <path
        className="fill-emerald-700/28 dark:fill-emerald-500/16"
        d="M0 656c120-40 234-48 343-24 118 26 224 83 349 77 141-7 251-93 392-105 165-14 321 72 516 52v244H0Z"
      />

      {[
        "M156 0v900",
        "M347 0v900",
        "M538 0v900",
        "M729 0v900",
        "M920 0v900",
        "M1111 0v900",
        "M1302 0v900",
        "M1493 0v900",
        "M0 140h1600",
        "M0 284h1600",
        "M0 428h1600",
        "M0 572h1600",
        "M0 716h1600",
      ].map((path) => (
        <path
          key={path}
          className="fill-none stroke-slate-900/10 dark:stroke-white/10"
          d={path}
          strokeWidth="1"
        />
      ))}

      <path
        className="fill-emerald-700/24 dark:fill-emerald-400/17"
        d="M1168 497c55-48 132-48 189 0 60 52 78 137 41 204-43 77-139 106-218 65-79-40-110-137-71-217 14-27 33-45 59-52Z"
      />
      <path
        className="fill-amber-600/22 dark:fill-amber-300/16"
        d="M1226 537c33-28 78-25 111 7 36 36 41 94 12 136-35 51-108 60-154 19-43-38-48-106-11-148 12-7 26-12 42-14Z"
      />
      <path
        className="fill-emerald-700/18 dark:fill-emerald-400/12"
        d="M1006 348c42-35 101-33 143 7 44 43 48 112 10 160-43 54-124 59-174 10-48-47-48-126 0-173 6-2 13-3 21-4Z"
      />

      {[
        "M694 151c130 63 223 70 278 19 64-59 145-62 242-9 88 48 190 44 306-13",
        "M632 246c131 64 235 68 312 13 77-55 161-48 254 21 91 68 203 72 336 12",
        "M666 346c105 38 190 36 254-6 84-56 169-49 255 22 79 65 191 73 337 24",
      ].map((path) => (
        <path
          key={path}
          className="fill-none stroke-cyan-700/45 dark:stroke-cyan-300/42"
          d={path}
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      ))}

      {[
        "M741 471c77-31 149-25 216 17 68 42 136 36 206-17 65-50 139-58 221-24",
        "M769 569c79-28 153-21 221 21 69 43 137 39 204-11 76-57 160-66 251-27",
      ].map((path) => (
        <path
          key={path}
          className="fill-none stroke-amber-700/38 dark:stroke-amber-300/34"
          d={path}
          strokeLinecap="round"
          strokeWidth="1.9"
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Modal (Experience details)                                                  */
/* -------------------------------------------------------------------------- */

function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
  labelledById = "modal-title",
  describedById = "modal-desc",
}) {
  const panelRef = useRef(null);

  useLockBodyScroll(open);
  useOnEscape(onClose, open);
  useFocusTrap(open, panelRef, { initialFocusSelector: "[data-autofocus]" });

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby={labelledById}
          aria-describedby={describedById}
        >
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={panelRef}
            initial={{ y: 22, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 22, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={cx(
              "relative w-full max-w-2xl",
              "rounded-lg bg-white shadow-2xl shadow-slate-950/20 ring-1 ring-slate-200",
              "dark:bg-slate-950 dark:ring-white/10"
            )}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    id={labelledById}
                    className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50"
                  >
                    {title}
                  </h3>
                  {subtitle ? (
                    <p
                      id={describedById}
                      className="mt-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      {subtitle}
                    </p>
                  ) : null}
                </div>

                <IconButton label="Close" onClick={onClose} data-autofocus>
                  <XMarkIcon className="h-6 w-6 text-slate-800 dark:text-slate-100" />
                </IconButton>
              </div>

              <div className="mt-6">{children}</div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 transition dark:border-slate-700 dark:text-slate-100 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Drawer (Router nav)                                                  */
/* -------------------------------------------------------------------------- */

function MobileDrawer({ open, onClose, navItems }) {
  const panelRef = useRef(null);

  useLockBodyScroll(open);
  useOnEscape(onClose, open);
  useFocusTrap(open, panelRef, { initialFocusSelector: "[data-autofocus]" });

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={panelRef}
            className={cx(
              "absolute right-0 top-0 h-full w-[88%] max-w-sm",
              "bg-white shadow-2xl shadow-slate-950/20 ring-1 ring-slate-200",
              "dark:bg-slate-950 dark:ring-white/10"
            )}
            initial={{ x: 28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 28, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Menu
                </p>
                <IconButton label="Close menu" onClick={onClose} data-autofocus>
                  <XMarkIcon className="h-6 w-6 text-slate-800 dark:text-slate-100" />
                </IconButton>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cx(
                        "flex items-center gap-2 rounded-lg px-3 py-3 font-medium transition",
                        "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                        "dark:text-slate-200 dark:hover:bg-slate-900/60",
                        isActive &&
                          "bg-sky-50 text-sky-800 ring-1 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:ring-sky-800/60"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8 rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-white/10">
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  Tip: Press <span className="font-semibold">Esc</span> to close.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Scroll to top button                                                        */
/* -------------------------------------------------------------------------- */

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cx(
            "fixed bottom-6 right-6 z-40",
            "rounded-full p-3 shadow-lg shadow-slate-950/10 ring-1 ring-slate-200/80",
            "bg-white/85 hover:bg-sky-50 hover:text-sky-800 transition backdrop-blur",
            "dark:bg-slate-950/70 dark:hover:bg-slate-950 dark:ring-white/10"
          )}
        >
          <ArrowUpIcon className="h-5 w-5 text-slate-800 dark:text-slate-100" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Route scroll reset                                                          */
/* -------------------------------------------------------------------------- */

function RouteScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/* -------------------------------------------------------------------------- */
/* Shared data                                                                 */
/* -------------------------------------------------------------------------- */

function useProfile() {
  const BASE = import.meta.env.BASE_URL;

  return useMemo(
    () => ({
      name: "Matthew Lentz",
      initials: "ML",
      title: "Graduate Teaching Assistant of Atmospheric Science",
      location: "Starkville, MS",
      email: "mwl140@msstate.edu",
      linkedin: "https://www.linkedin.com/in/matthew-lentz-30b2922b0",
      resume: `${BASE}Lentz_Matthew_Resume_2026.pdf`,
      portrait: `${BASE}matthew.jpg`,
      heroImage: `${BASE}weather-hero.jpg`,
      locationImage: `${BASE}MSstate%20location.png`,
      topographyImage: `${BASE}topography-bg.jpg`,
    }),
    [BASE]
  );
}

function useNavItems() {
  return useMemo(
    () => [
      { to: "/", label: "Home", icon: AcademicCapIcon },
      { to: "/research", label: "Research", icon: DocumentTextIcon },
      { to: "/experience", label: "Experience", icon: SparklesIcon },
      { to: "/contact", label: "Contact", icon: EnvelopeIcon },
    ],
    []
  );
}

/* -------------------------------------------------------------------------- */
/* Layout                                                                      */
/* -------------------------------------------------------------------------- */

function SiteLayout({ children }) {
  const profile = useProfile();
  const navItems = useNavItems();

  const [mobileOpen, setMobileOpen] = useState(false);

  useOnEscape(() => setMobileOpen(false), mobileOpen);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.dataset.theme = "dark";
    root.style.colorScheme = "dark";
  }, []);

  const isDark = true;

  return (
    <div
      className={cx(
        "relative min-h-screen overflow-hidden transition-colors duration-300",
        "bg-slate-50 text-slate-900",
        "dark:bg-slate-950 dark:text-slate-50"
      )}
    >
      <SkipToContentButton />

      {/* Site-wide topography background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-repeat"
        style={{
          backgroundImage: `url(${profile.topographyImage})`,
          backgroundSize: "min(1800px, 150vw) auto",
          opacity: isDark ? 0.18 : 0.08,
          filter: isDark ? "saturate(0.75)" : "invert(1) contrast(1.05)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at 20% 0%, rgba(14,165,233,0.18), transparent 32%), radial-gradient(circle at 82% 10%, rgba(250,204,21,0.08), transparent 26%), linear-gradient(135deg, rgba(2,6,23,0.98), rgba(15,23,42,0.94))"
            : "radial-gradient(circle at 20% 0%, rgba(14,165,233,0.12), transparent 32%), radial-gradient(circle at 82% 10%, rgba(250,204,21,0.12), transparent 26%), linear-gradient(135deg, rgba(248,250,252,0.96), rgba(255,255,255,0.92))",
        }}
      />

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />

      {/* Top bar / nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200/75 bg-white/86 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/82">
        <Container className="px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-4 group">
              <div
                className={cx(
                  "w-12 h-12 rounded-full",
                  "bg-gradient-to-br from-sky-700 via-cyan-600 to-amber-400",
                  "flex items-center justify-center text-white font-extrabold",
                  "shadow-sm shadow-sky-900/20 ring-1 ring-white/30",
                  "group-hover:scale-105 transition"
                )}
              >
                {profile.initials}
              </div>

              <div className="flex flex-col items-center text-center leading-tight">
                <p className="text-base font-bold text-slate-950 dark:text-white">
                  {profile.name}
                </p>
                <p className="text-xs text-slate-600 italic dark:text-slate-300">
                  {profile.title}
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
                      "text-slate-700 hover:bg-white/70 hover:text-slate-950",
                      "dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white",
                      isActive &&
                        "bg-sky-50 text-sky-800 ring-1 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:ring-sky-800/60"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <IconButton
                  label="Facebook"
                  onClick={() => window.open('https://www.facebook.com/matthew.lentz.92798', '_blank')}
                >
                  <img src={`${import.meta.env.BASE_URL}Facebook_Logo_2023.png`} alt="Facebook" className="h-5 w-5" />
                </IconButton>
                <IconButton
                  label="Instagram"
                  onClick={() => window.open('https://www.instagram.com/matt_the_met?igsh=MWZmYmRtMTF5cmJ0bw==', '_blank')}
                >
                  <img src={`${import.meta.env.BASE_URL}Instagram_logo_2022.svg.png`} alt="Instagram" className="h-5 w-5" />
                </IconButton>
                <IconButton
                  label="LinkedIn"
                  onClick={() => window.open('https://www.linkedin.com/in/matthew-lentz-30b2922b0', '_blank')}
                >
                  <img src={`${import.meta.env.BASE_URL}LinkedIn_logo_initials.png`} alt="LinkedIn" className="h-5 w-5" />
                </IconButton>
              </div>

              <div className="md:hidden">
                <IconButton label="Open menu" onClick={() => setMobileOpen(true)}>
                  <Bars3Icon className="h-6 w-6 text-slate-800 dark:text-slate-100" />
                </IconButton>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main id="main" className="relative z-10 outline-none">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/75 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <Container className="px-6 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <NavLink to="/" className="text-sm font-semibold text-slate-700 hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300">
                Home
              </NavLink>
              <NavLink to="/research" className="text-sm font-semibold text-slate-700 hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300">
                Research
              </NavLink>
              <NavLink to="/experience" className="text-sm font-semibold text-slate-700 hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300">
                Experience
              </NavLink>
              <NavLink to="/contact" className="text-sm font-semibold text-slate-700 hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300">
                Contact
              </NavLink>
            </div>
          </div>
        </Container>
      </footer>

      <ScrollToTopButton />
    </div>
  );
}
/* -------------------------------------------------------------------------- */
/* Pages                                                                       */
/* -------------------------------------------------------------------------- */

function HomePage() {
  const profile = useProfile();
  const { page, fadeInUp } = useMotionPresets();

  // JSON-LD (SEO)
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      email: `mailto:${profile.email}`,
      url: profile.linkedin,
      sameAs: [profile.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Starkville",
        addressRegion: "MS",
        addressCountry: "US",
      },
    }),
    [profile]
  );

  return (
    <motion.div {...page}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(jsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-stone-50 py-16 md:py-24 dark:border-white/10 dark:bg-slate-950">
        <WeatherHeroVisual />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-50 via-stone-50/90 to-stone-50/20 dark:from-slate-950 dark:via-slate-950/86 dark:to-slate-950/20" />
        <Container className="relative px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:col-span-2"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="sky">Meteorology</Badge>
              <Badge tone="emerald">Wildfire Climatology</Badge>
              <Badge tone="slate">Weather Communication</Badge>
            </div>

            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-none text-slate-950 sm:text-6xl dark:text-white">
              <span>
                Hello, I'm {profile.name}.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-100/90">
              I'm a first-year master's student studying meteorology at Mississippi State University, focusing on synoptic meteorology, weather communication, and AI/ML modeling techniques. I love using research to help people prepare for
              severe weather and the ever-evolving state of the atmosphere.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={profile.resume}
                download
                className={cx(
                  "inline-flex items-center justify-center gap-2",
                  "px-5 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-950/15",
                  "bg-sky-800 hover:bg-sky-900 dark:bg-sky-300 dark:text-slate-950 dark:hover:bg-sky-200",
                  "hover:-translate-y-[1px] transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                )}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Download Resume
              </a>

              <OutlineLink
                to="/research"
                className="border-slate-300 bg-white/75 text-slate-900 shadow-sm hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 dark:border-white/45 dark:bg-white/10 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-950"
              >
                <DocumentTextIcon className="h-5 w-5" />
                View Research
              </OutlineLink>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-100/85">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                {profile.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-100/60" />
              <a
                href={`mailto:${profile.email}`}
                className="underline underline-offset-4 decoration-sky-500/60 hover:decoration-sky-700 dark:decoration-sky-200/70 dark:hover:decoration-white"
              >
                {profile.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            <div
              className={cx(
                "relative w-56 h-56 sm:w-64 sm:h-64",
                "overflow-hidden rounded-lg p-2",
                "bg-white/70 shadow-2xl shadow-slate-950/15 ring-1 ring-slate-900/10 backdrop-blur",
                "dark:bg-white/12 dark:shadow-slate-950/30 dark:ring-white/25"
              )}
            >
              <img
                alt={`Portrait of ${profile.name}`}
                src={profile.portrait}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </motion.div>
          </div>
        </Container>
      </section>

      {/* ABOUT (home-only section, no hash links) */}
      <Container className="px-6 pt-10 lg:px-12 md:pt-14">
        <motion.div {...fadeInUp}>
          <section
            id="home-about"
            className={cx(
              "mb-14 rounded-lg p-8 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80",
              "bg-white/88 backdrop-blur",
              "dark:bg-slate-950/72 dark:shadow-none dark:ring-white/10"
            )}
          >
            <SectionHeading
              icon={AcademicCapIcon}
              title="About Me"
              align="center"
            />

            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              <span className="font-semibold">4.0 GPA</span> | Shackouls Honors College | Mississippi State University
              <br />
              Pursuing graduate research in synoptic meteorology and atmospheric dynamics, specifically investigating the mechanisms of jet stream superposition and its role in explosive cyclogenesis. I aim to integrate these technical insights into the Weather, Climate, and Society framework to refine risk communication strategies and improve institutional decision-making for communities during high-impact weather events.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <InfoCard title="Education">
              <div className="mb-4">-   B.S. in Geosciences (Professional Meteorology)</div>
              <div className="mb-4">-   Minors: Math & Sociology</div>
              <div>-   Mississippi State University (August 2022 - May 2026)</div>
            </InfoCard>
              <InfoCard title="Skills">
              <div className="mb-4">  -   Python</div>
              <div className="mb-4">  -   ArcGIS Pro</div>
              <div className="mb-4">  -   SPSS (statistical analysis software)</div>
              <div className="mb-4">  -   Data analysis</div>
              <div className="mb-4">  -   Predictive modeling</div>
              <div className="mb-4">  -   Research communication</div>
              <div>  -   Visualization</div>
              </InfoCard>
              <InfoCard title="Certifications">
                <div className="mb-4">  -   CITI Program Certified (Social & Behavioral Research)</div>
              <div>  -   NWS Skywarn Trained Storm Spotter</div>
              </InfoCard>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Callout title={<span className="block w-full text-center">Core Competencies</span>} tone="slate">
               I work with large meteorological datasets using R and Python and study large-scale atmospheric dynamics, especially jet stream interactions and their impacts on winter weather. I also create visualizations and GIS products that help communicate complex weather information to diverse audiences.
              </Callout>

              <Callout title={<span className="block w-full text-center">Research Focus</span>} tone="slate">
                My research portfolio centers on the intersection of synoptic-scale dynamics and societal impacts, investigating how extreme weather triggers influence public risk perception. I am dedicated to integrating the principles of weather, climate, and society into the study of high-impact events, with a specific focus on optimizing protective action and communication strategies for all people and communities.
              </Callout>

              <Callout title={<span className="block w-full text-center">Professional Interests</span>} tone="slate">
                I am pursuing graduate-level research and professional collaborations focused on integrating synoptic meteorology, climate risk, and sociology. My objective is to develop equitable decision-support frameworks and science communication tools that translate rigorous meteorological modeling into improved public safety outcomes, ensuring advanced dynamical forecasts serve all effectively.
              </Callout>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <OutlineLink to="/experience">See Experience</OutlineLink>
              <PrimaryLink to="/contact">Contact</PrimaryLink>
            </div>
          </section>
        </motion.div>
      </Container>
    </motion.div>
  );
}

function ResearchPage() {
  const { page, fadeInUp } = useMotionPresets();

  return (
    <motion.div {...page}>
      <Container className="px-6 lg:px-12 py-12">
        <motion.div {...fadeInUp}>
          <SectionHeading
            icon={DocumentTextIcon}
            title="Research"
            subtitle="Honors thesis focus and current research direction."
          />

          {/* Grid Layout: 2 Columns (50/50 split) for Research Cards Only */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* --- LEFT COLUMN: Honors Thesis --- */}
            <div className="h-full flex flex-col rounded-lg bg-white/90 p-7 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-950/78 dark:shadow-none dark:ring-white/10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Honors Thesis: Severe Weather Risk Perception
              </h3>

              <p className="mt-4 text-slate-700 dark:text-slate-200 leading-relaxed">
                I'm investigating how international students at Mississippi State University perceive severe weather and
                its risks. I'm focusing on how prior weather experience, language and cultural context, and warning
                comprehension shape decision-making, plus which channels (sirens, WEA, social media) students trust.
              </p>

              <p className="mt-4 text-slate-700 dark:text-slate-200 leading-relaxed">
                The goal is to surface actionable recommendations for MSU alerts, outreach, and culturally responsive
                risk communication that reduces confusion and improves action.
              </p>

              {/* Research Outputs: Thesis */}
              <div className="mt-6 border-l-4 border-sky-500 pl-4 py-3 bg-sky-50/70 dark:bg-sky-950/20 rounded-r-lg">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Read the Research
                </h4>
                <div className="flex flex-col gap-2.5">
                  <a 
                    href="https://scholarsjunction.msstate.edu/honorstheses/212/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200 transition"
                  >
                    <DocumentTextIcon className="h-4 w-4" />
                    Official Publication: Severe Weather Risk Perception
                  </a>
                  <a 
                    href={`${import.meta.env.BASE_URL}Lentz_Research_Poster.pdf`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200 transition"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    View Research Poster
                  </a>
              </div>
            </div>

              {/* Badges - Pushed to bottom */}
              <div className="mt-auto pt-6 flex flex-wrap gap-2">
                <Badge tone="sky">Risk Communication</Badge>
                <Badge tone="emerald">Weather & Society</Badge>
                <Badge tone="slate">Survey Research</Badge>
              </div>
            </div>

            {/* --- RIGHT COLUMN: SEMBRAR --- */}
            <div className="h-full flex flex-col rounded-lg bg-white/90 p-7 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-950/78 dark:shadow-none dark:ring-white/10">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                Current Role: SEMBRAR Mississippi & Florida
              </h3>
              
              <p className="mt-4 text-slate-700 dark:text-slate-200 leading-relaxed">
                I am a student researcher for the SEMBRAR project, a multidisciplinary initiative fostering 
                environmental literacy among multilingual learners. I analyze how synoptic-scale processes 
                translate into localized environmental risks.
              </p>
              
              <p className="mt-4 text-slate-700 dark:text-slate-200 leading-relaxed">
                By applying weather, climate, and society principles, I develop ways to communicate 
                these complex weather and environmental phenomena to diverse communities, integrating place-based education.
              </p>

              {/* Presentation Highlight: SEMBRAR */}
<div className="mt-6 border-l-4 border-amber-500 pl-4 py-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-r-lg">
  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
    Research Presentation
  </h4>

  

  <a
    href={`${import.meta.env.BASE_URL}Poster%20SEMBRAR.png`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200 transition"
  >
    <ArrowDownTrayIcon className="h-4 w-4" />
    View SEMBRAR Research Poster
  </a>
</div>
              
              {/* Badges */}
              <div className="mt-auto pt-6 flex flex-wrap gap-2">
                 <Badge tone="emerald">Bilingual Education</Badge>
                 <Badge tone="sky">Synoptic Meteorology</Badge>
                 <Badge tone="slate">Social Research</Badge>
              </div>
            </div>

          </div>

          {/* --- NEW: Class Projects Subsection --- */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Class Projects
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Project 1: Sandy Dashboard */}
              <div className="flex flex-col rounded-lg bg-white/90 p-7 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-950/78 dark:shadow-none dark:ring-white/10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge tone="sky">Synoptic Dynamics</Badge>
                  <Badge tone="slate">Mesoscale Overview</Badge>
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Hurricane Sandy Weather Event Analysis
                </h4>
                
                <p className="mt-3 mb-6 text-slate-600 dark:text-slate-300 leading-relaxed text-sm flex-grow">
                  A comprehensive meteorological investigation mapping Sandy's pressure fields, geopotential heights, 
                  and rapid structural transition using Matplotlib and Cartopy visualizations alongside vertical sounding profiles.
                </p>
                
                <div className="mt-auto">
                  <Link
                    to="/sandy"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-900/15 bg-sky-700 hover:bg-sky-800 hover:-translate-y-[1px] transition text-sm dark:bg-sky-500 dark:hover:bg-sky-400"
                  >
                    View Event Dashboard
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Project 2: Python Code Repository */}
              <div className="flex flex-col rounded-lg bg-white/90 p-7 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-950/78 dark:shadow-none dark:ring-white/10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge tone="emerald">Python</Badge>
                  <Badge tone="slate">Data Visualization</Badge>
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Computer Programming for Meteorologists
                </h4>
                
                <p className="mt-3 mb-6 text-slate-600 dark:text-slate-300 leading-relaxed text-sm flex-grow">
                  Production Python source scripts generating the Sandy radar imagery, soundings, MSLP maps, and 500mb geopotential height charts using MetPy, Cartopy, and PyGrib.
                </p>
                
                <div className="mt-auto">
                  <Link
                    to="/sandy-code"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-white shadow-lg shadow-slate-900/15 bg-slate-800 hover:bg-slate-900 hover:-translate-y-[1px] transition text-sm dark:bg-slate-700 dark:hover:bg-slate-600"
                  >
                    View Source Code
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* --- Centered Contact Section Below Grid --- */}
          <div className="mt-24 pb-12 flex flex-col items-center justify-center space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Questions? Feel free to reach out!
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 text-center max-w-lg">
              I am always interested in connecting with peers and professionals working in synoptic meteorology, risk communication, or societal resilience.
            </p>

            <PrimaryLink to="/contact" className="px-8 py-3">
              Contact Me
              <EnvelopeIcon className="h-5 w-5 ml-2" />
            </PrimaryLink>
          </div>

        </motion.div>
      </Container>
    </motion.div>
  );
}

function ProjectCard({ proj, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(proj.id)}
      className={cx(
        "group text-left w-full",
        "rounded-lg bg-white/90 p-6 shadow-sm shadow-slate-200/60 ring-1 ring-slate-200/80 backdrop-blur",
        "hover:-translate-y-[1px] hover:shadow-lg hover:shadow-slate-200/70 transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        "dark:bg-slate-950/78 dark:shadow-none dark:ring-white/10"
      )}
      aria-haspopup="dialog"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-sky-800 group-hover:text-sky-900 dark:text-sky-300 dark:group-hover:text-sky-200">
            {proj.title}
          </h4>
          <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CalendarIcon className="h-4 w-4" />
            {proj.subtitle}
          </p>
        </div>
        <span className="mt-1 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-200 dark:ring-white/10">
          Details
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{proj.short}</p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
        Read more
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );
}

function ExperiencePage() {
  const { page, fadeInUp, stagger, item } = useMotionPresets();
  const [openProjectId, setOpenProjectId] = useState(null);

  const projects = useMemo(
    () => [
      {
        id: "usda",
        title: "USDA Agricultural Research Service: Climate & Ag",
        subtitle: "Undergraduate Researcher - Fall 2024 - Spring 2025 - Starkville, MS",
        short:
          "Modeled extreme rainfall & temperature trends (RCP 4.5 & 8.5) to assess climate impacts on agriculture.",
        details: [
          "Built Python workflows to analyze historical and projected climate (RCP 4.5/8.5) and quantify extreme rain/temperature changes relevant to crop management.",
          "Derived metrics (e.g., annual maxima, heatwave days) and visualized shifts to support sustainable agricultural practices.",
          "Collaborated with Dr. Feng; communicated findings for non-technical stakeholders.",
        ],
        tags: ["Python", "Climate Projections", "Extremes", "RCP 4.5/8.5"],
      },
      {
        id: "uca",
        title: "University of Central Arkansas: Wildfire Climatology",
        subtitle: "Undergraduate Research Assistant - Summer 2025 - Remote",
        short:
          "Spatial analysis of wildfire causes & patterns in the Ozark and Ouachita Mountains using ArcGIS Pro & Python.",
        details: [
          "Compiled wildfire occurrence data and environmental covariates to explore spatiotemporal patterns.",
          "Evaluated fire causes, climate drivers, and hot spots; produced cartographic products in ArcGIS Pro.",
          "Worked with Dr. Flatley on interpretable visuals and summaries for broader audiences.",
        ],
        tags: ["ArcGIS Pro", "Spatial Analysis", "Python", "Wildfire"],
      },
      {
        id: "nws",
        title: "National Weather Service at Little Rock, AR",
        subtitle: "Intern - Summer 2024",
        short: "Hands-on forecast operations, balloon launches, storm surveys, and public communication.",
        details: [
          "Assisted forecasters in AWIPS; practiced real-time decision support and messaging.",
          "Performed Grawmet radiosonde preparations and weather balloon launches.",
          "Participated in storm surveys; answered public/partner calls; delivered NOAA Weather Radio segments.",
        ],
        tags: ["AWIPS", "Operations", "Radiosonde", "Communication"],
      },
    ],
    []
  );

  const activeProject = useMemo(
    () => projects.find((p) => p.id === openProjectId) || null,
    [projects, openProjectId]
  );

  useOnEscape(() => setOpenProjectId(null), openProjectId !== null);

  return (
    <motion.div {...page}>
      <Container className="px-6 lg:px-12 py-12">
        <motion.div {...fadeInUp}>
          <SectionHeading
            icon={SparklesIcon}
            title="Past Research and Experiences"
            subtitle="Selected experiences across research, operations, and communication."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <ProjectCard key={proj.id} proj={proj} onOpen={setOpenProjectId} />
              ))}
            </motion.div>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Section 1: How I work */}
  <Callout title={<span className="block w-full text-center">Methodological Approach</span>} tone="slate">
    I structure my work around reproducible research frameworks and rigorous documentation to ensure data integrity. My output strategy is communication-centric, transforming technical analysis into high-impact dashboards, cartographic products, and stakeholder-ready briefs that prioritize clarity and utility.
  </Callout>

  {/* Section 2: Tools I use */}
  <Callout title={<span className="block w-full text-center">Technical Proficiency</span>} tone="slate">
    I leverage a comprehensive technical stack anchored in Python for automated analysis and ArcGIS Pro for advanced spatial workflows. Additionally, I utilize modern web development technologies to craft interactive outreach platforms, ensuring scientific findings are accessible and engaging.
  </Callout>

  {/* Section 3: What I want next */}
  <Callout title={<span className="block w-full text-center">Career Objectives</span>} tone="slate">
    I am seeking professional opportunities at the nexus of climate resilience, wildfire dynamics, and geospatial science. My goal is to apply integrated GIS workflows and strategic science communication to enhance community readiness and optimize response protocols for critical environmental challenges.
  </Callout>
</div>
        </motion.div>
      </Container>

      <Modal
        open={!!activeProject}
        title={activeProject?.title}
        subtitle={activeProject?.subtitle}
        onClose={() => setOpenProjectId(null)}
      >
        {activeProject ? (
          <div>
            <div className="flex flex-wrap gap-2">
              {activeProject.tags?.map((t) => (
                <Badge key={t} tone="sky">
                  {t}
                </Badge>
              ))}
            </div>

            <ul className="mt-5 space-y-3 text-slate-700 dark:text-slate-200">
              {activeProject.details.map((d, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
    </motion.div>
  );
}

function SurveyPage() {
  const { page, fadeInUp } = useMotionPresets();

  return (
    <motion.div {...page}>
      <Container className="px-6 lg:px-12 py-12">
        <motion.div {...fadeInUp}>
          <section
            className={cx(
              "rounded-lg p-8 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80",
              "bg-white/88 backdrop-blur",
              "dark:bg-slate-950/72 dark:shadow-none dark:ring-white/10"
            )}
          >
            <SectionHeading
              icon={DocumentTextIcon}
              title="International Student Survey"
              subtitle="Data collection for this phase is now complete."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                {/* Status Banner */}
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-800 dark:bg-amber-950/24">
                  <p className="flex items-center gap-2 text-lg font-semibold text-amber-800 dark:text-amber-200">
                    <span>Success:</span>
                    Thanks to the over 200 international student respondents!
                  </p>
                  <p className="mt-1 text-amber-700 dark:text-amber-300">
                    The survey is currently complete. Raffle winners will be announced in{" "}
                    <span className="font-bold">January</span>.
                  </p>
                </div>

                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                  I gathered anonymous responses from international students at Mississippi State University to better understand how severe weather is
                  perceived and what information helps most. Your input is vital to this study. Thank you for helping
                  move this research forward.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {/* Disabled Button Indicator */}
                  <button
                    disabled
                    className={cx(
                      "inline-flex cursor-not-allowed items-center justify-center gap-2",
                      "rounded-lg bg-slate-200 px-5 py-3 font-semibold text-slate-500 shadow-sm",
                      "dark:bg-slate-800 dark:text-slate-400"
                    )}
                  >
                    Survey Closed
                    <DocumentTextIcon className="h-5 w-5 opacity-50" />
                  </button>

                  <OutlineLink to="/contact">
                    Questions?
                    <EnvelopeIcon className="h-5 w-5" />
                  </OutlineLink>
                </div>

                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                  Note: All responses collected remain anonymous.
                </p>
              </div>

              {/* Sidebar */}
              <div className="rounded-lg bg-slate-50/90 p-6 shadow-sm shadow-slate-200/60 ring-1 ring-slate-200/80 dark:bg-slate-900/50 dark:shadow-none dark:ring-white/10">
                <h4 className="font-semibold text-slate-900 dark:text-slate-50">What the survey helps with</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    Identify trusted warning channels
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    Reduce confusion during severe weather
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    Improve culturally responsive communication
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </motion.div>
      </Container>
    </motion.div>
  );
}

function ContactPage() {
  const profile = useProfile();
  const { page, fadeInUp } = useMotionPresets();

  return (
    <motion.div {...page}>
      <Container className="px-6 lg:px-12 py-12">
        <motion.div {...fadeInUp}>
          <section
            className={cx(
              "rounded-lg p-8 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80",
              "bg-white/88 backdrop-blur",
              "dark:bg-slate-950/72 dark:shadow-none dark:ring-white/10"
            )}
          >
            {/* The Grid now starts at the very top of the section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              
              {/* LEFT COLUMN: Heading + Body */}
              <div className="lg:col-span-2 space-y-6">
                <SectionHeading
                  icon={EnvelopeIcon}
                  title="Contact"
                  subtitle="Open to collaborations, internships, and graduate school discussions."
                />

                <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                  Whether you're interested in collaborating on research, discussing internship openings, 
                  or simply want to chat about a shared love for the weather, I'd love to hear from you. 
                  Email is the best way to reach me, and I'm also active on LinkedIn.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold border border-slate-300 bg-white/80 text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
                  >
                    {profile.email}
                    <EnvelopeIcon className="h-5 w-5" />
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold border border-slate-300 bg-white/80 text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
                  >
                    LinkedIn
                    <LinkIcon className="h-5 w-5" />
                  </a>

                  <a
                    href={profile.resume}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-900/15 bg-sky-700 transition hover:-translate-y-[1px] hover:bg-sky-800 dark:bg-sky-500 dark:hover:bg-sky-400"
                  >
                    View Resume
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: Sidebar (Now Aligned to Top) */}
              <div className="rounded-lg bg-sky-50/90 p-6 ring-1 ring-sky-100 dark:bg-sky-950/35 dark:ring-sky-800/50 shadow-sm">
                <h4 className="font-bold text-sky-900 dark:text-sky-200 uppercase tracking-wide text-xs">
                  Quick details
                </h4>
                
                <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-sky-700 dark:text-sky-400" />
                    Starkville, MS
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-sky-700 dark:text-sky-400" />
                    Graduation: May 2026
                  </div>
                  
                  <div className="pt-4 border-t border-sky-200 dark:border-sky-800">
                    <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold uppercase text-[10px] tracking-widest mb-3">
                      <SparklesIcon className="h-4 w-4" />
                      Interests
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Synoptic meteorology",
                        "Wildfire climatology",
                        "Weather and society principles",
                        "Probabilistic modeling",
                        "Statistical methods"
                      ].map((interest) => (
                        <span 
                          key={interest}
                          className="px-2.5 py-1 rounded-md text-[13px] font-medium bg-white/80 text-sky-900 ring-1 ring-sky-200 dark:bg-sky-900/40 dark:text-sky-100 dark:ring-sky-700/50"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* End Sidebar */}

            </div>
          </section>

          <figure
  className={cx(
    "mt-8 mx-auto max-w-sm overflow-hidden rounded-lg shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80",
    "bg-white/88 backdrop-blur",
    "dark:bg-slate-950/72 dark:shadow-none dark:ring-white/10"
  )}
>
  <img
    src={profile.locationImage}
    alt="Mississippi State University location map"
    className="h-auto w-full object-cover"
    loading="lazy"
  />
</figure>
        </motion.div>
      </Container>
    </motion.div>
  );
}

function NotFoundPage() {
  const { page } = useMotionPresets();
  return (
    <motion.div {...page}>
      <Container className="px-6 lg:px-12 py-16">
        <div className="rounded-lg bg-white/90 p-8 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-950/78 dark:shadow-none dark:ring-white/10">
          <h1 className="text-3xl font-extrabold">Page not found</h1>
          <p className="mt-3 text-slate-700 dark:text-slate-200">
            That route doesn't exist. Use the menu to navigate.
          </p>
          <div className="mt-6">
            <PrimaryLink to="/">Go Home</PrimaryLink>
          </div>
        </div>
      </Container>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Export: the multipage router                                                 */
/* -------------------------------------------------------------------------- */

export default function PersonalWebsite() {
  return (
    <SiteLayout>
      <RouteScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Added these inside the layout wrapper! */}
        <Route path="/sandy" element={<Sandy />} />
        <Route path="/sandy-code" element={<SandyCode />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
