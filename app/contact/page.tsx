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
    <div className="min-h-screen bg-[#F5F3EF]">
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
        />

        <section className="space-y-10 pt-8">
          <header className="max-w-3xl space-y-4">
            <h1 className="font-serif text-4xl font-bold text-[#2A2A2A] sm:text-5xl">
              Contact Us
            </h1>
            <p className="text-base text-[#2A2A2A]/75 sm:text-lg">
              Discuss your 1031 exchange timeline and replacement property
              objectives with our {PRIMARY_CITY} team.
            </p>
          </header>

          <div className="grid gap-10 lg:grid-cols-2">
            <div id="contact-form-section">
              <LeadForm />
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#2A2A2A]">
                  Get in Touch
                </h2>
                <p className="text-base text-[#2A2A2A]/75">
                  Our team is available 24 hours a day, seven days a week to
                  assist with your exchange questions.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-[#2A2A2A]">Phone</h3>
                  <a
                    href={`tel:${PHONE_NUMBER_URI}`}
                    className="text-base text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#2A2A2A]">Email</h3>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="text-base text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#2A2A2A]">Hours</h3>
                  <p className="text-base text-[#2A2A2A]/75">
                    24 hours a day, seven days a week
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/70 p-6 shadow-[0_12px_40px_rgba(24,24,24,0.06)]">
                <h3 className="text-lg font-medium text-[#2A2A2A]">
                  Office Location
                </h3>
                <p className="mt-2 text-sm text-[#2A2A2A]/75">
                  {OFFICE_ADDRESS_LINE_1}
                  <br />
                  {OFFICE_ADDRESS_LINE_2}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-6 font-serif text-xl font-bold text-[#006E7F]">
                  Quick Links
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <Link
                    href="/services"
                    className="text-[#2A2A2A] hover:text-[#006E7F] transition-colors"
                  >
                    View All Services
                  </Link>
                  <Link
                    href="/locations"
                    className="text-[#2A2A2A] hover:text-[#006E7F] transition-colors"
                  >
                    Explore Locations
                  </Link>
                  <Link
                    href="/about"
                    className="text-[#2A2A2A] hover:text-[#006E7F] transition-colors"
                  >
                    About Our Process
                  </Link>
                  <Link
                    href="/blog"
                    className="text-[#2A2A2A] hover:text-[#006E7F] transition-colors"
                  >
                    1031 Exchange Blog
                  </Link>
                  <Link
                    href="/tools"
                    className="text-[#2A2A2A] hover:text-[#006E7F] transition-colors"
                  >
                    Exchange Tools
                  </Link>
                  <Link
                    href="/property-types"
                    className="text-[#2A2A2A] hover:text-[#006E7F] transition-colors"
                  >
                    Property Types
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl">
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
    <Suspense fallback={<div className="min-h-screen bg-[#F5F3EF]" />}>
      <ContactPageContent />
    </Suspense>
  );
}
