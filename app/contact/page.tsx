"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { LeadForm } from "@/components/forms/lead-form";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
  GOOGLE_MAP_EMBED,
  PHONE_NUMBER,
  PHONE_NUMBER_URI,
  SUPPORT_EMAIL,
  OFFICE_ADDRESS_LINE_1,
  OFFICE_ADDRESS_LINE_2,
} from "@/lib/config";

function ContactPageContent() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
        />

        <section className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">Get in Touch</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Discuss your 1031 exchange timeline and replacement property
              objectives with our {PRIMARY_CITY} team.
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-2">
            <div id="contact-form-section">
              <LeadForm />
            </div>

            <div className="space-y-8">
              <div>
                <p className="section-label mb-3">Contact Info</p>
                <h2 className="font-serif text-2xl text-mansion-charcoal">
                  Get in Touch
                </h2>
                <p className="mt-4 text-base text-mansion-charcoal/70">
                  Our team is available 24 hours a day, seven days a week to
                  assist with your exchange questions.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-mansion-charcoal/50">Phone</h3>
                  <a
                    href={`tel:${PHONE_NUMBER_URI}`}
                    className="mt-2 block font-serif text-xl text-mansion-gold hover:text-mansion-gold-dark"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>

                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-mansion-charcoal/50">Email</h3>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="mt-2 block font-serif text-xl text-mansion-gold hover:text-mansion-gold-dark"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="border border-gray-200 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-mansion-charcoal/50">
                  Office Location
                </h3>
                <p className="mt-2 text-base text-mansion-charcoal/80">
                  {OFFICE_ADDRESS_LINE_1}
                  <br />
                  {OFFICE_ADDRESS_LINE_2}
                </p>
                <p className="mt-4 text-sm text-mansion-charcoal/60">
                  Hours: 24 hours a day, seven days a week
                </p>
              </div>

              <div className="border border-gray-200 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-mansion-charcoal/50 mb-4">
                  Quick Links
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/services"
                    className="text-sm text-mansion-charcoal hover:text-mansion-gold transition-colors"
                  >
                    View All Services &rarr;
                  </Link>
                  <Link
                    href="/locations"
                    className="text-sm text-mansion-charcoal hover:text-mansion-gold transition-colors"
                  >
                    Explore Locations &rarr;
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-mansion-charcoal hover:text-mansion-gold transition-colors"
                  >
                    About Our Process &rarr;
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm text-mansion-charcoal hover:text-mansion-gold transition-colors"
                  >
                    1031 Exchange Blog &rarr;
                  </Link>
                  <Link
                    href="/tools"
                    className="text-sm text-mansion-charcoal hover:text-mansion-gold transition-colors"
                  >
                    Exchange Tools &rarr;
                  </Link>
                  <Link
                    href="/property-types"
                    className="text-sm text-mansion-charcoal hover:text-mansion-gold transition-colors"
                  >
                    Property Types &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 relative aspect-[21/9] overflow-hidden">
            <iframe
              src={GOOGLE_MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`}
              className="absolute inset-0"
            />
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us",
            url: `${SITE_DOMAIN}/contact`,
            mainEntity: {
              "@type": "Organization",
              name: "1031 Exchange of Phoenix",
              address: {
                "@type": "PostalAddress",
                streetAddress: OFFICE_ADDRESS_LINE_1,
                addressLocality: PRIMARY_CITY,
                addressRegion: PRIMARY_STATE_ABBR,
                postalCode: "85024",
              },
              telephone: PHONE_NUMBER_URI,
              email: SUPPORT_EMAIL,
            },
          }),
        }}
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactPageContent />
    </Suspense>
  );
}
