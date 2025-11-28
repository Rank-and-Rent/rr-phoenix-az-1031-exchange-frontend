"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Location } from "@/lib/locations";
import { SearchInput } from "../search/search-input";
import { ArrowRightIcon, MapPinIcon } from "../icons";

type HomepageServiceAreaProps = {
  locations: Location[];
};

export function HomepageServiceArea({ locations }: HomepageServiceAreaProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return locations;
    }
    const normalized = query.toLowerCase();
    return locations.filter((location) =>
      location.name.toLowerCase().includes(normalized),
    );
  }, [query, locations]);

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search locations"
        placeholder="Search Phoenix area locations..."
        onSearch={(value) => {
          setQuery(value);
          if (value.trim()) {
            const normalized = value.toLowerCase();
            const match = locations.filter((location) =>
              location.name.toLowerCase().includes(normalized),
            );
            if (match.length === 0) {
              router.push(
                `/contact?projectType=${encodeURIComponent(`${value} location interest`)}`,
              );
            }
          }
        }}
        defaultValue={query}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, 8).map((location) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-[#2A2A2A]/15 bg-white/80 p-4 shadow-[0_12px_40px_rgba(24,24,24,0.05)] transition hover:border-[#006E7F]/40 hover:shadow-[0_18px_44px_rgba(24,24,24,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#006E7F]/10 text-[#006E7F]">
                <MapPinIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-[#2A2A2A]">
                {location.name}
              </h3>
            </div>
            <p className="mt-3 text-xs text-[#2A2A2A]/70">{location.headline}</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-semibold text-[#006E7F]">
              Explore
              <ArrowRightIcon
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-4 text-sm text-[#2A2A2A]/80">
        <span>Need coverage outside these locations?</span>
        <Link
          href="/contact?projectType=Other"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
        >
          Contact us
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}


