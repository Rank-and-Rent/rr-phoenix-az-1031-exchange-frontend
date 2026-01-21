import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getPropertyTypeBySlug, getAllPropertyTypes } from "@/lib/property-types";
import {
  COMPANY_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";
import { getPropertyTypeBatchData } from "@/lib/data-merger";
import { getPropertyTypeImageSrc } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const propertyTypes = getAllPropertyTypes();
  return propertyTypes.map((propertyType) => ({
    slug: propertyType.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const propertyType = getPropertyTypeBySlug(slug);

  if (!propertyType) {
    return {
      title: "Property Type Not Found",
    };
  }

  return {
    title: `${propertyType.name} Properties for 1031 Exchange | ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}`,
    description: `Explore ${propertyType.name} properties as replacement options for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    alternates: {
      canonical: `${SITE_DOMAIN}/property-types/${slug}`,
    },
  };
}

export default async function PropertyTypePage({ params }: Props) {
  const { slug } = await params;
  const propertyType = getPropertyTypeBySlug(slug);

  if (!propertyType) {
    notFound();
  }

  const batchData = getPropertyTypeBatchData(slug);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Property Types", href: "/property-types" },
            { label: propertyType.name, href: `/property-types/${slug}` },
          ]}
        />

        <article className="pt-8">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src={getPropertyTypeImageSrc(slug)}
              alt={propertyType.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mansion-gold">Property Type</p>
              <h1 className="mt-2 font-serif text-4xl text-white sm:text-5xl">
                {propertyType.name} Properties
              </h1>
            </div>
          </div>

          <div className="mt-12 max-w-3xl">
            {batchData?.mainDescription ? (
              <div
                className="text-base leading-relaxed text-mansion-charcoal/80 sm:text-lg"
                dangerouslySetInnerHTML={{
                  __html: batchData.mainDescription,
                }}
              />
            ) : (
              <p className="text-base leading-relaxed text-mansion-charcoal/80 sm:text-lg">
                Explore {propertyType.name} properties as replacement options for your 1031 exchange in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
              </p>
            )}
          </div>

          {batchData?.faqs && batchData.faqs.length > 0 && (
            <section className="mt-16 border-t border-gray-200 pt-12">
              <p className="section-label mb-3">FAQ</p>
              <h2 className="font-serif text-3xl text-mansion-charcoal">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 divide-y divide-gray-200">
                {batchData.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group py-6"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg text-mansion-charcoal">
                      <span className="font-serif">{faq.question}</span>
                      <span className="flex h-8 w-8 flex-none items-center justify-center border border-gray-300 text-mansion-gold transition group-open:rotate-45 group-open:border-mansion-gold">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </span>
                    </summary>
                    <p className="mt-4 pr-12 text-sm leading-relaxed text-mansion-charcoal/70">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {batchData?.inclusions && batchData.inclusions.length > 0 && (
            <section className="mt-16 border-t border-gray-200 pt-12">
              <p className="section-label mb-3">Inclusions</p>
              <h2 className="font-serif text-3xl text-mansion-charcoal">
                What We Include
              </h2>
              <ul className="mt-6 space-y-3">
                {batchData.inclusions.map((inclusion, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-base text-mansion-charcoal/80"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mansion-gold" />
                    <span>{inclusion}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-16 border border-gray-200 bg-white p-10 text-center shadow-editorial">
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              Ready to discuss your exchange?
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Connect with our team to discuss {propertyType.name} replacement properties for your 1031 exchange in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-mansion-gold px-6 py-3 text-base font-semibold text-white transition hover:bg-mansion-gold-dark"
            >
              Contact Us
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/property-types"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold hover:text-mansion-gold-dark"
            >
              View all property types
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${propertyType.name} Properties for 1031 Exchange`,
            description: batchData?.mainDescription
              ? batchData.mainDescription.replace(/<[^>]*>/g, "").substring(0, 160)
              : `Explore ${propertyType.name} properties as replacement options for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
            url: `${SITE_DOMAIN}/property-types/${slug}`,
            publisher: {
              "@type": "Organization",
              name: COMPANY_NAME,
              url: SITE_DOMAIN,
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
                  name: "Property Types",
                  item: `${SITE_DOMAIN}/property-types`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: propertyType.name,
                  item: `${SITE_DOMAIN}/property-types/${slug}`,
                },
              ],
            },
            mainEntity: {
              "@type": "RealEstateAgent",
              name: COMPANY_NAME,
              url: SITE_DOMAIN,
            },
          }),
        }}
      />
    </div>
  );
}
