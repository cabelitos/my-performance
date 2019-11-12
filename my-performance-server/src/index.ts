import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import { ApolloServer } from 'apollo-server';

import typeDefs from './schemas';
import resolvers from './resolvers';

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
      // FIXME: get from auth0
      userId: 'user1@gmail.com',
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
