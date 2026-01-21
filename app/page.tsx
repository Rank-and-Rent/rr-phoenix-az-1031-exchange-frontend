import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services, type Service } from "@/lib/services";
import { locations } from "@/lib/locations";
import {
  ArrowRightIcon,
  CalculatorIcon,
  CalendarIcon,
  ClockIcon,
  LandmarkIcon,
  MapPinIcon,
  PhoneIcon,
  ScaleIcon,
  SearchIcon,
  ShieldIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { HomepageServiceGrid } from "@/components/homepage/homepage-service-grid";
import { HomepageServiceArea } from "@/components/homepage/homepage-service-area";
import { HomepagePropertyTypes } from "@/components/homepage/homepage-property-types";
import { DeadlineCalculator } from "@/components/widgets/deadline-calculator";
import { IdentificationRules } from "@/components/widgets/identification-rules";
import { TimelineTracker } from "@/components/widgets/timeline-tracker";
import { LeadForm } from "@/components/forms/lead-form";
import {
  COMPANY_NAME,
  HAS_STAFFED_OFFICE,
  OFFICE_ADDRESS_LINE_1,
  OFFICE_ADDRESS_LINE_2,
  OFFICE_HOURS,
  PHONE_NUMBER,
  PHONE_NUMBER_URI,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
  SUPPORT_EMAIL,
} from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DOMAIN),
  title: "1031 Exchange Services Phoenix AZ | Qualified Intermediary Coordination",
  description:
    "Expert 1031 exchange services in Phoenix, Arizona. Property identification, qualified intermediary coordination, deadline management, and tax deferral guidance for all property types.",
  keywords: [
    "1031 exchange Phoenix",
    "qualified intermediary Arizona",
    "1031 exchange services",
    "property identification",
    "tax deferred exchange",
    "like-kind exchange",
    "1031 exchange deadline",
    "replacement property",
  ],
  alternates: {
    canonical: SITE_DOMAIN,
  },
  openGraph: {
    type: "website",
    url: SITE_DOMAIN,
    title: "1031 Exchange Services Phoenix AZ | Qualified Intermediary Coordination",
    description:
      "Expert 1031 exchange services in Phoenix, Arizona. Property identification, qualified intermediary coordination, and tax deferral guidance for all property types.",
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_DOMAIN}/images/blog/desert-modern.svg`,
        width: 1200,
        height: 630,
        alt: "Desert modern skyline representing 1031 Exchange of Phoenix.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange Services Phoenix AZ | Qualified Intermediary Coordination",
    description:
      "Expert 1031 exchange services in Phoenix, Arizona. Property identification, qualified intermediary coordination, and tax deferral guidance for all property types.",
    images: [`${SITE_DOMAIN}/images/blog/desert-modern.svg`],
  },
  other: {
    "og:locale": "en_US",
  },
};

const highlightedServiceSlugs = [
  "forward-exchange-coordination",
  "replacement-property-shortlist",
  "reverse-exchange-structuring",
  "improvement-exchange-management",
  "dst-placement-advisory",
  "portfolio-alignment-consultation",
] as const;

const highlightedServices = highlightedServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is Service => Boolean(service));


type PropertyType = {
  title: string;
  benefit: string;
  slug: string;
};

const propertyTypes: PropertyType[] = [
  {
    title: "Multifamily",
    benefit:
      "Apartment buildings and residential complexes. Steady rental income with potential for value-add improvements and long-term appreciation.",
    slug: "multifamily",
  },
  {
    title: "Industrial & Warehouse",
    benefit:
      "Distribution centers, flex space, and manufacturing facilities. Strong demand from e-commerce and logistics growth.",
    slug: "industrial-warehouse",
  },
  {
    title: "Retail Properties",
    benefit:
      "Shopping centers, strip malls, and single-tenant retail. Diverse tenant mixes or credit tenants with long-term leases.",
    slug: "retail",
  },
  {
    title: "Office Buildings",
    benefit:
      "Class A, B, and medical office properties. Professional tenants with multi-year leases and built-in escalations.",
    slug: "office",
  },
  {
    title: "DST Investments",
    benefit:
      "Delaware Statutory Trust fractional ownership. Passive income without management responsibilities, ideal for hands-off investors.",
    slug: "dst-investments",
  },
  {
    title: "Mixed-Use Properties",
    benefit:
      "Combined retail, office, and residential assets. Diversified income streams with reduced single-tenant risk.",
    slug: "mixed-use",
  },
];

const faqs = [
  {
    question: "What is a 1031 exchange?",
    answer:
      "A 1031 exchange, named after Section 1031 of the Internal Revenue Code, allows real estate investors to defer capital gains taxes when selling an investment property by reinvesting the proceeds into a like-kind replacement property. This powerful tax deferral strategy preserves equity for continued investment growth.",
  },
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "The 45-day identification period begins the day the relinquished property closes and requires a written identification of replacement candidates delivered to the intermediary by midnight of day 45. The 180-day exchange period runs concurrently and ends on the 180th calendar day or the tax filing date, whichever comes first, unless an extension is properly filed.",
  },
  {
    question: "What is a qualified intermediary?",
    answer:
      "A qualified intermediary (QI) is a neutral third party who holds the exchange proceeds between the sale of your relinquished property and the purchase of your replacement property. The QI ensures proper fund segregation and helps maintain IRS compliance throughout your exchange.",
  },
  {
    question: "What property types qualify for a 1031 exchange?",
    answer:
      "Most investment and business real estate qualifies for 1031 treatment, including multifamily, retail, industrial, office, land, and mixed-use properties. The key requirement is that both properties must be held for investment or business use—not personal residences.",
  },
  {
    question: "How do you help with property identification?",
    answer:
      "We help identify replacement properties that meet your investment criteria, timeline, and tax deferral goals. Our team sources options across all asset classes and coordinates with brokers, lenders, and your advisors to ensure timely identification within the 45-day window.",
  },
  {
    question: "What is boot and how can it be avoided?",
    answer:
      "Boot is taxable gain that occurs when you receive cash, reduce debt, or acquire property of lesser value in your exchange. We help structure exchanges to minimize or eliminate boot through proper debt replacement planning and equity reinvestment strategies.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  url: SITE_DOMAIN,
  logo: `${SITE_DOMAIN}/1031-exchange-of-phoenix-logo.png`,
  telephone: PHONE_NUMBER,
  email: SUPPORT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: OFFICE_ADDRESS_LINE_1,
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    postalCode: "85024",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/1031-exchange-of-phoenix",
    "https://www.facebook.com/1031exchangephoenix",
  ],
  areaServed: {
    "@type": "State",
    name: "Arizona",
  },
  serviceType: "1031 Exchange Advisory Services",
  description: "Full-service 1031 exchange coordination for Arizona investors. Property identification, qualified intermediary guidance, deadline management, and tax deferral strategies.",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_DOMAIN}#localbusiness`,
  name: COMPANY_NAME,
  image: `${SITE_DOMAIN}/1031-exchange-of-phoenix-logo.png`,
  url: SITE_DOMAIN,
  telephone: PHONE_NUMBER,
  email: SUPPORT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: OFFICE_ADDRESS_LINE_1,
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    postalCode: "85024",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.509024",
    longitude: "-112.027461",
  },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: COMPANY_NAME,
  provider: {
    "@id": `${SITE_DOMAIN}#localbusiness`,
  },
  serviceType: "1031 Exchange Advisory Services",
  areaServed: {
    "@type": "State",
    name: "Arizona",
  },
  description: "Full-service 1031 exchange coordination including property identification, qualified intermediary guidance, deadline management, and tax deferral strategies for Arizona investors.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1031 Exchange of Phoenix",
  url: SITE_DOMAIN,
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://1031exchangeofphoenix.com/search?query={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Page() {
  return (
    <div className="relative bg-white text-mansion-charcoal">
      <main className="relative">
        {/* Hero Section - Mansion Global full-bleed style */}
        <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/1031-exchange-of-phoenix-az.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>
          
          {/* Hero Content Overlay */}
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="max-w-2xl">
                <span className="section-label mb-4 inline-block text-white/80">
                  Phoenix 1031 Exchange Specialists
                </span>
                <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                  Expert 1031 Exchange Services in Phoenix, Arizona.
                </h1>
                <p className="mt-6 text-lg text-white/90 sm:text-xl">
                  Full-service 1031 exchange coordination for Arizona investors. Property identification, qualified intermediary guidance, deadline management, and tax deferral strategies for all property types.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={`tel:${PHONE_NUMBER_URI}`}
                    className="inline-flex items-center justify-center gap-2 bg-mansion-gold px-8 py-4 text-base font-semibold text-white transition hover:bg-mansion-gold-dark"
                    aria-label={`Call ${PHONE_NUMBER}`}
                  >
                    <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                    Call {PHONE_NUMBER}
                  </Link>
                  <Link
                    href="#lead-form"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-mansion-charcoal"
                  >
                    Start My Exchange
                    <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Content container */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* TOP STORIES Style Section - Why Choose Us */}
        <section className="border-b border-gray-200 pb-16">
          <p className="section-label mb-6">Why Choose Us</p>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Featured large card */}
            <div className="group">
              <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl lg:text-5xl">
                Why Phoenix Investors Trust Us.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-mansion-charcoal/70">
                We provide comprehensive 1031 exchange services for Arizona investors. From property identification to qualified intermediary coordination, we guide you through every step of your tax-deferred exchange.
              </p>
              <div className="mt-6 border-t border-gray-200 pt-6 text-sm text-mansion-charcoal/60">
                A 1031 exchange defers federal and Arizona income tax on qualifying
                real property. It does not remove state or county transfer taxes.{" "}
                <Link
                  href="https://azdor.gov/transaction-privilege-tax"
                  className="font-medium text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Review Arizona Department of Revenue guidance
                </Link>
              </div>
            </div>
            {/* Feature cards grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Property Identification",
                  description:
                    "Expert guidance finding replacement properties across all asset classes. Multifamily, retail, industrial, office, and more.",
                  icon: MapPinIcon,
                },
                {
                  title: "Qualified Intermediary Coordination",
                  description:
                    "We work with trusted QIs to ensure proper exchange structuring, fund segregation, and IRS compliance throughout your exchange.",
                  icon: SearchIcon,
                },
                {
                  title: "Deadline Management",
                  description:
                    "Never miss your 45-day identification or 180-day closing deadlines. Our timeline tools keep your exchange on track.",
                  icon: ShieldCheckIcon,
                },
                {
                  title: "Tax Deferral Strategy",
                  description:
                    "Maximize tax deferral through proper exchange structuring. Boot analysis, debt replacement planning, and advisor coordination.",
                  icon: ClockIcon,
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group border border-gray-100 bg-white p-5 transition hover:border-mansion-gold/30 hover:shadow-editorial"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-mansion-gold/10 text-mansion-gold">
                      <feature.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-lg text-mansion-charcoal">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section - Editorial style */}
        <section className="border-b border-gray-200 py-16">
          <p className="section-label mb-6">The Process</p>
          <header className="mb-10 max-w-3xl">
            <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl">
              How the 1031 Exchange Works.
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Each stage demands clear documentation, segregation of proceeds,
              and milestone precision.
            </p>
          </header>
          <div className="grid gap-px bg-gray-200 md:grid-cols-3">
            {[
              {
                title: "Sell the Relinquished Property",
                description:
                  "Funds held by a qualified intermediary.",
                icon: LandmarkIcon,
              },
              {
                title: "Identify Replacements Within 45 Days",
                description:
                  "Submit formal identification list.",
                icon: MapPinIcon,
              },
              {
                title: "Close Within 180 Days",
                description:
                  "Acquire replacement under IRS rules.",
                icon: CalendarIcon,
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-4xl text-mansion-gold">
                    0{index + 1}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center bg-mansion-gold/10 text-mansion-gold">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mt-6 font-serif text-xl text-mansion-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-mansion-charcoal/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 border border-mansion-gold/20 bg-mansion-gold/5 p-6 text-sm text-mansion-charcoal/80 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-mansion-gold-dark">
                Learn more in IRS Form 8824 and Like-Kind Property rules.
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <Link
                  href="https://www.irs.gov/forms-pubs/about-form-8824"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  IRS Form 8824 &rarr;
                </Link>
                <Link
                  href="https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  IRS Like-Kind Exchange Tips &rarr;
                </Link>
              </div>
            </div>
            <p className="text-xs text-mansion-charcoal/60">
              See Rev. Proc. 2008-16 for vacation home safe harbor.
            </p>
          </div>
        </section>

        {/* Services Section - Mansion Global editorial style */}
        <section className="border-b border-gray-200 py-16">
          <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="section-label mb-3">Our Services</p>
              <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl">
                Complete 1031 Exchange Services.
              </h2>
              <p className="mt-4 text-base text-mansion-charcoal/70">
                From initial consultation to closing, we provide comprehensive support for your 1031 exchange. Property identification, QI coordination, and deadline management for all property types.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold hover:text-mansion-gold-dark"
            >
              View all services
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </header>
          <HomepageServiceGrid services={highlightedServices as Service[]} />
        </section>

        {/* Property Types - Mansion Global "Latest in Lifestyle" horizontal scroll style */}
        <section className="border-b border-gray-200 py-16">
          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="section-label mb-3">Property Types</p>
              <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl">
                Replacement Property Options.
              </h2>
              <p className="mt-4 text-base text-mansion-charcoal/70">
                We help identify replacement properties across all asset classes. Whether you're seeking passive income, appreciation, or a combination, we find properties that meet your investment goals.
              </p>
            </div>
            <Link
              href="/property-types"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold hover:text-mansion-gold-dark"
            >
              Explore property types
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </header>
          
          {/* Horizontal scrolling carousel - Mansion Global style */}
          <HomepagePropertyTypes propertyTypes={propertyTypes} />
        </section>

        {/* Explore Top Markets - Mansion Global style city cards */}
        <section className="border-b border-gray-200 py-16">
          <header className="mb-8">
            <p className="section-label mb-3">Service Areas</p>
            <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl">
              Phoenix Metro 1031 Exchange Services.
            </h2>
            <p className="mt-4 max-w-3xl text-base text-mansion-charcoal/70">
              Comprehensive 1031 exchange support across the Phoenix metropolitan area. From downtown Phoenix to Scottsdale, Tempe, and the East Valley, we help Arizona investors navigate their tax-deferred exchanges.
            </p>
          </header>
          <HomepageServiceArea locations={locations} />
        </section>

        {/* Resources Section - Editorial style cards */}
        <section className="py-16">
          <p className="section-label mb-8">Resources</p>
          <div className="grid gap-px bg-gray-200 md:grid-cols-2">
            <Link
              href="/resources/calculator"
              className="group flex h-full flex-col justify-between bg-white p-8 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-mansion-gold/10 text-mansion-gold">
                  <CalculatorIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl text-mansion-charcoal">
                  Capital Gains Estimator
                </h3>
              </div>
              <p className="mt-4 text-sm text-mansion-charcoal/70">
                Model potential liability, boot exposure, and reinvestment targets
                before committing to the exchange.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
                Open estimator
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/resources/timeline"
              className="group flex h-full flex-col justify-between bg-white p-8 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-mansion-gold/10 text-mansion-gold">
                  <ClockIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl text-mansion-charcoal">
                  Timeline Reminders
                </h3>
              </div>
              <p className="mt-4 text-sm text-mansion-charcoal/70">
                Receive calendar prompts for the 45 day identification and 180 day
                completion milestones.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
                Schedule reminders
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </section>

        {/* Widgets Section */}
        <section className="border-b border-gray-200 py-16">
          <p className="section-label mb-8">Planning Tools</p>
          <div className="grid gap-6 lg:grid-cols-2">
            <DeadlineCalculator />
            <TimelineTracker />
          </div>
          <div className="mt-6">
            <IdentificationRules />
          </div>
        </section>

        {/* Exchange Tools Section - Mansion Global featured style */}
        <section className="border-b border-gray-200 py-16">
          <header className="mb-10">
            <p className="section-label mb-3">Exchange Tools</p>
            <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl">
              Exchange Tools
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Interactive calculators to help you understand boot, estimate costs, and validate
              identification compliance.
            </p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/tools/boot-calculator"
              className="group relative overflow-hidden bg-mansion-navy p-6 text-white transition hover:bg-mansion-navy-light"
            >
              <ScaleIcon className="mb-4 h-10 w-10 text-mansion-gold" aria-hidden="true" />
              <h3 className="mb-2 font-serif text-xl text-white">Boot Calculator</h3>
              <p className="text-sm text-white/80">
                Calculate boot including cash received and mortgage relief, and estimate tax
                implications.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold-light">
                Use Calculator
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/tools/exchange-cost-estimator"
              className="group relative overflow-hidden bg-mansion-navy p-6 text-white transition hover:bg-mansion-navy-light"
            >
              <CalculatorIcon className="mb-4 h-10 w-10 text-mansion-gold" aria-hidden="true" />
              <h3 className="mb-2 font-serif text-xl text-white">Exchange Cost Estimator</h3>
              <p className="text-sm text-white/80">
                Estimate qualified intermediary fees, escrow costs, title insurance, and
                recording fees.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold-light">
                Use Calculator
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/tools/identification-rules-checker"
              className="group relative overflow-hidden bg-mansion-navy p-6 text-white transition hover:bg-mansion-navy-light"
            >
              <ShieldCheckIcon className="mb-4 h-10 w-10 text-mansion-gold" aria-hidden="true" />
              <h3 className="mb-2 font-serif text-xl text-white">
                Identification Rules Checker
              </h3>
              <p className="text-sm text-white/80">
                Validate your identification against the three property, two hundred percent, or
                ninety five percent rules.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold-light">
                Use Checker
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold hover:text-mansion-gold-dark"
            >
              View all tools
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* FAQ Section - Clean editorial style */}
        <section className="border-b border-gray-200 py-16">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl">
            Frequently Asked Questions.
          </h2>
          <div className="mt-10 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group py-6"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg text-mansion-charcoal">
                  <span className="font-serif">
                    {faq.question}
                  </span>
                  <span className="flex h-8 w-8 flex-none items-center justify-center border border-gray-300 text-mansion-gold transition group-open:rotate-45 group-open:border-mansion-gold">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <p className="mt-4 pr-12 text-sm leading-relaxed text-mansion-charcoal/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="contact-form" className="py-16">
          <div className="mx-auto max-w-4xl">
            <p className="section-label mb-3 text-center">Get Started</p>
            <LeadForm />
          </div>
        </section>

        {/* Close content container */}
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
