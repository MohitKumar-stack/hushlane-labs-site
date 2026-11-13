export const site = {
  name: "Hushlane Labs",
  tagline: "Your brand. Our build.",
  description:
    "White-label tech, product, and AI automation for agencies in the USA, UK, Australia, and Canada.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hushlanelabs.com",
  email: "hello@hushlanelabs.com",
  legalUpdated: "13 November 2026",
  markets: ["United States", "United Kingdom", "Australia", "Canada"],
} as const

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const
