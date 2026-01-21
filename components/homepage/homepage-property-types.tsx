"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPropertyTypeImageSrc } from "@/lib/utils";

type PropertyType = {
  title: string;
  benefit: string;
  slug: string;
};

type HomepagePropertyTypesProps = {
  propertyTypes: PropertyType[];
};

export function HomepagePropertyTypes({ propertyTypes }: HomepagePropertyTypesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <div className="relative -mx-6 lg:-mx-8">
      <div 
        ref={scrollContainerRef}
        className="mansion-scroll flex gap-4 overflow-x-auto px-6 pb-4 lg:px-8"
      >
        {propertyTypes.map((property) => (
          <Link
            key={property.slug}
            href={`/property-types/${property.slug}`}
            className="group flex-none"
            style={{ width: 'calc(33.333% - 1rem)', minWidth: '280px' }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={getPropertyTypeImageSrc(property.slug)}
                alt={property.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mansion-gold">
                  1031 Exchange
                </p>
                <h3 className="font-serif text-xl text-white">
                  {property.title}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm leading-relaxed text-mansion-charcoal/70">
                {property.benefit}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* Carousel navigation arrows */}
      <button 
        onClick={scrollLeft}
        className="absolute left-2 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white shadow-editorial transition hover:shadow-editorial-hover lg:left-4" 
        aria-label="Previous"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={scrollRight}
        className="absolute right-2 top-1/3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white shadow-editorial transition hover:shadow-editorial-hover lg:right-4" 
        aria-label="Next"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
