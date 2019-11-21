/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  useMutation,
  MutationTuple,
  MutationHookOptions,
} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  CreatePerformanceEntryMutation,
  CreatePerformanceEntryMutationVariables,
} from './__generated__/CreatePerformanceEntryMutation';

import { addPerformanceEntryToCache } from '../get-performance-entries';

const mutation = gql`
  mutation CreatePerformanceEntryMutation(
    $input: CreatePerformanceEntryInput!
  ) {
    createPerformanceEntry(input: $input) {
      id
      distance
      energy
      calories
      date
    }
  }
`;

const update = (
  cache: unknown,
  {
    data: { createPerformanceEntry },
  }: { data: CreatePerformanceEntryMutation },
): void => {
  addPerformanceEntryToCache(cache, createPerformanceEntry);
};

const useAddPerformanceEntry = (
  options?: MutationHookOptions<
    CreatePerformanceEntryMutation,
    CreatePerformanceEntryMutationVariables
  >,
): MutationTuple<
  CreatePerformanceEntryMutation,
  CreatePerformanceEntryMutationVariables
  // @ts-ignore
> => useMutation(mutation, { ...options, update });

export default useAddPerformanceEntry;
