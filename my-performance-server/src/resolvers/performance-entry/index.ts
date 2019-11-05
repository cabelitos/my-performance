import PerformanceEntryEntity from '../../entity/PerformanceEntry';
import toGraphQl from '../../utils/perf-to-graph-type';
import {
  QueryPerformanceEntriesArgs,
  PerformanceEntriesPayload,
  PerformanceEntry,
  MutationCreatePerformanceEntryArgs,
} from '../../generated/graphql';
import { ApolloContext } from '../../common-types/apollo-context';

export default {
  Query: {
    performanceEntries: async (
      _: unknown,
      { date, filterBy, first, skip }: QueryPerformanceEntriesArgs,
      { userId }: ApolloContext,
    ): Promise<PerformanceEntriesPayload> => {
      const { totalCount, entries } = await PerformanceEntryEntity.inRange(
        userId,
        date,
        filterBy,
        first,
        skip,
      );

      return {
        totalCount,
        entries: entries.map(toGraphQl),
      };
    },
  },
  Mutation: {
    createPerformanceEntry: async (
      _: unknown,
      { input }: MutationCreatePerformanceEntryArgs,
      { userId }: ApolloContext,
    ): Promise<PerformanceEntry> =>
      toGraphQl(await PerformanceEntryEntity.make(input, userId)),
  },
};
