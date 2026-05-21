/**
 * Sanity Studio configuration for Qlarify Health
 *
 * Project: qdu0z4t2
 * Dataset: production
 * Owner:   info@qlarify.health
 *
 * Deploy Studio:  npx sanity deploy
 * Local Studio:   npx sanity dev
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

export default defineConfig({
  name: 'qlarify-health',
  title: 'Qlarify Health CMS',
  projectId: 'qdu0z4t2',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Insight Articles')
              .icon(() => '📝')
              .child(
                S.documentList()
                  .title('Insight Articles')
                  .filter('_type == "insight"')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Draft Articles')
              .icon(() => '✏️')
              .child(
                S.documentList()
                  .title('Drafts')
                  .filter('_type == "insight" && draft == true')
              ),
            S.listItem()
              .title('Published Articles')
              .icon(() => '✅')
              .child(
                S.documentList()
                  .title('Published')
                  .filter('_type == "insight" && draft != true')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
