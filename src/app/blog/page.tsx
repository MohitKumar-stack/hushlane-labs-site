import Link from "next/link"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { formatDate, getPosts, readingTime } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Agency Delivery Notes | Hushlane Labs",
  description:
    "Practical notes for agencies on white-label web development, AI automation, outsourcing, and how to choose a build partner.",
  path: "/blog",
})

export default function BlogPage() {
  const posts = getPosts()

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Notes", path: "/blog" },
            ]}
          />
          <h1 className="mt-8 max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">Notes</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Occasional writing on delivery. This journal is set up and indexed. It is not in the main navigation yet.
          </p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-8">
              <p className="text-sm text-muted-foreground">
                {post.category} · {formatDate(post.date)} · {readingTime(post.body)} min read
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight">
                <Link href={`/blog/${post.slug}`} className="hover:underline hover:decoration-border hover:underline-offset-4">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{post.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
