import type { MetadataRoute } from "next"
import { getCaseStudies, getPosts } from "@/lib/content"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    "/how-we-work",
    "/pricing",
    "/work",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    ...services.map((service) => `/services/${service.slug}`),
    ...getCaseStudies().map((study) => `/work/${study.slug}`),
    ...getPosts().map((post) => `/blog/${post.slug}`),
  ]

  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.6,
  }))
}
