import type { ExecutionResult } from 'graphql';
import type { TypedDocumentString } from '../gql/graphql';

export function createExecute(headers: Record<string, string | null>) {
  const forwardedHeaders = Object.fromEntries(
    Object.entries(headers).filter(
      (entry): entry is [string, string] => entry[1] !== null,
    ),
  );

  return async function execute<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ): Promise<ExecutionResult<TResult>> {
    const response = await fetch('http://localhost:3001/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
        ...forwardedHeaders,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json() as ExecutionResult<TResult>;
  };
}
