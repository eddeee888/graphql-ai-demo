import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['apps/experience-graph/**/schema.graphqls'],
  generates: {
    'apps/shop/src/gql/': {
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
    'apps/experience-graph/src/schema': defineConfig({
      resolverGeneration: 'minimal',
      typesPluginsConfig: {
        contextType: '../main#ResolverContext',
      },
    }),
  },
};
export default config;
