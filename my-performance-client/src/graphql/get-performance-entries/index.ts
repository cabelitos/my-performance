/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  PerformanceEntries,
  PerformanceEntriesVariables,
  PerformanceEntries_performanceEntries_entries as PerfEntry,
} from './__generated__/PerformanceEntries';

const Query = gql`
  query PerformanceEntries($start: Date, $end: Date, $first: Int, $skip: Int) {
    performanceEntries(start: $start, end: $end, first: $first, skip: $skip)
      @connection(key: "perf") {
      totalCount
      entries {
        id
        distance
        energy
        calories
        date
      }
    }
  }
`;

export const removePerformanceEntryFromCache = (
  cache: any,
  idToRemove: string,
): void => {
  try {
    const { performanceEntries } = cache.readQuery({ query: Query });
    const { totalCount, entries = [] } = performanceEntries;
    const newEntries = entries.filter(({ id }: PerfEntry) => id !== idToRemove);
    if (newEntries.length === entries.length) {
      throw new Error('Not present in the cache');
    }
    cache.writeQuery({
      query: Query,
      data: {
        performanceEntries: {
          ...performanceEntries,
          totalCount: totalCount - 1,
          entries: newEntries,
        },
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `Could not remove the entry ${idToRemove} from the cache - ${err.message}`,
    );
  }
};

const useGetPerformanceEntries = (
  options?: QueryHookOptions<PerformanceEntries, PerformanceEntriesVariables>,
): any => useQuery(Query, options);

export default useGetPerformanceEntries;
