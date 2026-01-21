import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { IdentificationRulesChecker } from "@/components/tools/identification-rules-checker";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Identification Rules Checker | 1031 Exchange Tools",
  description: `Validate your 1031 exchange identification against three property, two hundred percent, or ninety five percent rules for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} exchanges.`,
  keywords: [
    "identification rules checker",
    "1031 identification rules",
    "three property rule",
    "two hundred percent rule",
    `${PRIMARY_CITY} 1031 exchange`,
  ],
  openGraph: {
    title: "Identification Rules Checker | 1031 Exchange Tools",
    description: `Validate identification rules for ${PRIMARY_CITY} 1031 exchanges.`,
    type: "website",
    url: `${SITE_DOMAIN}/tools/identification-rules-checker`,
  },
  alternates: {
    canonical: `${SITE_DOMAIN}/tools/identification-rules-checker`,
  },
};

export default function IdentificationRulesCheckerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            {
              label: "Identification Rules Checker",
              href: "/tools/identification-rules-checker",
            },
          ]}
        />

        <div className="pt-8">
          <header className="mb-8">
            <p className="section-label mb-3">Tool</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Identification Rules Checker
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Validate your replacement property identification against IRS identification rules. You
              must identify replacement properties within forty five days and comply with one of
              three identification rules.
            </p>
          </header>

          <IdentificationRulesChecker />

          <div className="mt-8 border border-mansion-gold/20 bg-mansion-gold/5 p-6 text-sm text-mansion-charcoal/80">
            <p className="font-semibold text-mansion-gold-dark">Educational content only.</p>
            <p className="mt-2">
              Not tax, legal, or investment advice. Results are estimates only. Consult a
              qualified intermediary and tax advisor before making decisions. A 1031 exchange
              defers federal and Arizona income tax on qualifying real property. It does not remove
              state or county transfer taxes.
            </p>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="section-label mb-3">Related</p>
            <h2 className="font-serif text-2xl text-mansion-charcoal">
              Related Resources
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/services/three-property-identification-strategy"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Three Property Identification Strategy &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/services/two-hundred-percent-identification-strategy"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Two Hundred Percent Identification Strategy &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/services/identification-deadline-tracking"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Identification Deadline Tracking &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Identification Rules Checker",
            description: `Validate identification rules for ${PRIMARY_CITY} 1031 exchanges`,
            url: `${SITE_DOMAIN}/tools/identification-rules-checker`,
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
                  name: "Tools",
                  item: `${SITE_DOMAIN}/tools`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Identification Rules Checker",
                  item: `${SITE_DOMAIN}/tools/identification-rules-checker`,
                },
              ],
            },
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Identification Rules Checker",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
            },
          }),
        }}
      />
    </div>
  );
}
