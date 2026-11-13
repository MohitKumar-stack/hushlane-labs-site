import { createOgImage, ogAlt, ogContentType, ogSize } from "@/lib/og"

export const dynamic = "force-static"

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return createOgImage()
}
