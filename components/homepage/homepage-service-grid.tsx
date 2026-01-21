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
      <div className="grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 6).map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex h-full flex-col justify-between bg-white p-6 transition hover:bg-gray-50"
          >
            <div>
              <h3 className="font-serif text-xl text-mansion-charcoal">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mansion-charcoal/70">
                {service.shortDescription}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold">
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


