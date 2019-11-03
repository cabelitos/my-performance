import PerformanceEntryEntity from '../../entity/PerformanceEntry';
import { fromGlobalId } from '../../utils/globalId';
import toGraphQl from '../../utils/perf-to-graph-type';
import { PerformanceEntry, QueryNodeArgs } from '../../generated/graphql';
import { ApolloContext } from '../../common-types/apollo-context';

export default {
  Node: {
    __resolveType: (): string => PerformanceEntryEntity.TYPE_NAME,
  },
  Query: {
    node: async (
      _: unknown,
      { id: nodeId }: QueryNodeArgs,
      { userId }: ApolloContext,
    ): Promise<PerformanceEntry> => {
      const entry = await PerformanceEntryEntity.findOneOrFail({
        where: {
          id: fromGlobalId(PerformanceEntryEntity.TYPE_NAME, nodeId),
          userId,
        },
      });
      return toGraphQl(entry);
    },
  },
};
