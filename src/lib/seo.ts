import type { Metadata } from "next"
import { site } from "@/lib/site"

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Hushlane Labs. Your brand. Our build.",
}

const hreflangLocales = ["en", "en-US", "en-GB", "en-AU", "en-CA", "x-default"] as const

export function hreflangLanguages(path: string) {
  return Object.fromEntries(hreflangLocales.map((locale) => [locale, path]))
}

type PageMeta = {
  title: string
  description: string
  path: string
  ogType?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
}

export function pageMetadata({
  title,
  description,
  path,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: hreflangLanguages(path) },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: ogType,
      locale: "en_US",
      images: [socialImage],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Hushlane Labs — White-label tech for agencies",
    template: "%s · Hushlane Labs",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
    languages: hreflangLanguages("/"),
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "Hushlane Labs — White-label tech for agencies",
    description: site.description,
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hushlane Labs — White-label tech for agencies",
    description: site.description,
    images: [socialImage.url],
  },
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}

function linkedinUrl() {
  try {
    const url = new URL(site.linkedin)
    if (url.protocol === "https:" && url.hostname.endsWith("linkedin.com")) return url.toString()
  } catch {
    return ""
  }
  return ""
}

export function organizationJsonLd() {
  const linkedin = linkedinUrl()
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: new URL("/apple-icon", site.url).toString(),
    email: site.email,
    slogan: site.tagline,
    description: site.description,
    areaServed: ["US", "GB", "AU", "CA"],
    ...(linkedin ? { sameAs: [linkedin] } : {}),
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function projectJsonLd(project: {
  title: string
  summary: string
  slug: string
  url: string
  tags: string[]
  serviceName: string
  servicePath: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["Project", "CreativeWork"],
    name: project.title,
    description: project.summary,
    url: new URL(`/work/${project.slug}`, site.url).toString(),
    sameAs: project.url,
    keywords: project.tags.join(", "),
    creator: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    about: {
      "@type": "Service",
      name: project.serviceName,
      url: new URL(project.servicePath, site.url).toString(),
    },
  }
}

export function blogPostingJsonLd(post: {
  title: string
  description: string
  slug: string
  date: string
  updated: string
}) {
  const url = new URL(`/blog/${post.slug}`, site.url).toString()
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    image: new URL("/opengraph-image", site.url).toString(),
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: new URL("/apple-icon", site.url).toString(),
      },
    },
  }
}

export function serviceJsonLd(service: {
  h1: string
  metaDescription: string
  slug: string
  navLabel: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.metaDescription,
    serviceType: service.navLabel,
    url: new URL(`/services/${service.slug}`, site.url).toString(),
    areaServed: ["US", "GB", "AU", "CA"],
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  }
}
