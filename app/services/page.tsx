import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { servicesData } from "@/data/services";
import {
  COMPANY_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "1031 Exchange Services",
  description: `Comprehensive 1031 exchange services for ${PRIMARY_CITY} investors. Replacement property identification, timeline management, and compliance support.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/services`,
  },
};

export default function ServicesPage() {
  const services = servicesData;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]}
        />

        <section className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">Our Services</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Exchange Services
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Comprehensive support for {PRIMARY_CITY} investors managing 1031
              exchanges. From replacement property identification to deadline
              tracking and compliance coordination.
            </p>
          </header>

          <div
            id="services-grid"
            className="grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between bg-white p-6 transition hover:bg-gray-50"
              >
                <div>
                  <h2 className="font-serif text-xl text-mansion-charcoal">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                    {service.short}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
                  Learn more
                  <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div
            id="no-results-cta"
            className="mt-12 hidden border border-gray-200 bg-white p-10 text-center shadow-editorial"
          >
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              We can help with that
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Our team specializes in custom exchange solutions for {PRIMARY_CITY} investors.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-mansion-gold px-6 py-3 text-base font-semibold text-white transition hover:bg-mansion-gold-dark"
            >
              Contact Us
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "1031 Exchange Services",
            description: `Comprehensive 1031 exchange services for ${PRIMARY_CITY} investors`,
            url: `${SITE_DOMAIN}/services`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Service",
                name: service.name,
                description: service.short,
                url: `${SITE_DOMAIN}/services/${service.slug}`,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
