/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PerformanceEntries
// ====================================================

export interface PerformanceEntries_performanceEntries_entries {
  __typename: "PerformanceEntry";
  id: string;
  distance: number;
  energy: number;
  calories: number;
  date: any;
}

export interface PerformanceEntries_performanceEntries {
  __typename: "PerformanceEntriesPayload";
  totalCount: number;
  entries: PerformanceEntries_performanceEntries_entries[];
}

export interface PerformanceEntries {
  performanceEntries: PerformanceEntries_performanceEntries;
}

export interface PerformanceEntriesVariables {
  start?: any | null;
  end?: any | null;
  first?: number | null;
  skip?: number | null;
}
