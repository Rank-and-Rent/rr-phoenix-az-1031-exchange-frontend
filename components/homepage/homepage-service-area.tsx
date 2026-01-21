"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Location } from "@/lib/locations";
import { SearchInput } from "../search/search-input";
import { ArrowRightIcon } from "../icons";

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
      
      {/* Mansion Global "Explore Top Markets" style - horizontal scroll with city images */}
      <div className="relative -mx-6 lg:-mx-8">
        <div className="mansion-scroll flex gap-4 overflow-x-auto px-6 pb-4 lg:px-8">
          {filtered.slice(0, 8).map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="group relative flex-none overflow-hidden"
              style={{ width: 'calc(25% - 0.75rem)', minWidth: '200px', height: '280px' }}
            >
              {/* Background image */}
              <Image
                src={`/locations/1031-exchange-${location.slug}.jpg`}
                alt={location.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl font-normal uppercase tracking-wide text-white">
                  {location.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Carousel navigation arrows */}
        <button className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white shadow-editorial transition hover:shadow-editorial-hover lg:left-4" aria-label="Previous">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white shadow-editorial transition hover:shadow-editorial-hover lg:right-4" aria-label="Next">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="flex items-center justify-between border border-mansion-gold/20 bg-mansion-gold/5 p-4 text-sm text-mansion-charcoal/80">
        <span>Need coverage outside these locations?</span>
        <Link
          href="/contact?projectType=Other"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold hover:text-mansion-gold-dark"
        >
          Contact us
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}


