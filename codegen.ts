import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
import type { CodegenConfig } from '@graphql-codegen/cli';

const experienceGraphSchemaPattern =
  'apps/experience-graph/src/**/schema.graphqls';
const internalGraphSchemaPattern = 'apps/internal-graph/src/**/schema.graphqls';

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    'apps/shop/src/gql/': {
      schema: experienceGraphSchemaPattern,
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
    'apps/experience-graph/src/gql/': {
      schema: internalGraphSchemaPattern,
      documents: ['apps/experience-graph/src/schema/**/resolvers/**/*.ts'],
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    'apps/experience-graph/src/schema': defineConfig(
      {
        resolverGeneration: 'minimal',
        typesPluginsConfig: {
          contextType: '../main#ResolverContext',
        },
      },
      { schema: experienceGraphSchemaPattern },
    ),
    'apps/internal-graph/src/schema': defineConfig(
      {
        resolverGeneration: 'minimal',
        typesPluginsConfig: {
          contextType: '../main#ResolverContext',
        },
      },
      { schema: internalGraphSchemaPattern },
    ),
  },
};
export default config;
