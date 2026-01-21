"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import { propertyTypesData } from "@/data/property-types";
import { COMPANY_NAME, PHONE_NUMBER, PHONE_NUMBER_URI } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, PhoneIcon } from "../icons";

type MenuKey = "services" | "locations" | "propertyTypes" | "tools" | null;

const primaryServices = servicesData.slice(0, 8);
const primaryLocations = [
  locationsData.find((loc) => loc.slug === "phoenix"),
  ...locationsData.filter((loc) => loc.slug !== "phoenix").slice(0, 7),
].filter(Boolean) as typeof locationsData;
const primaryPropertyTypes = propertyTypesData.slice(0, 8);

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  const navLinkClasses =
    "relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:text-mansion-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mansion-gold";

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Gold accent bar - Mansion Global style */}
      <div className="gold-accent-bar h-1" />
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo - centered on larger screens like Mansion Global */}
        <Link
          href="/"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mansion-gold"
        >
          <Image
            src="/1031-exchange-of-phoenix-az-logo.png"
            alt={COMPANY_NAME}
            width={220}
            height={65}
            className="h-auto w-auto max-h-14"
            priority
          />
        </Link>

        {/* Navigation - Mansion Global style */}
        <nav className="hidden items-center lg:flex">
          <div
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
            className="relative"
          >
            <button
              type="button"
              className={cn(
                navLinkClasses,
                openMenu === "services"
                  ? "text-mansion-gold"
                  : "text-mansion-charcoal",
              )}
              aria-haspopup="true"
              aria-expanded={openMenu === "services"}
              onFocus={() => setOpenMenu("services")}
              onClick={() =>
                setOpenMenu((prev) => (prev === "services" ? null : "services"))
              }
            >
              Services
              <ChevronDownIcon className="h-3 w-3 ml-1" aria-hidden="true" />
            </button>
            {openMenu === "services" && (
              <div
                onMouseEnter={() => setOpenMenu("services")}
                onMouseLeave={() => setOpenMenu(null)}
                className="absolute left-0 top-full pt-2 w-80"
              >
                <div className="border border-gray-100 bg-white p-4 shadow-editorial">
                  <ul className="space-y-1">
                    {primaryServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="block px-3 py-2 text-sm text-mansion-charcoal/80 transition hover:bg-gray-50 hover:text-mansion-gold"
                        >
                          <span className="font-medium text-mansion-charcoal">
                            {service.name}
                          </span>
                          <span className="mt-1 block text-xs text-mansion-charcoal/60">
                            {service.short}
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-gray-100 pt-2 mt-2">
                      <Link
                        href="/services"
                        className="block px-3 py-2 text-sm font-semibold text-mansion-gold transition hover:text-mansion-gold-dark"
                      >
                        View all services &rarr;
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => setOpenMenu("locations")}
            onMouseLeave={() => setOpenMenu(null)}
            className="relative"
          >
            <button
              type="button"
              className={cn(
                navLinkClasses,
                openMenu === "locations"
                  ? "text-mansion-gold"
                  : "text-mansion-charcoal",
              )}
              aria-haspopup="true"
              aria-expanded={openMenu === "locations"}
              onFocus={() => setOpenMenu("locations")}
              onClick={() =>
                setOpenMenu((prev) =>
                  prev === "locations" ? null : "locations",
                )
              }
            >
              Top Markets
              <ChevronDownIcon className="h-3 w-3 ml-1" aria-hidden="true" />
            </button>
            {openMenu === "locations" && (
              <div
                onMouseEnter={() => setOpenMenu("locations")}
                onMouseLeave={() => setOpenMenu(null)}
                className="absolute left-0 top-full pt-2 w-72"
              >
                <div className="border border-gray-100 bg-white p-4 shadow-editorial">
                  <ul className="space-y-1">
                    {primaryLocations.map((location) => (
                      <li key={location.slug}>
                        <Link
                          href={`/locations/${location.slug}`}
                          className="block px-3 py-2 text-sm text-mansion-charcoal/80 transition hover:bg-gray-50 hover:text-mansion-gold"
                        >
                          <span className="font-medium text-mansion-charcoal">
                            {location.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-gray-100 pt-2 mt-2">
                      <Link
                        href="/locations"
                        className="block px-3 py-2 text-sm font-semibold text-mansion-gold transition hover:text-mansion-gold-dark"
                      >
                        View all markets &rarr;
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => setOpenMenu("propertyTypes")}
            onMouseLeave={() => setOpenMenu(null)}
            className="relative"
          >
            <button
              type="button"
              className={cn(
                navLinkClasses,
                openMenu === "propertyTypes" || pathname?.startsWith("/property-types")
                  ? "text-mansion-gold"
                  : "text-mansion-charcoal",
              )}
              aria-haspopup="true"
              aria-expanded={openMenu === "propertyTypes"}
              onFocus={() => setOpenMenu("propertyTypes")}
              onClick={() =>
                setOpenMenu((prev) =>
                  prev === "propertyTypes" ? null : "propertyTypes",
                )
              }
            >
              Property Types
              <ChevronDownIcon className="h-3 w-3 ml-1" aria-hidden="true" />
            </button>
            {openMenu === "propertyTypes" && (
              <div
                onMouseEnter={() => setOpenMenu("propertyTypes")}
                onMouseLeave={() => setOpenMenu(null)}
                className="absolute left-0 top-full pt-2 w-72"
              >
                <div className="border border-gray-100 bg-white p-4 shadow-editorial">
                  <ul className="space-y-1">
                    {primaryPropertyTypes.map((propertyType) => (
                      <li key={propertyType.slug}>
                        <Link
                          href={propertyType.route}
                          className="block px-3 py-2 text-sm text-mansion-charcoal/80 transition hover:bg-gray-50 hover:text-mansion-gold"
                        >
                          <span className="font-medium text-mansion-charcoal">
                            {propertyType.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-gray-100 pt-2 mt-2">
                      <Link
                        href="/property-types"
                        className="block px-3 py-2 text-sm font-semibold text-mansion-gold transition hover:text-mansion-gold-dark"
                      >
                        View all property types &rarr;
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => setOpenMenu("tools")}
            onMouseLeave={() => setOpenMenu(null)}
            className="relative"
          >
            <button
              type="button"
              className={cn(
                navLinkClasses,
                openMenu === "tools"
                  ? "text-mansion-gold"
                  : "text-mansion-charcoal",
              )}
              aria-haspopup="true"
              aria-expanded={openMenu === "tools"}
              onFocus={() => setOpenMenu("tools")}
              onClick={() =>
                setOpenMenu((prev) => (prev === "tools" ? null : "tools"))
              }
            >
              Tools
              <ChevronDownIcon className="h-3 w-3 ml-1" aria-hidden="true" />
            </button>
            {openMenu === "tools" && (
              <div
                onMouseEnter={() => setOpenMenu("tools")}
                onMouseLeave={() => setOpenMenu(null)}
                className="absolute left-0 top-full pt-2 w-72"
              >
                <div className="border border-gray-100 bg-white p-4 shadow-editorial">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/tools/boot-calculator"
                        className="block px-3 py-2 text-sm text-mansion-charcoal/80 transition hover:bg-gray-50 hover:text-mansion-gold"
                      >
                        <span className="font-medium text-mansion-charcoal">Boot Calculator</span>
                        <span className="mt-1 block text-xs text-mansion-charcoal/60">
                          Calculate boot and tax implications
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tools/exchange-cost-estimator"
                        className="block px-3 py-2 text-sm text-mansion-charcoal/80 transition hover:bg-gray-50 hover:text-mansion-gold"
                      >
                        <span className="font-medium text-mansion-charcoal">Exchange Cost Estimator</span>
                        <span className="mt-1 block text-xs text-mansion-charcoal/60">
                          Estimate QI fees and closing costs
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tools/identification-rules-checker"
                        className="block px-3 py-2 text-sm text-mansion-charcoal/80 transition hover:bg-gray-50 hover:text-mansion-gold"
                      >
                        <span className="font-medium text-mansion-charcoal">
                          Identification Rules Checker
                        </span>
                        <span className="mt-1 block text-xs text-mansion-charcoal/60">
                          Validate identification compliance
                        </span>
                      </Link>
                    </li>
                    <li className="border-t border-gray-100 pt-2 mt-2">
                      <Link
                        href="/tools"
                        className="block px-3 py-2 text-sm font-semibold text-mansion-gold transition hover:text-mansion-gold-dark"
                      >
                        View all tools &rarr;
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={cn(
              navLinkClasses,
              pathname === "/about"
                ? "text-mansion-gold"
                : "text-mansion-charcoal",
            )}
          >
            About
          </Link>

          <Link
            href="/blog"
            className={cn(
              navLinkClasses,
              pathname?.startsWith("/blog")
                ? "text-mansion-gold"
                : "text-mansion-charcoal",
            )}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="ml-4 inline-flex h-10 items-center justify-center border-2 border-mansion-gold bg-transparent px-6 text-sm font-semibold text-mansion-gold transition hover:bg-mansion-gold hover:text-white"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile navigation */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={`tel:${PHONE_NUMBER_URI}`}
            className="inline-flex h-10 w-10 items-center justify-center border border-mansion-gold/40 text-mansion-gold"
            aria-label={`Call ${PHONE_NUMBER}`}
          >
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center bg-mansion-gold px-4 text-sm font-semibold text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

