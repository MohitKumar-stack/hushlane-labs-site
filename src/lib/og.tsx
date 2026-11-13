import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"
export const ogAlt = "Hushlane Labs. Your brand. Our build."

export function createOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          color: "#fafafa",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#a1a1aa" }}>
          HUSHLANE LABS
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Your brand. Our build.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#a1a1aa" }}>
            White-label tech, product, and AI automation for agencies
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#d4d4d8" }}>hushlanelabs.com</div>
      </div>
    ),
    { ...ogSize }
  )
}
