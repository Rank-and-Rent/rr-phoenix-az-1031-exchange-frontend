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

const leadFormScript = `
  document.addEventListener("DOMContentLoaded", function () {
    const formElement = document.getElementById("lead-form");
    if (!formElement || !(formElement instanceof HTMLFormElement)) return;
    const successMessage = document.getElementById("lead-form-success");
    const errorMessage = document.getElementById("lead-form-error");
    const submitButton = formElement.querySelector("button[type='submit']");

    formElement.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
      }

      if (successMessage) successMessage.classList.add("hidden");
      if (errorMessage) errorMessage.classList.add("hidden");

      if (submitButton) {
        submitButton.setAttribute("data-loading", "true");
        submitButton.classList.add("pointer-events-none", "opacity-70");
      }

      const formData = new FormData(formElement);

      try {
        const response = await fetch(formElement.getAttribute("action") || "/api/lead", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json",
          },
        });

        if (response.ok) {
          if (successMessage) successMessage.classList.remove("hidden");
          formElement.reset();
        } else {
          if (errorMessage) errorMessage.classList.remove("hidden");
        }
      } catch (error) {
        if (errorMessage) errorMessage.classList.remove("hidden");
      } finally {
        if (submitButton) {
          submitButton.removeAttribute("data-loading");
          submitButton.classList.remove("pointer-events-none", "opacity-70");
        }
      }
    });

    const inputs = formElement.querySelectorAll("input, textarea");
    inputs.forEach(function (field) {
      field.addEventListener("invalid", function () {
        field.classList.add("ring-2", "ring-[#C88735]");
      });

      field.addEventListener("input", function () {
        field.classList.remove("ring-2", "ring-[#C88735]");
      });
    });
  });
`;

