import Link from "next/link";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length <= 1) {
    return null;
  }
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 text-xs text-[#2A2A2A]/60",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="font-medium text-[#006E7F] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#2A2A2A]/70">{item.label}</span>
            )}
            {!isLast && <span aria-hidden="true">›</span>}
          </span>
        );
      })}
    </nav>
  );
}


