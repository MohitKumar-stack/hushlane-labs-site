import { getPosts } from "@/lib/content"
import { site } from "@/lib/site"

export const dynamic = "force-static"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export function GET() {
  const items = getPosts()
    .map((post) => {
      const url = new URL(`/blog/${post.slug}`, site.url).toString()
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(post.description)}</description></item>`
    })
    .join("")
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(site.name)}</title><link>${escapeXml(new URL("/blog", site.url).toString())}</link><description>${escapeXml(site.description)}</description>${items}</channel></rss>`
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
