import { parse, OperationTypeNode } from 'graphql';
import * as strands from '@strands-agents/sdk';
import { z } from 'zod';

const DEFAULT_INTERNAL_GRAPH_URL = 'http://localhost:3001/graphql';

const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        fields {
          name
        }
      }
    }
  }
`;

type IntrospectionType = {
  name?: string | null;
  fields?: Array<{ name?: string | null }> | null;
};

type IntrospectionBody = {
  data?: {
    __schema?: {
      types?: IntrospectionType[] | null;
    } | null;
  } | null;
};

const postGraph = async (query: string, variables?: Record<string, unknown>) => {
  const response = await fetch(process.env.INTERNAL_GRAPH_URL ?? DEFAULT_INTERNAL_GRAPH_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-agent-id': process.env.INTERNAL_GRAPH_AGENT_ID ?? '',
    },
    body: JSON.stringify({ query, variables: variables ?? {} }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Internal Graph request failed (${response.status}): ${text}`);
  }

  return response.json();
};

const rejectNonQuery = (document: string) => {
  const parsed = parse(document);
  for (const definition of parsed.definitions) {
    if (
      definition.kind === 'OperationDefinition' &&
      definition.operation !== OperationTypeNode.QUERY
    ) {
      throw new Error(`internalGraphQuery rejects ${definition.operation} operations`);
    }
  }
};

export const internalGraphSchema = strands.tool({
  name: 'internalGraphSchema',
  description:
    'Reads the Internal Graph schema and returns each type name with its field names.',
  inputSchema: z.object({}),
  callback: async () => {
    const body = (await postGraph(INTROSPECTION_QUERY)) as IntrospectionBody;
    const types = body.data?.__schema?.types ?? [];

    return types
      .filter((type): type is IntrospectionType & { name: string } => typeof type.name === 'string')
      .map((type) => ({
        name: type.name,
        fields: (type.fields ?? [])
          .map((field) => field.name)
          .filter((name): name is string => typeof name === 'string'),
      }));
  },
});

export const internalGraphQuery = strands.tool({
  name: 'internalGraphQuery',
  description:
    'Runs a GraphQL query against the Internal Graph and returns the JSON response body. Mutations and subscriptions are rejected.',
  inputSchema: z.object({
    query: z.string().describe('GraphQL query document'),
    variables: z.record(z.string(), z.unknown()).optional().describe('Query variables'),
  }),
  callback: async (input) => {
    rejectNonQuery(input.query);
    return postGraph(input.query, input.variables);
  },
});
