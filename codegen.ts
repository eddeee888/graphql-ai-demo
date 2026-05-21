import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['apps/experience-graph/**/schema.graphqls'],
  generates: {
    'apps/experience-graph/src/schema': defineConfig({
      typesPluginsConfig: {
        contextType: '../main#ResolverContext',
      },
    }),
  },
};
export default config;
