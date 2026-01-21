import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getAllLocations } from "@/lib/locations";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";
import { getLocationImageSrc } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: `1031 Exchange Locations | ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}`,
  description: `1031 exchange services across ${PRIMARY_CITY} and surrounding areas. Local expertise for investors in Arizona.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/locations`,
  },
};

export default function LocationsPage() {
  const locations = getAllLocations();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations" },
          ]}
        />

        <section className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">Top Markets</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Service Areas
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              We assist investors throughout {PRIMARY_CITY} and surrounding
              communities in {PRIMARY_STATE_ABBR} with every stage of their 1031
              exchange.
            </p>
          </header>

          <div
            id="locations-grid"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group relative overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={getLocationImageSrc(location.slug)}
                    alt={location.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="font-serif text-xl font-normal uppercase tracking-wide text-white">
                      {location.name}
                    </h2>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm leading-relaxed text-mansion-charcoal/70">
                    {location.intro}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
                    Learn more
                    <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div
            id="no-results-cta"
            className="mt-12 hidden border border-gray-200 bg-white p-10 text-center shadow-editorial"
          >
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              We serve all of {PRIMARY_STATE_ABBR}
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Our team provides statewide support for 1031 exchanges across
              Arizona.
            </p>
            <Link
              href="/contact?projectType=Other"
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
              Connect with our team to discuss your 1031 exchange needs in {PRIMARY_CITY} and surrounding areas.
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
