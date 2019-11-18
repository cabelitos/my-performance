import PerformanceEntryEntity from '../../entity/PerformanceEntry';
import toGraphQl from '../../utils/perf-to-graph-type';
import { fromGlobalId } from '../../utils/globalId';
import {
  QueryPerformanceEntriesArgs,
  PerformanceEntriesPayload,
  PerformanceEntry,
  MutationCreatePerformanceEntryArgs,
  MutationDeletePerformanceEntryArgs,
  Scalars,
} from '../../generated/graphql';
import { ApolloContext } from '../../common-types/apollo-context';

export default {
  Query: {
    performanceEntries: async (
      _: unknown,
      input: QueryPerformanceEntriesArgs,
      { userId }: ApolloContext,
    ): Promise<PerformanceEntriesPayload> => {
      const { totalCount, entries } = await PerformanceEntryEntity.inRange(
        input,
        userId,
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
    deletePerformanceEntry: async (
      _: unknown,
      { id }: MutationDeletePerformanceEntryArgs,
      { userId }: ApolloContext,
    ): Promise<Scalars['ID']> => {
      const { affected } = await PerformanceEntryEntity.delete({
        userId,
        id: fromGlobalId(PerformanceEntryEntity.TYPE_NAME, id),
      });
      if (!affected) {
        throw new Error(`The id ${id} is not present in the database`);
      }
      return id;
    },
  },
};
