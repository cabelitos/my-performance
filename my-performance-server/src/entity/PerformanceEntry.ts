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
    start: Date | null | undefined,
    end: Date | null | undefined,
  ): SelectQueryBuilder<PerformanceEntry> {
    // Give me everything
    if (!start && !end) {
      return query;
    }

    let ret = query;
    if (start) {
      ret = ret.andWhere(
        "DATE_TRUNC('day', performance_entry.date) >= :start",
        {
          start,
        },
      );
    }
    if (end) {
      // only end date provided
      ret = ret.andWhere("DATE_TRUNC('day', performance_entry.date) <= :end", {
        end,
      });
    }
    return ret;
  }

  static inRange(
    { start, end, first, skip }: QueryPerformanceEntriesArgs,
    userId: string,
  ): Promise<PerformanceEntryRange> {
    return getManager().transaction(
      async (manager: EntityManager): Promise<PerformanceEntryRange> => {
        const totalCount = await PerformanceEntry.setupDateClause(
          manager
            .createQueryBuilder(PerformanceEntry, 'performance_entry')
            .where('performance_entry.userId = :userId', { userId }),
          start,
          end,
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
          start,
          end,
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
