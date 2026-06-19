import { e as defineSchemaOrgResolver, I as IdentityId, s as setIfEmpty, i as idReference, g as resolveDefaultType, r as resolveRelation } from './server.mjs';
import { aggregateRatingResolver } from './index2-Bktus5GQ.mjs';
import { offerResolver } from './index23-CSLd9KeG.mjs';
import { reviewResolver } from './index32-BVU8RAwA.mjs';
import { d as PrimaryWebPageId } from './index3-B00Q92fD.mjs';
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
import './schema-org.F44ipjVJ-7sllCrsW.mjs';
import './schema-org.Ba7D0Hp1-Di_IxlWp.mjs';
import './index16-D5q7toI8.mjs';
import './index28-DsxNJ6eH.mjs';
import './index40-evICQSOX.mjs';
import './index39-CNiSnBwJ.mjs';

const ServiceId = "#service";
const serviceResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Service"
  },
  inheritMeta: [
    "description",
    "image",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", ServiceId],
  resolve(node, ctx) {
    resolveDefaultType(node, "Service");
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  },
  resolveRootNode(service, { find }) {
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(service, "provider", idReference(identity));
    if (identity)
      setIfEmpty(service, "brand", idReference(identity));
    if (webPage)
      setIfEmpty(service, "mainEntityOfPage", idReference(webPage));
    return service;
  }
});

export { ServiceId, serviceResolver };
//# sourceMappingURL=index33-D3hr6fjm.mjs.map
