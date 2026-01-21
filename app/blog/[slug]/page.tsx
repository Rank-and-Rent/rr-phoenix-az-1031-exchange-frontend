import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getBlogPostBySlug, getAllBlogPosts, type BlogPostSection } from "@/lib/blog";
import { COMPANY_NAME, SITE_DOMAIN } from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.excerpt,
    alternates: {
      canonical: post.canonicalUrl || `${SITE_DOMAIN}/blog/${slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.heroImage
        ? [
            {
              url: `${SITE_DOMAIN}${post.heroImage.src}`,
              width: 1200,
              height: 630,
              alt: post.heroImage.alt,
            },
          ]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />

        <article className="pt-8">
          <header className="mb-8">
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
            <h1 className="mt-3 font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.heroImage && (
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg mt-10 max-w-none space-y-6 text-mansion-charcoal">
            {post.content.map((section, idx) => (
              <BlogSection key={idx} section={section} />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold hover:text-mansion-gold-dark"
            >
              Back to Blog
              <ArrowRightIcon className="h-4 w-4" />
            </Link>

            <div className="w-full border border-gray-200 bg-white p-10 text-center shadow-editorial">
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
          </div>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            author: {
              "@type": "Person",
              name: post.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: COMPANY_NAME,
              url: SITE_DOMAIN,
            },
            image: post.heroImage
              ? `${SITE_DOMAIN}${post.heroImage.src}`
              : undefined,
            url: `${SITE_DOMAIN}/blog/${slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_DOMAIN}/blog/${slug}`,
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: SITE_DOMAIN,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: `${SITE_DOMAIN}/blog`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `${SITE_DOMAIN}/blog/${slug}`,
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}

function BlogSection({ section }: { section: BlogPostSection }) {
  switch (section.type) {
    case "heading":
      const HeadingTag = `h${section.level}` as "h2" | "h3" | "h4";
      return (
        <HeadingTag className="font-serif text-2xl text-mansion-charcoal">
          {section.text}
        </HeadingTag>
      );
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-mansion-charcoal/80">
          {section.text}
        </p>
      );
    case "list":
      const ListTag = section.ordered ? "ol" : "ul";
      return (
        <ListTag className="space-y-2 pl-6">
          {section.items.map((item, idx) => (
            <li key={idx} className="text-base text-mansion-charcoal/80">
              {item}
            </li>
          ))}
        </ListTag>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-mansion-gold pl-4 italic text-mansion-charcoal/80">
          <p className="text-base">{section.text}</p>
          {section.source && (
            <cite className="mt-2 block text-sm text-mansion-charcoal/60">
              {section.source}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}
