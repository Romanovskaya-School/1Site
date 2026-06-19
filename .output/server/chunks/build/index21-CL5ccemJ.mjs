import { e as defineSchemaOrgResolver, f as resolvableDateToIso, l as resolveWithBase, r as resolveRelation } from './server.mjs';
import { aggregateRatingResolver } from './index2-Bktus5GQ.mjs';
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

const musicPlaylistResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MusicPlaylist"
  },
  idPrefix: "host",
  resolve(node, ctx) {
    if (node.datePublished)
      node.datePublished = resolvableDateToIso(node.datePublished);
    if (node.dateModified)
      node.dateModified = resolvableDateToIso(node.dateModified);
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    node.creator = resolveRelation(node.creator, ctx, personResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    return node;
  }
});

export { musicPlaylistResolver };
//# sourceMappingURL=index21-CL5ccemJ.mjs.map
