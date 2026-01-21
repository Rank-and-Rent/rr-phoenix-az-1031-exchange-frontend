import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services, type Service } from "@/lib/services";
import { locations } from "@/lib/locations";
import { getPropertyTypeImageSrc } from "@/lib/utils";
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
import { DeadlineCalculator } from "@/components/widgets/deadline-calculator";
import { IdentificationRules } from "@/components/widgets/identification-rules";
import { IdentificationLetterHelper } from "@/components/widgets/identification-letter-helper";
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
  title: "Single Tenant NNN Retail for 1031 Exchange | Net Lease Property Listings",
  description:
    "Find high-quality single tenant NNN retail and shopping center properties nationwide for your 1031 exchange. Hands-off ownership with predictable income. Fast property identification and deal flow.",
  keywords: [
    "single tenant retail for sale",
    "NNN investment property for sale",
    "net lease property listings",
    "1031 exchange NNN properties",
    "single tenant net lease",
    "triple net retail",
    "sale leaseback",
    "ground lease",
  ],
  alternates: {
    canonical: SITE_DOMAIN,
  },
  openGraph: {
    type: "website",
    url: SITE_DOMAIN,
    title: "Single Tenant NNN Retail for 1031 Exchange | Net Lease Property Listings",
    description:
      "Find high-quality single tenant NNN retail and shopping center properties nationwide for your 1031 exchange. Hands-off ownership with predictable income.",
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
    title: "Single Tenant NNN Retail for 1031 Exchange | Net Lease Property Listings",
    description:
      "Find high-quality single tenant NNN retail and shopping center properties nationwide for your 1031 exchange. Hands-off ownership with predictable income.",
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

const footerLocations = locations.slice(0, 6);

type PropertyType = {
  title: string;
  benefit: string;
  slug: string;
};

const propertyTypes: PropertyType[] = [
  {
    title: "Single Tenant NNN Retail",
    benefit:
      "Triple-net retail properties with credit tenants. Tenant handles taxes, insurance, and maintenance for truly hands-off ownership.",
    slug: "single-tenant-nnn-retail",
  },
  {
    title: "Shopping Centers",
    benefit:
      "NNN shopping centers with essential retail tenants. Predictable cash flow from convenience, pharmacy, and QSR brands.",
    slug: "shopping-centers",
  },
  {
    title: "Sale Leaseback Properties",
    benefit:
      "Corporate sale leasebacks with long-term NNN leases. Investment-grade tenants with predictable rent escalations.",
    slug: "sale-leaseback",
  },
  {
    title: "Ground Leases",
    benefit:
      "Ground lease opportunities with zero cash flow options. Long-term land leases with built-in rent increases.",
    slug: "ground-lease",
  },
  {
    title: "Convenience & QSR",
    benefit:
      "Convenience stores and quick service restaurants with strong brand recognition. Essential retail with recession-resistant income.",
    slug: "convenience-qsr",
  },
  {
    title: "Pharmacy & Essential Retail",
    benefit:
      "Pharmacy chains and essential retail properties. Credit tenants with long-term leases and minimal management requirements.",
    slug: "pharmacy-essential-retail",
  },
];

const faqs = [
  {
    question: "What is a single tenant NNN retail property?",
    answer:
      "A single tenant NNN (triple-net) retail property is a commercial real estate investment where one tenant leases the entire building and is responsible for property taxes, insurance, and maintenance. The landlord collects rent without day-to-day management responsibilities, making it ideal for hands-off 1031 exchange investors.",
  },
  {
    question: "Why choose NNN retail for a 1031 exchange?",
    answer:
      "NNN retail properties provide predictable cash flow, minimal management requirements, and credit tenants with long-term leases. They're ideal for 1031 exchange buyers who want simple, hands-off ownership while deferring capital gains taxes.",
  },
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "The 45 day identification period begins the day the relinquished property closes and requires a written identification of replacement candidates delivered to the intermediary by midnight of day 45. The 180 day exchange period runs concurrently and ends on the 180th calendar day or the tax filing date, whichever comes first, unless an extension is properly filed.",
  },
  {
    question: "Do you source properties nationwide?",
    answer:
      "Yes. We help 1031 exchange buyers find single tenant NNN retail properties across all 50 states. Our nationwide network includes convenience stores, QSR, pharmacy chains, and essential retail properties with credit tenants.",
  },
  {
    question: "What is a sale leaseback?",
    answer:
      "A sale leaseback is when a company sells its property and immediately leases it back under a long-term NNN lease. This provides the seller with liquidity while maintaining operational control, and gives the buyer a credit tenant with predictable income.",
  },
  {
    question: "What is zero cash flow in a ground lease?",
    answer:
      "Zero cash flow ground leases allow investors to defer taxes through a 1031 exchange while the ground lease payments offset other income, potentially resulting in minimal or zero taxable income. This strategy works for investors seeking tax deferral without current cash flow.",
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
    "@type": "Country",
    name: "United States",
  },
  serviceType: "1031 Exchange Advisory Services",
  description: "Nationwide 1031 exchange property identification and advisory services specializing in single tenant NNN retail, shopping centers, and net lease properties.",
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
  serviceType: "1031 Exchange Property Identification and Advisory",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  description: "Nationwide 1031 exchange property identification services for single tenant NNN retail, shopping centers, sale leasebacks, ground leases, and net lease properties.",
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
                  Nationwide Single Tenant NNN Retail Property Specialists
                </span>
                <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                  Find Single Tenant NNN Retail Properties for Your 1031 Exchange.
                </h1>
                <p className="mt-6 text-lg text-white/90 sm:text-xl">
                  We help 1031 exchange buyers quickly find high-quality single tenant net lease retail properties nationwide. Hands-off ownership where tenants handle taxes, insurance, and maintenance. You collect predictable rent.
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

          {/* Navigation Arrows - Mansion Global style */}
          <button className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/90 text-mansion-charcoal transition hover:bg-white" aria-label="Previous">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/90 text-mansion-charcoal transition hover:bg-white" aria-label="Next">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
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
                Why 1031 Exchange Buyers Choose Us.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-mansion-charcoal/70">
                We specialize in helping unrepresented 1031 exchange buyers quickly find high-quality single tenant NNN retail properties nationwide. Fast property identification, trusted guidance, and speed to close.
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
                  title: "Nationwide NNN Retail Network",
                  description:
                    "Access to single tenant net lease retail properties across all 50 states. Convenience, QSR, pharmacy, and essential retail brands.",
                  icon: MapPinIcon,
                },
                {
                  title: "Fast Property Identification",
                  description:
                    "Quick sourcing of replacement properties that match your timeline, credit requirements, lease terms, and yield targets.",
                  icon: SearchIcon,
                },
                {
                  title: "Hands-Off Ownership",
                  description:
                    "Triple-net properties where tenants handle taxes, insurance, and maintenance. Collect rent without day-to-day management.",
                  icon: ShieldCheckIcon,
                },
                {
                  title: "45-Day Deadline Support",
                  description:
                    "Structured identification strategies to meet your 45-day deadline. Pre-qualified properties ready for immediate consideration.",
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
                NNN Property Sourcing Services.
              </h2>
              <p className="mt-4 text-base text-mansion-charcoal/70">
                Fast property identification and deal flow for 1031 exchange buyers seeking single tenant NNN retail properties. Nationwide inventory and expert guidance.
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
                Single Tenant NNN Retail Property Types.
              </h2>
              <p className="mt-4 text-base text-mansion-charcoal/70">
                High-quality single tenant net lease retail properties nationwide. Credit tenants, long-term leases, and hands-off ownership for 1031 exchange buyers.
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
          <div className="relative -mx-6 lg:-mx-8">
            <div className="mansion-scroll flex gap-4 overflow-x-auto px-6 pb-4 lg:px-8">
              {propertyTypes.map((property) => (
                <Link
                  key={property.slug}
                  href={`/property-types/${property.slug}`}
                  className="group flex-none"
                  style={{ width: 'calc(33.333% - 1rem)', minWidth: '280px' }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={getPropertyTypeImageSrc(property.slug)}
                      alt={property.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mansion-gold">
                        NNN Retail
                      </p>
                      <h3 className="font-serif text-xl text-white">
                        {property.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm leading-relaxed text-mansion-charcoal/70">
                      {property.benefit}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {/* Carousel navigation arrows */}
            <button className="absolute left-2 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white shadow-editorial transition hover:shadow-editorial-hover lg:left-4" aria-label="Previous">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="absolute right-2 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white shadow-editorial transition hover:shadow-editorial-hover lg:right-4" aria-label="Next">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        {/* Explore Top Markets - Mansion Global style city cards */}
        <section className="border-b border-gray-200 py-16">
          <header className="mb-8">
            <p className="section-label mb-3">Explore Top Markets</p>
            <h2 className="font-serif text-3xl text-mansion-charcoal sm:text-4xl">
              Nationwide Single Tenant NNN Retail Properties.
            </h2>
            <p className="mt-4 max-w-3xl text-base text-mansion-charcoal/70">
              We help 1031 exchange buyers nationwide find single tenant net lease retail properties. From Phoenix to New York, we source high-quality NNN properties with credit tenants, long-term leases, and hands-off ownership structures.
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
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <IdentificationRules />
            <IdentificationLetterHelper />
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

        {/* Contact Info Section - Before main footer */}
        <section className="border-t border-gray-200 py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-mansion-charcoal">1031 Exchange of Phoenix</h2>
              <p className="mt-4 text-sm text-mansion-charcoal/70">
                Precision guidance for Arizona investors seeking to preserve
                equity and stay aligned with IRS requirements.
              </p>
              <div className="mt-6 space-y-2 text-sm text-mansion-charcoal/80">
                <p>
                  Phone:{" "}
                  <Link
                    href={`tel:${PHONE_NUMBER_URI}`}
                    className="font-medium text-mansion-gold hover:text-mansion-gold-dark"
                  >
                    {PHONE_NUMBER}
                  </Link>
                </p>
                <p>
                  Email:{" "}
                  <Link
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="font-medium text-mansion-gold hover:text-mansion-gold-dark"
                  >
                    {SUPPORT_EMAIL}
                  </Link>
                </p>
                <p>Hours: {OFFICE_HOURS}</p>
              </div>
              {HAS_STAFFED_OFFICE ? (
                <div className="mt-6 border border-gray-200 bg-gray-50 p-4 text-sm text-mansion-charcoal/80">
                  <p className="font-semibold text-mansion-charcoal">
                    Phoenix Office
                  </p>
                  <p>{OFFICE_ADDRESS_LINE_1}</p>
                  <p>{OFFICE_ADDRESS_LINE_2}</p>
                </div>
              ) : (
                <p className="mt-6 border border-gray-200 bg-gray-50 p-4 text-sm text-mansion-charcoal/80">
                  Statewide advisory support conducted through scheduled
                  consultations and virtual meetings.
                </p>
              )}
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-mansion-charcoal/50">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm text-mansion-charcoal/70">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-mansion-gold"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/property-types"
                    className="hover:text-mansion-gold"
                  >
                    Property Types
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="hover:text-mansion-gold"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/locations"
                    className="hover:text-mansion-gold"
                  >
                    Locations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-mansion-charcoal/50">Service Areas</h3>
              <ul className="mt-4 space-y-2 text-sm text-mansion-charcoal/70">
                {footerLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="hover:text-mansion-gold"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-mansion-charcoal/60">
            <p>
              Compliance resources:{" "}
              <Link
                href="https://www.irs.gov/forms-pubs/about-form-8824"
                className="text-mansion-gold hover:text-mansion-gold-dark"
              >
                IRS Form 8824
              </Link>{" "}
              |{" "}
              <Link
                href="https://www.irs.gov/tax-professionals/section-1031-like-kind-exchanges"
                className="text-mansion-gold hover:text-mansion-gold-dark"
              >
                IRS Like-Kind Exchanges
              </Link>
            </p>
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
