import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'apps/shop/src/gql/': {
      schema: 'apps/experience-graph/src/**/schema.graphqls',
      documents: ['apps/shop/src/**/*.graphql.ts'],
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
    'apps/experience-graph/src/schema': defineConfig(
      {
        resolverGeneration: 'minimal',
        typesPluginsConfig: {
          contextType: '../main#ResolverContext',
        },
      },
      { schema: 'apps/experience-graph/src/**/schema.graphqls' },
    ),
    'apps/internal-graph/src/schema': defineConfig(
      {
        resolverGeneration: 'minimal',
        typesPluginsConfig: {
          contextType: '../main#ResolverContext',
        },
      },
      { schema: 'apps/internal-graph/src/**/schema.graphqls' },
    ),
  },
};
export default config;
