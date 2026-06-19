import { e as defineSchemaOrgResolver, k as asArray, s as setIfEmpty, f as resolvableDateToIso, l as resolveWithBase, r as resolveRelation, n as imageResolver } from './server.mjs';
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

const videoResolver = defineSchemaOrgResolver({
  cast(input) {
    if (typeof input === "string") {
      input = {
        url: input
      };
    }
    return input;
  },
  alias: "video",
  defaults: {
    "@type": "VideoObject"
  },
  inheritMeta: [
    { meta: "title", key: "name" },
    "description",
    "image",
    "inLanguage",
    { meta: "datePublished", key: "uploadDate" }
  ],
  idPrefix: "host",
  resolve(video, ctx) {
    if (video.uploadDate)
      video.uploadDate = resolvableDateToIso(video.uploadDate);
    video.url = resolveWithBase(ctx.meta.host, video.url);
    if (video.caption && !video.description)
      video.description = video.caption;
    if (!video.description)
      video.description = "No description";
    if (video.thumbnailUrl && (typeof video.thumbnailUrl === "string" || Array.isArray(video.thumbnailUrl))) {
      const images = asArray(video.thumbnailUrl).map((image) => resolveWithBase(ctx.meta.host, image));
      video.thumbnailUrl = images.length > 1 ? images : images[0];
    }
    if (video.thumbnail)
      video.thumbnail = resolveRelation(video.thumbnailUrl, ctx, imageResolver);
    return video;
  },
  resolveRootNode(video, { find }) {
    var _a;
    if (video.image && !video.thumbnail) {
      const firstImage = asArray(video.image)[0];
      setIfEmpty(video, "thumbnail", (_a = find(firstImage["@id"])) == null ? void 0 : _a.url);
    }
  }
});

export { videoResolver };
//# sourceMappingURL=index38-BXySBez2.mjs.map
