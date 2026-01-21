import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { COMPANY_NAME, SITE_DOMAIN, SUPPORT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${COMPANY_NAME}. Review our terms and conditions for using our website and services.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms of Service", href: "/terms" },
          ]}
        />

        <article className="pt-8">
          <header className="mb-12">
            <p className="section-label mb-3">Legal</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8 text-mansion-charcoal">
            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Agreement to Terms
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                By accessing or using the {COMPANY_NAME} website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Use License
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                Permission is granted to temporarily access and use the materials on {COMPANY_NAME}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="mt-2 space-y-1 pl-6 text-mansion-charcoal/80">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Disclaimer
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                The materials on {COMPANY_NAME}'s website are provided on an 'as is' basis. {COMPANY_NAME} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                Further, {COMPANY_NAME} does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Limitations
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                In no event shall {COMPANY_NAME} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {COMPANY_NAME}'s website, even if {COMPANY_NAME} or a {COMPANY_NAME} authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Educational Content Disclaimer
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                The information provided on this website is for educational purposes only and does not constitute tax, legal, or investment advice. {COMPANY_NAME} is not a Qualified Intermediary, law firm, broker, or CPA. You should consult with a Qualified Intermediary and tax advisor before making any decisions regarding 1031 exchanges or other tax strategies.
              </p>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Accuracy of Materials
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                The materials appearing on {COMPANY_NAME}'s website could include technical, typographical, or photographic errors. {COMPANY_NAME} does not warrant that any of the materials on its website are accurate, complete, or current. {COMPANY_NAME} may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Links
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                {COMPANY_NAME} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {COMPANY_NAME} of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Modifications
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                {COMPANY_NAME} may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="border-b border-gray-200 pb-8">
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Governing Law
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                These terms and conditions are governed by and construed in accordance with the laws of the State of Arizona and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-mansion-charcoal">
                Contact Information
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mansion-charcoal/80">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-2 text-base leading-relaxed text-mansion-charcoal/80">
                Email: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-mansion-gold hover:text-mansion-gold-dark">{SUPPORT_EMAIL}</a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
