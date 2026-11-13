import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type Result = { label: string; value: string }

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  industry: string
  year: string
  problem: string
  solution: string
  tech: string[]
  results: Result[]
  placeholder: boolean
  order: number
  body: string
}

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  body: string
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

function resultList(value: unknown, slug: string): Result[] {
  if (!Array.isArray(value)) {
    throw new Error(`content ${slug} field results must be a list`)
  }
  return value.map((item) => {
    if (!item || typeof item !== "object") {
      throw new Error(`content ${slug} has a result that is not an object`)
    }
    const record = item as Record<string, unknown>
    if (typeof record.label !== "string" || typeof record.value !== "string") {
      throw new Error(`content ${slug} results need label and value`)
    }
    return { label: record.label, value: record.value }
  })
}

export function getCaseStudies(): CaseStudy[] {
  return readMdx("case-studies")
    .map(({ slug, data, body }) => {
      const record = data as Record<string, unknown>
      return {
        slug,
        title: requiredString(record, "title", slug),
        summary: requiredString(record, "summary", slug),
        industry: requiredString(record, "industry", slug),
        year: requiredString(record, "year", slug),
        problem: requiredString(record, "problem", slug),
        solution: requiredString(record, "solution", slug),
        tech: stringList(record.tech, "tech", slug),
        results: resultList(record.results, slug),
        placeholder: record.placeholder === true,
        order: typeof record.order === "number" ? record.order : 0,
        body,
      }
    })
    .sort((a, b) => a.order - b.order)
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((study) => study.slug === slug)
}

export function getPosts(): Post[] {
  return readMdx("blog")
    .map(({ slug, data, body }) => {
      const record = data as Record<string, unknown>
      return {
        slug,
        title: requiredString(record, "title", slug),
        description: requiredString(record, "description", slug),
        date: requiredString(record, "date", slug),
        tags: stringList(record.tags, "tags", slug),
        body,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug)
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
