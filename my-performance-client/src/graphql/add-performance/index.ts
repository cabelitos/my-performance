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

const useAddPerformanceEntry = (
  options?: MutationHookOptions<
    CreatePerformanceEntryMutation,
    CreatePerformanceEntryMutationVariables
  >,
): MutationTuple<
  CreatePerformanceEntryMutation,
  CreatePerformanceEntryMutationVariables
> => useMutation(mutation, options);

export default useAddPerformanceEntry;
