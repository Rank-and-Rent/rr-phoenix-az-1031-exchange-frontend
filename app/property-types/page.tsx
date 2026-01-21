import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { propertyTypesData } from "@/data/property-types";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";
import { getPropertyTypeImageSrc } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: `1031 Exchange Property Types | ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}`,
  description: `Explore property types eligible for 1031 exchanges in ${PRIMARY_CITY}. Multifamily, industrial, retail, and more replacement property options.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/property-types`,
  },
};

export default function PropertyTypesPage() {
  const propertyTypes = propertyTypesData;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Property Types", href: "/property-types" },
          ]}
        />

        <section className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">Property Types</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Property Types
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Explore eligible property types for 1031 exchanges in {PRIMARY_CITY}.
              From multifamily residential to commercial real estate, discover
              replacement property options that meet your investment objectives.
            </p>
          </header>

          <div
            id="property-types-grid"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {propertyTypes.map((propertyType) => (
              <Link
                key={propertyType.slug}
                href={propertyType.route}
                className="group relative overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={getPropertyTypeImageSrc(propertyType.slug)}
                    alt={propertyType.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mansion-gold">
                      Property Type
                    </p>
                    <h2 className="font-serif text-xl text-white">
                      {propertyType.name}
                    </h2>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
                    Learn more
                    <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 border border-gray-200 bg-white p-10 text-center shadow-editorial">
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              Ready to discuss your exchange?
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Connect with our team to discuss your 1031 exchange needs and replacement property objectives in {PRIMARY_CITY}.
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
            name: "1031 Exchange Property Types",
            description: `Eligible property types for 1031 exchanges in ${PRIMARY_CITY}`,
            url: `${SITE_DOMAIN}/property-types`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: propertyTypes.map((propertyType, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Product",
                  name: propertyType.name,
                  url: `${SITE_DOMAIN}${propertyType.route}`,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
