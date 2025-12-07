"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE_NUMBER, PHONE_NUMBER_URI } from "@/lib/config";
import { ArrowRightIcon, PhoneIcon, XIcon } from "../icons";

const STORAGE_KEY = "sticky-cta-collapsed";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user previously collapsed it
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setCollapsed(true);
      }
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 320);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCollapse = () => {
    setCollapsed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (collapsed || pathname === "/contact") {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-opacity ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto relative flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-[#E6A445]/50 bg-white/95 p-4 shadow-[0_20px_60px_rgba(24,24,24,0.12)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={handleCollapse}
          className="absolute right-2 top-2 rounded-full p-1.5 text-[#2A2A2A]/60 transition hover:bg-[#F5F3EF] hover:text-[#2A2A2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
          aria-label="Hide this message"
        >
          <XIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E6A445]">
            Need timeline support?
          </p>
          <p className="text-base text-[#2A2A2A]/80">
            Our Phoenix exchange desk responds within one business day.
          </p>
        </div>
        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row">
          <Link
            href={`tel:${PHONE_NUMBER_URI}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006E7F]/30 px-5 py-2 text-sm font-semibold text-[#006E7F] transition hover:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F] sm:hidden"
          >
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            Call {PHONE_NUMBER}
          </Link>
          <Link
            href="/contact"
            className="hidden items-center justify-center gap-2 rounded-full bg-[#006E7F] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#005563] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F] sm:inline-flex"
          >
            Contact Team
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