export default function Page() {
  return (
    <div className="relative bg-[#F5F3EF] text-[#2A2A2A]">
      <main className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-16 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EF] via-white to-[#F5F3EF]/70" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-[#E6A445]/20 blur-3xl" />
            <div className="absolute -left-32 bottom-10 h-[26rem] w-[26rem] rounded-full bg-[#006E7F]/10 blur-[160px]" />
          </div>
        </div>

        <section
          
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-10 shadow-[0_40px_120px_rgba(25,25,25,0.08)] backdrop-blur-md sm:p-14"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src="/1031-exchange-of-phoenix-az.jpg"
              alt=""
              fill
              className="object-cover opacity-20"
              sizes="100vw"
              priority
            />
          </div>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-[#006E7F]/10 px-4 py-2 text-sm font-medium text-[#006E7F]"
              >
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                Nationwide Single Tenant NNN Retail Property Specialists
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl leading-tight text-[#2A2A2A] sm:text-5xl lg:text-6xl">
                  Find Single Tenant NNN Retail Properties for Your 1031 Exchange.
                </h1>
                <p className="text-lg text-[#2A2A2A]/80 sm:text-xl">
                  We help 1031 exchange buyers quickly find high-quality single tenant net lease retail properties nationwide. Hands-off ownership where tenants handle taxes, insurance, and maintenance. You collect predictable rent.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`tel:${PHONE_NUMBER_URI}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006E7F] px-6 py-3 text-base font-medium text-white transition hover:bg-[#005563] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  aria-label={`Call ${PHONE_NUMBER}`}
                >
                  <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                  Call {PHONE_NUMBER}
                </Link>
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2A2A2A]/15 bg-white/70 px-6 py-3 text-base font-medium text-[#2A2A2A] transition hover:border-[#006E7F] hover:text-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Start My Exchange
                  <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section  className="space-y-10">
          <header className="max-w-3xl space-y-4">
            <h2 className="text-3xl text-[#2A2A2A] sm:text-4xl">
              Why 1031 Exchange Buyers Choose Us.
            </h2>
            <p className="text-base text-[#2A2A2A]/75">
              We specialize in helping unrepresented 1031 exchange buyers quickly find high-quality single tenant NNN retail properties nationwide. Fast property identification, trusted guidance, and speed to close.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              {
                title: "Credit Tenant Focus",
                description:
                  "Investment-grade tenants with strong credit ratings. Stable brands with predictable income and minimal risk.",
                icon: LandmarkIcon,
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-white/70 p-6 shadow-[0_12px_40px_rgba(24,24,24,0.06)] transition hover:border-[#E6A445]/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#F5F3EF] text-[#006E7F]">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl text-[#2A2A2A]">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-[#2A2A2A]/75">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-[#2A2A2A]/10 bg-white/70 p-6 text-sm text-[#2A2A2A]/75">
            A 1031 exchange defers federal and Arizona income tax on qualifying
            real property. It does not remove state or county transfer taxes.{" "}
            <Link
              href="https://azdor.gov/transaction-privilege-tax"
              className="font-semibold text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            >
              Review Arizona Department of Revenue guidance
            </Link>
            .
          </div>
        </section>

        <section  className="space-y-10">
          <header className="max-w-3xl space-y-4">
            <h2 className="text-3xl text-[#2A2A2A] sm:text-4xl">
              How the 1031 Exchange Works.
            </h2>
            <p className="text-base text-[#2A2A2A]/75">
              Each stage demands clear documentation, segregation of proceeds,
              and milestone precision.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
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
                className="relative rounded-2xl border border-white/70 bg-white/70 p-6 shadow-[0_12px_40px_rgba(24,24,24,0.08)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#006E7F]/10 text-[#006E7F]">
                    <step.icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-[#E6A445]">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-xl text-[#2A2A2A]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[#2A2A2A]/75">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-6 text-sm text-[#2A2A2A]/80 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-[#006E7F]">
                Learn more in IRS Form 8824 and Like-Kind Property rules.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Link
                  href="https://www.irs.gov/forms-pubs/about-form-8824"
                  className="inline-flex items-center gap-1 text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  IRS Form 8824
                </Link>
                <Link
                  href="https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips"
                  className="inline-flex items-center gap-1 text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  IRS Like-Kind Exchange Tips
                </Link>
              </div>
            </div>
            <p className="text-xs text-[#2A2A2A]/70">
              See Rev. Proc. 2008-16 for vacation home safe harbor.
            </p>
          </div>
        </section>

        <section  className="space-y-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl text-[#2A2A2A] sm:text-4xl">
                NNN Property Sourcing Services.
              </h2>
              <p className="text-base text-[#2A2A2A]/75">
                Fast property identification and deal flow for 1031 exchange buyers seeking single tenant NNN retail properties. Nationwide inventory and expert guidance.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            >
              View all services
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </header>
          <HomepageServiceGrid services={highlightedServices as Service[]} />
        </section>

        <section  className="space-y-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl text-[#2A2A2A] sm:text-4xl">
                Single Tenant NNN Retail Property Types.
              </h2>
              <p className="text-base text-[#2A2A2A]/75">
                High-quality single tenant net lease retail properties nationwide. Credit tenants, long-term leases, and hands-off ownership for 1031 exchange buyers.
              </p>
            </div>
            <Link
              href="/property-types"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            >
              Explore property types
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {propertyTypes.map((property) => (
              <Link
                key={property.slug}
                href={`/property-types/${property.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-[0_12px_44px_rgba(24,24,24,0.07)] transition hover:border-[#E6A445]/40 hover:shadow-[0_18px_52px_rgba(24,24,24,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={getPropertyTypeImageSrc(property.slug)}
                    alt={property.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl text-[#2A2A2A]">
                      {property.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#2A2A2A]/75">
                      {property.benefit}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#006E7F]">
                    Learn more
                    <ArrowRightIcon
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section  className="space-y-6">
          <h2 className="text-3xl text-[#2A2A2A] sm:text-4xl">
            Nationwide Single Tenant NNN Retail Properties.
          </h2>
          <p className="max-w-3xl text-base text-[#2A2A2A]/75">
            We help 1031 exchange buyers nationwide find single tenant net lease retail properties. From Phoenix to New York, we source high-quality NNN properties with credit tenants, long-term leases, and hands-off ownership structures.
          </p>
          <HomepageServiceArea locations={locations} />
        </section>

        <section  className="grid gap-6 md:grid-cols-2">
          <Link
            href="/resources/calculator"
            className="group flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_44px_rgba(24,24,24,0.07)] transition hover:border-[#E6A445]/40 hover:shadow-[0_18px_52px_rgba(24,24,24,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#006E7F]/10 text-[#006E7F]">
                <CalculatorIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl text-[#2A2A2A]">
                Capital Gains Estimator
              </h3>
            </div>
            <p className="mt-4 text-sm text-[#2A2A2A]/75">
              Model potential liability, boot exposure, and reinvestment targets
              before committing to the exchange.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#006E7F]">
              Open estimator
              <ArrowRightIcon
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
          <Link
            href="/resources/timeline"
            className="group flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_44px_rgba(24,24,24,0.07)] transition hover:border-[#E6A445]/40 hover:shadow-[0_18px_52px_rgba(24,24,24,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#006E7F]/10 text-[#006E7F]">
                <ClockIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl text-[#2A2A2A]">
                Timeline Reminders
              </h3>
            </div>
            <p className="mt-4 text-sm text-[#2A2A2A]/75">
              Receive calendar prompts for the 45 day identification and 180 day
              completion milestones.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#006E7F]">
              Schedule reminders
              <ArrowRightIcon
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </section>

        <section  className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <DeadlineCalculator />
            <TimelineTracker />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <IdentificationRules />
            <IdentificationLetterHelper />
          </div>
        </section>

        <section  className="space-y-8">
          <header className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-[#2A2A2A] sm:text-4xl">
              Exchange Tools
            </h2>
            <p className="text-base text-[#2A2A2A]/75">
              Interactive calculators to help you understand boot, estimate costs, and validate
              identification compliance.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/tools/boot-calculator"
              className="group flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-gradient-to-br from-[#006E7F] to-[#005563] p-6 text-white shadow-[0_12px_44px_rgba(24,24,24,0.07)] transition hover:-translate-y-1 hover:border-[#E6A445]/40 hover:shadow-[0_18px_52px_rgba(24,24,24,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            >
              <div>
                <ScaleIcon className="mb-4 h-10 w-10 text-[#E6A445]" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-semibold text-white">Boot Calculator</h3>
                <p className="text-sm text-white/90">
                  Calculate boot including cash received and mortgage relief, and estimate tax
                  implications.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                Use Calculator
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/tools/exchange-cost-estimator"
              className="group flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-gradient-to-br from-[#006E7F] to-[#005563] p-6 text-white shadow-[0_12px_44px_rgba(24,24,24,0.07)] transition hover:-translate-y-1 hover:border-[#E6A445]/40 hover:shadow-[0_18px_52px_rgba(24,24,24,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            >
              <div>
                <CalculatorIcon className="mb-4 h-10 w-10 text-[#E6A445]" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-semibold text-white">Exchange Cost Estimator</h3>
                <p className="text-sm text-white/90">
                  Estimate qualified intermediary fees, escrow costs, title insurance, and
                  recording fees.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                Use Calculator
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/tools/identification-rules-checker"
              className="group flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-gradient-to-br from-[#006E7F] to-[#005563] p-6 text-white shadow-[0_12px_44px_rgba(24,24,24,0.07)] transition hover:-translate-y-1 hover:border-[#E6A445]/40 hover:shadow-[0_18px_52px_rgba(24,24,24,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            >
              <div>
                <ShieldCheckIcon className="mb-4 h-10 w-10 text-[#E6A445]" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Identification Rules Checker
                </h3>
                <p className="text-sm text-white/90">
                  Validate your identification against the three property, two hundred percent, or
                  ninety five percent rules.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                Use Checker
                <ArrowRightIcon
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            >
              View all tools
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section  className="space-y-8">
          <h2 className="text-3xl text-[#2A2A2A] sm:text-4xl">
            Frequently Asked Questions.
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(24,24,24,0.06)] transition focus-within:border-[#E6A445]/40"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg text-[#2A2A2A]">
                  <span>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}. {faq.question}
                  </span>
                  <ArrowRightIcon
                    className="h-5 w-5 text-[#006E7F] transition group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 text-sm text-[#2A2A2A]/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          
          id="lead-form"
          aria-labelledby="lead-form-title"
          className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-10 shadow-[0_32px_120px_rgba(24,24,24,0.08)]"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#F5F3EF] to-white" />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-[#006E7F]/10 px-4 py-2 text-sm font-medium text-[#006E7F]"
              >
                Request Exchange Guidance
              </span>
              <div className="space-y-4">
                <h2
                  id="lead-form-title"
                  className="text-3xl text-[#2A2A2A] sm:text-4xl"
                >
                  Speak with a dedicated exchange coordinator.
                </h2>
                <p className="text-base text-[#2A2A2A]/75">
                  Share your transaction timeline and property profile. One of our
                  Phoenix-based specialists will respond with a confirmation and
                  next steps within one business day.
                </p>
              </div>
              <div className="rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-4 text-sm text-[#2A2A2A]/80">
                Educational content only. Not tax or legal advice.
              </div>
            </div>
            <form
              id="lead-form"
              method="post"
              action="/api/lead"
              className="space-y-5"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  description="Enter your full legal name as it appears on transaction documents."
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  description="We use this email to confirm deadlines and document delivery."
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  pattern="^\\+?[0-9\\-\\s\\(\\)]{7,}$"
                  description="Provide a direct line for time-sensitive identification and closing updates."
                />
                <FormField
                  label="City"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  description="Primary Arizona city associated with your exchange."
                />
              </div>
              <FormField
                label="Property Being Sold"
                name="property"
                type="text"
                required
                description="Describe the relinquished property type and approximate value."
              />
              <FormField
                label="Estimated Close Date"
                name="closeDate"
                type="date"
                required
                description="Select the projected closing date for the relinquished property."
              />
              <FormField
                label="Message"
                name="message"
                textarea
                rows={4}
                description="Share timeline specifics, replacement objectives, or advisory team contacts."
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E6A445] px-6 py-3 text-base font-semibold text-[#2A2A2A] transition hover:bg-[#C88735] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
              >
                Submit Request
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="space-y-2" aria-live="polite" role="status">
                <p
                  id="lead-form-success"
                  className="hidden rounded-full border border-[#006E7F]/30 bg-[#006E7F]/10 px-4 py-3 text-sm text-[#006E7F]"
                >
                  Thank you. Your request has been received. A coordinator will
                  respond shortly.
                </p>
                <p
                  id="lead-form-error"
                  className="hidden rounded-full border border-[#E6A445]/30 bg-[#E6A445]/15 px-4 py-3 text-sm text-[#2A2A2A]"
                >
                  We could not submit the form. Please call {PHONE_NUMBER} for
                  immediate assistance.
                </p>
              </div>
            </form>
          </div>
        </section>

        <footer
          
          className="space-y-10 rounded-3xl border border-white/70 bg-white/80 p-10 shadow-[0_32px_120px_rgba(24,24,24,0.07)]"
        >
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4 lg:col-span-2">
              <h2 className="text-2xl text-[#2A2A2A]">1031 Exchange of Phoenix</h2>
              <p className="text-sm text-[#2A2A2A]/75">
                Precision guidance for Arizona investors seeking to preserve
                equity and stay aligned with IRS requirements.
              </p>
              <div className="space-y-2 text-sm text-[#2A2A2A]/80">
                <p>
                  Phone:{" "}
                  <Link
                    href={`tel:${PHONE_NUMBER_URI}`}
                    className="font-medium text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    {PHONE_NUMBER}
                  </Link>
                </p>
                <p>
                  Email:{" "}
                  <Link
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="font-medium text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    {SUPPORT_EMAIL}
                  </Link>
                </p>
                <p>Hours: {OFFICE_HOURS}</p>
              </div>
              {HAS_STAFFED_OFFICE ? (
                <div className="rounded-2xl border border-[#2A2A2A]/10 bg-[#F5F3EF] p-4 text-sm text-[#2A2A2A]/80">
                  <p className="font-semibold text-[#2A2A2A]">
                    Phoenix Office
                  </p>
                  <p>{OFFICE_ADDRESS_LINE_1}</p>
                  <p>{OFFICE_ADDRESS_LINE_2}</p>
                </div>
              ) : (
                <p className="rounded-2xl border border-[#2A2A2A]/10 bg-[#F5F3EF] p-4 text-sm text-[#2A2A2A]/80">
                  Statewide advisory support conducted through scheduled
                  consultations and virtual meetings.
                </p>
              )}
            </div>
            <div className="space-y-3">
              <h3 className="text-lg text-[#2A2A2A]">Quick Links</h3>
              <ul className="space-y-2 text-sm text-[#2A2A2A]/75">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/property-types"
                    className="hover:text-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    Property Types
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="hover:text-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/locations"
                    className="hover:text-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                  >
                    Locations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg text-[#2A2A2A]">Service Areas</h3>
              <ul className="space-y-2 text-sm text-[#2A2A2A]/75">
                {footerLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="hover:text-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-3 border-t border-[#2A2A2A]/10 pt-6 text-xs text-[#2A2A2A]/70">
            <p>
              Compliance resources:{" "}
              <Link
                href="https://www.irs.gov/forms-pubs/about-form-8824"
                className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
              >
                IRS Form 8824
              </Link>{" "}
              |
              <Link
                href="https://www.irs.gov/tax-professionals/section-1031-like-kind-exchanges"
                className="ml-2 text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
              >
                IRS Like-Kind Exchanges
              </Link>
            </p>
            <p>
              © 2025 1031 Exchange of Phoenix. All rights reserved.
            </p>
          </div>
        </footer>
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
      <script
        dangerouslySetInnerHTML={{
          __html: leadFormScript,
        }}
      />
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  description: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  pattern?: string;
  textarea?: boolean;
  rows?: number;
};

function FormField({
  label,
  name,
  description,
  type = "text",
  autoComplete,
  required = false,
  pattern,
  textarea = false,
  rows = 3,
}: FormFieldProps) {
  const fieldId = `field-${name}`;
  const descriptionId = `${fieldId}-description`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={fieldId}
        className="text-sm font-semibold text-[#2A2A2A]"
      >
        {label}
        {required ? (
          <span className="ml-1 text-[#006E7F]">(Required)</span>
        ) : null}
      </label>
      {textarea ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          aria-describedby={descriptionId}
          required={required}
          className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          aria-describedby={descriptionId}
          autoComplete={autoComplete}
          required={required}
          pattern={pattern}
          className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
        />
      )}
      <p id={descriptionId} className="text-xs text-[#2A2A2A]/70">
        {description}
      </p>
    </div>
  );
}
