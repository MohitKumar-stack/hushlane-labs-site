import { getCaseStudies, getPosts } from "@/lib/content"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

function link(path: string, label: string, note: string) {
  const url = new URL(path, site.url).toString()
  return `- [${label}](${url}): ${note}`
}

export function llmsText() {
  const pages = [
    link("/", "Home", "White-label development and AI automation for agencies."),
    link("/services", "Services", "Web, app, AI automation, software, and MVP development."),
    link("/how-we-work", "How we work", "NDA first, a private build, dated reviews, and a handoff or retainer."),
    link("/work", "Case studies", "Zappio, Lumic, and Acredge."),
    link("/about", "About", "A white-label studio. The agency stays the vendor."),
    link("/contact", "Contact", "Book a 30-minute call or send a brief."),
    link("/blog", "Notes", "Practical notes for agencies."),
    link("/feed.xml", "RSS", "The notes feed."),
    link("/privacy", "Privacy", "How the site handles information submitted through the form."),
    link("/terms", "Terms", "Terms for using the website. Client work is governed by the statement of work."),
  ]

  const serviceLines = services.map((service) => link(`/services/${service.slug}`, service.h1, service.metaDescription))
  const studyLines = getCaseStudies().map((study) => link(`/work/${study.slug}`, study.title, study.summary))
  const noteLines = getPosts().map((post) => link(`/blog/${post.slug}`, post.title, post.description))

  return [
    `# ${site.name}`,
    "",
    `> ${site.description} Tagline: ${site.tagline}`,
    "",
    "Delivery is based in India. The agencies are in the United States, the United Kingdom, Australia, and Canada. Hushlane does not publish invented metrics. Case studies are published only with permission.",
    "",
    "## Pages",
    ...pages,
    "",
    "## Services",
    ...serviceLines,
    "",
    "## Case studies",
    ...studyLines,
    "",
    "## Notes",
    ...noteLines,
    "",
    "## Optional",
    link("/sitemap.xml", "Sitemap", "Every indexable URL."),
    link("/robots.txt", "Robots", "All crawlers, including AI bots, are allowed."),
    "",
  ].join("\n")
}
