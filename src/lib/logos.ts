export type ProjectLogo = {
  slug: string
  title: string
  alt: string
  src: string
  href: string
  liveUrl: string
  liveLabel: string
  /** Prefer a dark chip behind logos with light ink. */
  chip: "light" | "dark"
}

export const projectLogos: ProjectLogo[] = [
  {
    slug: "zappio",
    title: "Zappio",
    alt: "Zappio logo",
    src: "/logos/zappio.png",
    href: "/work/zappio",
    liveUrl: "https://zappio.in",
    liveLabel: "zappio.in",
    chip: "light",
  },
  {
    slug: "lumic",
    title: "Lumic",
    alt: "Lumic logo",
    src: "/logos/lumic.png",
    href: "/work/lumic",
    liveUrl: "https://lumic.co.in",
    liveLabel: "lumic.co.in",
    chip: "dark",
  },
  {
    slug: "acredge",
    title: "Acredge",
    alt: "Acredge logo",
    src: "/logos/acredge.png",
    href: "/work/acredge",
    liveUrl: "https://acredge.ai",
    liveLabel: "acredge.ai",
    chip: "dark",
  },
]

export function logoForSlug(slug: string) {
  return projectLogos.find((logo) => logo.slug === slug)
}
