import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { Operation } from 'apollo-boost';

import { useAuth } from '../../auth';

interface Props {
  children: React.ReactNode;
}

const ApolloContext = ({ children }: Props): JSX.Element => {
  const { getToken } = useAuth();
  const getTokenRef = React.useRef(getToken);
  getTokenRef.current = getToken;
  const client = React.useRef(
    new ApolloClient({
      uri: process.env.REACT_APP_GRAPHQL_URI,
      request: async (operation: Operation): Promise<void> => {
        const token = await getTokenRef.current();
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        });
      },
    }),
  );
  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};

export default ApolloContext;
