import 'reflect-metadata';
import path from 'path';
import { createConnection, getConnectionOptions } from 'typeorm';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { importSchema } from 'graphql-import';

import resolvers from './resolvers';
import auth from './auth';
import { ApolloContext } from './common-types/apollo-context';

const start = async (): Promise<void> => {
  const connectionOptions = await getConnectionOptions();
  const db = await createConnection(
    Object.assign(connectionOptions, {
      password: process.env.TYPEORM_PASSWORD,
    }),
  );
  const server = new ApolloServer({
    typeDefs: importSchema(path.join(__dirname, 'schemas', 'schema.graphql')),
    resolvers,
    context: async ({ req: { headers } }): Promise<ApolloContext> => {
      if (!headers) {
        throw new AuthenticationError('Authentication headers missing');
      }
      const userId = await auth.getUserIdFromToken(headers.authorization);
      if (!userId) {
        throw new AuthenticationError('Missing user');
      }
      return { db, userId };
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
