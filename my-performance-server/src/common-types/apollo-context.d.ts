import { Connection } from 'typeorm';

export interface ApolloContext {
  db: Connection;
  userId: string;
}
