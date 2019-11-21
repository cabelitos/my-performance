/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import orderBy from 'lodash.orderby';

import {
  PerformanceEntries,
  PerformanceEntriesVariables,
  PerformanceEntries_performanceEntries_entries as PerfEntry,
  PerformanceEntries_performanceEntries as PerformanceEntriesPayload,
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

export const addPerformanceEntryToCache = (
  cache: any,
  perfEntry: PerfEntry,
): void => {
  let currentData: PerformanceEntries | undefined;
  try {
    currentData = cache.readQuery({ query: Query });
  } catch (_) {
    // do not bother adding, since there's data.
    // all data will be loaded once the user clicks on "classes"
    return;
  }
  let performanceEntries: PerformanceEntriesPayload;
  if (!currentData) {
    performanceEntries = {
      __typename: 'PerformanceEntriesPayload',
      totalCount: 1,
      entries: [perfEntry],
    };
  } else {
    const { performanceEntries: oldData } = currentData;
    performanceEntries = {
      ...oldData,
      totalCount: oldData.totalCount + 1,
      entries: orderBy([...oldData.entries, perfEntry], ['date'], ['desc']),
    };
  }
  try {
    cache.writeQuery({ query: Query, data: { performanceEntries } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `Could not save the entry ${perfEntry} from the cache - ${err.message}`,
    );
  }
};

const useGetPerformanceEntries = (
  options?: QueryHookOptions<PerformanceEntries, PerformanceEntriesVariables>,
): any => useQuery(Query, options);

export default useGetPerformanceEntries;
