/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  useMutation,
  MutationTuple,
  MutationHookOptions,
} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  DeletePerformanceEntryMutation,
  DeletePerformanceEntryMutationVariables,
} from './__generated__/DeletePerformanceEntryMutation';

import { removePerformanceEntryFromCache } from '../get-performance-entries';

const mutation = gql`
  mutation DeletePerformanceEntryMutation($id: ID!) {
    deletePerformanceEntry(id: $id)
  }
`;

const update = (
  cache: unknown,
  {
    data: { deletePerformanceEntry: id },
  }: { data: DeletePerformanceEntryMutation },
): void => {
  removePerformanceEntryFromCache(cache, id);
};

const useDeletePerformanceEntry = (
  options?: MutationHookOptions<
    DeletePerformanceEntryMutation,
    DeletePerformanceEntryMutationVariables
  >,
): MutationTuple<
  DeletePerformanceEntryMutation,
  DeletePerformanceEntryMutationVariables
  // @ts-ignore
> => useMutation(mutation, { ...options, update });

export default useDeletePerformanceEntry;
