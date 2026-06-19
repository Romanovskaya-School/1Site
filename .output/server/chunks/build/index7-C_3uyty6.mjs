import { e as defineSchemaOrgResolver, g as resolveDefaultType, r as resolveRelation, f as resolvableDateToIso } from './server.mjs';
import { p as personResolver } from './index3-B00Q92fD.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'lru-cache';
import 'consola';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'nuxtseo-shared/utils';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'perfect-debounce';
import '@vue/shared';
import 'vue-router';
import 'unhead/plugins';
import 'unhead/utils';
import './index16-D5q7toI8.mjs';
import './index28-DsxNJ6eH.mjs';
import './index40-evICQSOX.mjs';
import './index39-CNiSnBwJ.mjs';

const PrimaryDatasetId = "#dataset";
const datasetResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Dataset"
  },
  inheritMeta: [
    "description",
    "url",
    "dateModified",
    "datePublished",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", PrimaryDatasetId],
  resolve(node, ctx) {
    resolveDefaultType(node, "Dataset");
    node.creator = resolveRelation(node.creator, ctx, personResolver, {
      root: true
    });
    node.dateModified = resolvableDateToIso(node.dateModified);
    node.datePublished = resolvableDateToIso(node.datePublished);
    return node;
  }
});

export { PrimaryDatasetId, datasetResolver };
//# sourceMappingURL=index7-C_3uyty6.mjs.map
