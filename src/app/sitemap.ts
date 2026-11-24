import type { MetadataRoute } from "next"
import { getCaseStudies, getPosts } from "@/lib/content"
import { services } from "@/lib/services"
import { hreflangLanguages } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    "/how-we-work",
    "/work",
    "/about",
    "/contact",
    "/blog",
    "/feed.xml",
    "/llms.txt",
    "/robots.txt",
    "/privacy",
    "/terms",
    ...services.map((service) => `/services/${service.slug}`),
    ...getCaseStudies().map((study) => `/work/${study.slug}`),
    ...getPosts().map((post) => `/blog/${post.slug}`),
  ]

  return paths.map((path) => {
    const url = new URL(path, site.url).toString()
    const isPage = !path.endsWith(".xml") && !path.endsWith(".txt")
    const languages = isPage
      ? Object.fromEntries(
          Object.entries(hreflangLanguages(path)).map(([locale, href]) => [
            locale,
            new URL(href, site.url).toString(),
          ])
        )
      : undefined

    return {
      url,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.6,
      ...(languages ? { alternates: { languages } } : {}),
    }
  })
}
