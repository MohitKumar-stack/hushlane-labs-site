import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export const dynamic = "force-static"

const aiBots = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "YouBot",
  "Diffbot",
  "DuckAssistBot",
  "AI2Bot",
  "MistralAI-User",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiBots, allow: "/" },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  }
}
