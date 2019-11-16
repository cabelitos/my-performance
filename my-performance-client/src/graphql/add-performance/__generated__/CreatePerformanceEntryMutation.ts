/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreatePerformanceEntryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePerformanceEntryMutation
// ====================================================

export interface CreatePerformanceEntryMutation_createPerformanceEntry {
  __typename: "PerformanceEntry";
  id: string;
  distance: number;
  energy: number;
  calories: number;
  date: any;
}

export interface CreatePerformanceEntryMutation {
  createPerformanceEntry: CreatePerformanceEntryMutation_createPerformanceEntry;
}

export interface CreatePerformanceEntryMutationVariables {
  input: CreatePerformanceEntryInput;
}
