import posthog from "posthog-js"

export type MarketingConversionAction =
  | "form_submit"
  | "booking_click"
  | "booking_clicked"
  | "popup_closed"
  | "popup_submitted"

export function logMarketingConversion(action: MarketingConversionAction) {
  posthog.logger.info("marketing conversion action", { action })
}
