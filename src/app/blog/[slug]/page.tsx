import Link from "next/link"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/seo/json-ld"
import { MdxContent } from "@/components/mdx/mdx-content"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { TrackedLink } from "@/components/site/tracked-link"
import { bookingHref } from "@/lib/booking"
import { formatDate, getPost, getPosts, markdownHeadings, readingTime, relatedPosts } from "@/lib/content"
import { blogPostingJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Notes", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]
  const headings = markdownHeadings(post.body)
  const related = relatedPosts(post)
  const booking = bookingHref()

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <header className="mt-8 max-w-3xl">
        <p className="text-sm text-muted-foreground">
          {post.category} · {formatDate(post.date)} · {readingTime(post.body)} min read
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-balance sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>
      </header>
      <div className="mt-10 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
        {headings.length > 0 ? (
          <nav aria-label="On this page" className="lg:sticky lg:top-24">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div>
          <MdxContent source={post.body} />
          <aside className="mt-12 rounded-2xl border border-border p-6">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Author</p>
            <p className="mt-3 text-lg font-medium">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.tagline} White-label tech, product, and AI automation for agencies in the United States, the United Kingdom, Australia, and Canada. Delivery is based in India.
            </p>
            <p className="mt-4 text-sm">
              <Link href="/about" className="underline-offset-4 hover:underline">
                About the studio
              </Link>
            </p>
          </aside>
          <div className="mt-8 rounded-2xl border border-border p-6">
            <h2 className="text-2xl font-medium tracking-tight">Book a call</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A free 30-minute call. Tell us the client, the deadline, and what should ship under your brand. We reply within 24 hours on business days.
            </p>
            <TrackedLink
              href={booking}
              event="booking_click"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Book a call
            </TrackedLink>
          </div>
          {related.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-xl font-medium tracking-tight">Related notes</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="underline-offset-4 hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  )
}
