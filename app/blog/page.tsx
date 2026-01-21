import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_DOMAIN } from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "1031 Exchange Blog | Articles and Resources",
  description:
    "Educational articles about 1031 exchanges, replacement property identification, timeline management, and compliance.",
  alternates: {
    canonical: `${SITE_DOMAIN}/blog`,
  },
};

type SearchParams = {
  page?: string;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const postsPerPageDesktop = 6;
  const postsPerPageMobile = 3;

  const allPosts = getAllBlogPosts();
  const totalPages = Math.ceil(
    allPosts.length / postsPerPageDesktop
  );

  const startIndex = (currentPage - 1) * postsPerPageDesktop;
  const endIndex = startIndex + postsPerPageDesktop;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
        />

        <section className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">News & Insights</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Educational articles about 1031 exchanges, replacement property
              identification, and compliance.
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="flex h-full flex-col border border-gray-200 bg-white transition hover:shadow-editorial">
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                      {post.publishedAt && (
                        <time
                          dateTime={post.publishedAt}
                          className="text-xs font-semibold uppercase tracking-wider text-mansion-gold"
                        >
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      )}
                      <h2 className="mt-3 font-serif text-xl text-mansion-charcoal">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
                      Read more
                      <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-12 flex items-center justify-center gap-4"
            >
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-mansion-charcoal transition hover:border-mansion-gold hover:text-mansion-gold"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm text-mansion-charcoal/70">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-mansion-charcoal transition hover:border-mansion-gold hover:text-mansion-gold"
                >
                  Next
                </Link>
              )}
            </nav>
          )}

          <div className="mt-16 border border-gray-200 bg-white p-10 text-center shadow-editorial">
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              Ready to discuss your exchange?
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Connect with our team to discuss your 1031 exchange needs and replacement property objectives.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-mansion-gold px-6 py-3 text-base font-semibold text-white transition hover:bg-mansion-gold-dark"
            >
              Contact Us
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
