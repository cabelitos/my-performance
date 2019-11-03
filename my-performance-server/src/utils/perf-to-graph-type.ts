import PerformanceEntryEntity from '../entity/PerformanceEntry';
import { toGlobalId } from './globalId';
import { PerformanceEntry } from '../generated/graphql';

export default ({
  id,
  date,
  ...rest
}: PerformanceEntryEntity): PerformanceEntry => ({
  ...rest,
  date: date.toISOString(),
  id: toGlobalId(PerformanceEntryEntity.TYPE_NAME, id),
});
