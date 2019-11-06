import PerformanceEntryEntity from '../entity/PerformanceEntry';
import { toGlobalId } from './globalId';
import { PerformanceEntry } from '../generated/graphql';

export default ({ id, ...rest }: PerformanceEntryEntity): PerformanceEntry => ({
  ...rest,
  id: toGlobalId(PerformanceEntryEntity.TYPE_NAME, id),
});
