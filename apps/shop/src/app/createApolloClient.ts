import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { print } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-sse';

export const createApolloClient = () => {
  const userId = localStorage.getItem('x-user-id') || '';

  class SSELink extends ApolloLink {
    private client: Client;

    constructor(options: ClientOptions) {
      super();
      this.client = createClient(options);
    }

    public override request(
      operation: ApolloLink.Operation,
    ): Observable<ApolloLink.Result> {
      return new Observable((sink) => {
        return this.client.subscribe<ApolloLink.Result>(
          { ...operation, query: print(operation.query) },
          {
            next: sink.next.bind(sink) as any,
            complete: sink.complete.bind(sink),
            error: sink.error.bind(sink),
          },
        );
      });
    }
  }

  const sseLink = new SSELink({
    url: 'http://localhost:3000/graphql/stream',
    headers: () => ({
      'x-user-id': userId,
    }),
  });

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
    headers: {
      'x-user-id': userId,
    },
  });

  const link = ApolloLink.split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    sseLink,
    httpLink,
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};
