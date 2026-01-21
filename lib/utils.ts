export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDateToPhoenixISO(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Phoenix",
  })
    .format(date)
    .replace(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/, "$3-$1-$2T$4:$5:$6-07:00");
}

export function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Phoenix",
  }).format(date);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Image helper functions - returns image paths based on actual files in public/locations
// Location files: 1031-exchange-{slug}-az.{jpg|webp}
// Property type files: 1031-exchange-{slug}-phoenix-az.{ext}

/** Maps location slug to exact hero image path. Files use -az suffix and mixed .jpg/.webp. */
const LOCATION_IMAGE_MAP: Record<string, string> = {
  phoenix: "/locations/1031-exchange-phoenix-az.webp",
  scottsdale: "/locations/1031-exchange-scottsdale-az.jpg",
  tempe: "/locations/1031-exchange-tempe-az.webp",
  mesa: "/locations/1031-exchange-mesa-az.jpg",
  chandler: "/locations/1031-exchange-chandler-az.jpg",
  gilbert: "/locations/1031-exchange-gilbert-az.jpg",
  glendale: "/locations/1031-exchange-glendale-az.jpg",
  "paradise-valley": "/locations/1031-exchange-north-scottsdale-az.jpg",
  goodyear: "/locations/1031-exchange-goodyear-az.webp",
  "queen-creek": "/locations/1031-exchange-gilbert-az.jpg",
};

export function getLocationImageSrc(slug: string): string {
  return LOCATION_IMAGE_MAP[slug] ?? `/locations/1031-exchange-${slug}-az.jpg`;
}

export function getPropertyTypeImageSrc(slug: string): string {
  const baseName = `1031-exchange-${slug}-phoenix-az`;
  // Try common extensions, Next.js will handle 404s
  return `/property-types/${baseName}.jpg`;
}

