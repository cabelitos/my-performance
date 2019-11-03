import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';

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
}
