/* eslint-disable no-fallthrough */
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  getManager,
  EntityManager,
  SelectQueryBuilder,
} from 'typeorm';

import {
  DateFilter,
  CreatePerformanceEntryInput,
  QueryPerformanceEntriesArgs,
} from '../generated/graphql';

export interface PerformanceEntryRange {
  totalCount: number; // total count for a given user (all data in the DB)
  entries: PerformanceEntry[]; // data in the specified range
}

@Entity()
export default class PerformanceEntry extends BaseEntity {
  static TYPE_NAME = 'PerformanceEntry';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('text')
  userId: string;

  @Column('int')
  distance: number;

  @Column('int')
  energy: number;

  @Column('int')
  calories: number;

  @Column({ type: 'timestamp with time zone', unique: true })
  date: Date;

  static async make(
    input: CreatePerformanceEntryInput,
    userId: string,
  ): Promise<PerformanceEntry> {
    const entry = new PerformanceEntry();
    Object.assign(entry, input, { userId });
    return entry.save();
  }

  static setupDateClause(
    query: SelectQueryBuilder<PerformanceEntry>,
    date: Date,
    filterBy: DateFilter,
  ): SelectQueryBuilder<PerformanceEntry> {
    let ret = query;
    switch (filterBy) {
      case DateFilter.EqualDay:
        ret = ret.andWhere('EXTRACT(DAY FROM performance_entry.date) = :day', {
          day: date.getDate(),
        });
      case DateFilter.EqualMonth:
        ret = ret.andWhere(
          'EXTRACT(MONTH FROM performance_entry.date) = :month',
          { month: date.getMonth() + 1 },
        );
      case DateFilter.EqualYear:
        ret = ret.andWhere(
          'EXTRACT(YEAR FROM performance_entry.date) = :year',
          { year: date.getFullYear() },
        );
        break;
      default:
        throw new Error(`Unknown filter - ${filterBy}`);
    }
    return ret;
  }

  static inRange(
    { date, filterBy, first, skip }: QueryPerformanceEntriesArgs,
    userId: string,
  ): Promise<PerformanceEntryRange> {
    return getManager().transaction(
      async (manager: EntityManager): Promise<PerformanceEntryRange> => {
        const totalCount = await PerformanceEntry.setupDateClause(
          manager
            .createQueryBuilder(PerformanceEntry, 'performance_entry')
            .where('performance_entry.userId = :userId', { userId }),
          date,
          filterBy,
        ).getCount();
        if (!totalCount) {
          return {
            totalCount,
            entries: [],
          };
        }
        const entries = await PerformanceEntry.setupDateClause(
          manager
            .createQueryBuilder(PerformanceEntry, 'performance_entry')
            .where('performance_entry.userId = :userId', { userId }),
          date,
          filterBy,
        )
          .orderBy({
            'performance_entry.date': 'DESC',
          })
          .skip(skip)
          .take(first)
          .getMany();
        return {
          totalCount,
          entries,
        };
      },
    );
  }
}
