import { propertyTypesData } from "@/data/property-types";
import type { PropertyTypeItem } from "@/data/types";

export function getAllPropertyTypes(): PropertyTypeItem[] {
  return propertyTypesData;
}

export function getPropertyTypeBySlug(slug: string): PropertyTypeItem | undefined {
  return propertyTypesData.find((propertyType) => propertyType.slug === slug);
}


