import { e as defineSchemaOrgResolver, h as resolvableDateToDate, l as resolveWithBase, r as resolveRelation } from './server.mjs';
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

const musicGroupResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MusicGroup"
  },
  idPrefix: "host",
  inheritMeta: [
    { meta: "host", key: "url" }
  ],
  resolve(node, ctx) {
    if (node.foundingDate)
      node.foundingDate = resolvableDateToDate(node.foundingDate);
    if (node.dissolutionDate)
      node.dissolutionDate = resolvableDateToDate(node.dissolutionDate);
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    node.member = resolveRelation(node.member, ctx, personResolver);
    return node;
  }
});

export { musicGroupResolver };
//# sourceMappingURL=index20-BQ4ZWCmu.mjs.map
