import { gql } from 'apollo-server';

export default gql`
  scalar Date # Unix epoch
  interface Node {
    id: ID!
  }

  type PerformanceEntry implements Node {
    id: ID!
    distance: Int!
    energy: Int!
    calories: Int!
    date: Date!
  }

  type PerformanceEntriesPayload {
    totalCount: Int!
    entries: [PerformanceEntry!]!
  }

  enum DateFilter {
    EQUAL_DAY
    EQUAL_YEAR
    EQUAL_MONTH
  }

  input CreatePerformanceEntryInput {
    distance: Int!
    energy: Int!
    calories: Int!
    date: Date!
  }

  type Query {
    node(id: ID!): Node
    performanceEntries(
      date: Date!
      filterBy: DateFilter!
      first: Int
      skip: Int
    ): PerformanceEntriesPayload!
  }

  type Mutation {
    createPerformanceEntry(
      input: CreatePerformanceEntryInput!
    ): PerformanceEntry!
  }
`;
