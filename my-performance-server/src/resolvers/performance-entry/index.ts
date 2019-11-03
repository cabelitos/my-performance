import PerformanceEntryEntity from '../../entity/PerformanceEntry';
import toGraphQl from '../../utils/perf-to-graph-type';
import {
  QueryPerformanceEntriesArgs,
  PerformanceEntriesPayload,
} from '../../generated/graphql';
import { ApolloContext } from '../../common-types/apollo-context';

export default {
  Query: {
    performanceEntries: async (
      _: unknown,
      { date: scalarDate, filterBy, first, skip }: QueryPerformanceEntriesArgs,
      { userId }: ApolloContext,
    ): Promise<PerformanceEntriesPayload> => {
      const date = new Date(scalarDate);
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
};
