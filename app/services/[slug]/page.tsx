import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  getServiceBySlug,
  getRelatedServices,
  getAllServices,
} from "@/lib/services";
import {
  COMPANY_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";
import { getServiceBatchData } from "@/lib/data-merger";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} | ${PRIMARY_CITY} 1031 Exchange Services`,
    description: service.shortDescription,
    alternates: {
      canonical: `${SITE_DOMAIN}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const batchData = getServiceBatchData(slug);
  const relatedServices = getRelatedServices(slug, 4);
  const allServices = getAllServices();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name, href: `/services/${slug}` },
          ]}
        />

        <article className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">Service</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              {service.shortDescription}
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Overview
              </h2>
              {batchData?.mainDescription ? (
                <div
                  className="mt-4 text-base leading-relaxed text-mansion-charcoal/80"
                  dangerouslySetInnerHTML={{
                    __html: batchData.mainDescription,
                  }}
                />
              ) : (
                <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">{service.overview}</p>
              )}
            </section>

            {service.highlights.length > 0 && (
              <section className="border-b border-gray-200 pb-8">
                <h2 className="font-serif text-2xl text-mansion-charcoal">
                  Highlights
                </h2>
                <ul className="mt-4 space-y-2">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-mansion-charcoal/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mansion-gold" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(batchData?.inclusions?.length ?? service.deliverables.length) > 0 && (
              <section className="border-b border-gray-200 pb-8">
                <h2 className="font-serif text-2xl text-mansion-charcoal">
                  {batchData?.inclusions ? "What's Included" : "Deliverables"}
                </h2>
                <ul className="mt-4 space-y-2">
                  {(batchData?.inclusions ?? service.deliverables).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-mansion-charcoal/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mansion-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="mt-8 border border-mansion-gold/20 bg-mansion-gold/5 p-6 text-sm text-mansion-charcoal/80">
            {batchData?.complianceNote ? (
              <p className="font-semibold text-mansion-gold-dark">
                {batchData.complianceNote}
              </p>
            ) : (
              <>
                <p className="font-semibold text-mansion-gold-dark">
                  Educational content only. Not tax or legal advice.
                </p>
                <p className="mt-2">
                  Consult a Qualified Intermediary and tax advisor before acting.
                </p>
              </>
            )}
          </div>

          <section className="mt-16 border-t border-gray-200 pt-12">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 divide-y divide-gray-200">
              {(batchData?.faqs ?? service.faq).map((faq, idx) => (
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

          <section className="mt-16 border-t border-gray-200 pt-12">
            <p className="section-label mb-3">Related</p>
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              Related Services
            </h2>

            <div
              id="related-services-grid"
              className="mt-8 grid gap-px bg-gray-200 sm:grid-cols-2"
            >
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group flex h-full flex-col justify-between bg-white p-6 transition hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-serif text-xl text-mansion-charcoal">
                      {related.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                      {related.shortDescription}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
                    Explore
                    <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-16 border border-gray-200 bg-white p-10 text-center shadow-editorial">
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              Ready to get started?
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Discuss your exchange timeline and replacement objectives with our{" "}
              {PRIMARY_CITY} team.
            </p>
            <Link
              href={`/contact?projectType=${encodeURIComponent(service.name)}#project-type`}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-mansion-gold px-6 py-3 text-base font-semibold text-white transition hover:bg-mansion-gold-dark"
            >
              Request Consultation
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.shortDescription,
            provider: {
              "@type": "Organization",
              name: COMPANY_NAME,
              url: SITE_DOMAIN,
            },
            areaServed: {
              "@type": "Country",
              name: "United States",
            },
            url: `${SITE_DOMAIN}/services/${slug}`,
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
                  name: "Services",
                  item: `${SITE_DOMAIN}/services`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: service.name,
                  item: `${SITE_DOMAIN}/services/${slug}`,
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
