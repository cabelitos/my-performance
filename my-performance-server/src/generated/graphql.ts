export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: string,
};

export type CreatePerformanceEntryInput = {
  distance: Scalars['Int'],
  energy: Scalars['Int'],
  calories: Scalars['Int'],
  date: Scalars['Date'],
};


export enum DateFilter {
  EqualDay = 'EQUAL_DAY',
  EqualYear = 'EQUAL_YEAR',
  EqualMonth = 'EQUAL_MONTH'
}

export type Mutation = {
   __typename?: 'Mutation',
  createPerformanceEntry: PerformanceEntry,
};


export type MutationCreatePerformanceEntryArgs = {
  input: CreatePerformanceEntryInput
};

export type Node = {
  id: Scalars['ID'],
};

export type PerformanceEntriesPayload = {
   __typename?: 'PerformanceEntriesPayload',
  totalCount: Scalars['Int'],
  entries: Array<PerformanceEntry>,
};

export type PerformanceEntry = Node & {
   __typename?: 'PerformanceEntry',
  id: Scalars['ID'],
  distance: Scalars['Int'],
  energy: Scalars['Int'],
  calories: Scalars['Int'],
  date: Scalars['Date'],
};

export type Query = {
   __typename?: 'Query',
  node?: Maybe<Node>,
  performanceEntries: PerformanceEntriesPayload,
};


export type QueryNodeArgs = {
  id: Scalars['ID']
};


export type QueryPerformanceEntriesArgs = {
  date: Scalars['Date'],
  filterBy: DateFilter,
  first?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};
