import { e as defineSchemaOrgResolver, f as resolvableDateToIso, l as resolveWithBase, r as resolveRelation } from './server.mjs';
import { aggregateRatingResolver } from './index2-Bktus5GQ.mjs';
import { p as personResolver } from './index3-B00Q92fD.mjs';
import { reviewResolver } from './index32-BVU8RAwA.mjs';
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
import './schema-org.Ba7D0Hp1-Di_IxlWp.mjs';

const musicAlbumResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MusicAlbum"
  },
  idPrefix: "host",
  resolve(node, ctx) {
    if (node.datePublished)
      node.datePublished = resolvableDateToIso(node.datePublished);
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    node.byArtist = resolveRelation(node.byArtist, ctx, personResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  }
});

export { musicAlbumResolver };
//# sourceMappingURL=index19-BhrLKRS_.mjs.map
