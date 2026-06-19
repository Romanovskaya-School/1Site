import { e as defineSchemaOrgResolver, r as resolveRelation, f as resolvableDateToIso } from './server.mjs';
import { aggregateRatingResolver } from './index2-Bktus5GQ.mjs';
import { p as personResolver, o as organizationResolver } from './index3-B00Q92fD.mjs';
import { videoResolver } from './index38-BXySBez2.mjs';
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

const tvSeasonResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "TVSeason"
  },
  resolve(node, ctx) {
    node.actor = resolveRelation(node.actor, ctx, personResolver);
    node.director = resolveRelation(node.director, ctx, personResolver);
    node.productionCompany = resolveRelation(node.productionCompany, ctx, organizationResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.trailer = resolveRelation(node.trailer, ctx, videoResolver);
    if (node.datePublished)
      node.datePublished = resolvableDateToIso(node.datePublished);
    if (node.startDate)
      node.startDate = resolvableDateToIso(node.startDate);
    if (node.endDate)
      node.endDate = resolvableDateToIso(node.endDate);
    return node;
  }
});

export { tvSeasonResolver };
//# sourceMappingURL=index36-BCtolFhl.mjs.map
