import Link from "next/link";
import {
  COMPANY_NAME,
  GOOGLE_MAP_EMBED,
  HAS_STAFFED_OFFICE,
  OFFICE_ADDRESS_LINE_1,
  OFFICE_ADDRESS_LINE_2,
  OFFICE_HOURS,
  PHONE_NUMBER,
  PHONE_NUMBER_URI,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SOCIAL_LINKS,
  SUPPORT_EMAIL,
} from "@/lib/config";
import { getAllLocations } from "@/lib/locations";
import { getAllServices } from "@/lib/services";

const footerLocations = getAllLocations();
const footerServices = getAllServices();

// Social icons SVGs
const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-mansion-navy text-white">
      {/* Google Maps Section */}
      {HAS_STAFFED_OFFICE && GOOGLE_MAP_EMBED && (
        <div className="border-b border-white/10">
          <iframe
            src={GOOGLE_MAP_EMBED}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${COMPANY_NAME} Office Location`}
            className="grayscale"
          />
        </div>
      )}

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Column 1: Brand & Contact */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h2 className="font-serif text-2xl text-white">{COMPANY_NAME}</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Full-service 1031 exchange coordination for Arizona investors. Property identification, qualified intermediary guidance, and deadline management.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <p>
                <span className="text-white/50">Phone: </span>
                <Link
                  href={`tel:${PHONE_NUMBER_URI}`}
                  className="font-medium text-mansion-gold-light hover:text-mansion-gold"
                >
                  {PHONE_NUMBER}
                </Link>
              </p>
              <p>
                <span className="text-white/50">Email: </span>
                <Link
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="font-medium text-mansion-gold-light hover:text-mansion-gold"
                >
                  {SUPPORT_EMAIL}
                </Link>
              </p>
              <p>
                <span className="text-white/50">Hours: </span>
                {OFFICE_HOURS}
              </p>
              {HAS_STAFFED_OFFICE && (
                <p className="pt-2">
                  <span className="text-white/50">Office: </span>
                  {OFFICE_ADDRESS_LINE_1}, {OFFICE_ADDRESS_LINE_2}
                </p>
              )}
            </div>
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-white/50 transition hover:text-mansion-gold-light"
                  aria-label={social.label}
                >
                  {social.label === "Facebook" && <FacebookIcon />}
                  {social.label === "LinkedIn" && <LinkedInIcon />}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Services</h3>
            <ul className="mt-4 space-y-2">
              {footerServices.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs text-white/70 transition hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-xs text-mansion-gold-light hover:text-mansion-gold"
                >
                  View all &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Service Areas</h3>
            <ul className="mt-4 space-y-2">
              {footerLocations.slice(0, 5).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-xs text-white/70 transition hover:text-white"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="text-xs text-mansion-gold-light hover:text-mansion-gold"
                >
                  View all &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-xs text-white/70 transition hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-white/70 transition hover:text-white">Contact</Link>
              </li>
              <li>
                <Link href="/blog" className="text-xs text-white/70 transition hover:text-white">Blog</Link>
              </li>
              <li>
                <Link href="/tools" className="text-xs text-white/70 transition hover:text-white">Exchange Tools</Link>
              </li>
              <li>
                <Link href="/property-types" className="text-xs text-white/70 transition hover:text-white">Property Types</Link>
              </li>
            </ul>
            <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/50">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/privacy" className="text-xs text-white/70 transition hover:text-white">Privacy Notice</Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-white/70 transition hover:text-white">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* IRS Resources */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/50">
            IRS Resources:{" "}
            <Link
              href="https://www.irs.gov/forms-pubs/about-form-8824"
              className="text-mansion-gold-light hover:text-mansion-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Form 8824
            </Link>
            {" | "}
            <Link
              href="https://www.irs.gov/tax-professionals/section-1031-like-kind-exchanges"
              className="text-mansion-gold-light hover:text-mansion-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Like-Kind Exchanges
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-mansion-navy-dark">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </p>
            <p className="text-[10px] text-white/30">
              This site is not a Qualified Intermediary, law firm, or CPA. Consult professionals before acting.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
