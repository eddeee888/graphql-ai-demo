import { afterEach, describe, expect, it, vi } from 'vitest';
import { internalGraphQuery, internalGraphSchema } from './internal-graph-tools';

const jsonResponse = (body: unknown) => ({
  json: async () => body,
});

describe('internal graph tools', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('returns introspection type and field names', async () => {
    vi.stubEnv('INTERNAL_GRAPH_URL', 'http://graph.test/graphql');
    vi.stubEnv('INTERNAL_GRAPH_AGENT_ID', 'agent-1');
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        data: {
          __schema: {
            types: [
              { name: 'Query', fields: [{ name: 'cart' }, { name: 'product' }] },
              { name: 'String', fields: null },
            ],
          },
        },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await internalGraphSchema.invoke({});

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://graph.test/graphql');
    expect(init.method).toBe('POST');
    expect(init.headers['x-agent-id']).toBe('agent-1');
    expect(JSON.parse(init.body).query).toContain('__schema');
    expect(result).toEqual([
      { name: 'Query', fields: ['cart', 'product'] },
      { name: 'String', fields: [] },
    ]);
  });

  it('posts the query document and returns the JSON body', async () => {
    vi.stubEnv('INTERNAL_GRAPH_AGENT_ID', 'agent-1');
    const payload = { data: { cart: { id: '1' } } };
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(payload));
    vi.stubGlobal('fetch', fetchMock);

    const result = await internalGraphQuery.invoke({
      query: 'query Cart($id: ID!) { cart(id: $id) { id } }',
      variables: { id: '1' },
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://localhost:3001/graphql');
    expect(init.headers['x-agent-id']).toBe('agent-1');
    expect(JSON.parse(init.body)).toEqual({
      query: 'query Cart($id: ID!) { cart(id: $id) { id } }',
      variables: { id: '1' },
    });
    expect(result).toEqual(payload);
  });

  it('rejects mutations and subscriptions', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(internalGraphQuery.invoke({ query: 'mutation { clearCart }' })).rejects.toThrow(
      /mutation/,
    );
    await expect(
      internalGraphQuery.invoke({ query: 'subscription { cartUpdates { id } }' }),
    ).rejects.toThrow(/subscription/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
