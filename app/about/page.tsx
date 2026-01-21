import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us | 1031 Exchange Property Identification",
  description: `We help ${PRIMARY_CITY} investors identify potential replacement properties for Section 1031 exchanges. We coordinate with Qualified Intermediaries and tax advisors.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]}
        />

        <article className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">About</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              About 1031 Exchange of Phoenix
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              We help investors identify potential replacement properties for
              Section 1031 exchanges. Our focus is on property matching,
              timeline coordination, and connecting you with qualified
              professionals.
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <section className="border-b border-gray-200 pb-8">
                <h2 className="font-serif text-2xl text-mansion-charcoal">
                  What We Do
                </h2>
                <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                  This site helps investors identify potential replacement
                  properties for Section 1031 exchanges. We provide secure intake
                  processes, property matching workflows, and coordination with
                  third party Qualified Intermediaries and lenders.
                </p>
                <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                  Our team understands the deadlines, identification rules, and
                  documentation requirements that keep exchanges compliant. We
                  connect investors with vetted replacement options and coordinate
                  timelines with intermediaries and closing teams.
                </p>
              </section>

              <section className="border-b border-gray-200 pb-8">
                <h2 className="font-serif text-2xl text-mansion-charcoal">
                  What We Are Not
                </h2>
                <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                  This site is not a Qualified Intermediary. We are not a law
                  firm, broker, or CPA. We do not provide tax or legal advice.
                </p>
                <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                  Users should consult a Qualified Intermediary and tax advisor
                  before acting on any exchange transaction. We facilitate
                  connections and provide educational resources, but final
                  decisions require professional guidance.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-mansion-charcoal">
                  Serving {PRIMARY_CITY} and {PRIMARY_STATE_ABBR}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                  Our team understands local market conditions, title timelines,
                  and county filing requirements across {PRIMARY_CITY} and
                  surrounding areas. We coordinate exchanges that span multiple
                  jurisdictions and ensure compliance with {PRIMARY_STATE_ABBR} regulations.
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Our Process
              </h2>
              <div className="grid gap-px bg-gray-200">
                <div className="bg-white p-6">
                  <span className="font-serif text-3xl text-mansion-gold">01</span>
                  <h3 className="mt-4 font-serif text-xl text-mansion-charcoal">
                    Secure Intake
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                    We collect your exchange timeline, property profile, and
                    investment objectives through encrypted forms. Your
                    information remains confidential and is shared only with
                    authorized intermediaries and advisors.
                  </p>
                </div>

                <div className="bg-white p-6">
                  <span className="font-serif text-3xl text-mansion-gold">02</span>
                  <h3 className="mt-4 font-serif text-xl text-mansion-charcoal">
                    Property Matching Workflow
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                    Our team analyzes your criteria and presents vetted
                    replacement property options. We coordinate with listing
                    agents, verify closing timelines, and ensure candidates meet
                    your exchange requirements.
                  </p>
                </div>

                <div className="bg-white p-6">
                  <span className="font-serif text-3xl text-mansion-gold">03</span>
                  <h3 className="mt-4 font-serif text-xl text-mansion-charcoal">
                    Third Party Coordination
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                    We work alongside Qualified Intermediaries to ensure funds
                    are handled correctly. We coordinate with lenders for
                    financing timelines and connect investors with tax advisors
                    for Form 8824 preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border border-mansion-gold/20 bg-mansion-gold/5 p-6 text-sm text-mansion-charcoal/80">
            <p className="font-semibold text-mansion-gold-dark">
              Important Disclaimer
            </p>
            <p className="mt-2">
              This site helps investors identify potential replacement properties
              for Section 1031 exchanges. This site is not a Qualified
              Intermediary, law firm, broker, or CPA. Users should consult a
              Qualified Intermediary and tax advisor before acting.
            </p>
          </div>

          <div className="mt-16 border border-gray-200 bg-white p-10 text-center shadow-editorial">
            <h2 className="font-serif text-3xl text-mansion-charcoal">
              Ready to start your exchange?
            </h2>
            <p className="mt-4 text-base text-mansion-charcoal/70">
              Connect with our team to discuss your replacement property needs
              and timeline.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-mansion-gold px-6 py-3 text-base font-semibold text-white transition hover:bg-mansion-gold-dark"
            >
              Contact Us
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
