/** Timings and cooldown for the lead popup. Change these in one place. */
export const popupConfig = {
  /** Do not show the popup until this many milliseconds after load. */
  minDelayMs: 10_000,
  /** Show after this many milliseconds on the site, if nothing else fired first. */
  idleMs: 25_000,
  /** Show when vertical scroll passes this share of page height (0–1). */
  scrollDepth: 0.5,
  /** After dismiss, hide for this many days. */
  dismissDays: 7,
  /** localStorage / sessionStorage keys. */
  storage: {
    dismissedUntil: "hushlane-popup-dismissed-until",
    submitted: "hushlane-popup-submitted",
    sessionShown: "hushlane-popup-session",
  },
} as const
