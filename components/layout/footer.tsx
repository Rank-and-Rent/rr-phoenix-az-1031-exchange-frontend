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

export function Footer() {
  return (
    <footer className="border-t border-[#E6A445]/30 bg-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-[#2A2A2A]">{COMPANY_NAME}</h2>
            <p className="mt-4 text-sm leading-6 text-[#2A2A2A]/75">
              Precision-focused 1031 exchange guidance supporting investors across {PRIMARY_CITY},{" "}
              {PRIMARY_STATE_ABBR} with deadline discipline, replacement sourcing, and advisor coordination.
            </p>
            <div className="mt-6 space-y-2 text-sm text-[#2A2A2A]/80">
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <Link
                  href={`tel:${PHONE_NUMBER_URI}`}
                  className="hover:text-[#006E7F] hover:underline"
                >
                  {PHONE_NUMBER}
                </Link>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <Link
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="hover:text-[#006E7F] hover:underline"
                >
                  {SUPPORT_EMAIL}
                </Link>
              </p>
              <p><span className="font-semibold">Hours:</span> {OFFICE_HOURS}</p>
            </div>
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[#006E7F] hover:text-[#005563] hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2A2A2A]">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerServices.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-medium text-[#006E7F] hover:underline"
                >
                  View all services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2A2A2A]">Locations</h3>
            <ul className="mt-4 space-y-3">
              {footerLocations.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="text-sm font-medium text-[#006E7F] hover:underline"
                >
                  View all locations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Tools */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2A2A2A]">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]">Contact</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]">Blog</Link>
              </li>
              <li>
                <Link href="/tools/boot-calculator" className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]">Boot Calculator</Link>
              </li>
              <li>
                <Link href="/tools/exchange-cost-estimator" className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]">Cost Estimator</Link>
              </li>
              <li>
                <Link href="/tools/identification-rules-checker" className="text-sm text-[#2A2A2A]/70 transition hover:text-[#006E7F]">Rules Checker</Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm font-medium text-[#006E7F] hover:underline">View all tools &rarr;</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Map & Legal */}
          <div>
             <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2A2A2A]">Office</h3>
             <div className="mt-4 overflow-hidden rounded-xl border border-[#2A2A2A]/10 shadow-sm">
              <iframe
                title="Phoenix office map"
                src={GOOGLE_MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-40 w-full border-0"
              />
            </div>
             {HAS_STAFFED_OFFICE ? (
              <address className="mt-4 not-italic text-sm text-[#2A2A2A]/70">
                <p>{OFFICE_ADDRESS_LINE_1}</p>
                <p>{OFFICE_ADDRESS_LINE_2}</p>
              </address>
            ) : (
              <p className="mt-4 text-xs text-[#2A2A2A]/60">
                Advisory services delivered virtually across Arizona.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E6A445]/20 bg-[#F5F3EF]/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 text-center text-xs text-[#2A2A2A]/60 sm:flex-row sm:justify-between sm:text-left lg:px-16">
          <div className="space-y-2 sm:max-w-md">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
            <p>
               This site is not a Qualified Intermediary, law firm, or CPA. 
               Users should consult professionals before acting.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#006E7F] hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#006E7F] hover:underline">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-[#006E7F] hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
