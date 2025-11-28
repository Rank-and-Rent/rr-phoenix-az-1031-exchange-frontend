"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Service } from "@/lib/services";
import { SearchInput } from "../search/search-input";
import { ArrowRightIcon } from "../icons";

type HomepageServiceGridProps = {
  services: Service[];
};

function sortServices(services: Service[], query: string) {
  if (!query) {
    return services;
  }
  const normalized = query.toLowerCase();
  const exactMatches: Service[] = [];
  const partialMatches: Service[] = [];

  services.forEach((service) => {
    const title = service.name.toLowerCase();
    if (title === normalized) {
      exactMatches.push(service);
    } else if (title.includes(normalized)) {
      partialMatches.push(service);
    } else if (
      service.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(normalized),
      )
    ) {
      partialMatches.push(service);
    }
  });
  return [...exactMatches, ...partialMatches];
}

export function HomepageServiceGrid({ services }: HomepageServiceGridProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => sortServices(services, query), [services, query]);

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search services"
        placeholder="Search services by name..."
        onSearch={(value) => {
          setQuery(value);
          if (value.trim() && sortServices(services, value.trim()).length === 0) {
            router.push(`/contact?projectType=${encodeURIComponent(value.trim())}`);
          }
        }}
        defaultValue={query}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.slice(0, 6).map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(24,24,24,0.07)] transition hover:border-[#E6A445]/40 hover:shadow-[0_18px_48px_rgba(24,24,24,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
          >
            <div>
              <h3 className="text-xl font-semibold text-[#2A2A2A]">
                {service.name}
              </h3>
              <p className="mt-3 text-sm text-[#2A2A2A]/75">
                {service.shortDescription}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#006E7F]">
              Explore
              <ArrowRightIcon
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}


