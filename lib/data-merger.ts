import { servicesBatch01 } from "@/data/batches/services/batch-01";
import { servicesBatch02 } from "@/data/batches/services/batch-02";
import { servicesBatch03 } from "@/data/batches/services/batch-03";
import { locationsBatch01 } from "@/data/batches/locations/batch-01";
import { locationsBatch02 } from "@/data/batches/locations/batch-02";
import { locationsBatch03 } from "@/data/batches/locations/batch-03";
import { propertyTypesBatch01 } from "@/data/batches/property-types/batch-01";
import { propertyTypesBatch02 } from "@/data/batches/property-types/batch-02";
import type { Service } from "./services";
import type { Location } from "./locations";

const allServiceBatches = {
  ...servicesBatch01,
  ...servicesBatch02,
  ...servicesBatch03,
};

const allLocationBatches = {
  ...locationsBatch01,
  ...locationsBatch02,
  ...locationsBatch03,
};

const allPropertyTypeBatches = {
  ...propertyTypesBatch01,
  ...propertyTypesBatch02,
};

export function getServiceBatchData(slug: string) {
  return allServiceBatches[slug as keyof typeof allServiceBatches];
}

export function getLocationBatchData(slug: string) {
  return allLocationBatches[slug as keyof typeof allLocationBatches];
}

export function getPropertyTypeBatchData(slug: string) {
  return allPropertyTypeBatches[slug as keyof typeof allPropertyTypeBatches];
}

export function mergeServiceWithBatchData(service: Service) {
  const batchData = getServiceBatchData(service.slug);
  if (!batchData) return service;

  return {
    ...service,
    batchData,
  };
}

export function mergeLocationWithBatchData(location: Location) {
  const batchData = getLocationBatchData(location.slug);
  if (!batchData) return location;

  return {
    ...location,
    batchData,
  };
}

