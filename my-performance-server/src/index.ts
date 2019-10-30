import 'reflect-metadata';
import dotenv from 'dotenv-flow';
import { createConnection, getConnectionOptions } from 'typeorm';
import { ApolloServer, gql } from 'apollo-server';

dotenv.config();

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const resolvers = {
  Query: {
    books: (): typeof books => books,
  },
};

const start = async (): Promise<void> => {
  const connectionOptions = await getConnectionOptions();
  const db = await createConnection(
    Object.assign(connectionOptions, {
      password: process.env.TYPEORM_PASSWORD,
    }),
  );
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      db,
    },
  });
  const { url } = await server.listen({
    port: process.env.GRAPHQL_PORT,
    host: process.env.GRAPHQL_HOST,
  });
  // eslint-disable-next-line no-console
  console.log(`GraphQL server running at ${url}`);
};

start();
