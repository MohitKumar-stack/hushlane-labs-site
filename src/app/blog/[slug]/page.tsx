import { notFound } from "next/navigation"
import { MdxContent } from "@/components/mdx/mdx-content"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { formatDate, getPost, getPosts, readingTime } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

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
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: "article",
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

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Notes", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <header className="mt-8 max-w-3xl">
        <p className="text-sm text-muted-foreground">
          {formatDate(post.date)} · {readingTime(post.body)} min read
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
      <div className="mt-10">
        <MdxContent source={post.body} />
      </div>
    </article>
  )
}
