import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type Screenshot = { src: string; alt: string; width: number; height: number }

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  url: string
  industry: string
  year: string
  tags: string[]
  service: string
  role: string
  result: string
  screenshots: Screenshot[]
  video: string
  order: number
  body: string
}

export type Post = {
  slug: string
  title: string
  metaTitle?: string
  description: string
  date: string
  updated: string
  category: string
  tags: string[]
  service?: string
  body: string
  faq: { question: string; answer: string }[]
}

function readMdx(dir: string) {
  const full = path.join(process.cwd(), "content", dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8")
      const { data, content } = matter(raw)
      return { slug: file.replace(/\.mdx$/, ""), data, body: content.trim() }
    })
}

function requiredString(data: Record<string, unknown>, field: string, slug: string) {
  const value = data[field]
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`content ${slug} is missing ${field}`)
  }
  return value.trim()
}

function stringList(value: unknown, field: string, slug: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`content ${slug} field ${field} must be a list of strings`)
  }
  return value
}

function screenshotList(value: unknown, slug: string): Screenshot[] {
  if (!Array.isArray(value) || value.length < 3 || value.length > 4) {
    throw new Error(`content ${slug} needs 3 or 4 screenshot slots`)
  }
  return value.map((item, index) => {
    if (typeof item === "string" && item.trim()) {
      const text = item.trim()
      return text.startsWith("/")
        ? { src: text, alt: `${slug} screenshot ${index + 1}`, width: 1024, height: 576 }
        : { src: "", alt: text, width: 1024, height: 576 }
    }
    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>
      const alt = typeof record.alt === "string" ? record.alt.trim() : ""
      const src = typeof record.src === "string" ? record.src.trim() : ""
      const width = typeof record.width === "number" ? record.width : 1024
      const height = typeof record.height === "number" ? record.height : 576
      if (!alt) throw new Error(`content ${slug} screenshot ${index + 1} needs alt text`)
      return { src, alt, width, height }
    }
    throw new Error(`content ${slug} has a screenshot that is not usable`)
  })
}

export function getCaseStudies(): CaseStudy[] {
  return readMdx("case-studies")
    .map(({ slug, data, body }) => {
      const record = data as Record<string, unknown>
      const url = requiredString(record, "url", slug)
      if (!/^https:\/\/[^\s]+\.[^\s]+$/i.test(url)) {
        throw new Error(`content ${slug} url must be an https address`)
      }
      return {
        slug,
        title: requiredString(record, "title", slug),
        summary: requiredString(record, "summary", slug),
        url,
        industry: requiredString(record, "industry", slug),
        year: requiredString(record, "year", slug),
        tags: stringList(record.tags, "tags", slug),
        service: requiredString(record, "service", slug),
        role: requiredString(record, "role", slug),
        result: requiredString(record, "result", slug),
        screenshots: screenshotList(record.screenshots, slug),
        video: typeof record.video === "string" ? record.video.trim() : "",
        order: typeof record.order === "number" ? record.order : 0,
        body,
      }
    })
    .sort((a, b) => a.order - b.order)
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((study) => study.slug === slug)
}

// Questions are read from a "## Frequently asked questions" section: each
// "### Question" heading followed by its answer paragraphs.
export function extractFaq(body: string) {
  const section = body.split(/^##\s+Frequently asked questions\s*$/im)[1]
  if (!section) return []
  const block = section.split(/^##\s+/m)[0]
  return block
    .split(/^###\s+/m)
    .slice(1)
    .map((part) => {
      const [question, ...rest] = part.split("\n")
      const answer = rest
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim()
      return { question: question.trim(), answer }
    })
    .filter((item) => item.question && item.answer)
}

// A post goes live on its date. Dates are compared in India time, because the
// publishing job and the daily rebuild run on IST. Set SHOW_SCHEDULED_POSTS=1
// locally to preview posts that are not due yet.
function todayInIndia() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
}

export function getPosts(): Post[] {
  const today = todayInIndia()
  return readMdx("blog")
    .map(({ slug, data, body }) => {
      const record = data as Record<string, unknown>
      const date = requiredString(record, "date", slug)
      return {
        slug,
        title: requiredString(record, "title", slug),
        metaTitle:
          typeof record.metaTitle === "string" && record.metaTitle.trim()
            ? record.metaTitle.trim()
            : undefined,
        description: requiredString(record, "description", slug),
        date,
        updated: typeof record.updated === "string" && record.updated.trim() ? record.updated.trim() : date,
        category: typeof record.category === "string" && record.category.trim() ? record.category.trim() : "Notes",
        tags: stringList(record.tags, "tags", slug),
        service: typeof record.service === "string" ? record.service.trim() : undefined,
        body,
        faq: extractFaq(body),
      }
    })
    .filter((post) => process.env.SHOW_SCHEDULED_POSTS === "1" || post.date <= today)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug)
}

export function postsForService(service: string) {
  return getPosts().filter((post) => post.service === service)
}

export function relatedPosts(post: Post, limit = 3) {
  return getPosts()
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      item,
      score:
        (item.category === post.category ? 2 : 0) +
        item.tags.filter((tag) => post.tags.includes(tag)).length +
        (item.service && item.service === post.service ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score || (a.item.date < b.item.date ? 1 : -1))
    .slice(0, limit)
    .map((entry) => entry.item)
}

export function markdownHeadings(markdown: string) {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const text = match[1].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim()
    return { text, id: slugify(text) }
  })
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`))
}
