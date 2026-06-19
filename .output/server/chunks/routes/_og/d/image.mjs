import { k as htmlPayloadCache, l as logger, c as createError, m as extractSocialPreviewTags, n as fetchIsland, p as prefixStorage, w as withTrailingSlash, o as useStorage, g as getQuery, q as handleCacheHeaders, s as setHeaders, r as setHeader, t as digest, v as logger$1, x as resolveContext, H as H3Error, y as useOgImageRuntimeConfig, z as getRequestHost, A as getSiteConfig, B as defineEventHandler } from '../../../nitro/nitro.mjs';
import { parse } from 'devalue';
import { createHead as createHead$1, renderSSRHead } from 'unhead/server';
import { isRef, toValue } from 'vue';
import { a as applyEmojis, r as resolvedFonts } from '../../../_/index.mjs';
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

const PAYLOAD_REGEX = /<script.+id="nuxt-og-image-options"[^>]*>(.+?)<\/script>/;
function extractOptionsFromHtml(html) {
  const match = String(html).match(PAYLOAD_REGEX);
  if (!match?.[1])
    return [];
  return parse(match[1]);
}
async function doFetchWithErrorHandling(fetch, path) {
  const res = await fetch(path, {
    redirect: "follow",
    headers: {
      accept: "text/html"
    }
  }).catch((err) => {
    return err;
  });
  let errorDescription;
  if (res.status >= 300 && res.status < 400) {
    if (res.headers.has("location")) {
      return await doFetchWithErrorHandling(fetch, res.headers.get("location") || "");
    }
    errorDescription = `${res.status} redirected to ${res.headers.get("location") || "unknown"}`;
  } else if (res.status >= 400) {
    errorDescription = `${res.status} error: ${res.statusText}`;
  }
  if (errorDescription) {
    return [null, createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to parse \`${path}\` for og-image extraction. ${errorDescription}`
    })];
  }
  return [res._data || await res.text(), null];
}
async function fetchPathHtmlAndExtractOptions(e, path, cacheKey) {
  const cachedHtmlPayload = await htmlPayloadCache.getItem(cacheKey);
  if (cachedHtmlPayload && cachedHtmlPayload.expiresAt > Date.now())
    return cachedHtmlPayload.value;
  let [html, err] = await doFetchWithErrorHandling(e.fetch, path);
  if (err) {
    logger.warn(err);
  }
  if (!html) {
    const [fallbackHtml, err2] = await doFetchWithErrorHandling(globalThis.$fetch.raw, path);
    if (err2) {
      return err2;
    }
    html = fallbackHtml;
  }
  if (!html) {
    return createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to read the path ${path} for og-image extraction, returning no HTML.`
    });
  }
  const [root, images] = extractSocialPreviewTags(html);
  const options = extractOptionsFromHtml(html);
  const payload = {
    options,
    socialPreview: { root, images }
  };
  if (payload) {
    await htmlPayloadCache.setItem(cacheKey, {
      // 60 minutes for prerender, 10 seconds for runtime
      expiresAt: Date.now() + 1e3 * (10),
      value: payload
    });
  }
  return payload;
}

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const RE_SCRIPT_TAG = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
async function html(ctx) {
  const { options } = ctx;
  const fonts = resolvedFonts;
  if (!options.component) {
    throw createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Rendering an invalid component. Received options: ${JSON.stringify(options)}.`
    });
  }
  const islandTimeout = ctx.runtimeConfig.security?.renderTimeout ?? 15e3;
  const island = await fetchIsland(ctx.e, ctx.options.component, typeof ctx.options.props !== "undefined" ? ctx.options.props : ctx.options, islandTimeout);
  const head = createHead();
  head.push(island.head);
  let defaultFontFamily = "sans-serif";
  const firstFont = fonts[0];
  if (firstFont)
    defaultFontFamily = firstFont.family.replaceAll("+", " ");
  await applyEmojis(ctx, island);
  let html2 = island.html;
  const scale = options.props?.scale || 1;
  const scaledWidth = Math.round(Number(options.width) * scale);
  const scaledHeight = Math.round(Number(options.height) * scale);
  const fontFaces = fonts.map((font) => {
    const ext = font.src.split(".").pop()?.toLowerCase();
    const format = ext === "woff2" ? "woff2" : ext === "woff" ? "woff" : "truetype";
    return `@font-face {
  font-family: '${font.family.replaceAll("+", " ")}';
  font-style: ${font.style};
  font-weight: ${font.weight};
  src: url('${font.src}') format('${format}');
}`;
  }).join("\n");
  const bgColor = options.props?.colorMode === "dark" ? "#1b1b1b" : "#fff";
  head.push({
    style: [
      {
        innerHTML: `/* reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img, svg { display: block; max-width: 100%; }

/* viewport */
html, body {
  width: ${scaledWidth}px;
  height: ${scaledHeight}px;
  overflow: hidden;
  font-family: '${defaultFontFamily}', sans-serif;
  background-color: ${bgColor};
}

/* scale wrapper */
.og-scale-wrapper {
  transform: scale(${scale});
  transform-origin: top left;
  width: ${options.width}px;
  height: ${options.height}px;
}
.og-scale-wrapper > :first-child {
  width: 100%;
  height: 100%;
}

/* match satori flex defaults for divs */
div { display: flex; }
div:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl) {
  flex-direction: column;
}
div:not(:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl)) {
  flex-wrap: wrap;
  gap: 12px;
}

svg[data-emoji] { display: inline-block; }

/* fonts */
${fontFaces}`
      }
    ],
    meta: [
      { charset: "utf-8" }
    ]
  });
  RE_SCRIPT_TAG.lastIndex = 0;
  html2 = html2.replaceAll(RE_SCRIPT_TAG, "");
  const headChunk = await renderSSRHead(head);
  return `<!DOCTYPE html>
<html ${headChunk.htmlAttrs}>
<head>${headChunk.headTags}</head>
<body ${headChunk.bodyAttrs}>${headChunk.bodyTagsOpen}<div class="og-scale-wrapper" data-v-inspector-ignore="true">${html2}</div>${headChunk.bodyTags}</body>
</html>`;
}

function safeCompare(a, b) {
  if (a.length !== b.length)
    return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++)
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
function warnCacheBackendUnreachable(ctx, baseCacheKey, e) {
  if (ctx._nitro._ogImageCacheBackendWarned)
    return;
  ctx._nitro._ogImageCacheBackendWarned = true;
  logger$1.warn(`[Nuxt OG Image] Cache backend "${baseCacheKey}" unreachable, continuing without cache: ${e?.message || e}`);
}
async function useOgImageBufferCache(ctx, options) {
  const maxAge = Number(options.cacheMaxAgeSeconds);
  const intentionallyEnabled = maxAge > 0;
  let enabled = intentionallyEnabled;
  const cache = prefixStorage(useStorage(), withTrailingSlash(options.baseCacheKey || "/"));
  const key = ctx.key;
  let cachedItem = false;
  if (enabled) {
    const hasItem = await cache.hasItem(key).catch((e) => {
      enabled = false;
      warnCacheBackendUnreachable(ctx, options.baseCacheKey, e);
      return false;
    });
    const entry = hasItem ? await cache.getItem(key).catch((e) => {
      enabled = false;
      warnCacheBackendUnreachable(ctx, options.baseCacheKey, e);
      return null;
    }) : null;
    if (entry) {
      const { value, expiresAt, headers } = entry;
      const purgeValue = getQuery(ctx.e).purge;
      if (typeof purgeValue !== "undefined") {
        if (options.secret && !safeCompare(String(purgeValue), options.secret)) {
          return createError({
            statusCode: 403,
            statusMessage: "[Nuxt OG Image] Invalid purge token. Provide the signing secret as ?purge=<secret>."
          });
        }
        await cache.removeItem(key).catch((err) => {
        });
      } else if (expiresAt > Date.now()) {
        cachedItem = Buffer.from(value, "base64");
        if (handleCacheHeaders(ctx.e, {
          modifiedTime: new Date(headers["last-modified"]),
          etag: headers.etag,
          maxAge
        })) {
          return;
        }
        setHeaders(ctx.e, headers);
        setHeader(ctx.e, "X-OG-Cache", "HIT");
      } else {
        await cache.removeItem(key).catch((err) => {
        });
      }
    }
  }
  if (!enabled && true) {
    setHeader(ctx.e, "Cache-Control", "no-cache, no-store, must-revalidate");
    setHeader(ctx.e, "Pragma", "no-cache");
    setHeader(ctx.e, "Expires", "0");
  }
  return {
    enabled,
    cachedItem,
    async update(item) {
      setHeader(ctx.e, "X-OG-Cache", enabled ? "MISS" : "DISABLED");
      if (!enabled)
        return;
      const value = Buffer.from(item).toString("base64");
      const headers = {
        // avoid multi-tenancy cache issues
        "Vary": "accept-encoding, host",
        "etag": `W/"${digest(value)}"`,
        "last-modified": (/* @__PURE__ */ new Date()).toUTCString(),
        "cache-control": `public, max-age=${maxAge}, s-maxage=${maxAge}, immutable`
      };
      setHeaders(ctx.e, headers);
      await cache.setItem(key, {
        value,
        headers,
        expiresAt: Date.now() + maxAge * 1e3
      }).catch((err) => logger$1.warn(`[Nuxt OG Image] Failed to write cache for key "${key}": ${err?.message || err}`));
    }
  };
}

async function imageEventHandler(e) {
  const reqStart = performance.now();
  const ctx = await resolveContext(e).catch((err) => {
    logger$1.error(`resolveContext error for ${e.path}:`, err?.message || err);
    throw err;
  });
  if (ctx instanceof H3Error)
    return ctx;
  const timings = ctx.timings;
  timings.record("resolve-context", performance.now() - reqStart);
  try {
    return await renderOgImage(e, ctx);
  } finally {
    timings.record("total", performance.now() - reqStart);
    const header = timings.header();
    if (header)
      setHeader(e, "Server-Timing", header);
  }
}
async function renderOgImage(e, ctx) {
  const timings = ctx.timings;
  const { isDevToolsContextRequest, extension, renderer } = ctx;
  const { debug, baseCacheKey, security } = useOgImageRuntimeConfig(e);
  if (security?.restrictRuntimeImagesToOrigin) {
    const requestHost = getRequestHost(e, { xForwardedHost: true });
    let requestHostname;
    if (requestHost) {
      try {
        requestHostname = new URL(`http://${requestHost}`).hostname;
      } catch {
        requestHostname = void 0;
      }
    }
    const isLoopback = !!security.secret && (requestHostname === "localhost" || requestHostname === "127.0.0.1" || requestHostname === "::1");
    if (!isLoopback) {
      const siteHost = new URL(getSiteConfig(e).url).host;
      const allowedHosts = [siteHost, ...security.restrictRuntimeImagesToOrigin.map((o) => {
        try {
          return new URL(o).host;
        } catch {
          return o;
        }
      })];
      if (!requestHost || !allowedHosts.includes(requestHost)) {
        return createError({
          statusCode: 403,
          statusMessage: "[Nuxt OG Image] Host not allowed."
        });
      }
    }
  }
  if ((debug) && isDevToolsContextRequest) {
    setHeader(e, "Content-Type", "application/json");
    const [extract, rendererDebug] = await Promise.all([
      fetchPathHtmlAndExtractOptions(e, ctx.basePath, ctx.key),
      renderer.debug ? renderer.debug(ctx).catch((err) => {
        logger$1.debug(`renderer.debug failed for ${ctx.options.component}: ${err?.message || err}`);
        return {};
      }) : {}
    ]);
    return {
      extract,
      siteUrl: getSiteConfig(e).url,
      ...rendererDebug
    };
  }
  switch (extension) {
    case "html":
      setHeader(e, "Content-Type", `text/html`);
      return html(ctx);
    case "svg": {
      if (!debug && true) {
        return createError({
          statusCode: 404
        });
      }
      if (ctx.renderer.name !== "satori") {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/svg+xml`);
      const debugResult = await ctx.renderer.debug(ctx);
      return debugResult.svg;
    }
    case "png":
    case "jpeg":
    case "jpg":
    case "webp":
      if (!renderer.supportedFormats.includes(extension)) {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/${extension === "jpg" ? "jpeg" : extension}`);
      break;
    default:
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Invalid request for og.${extension}.`
      });
  }
  const endCacheLookup = timings.start("cache-lookup");
  const cacheApi = await useOgImageBufferCache(ctx, {
    cacheMaxAgeSeconds: ctx.options.cacheMaxAgeSeconds,
    baseCacheKey,
    secret: security?.secret
  }).finally(endCacheLookup);
  if (typeof cacheApi === "undefined") {
    return;
  }
  if (cacheApi instanceof H3Error) {
    return cacheApi;
  }
  let image = cacheApi.cachedItem;
  if (image) {
    timings.record("cache-hit", 0);
  }
  if (!image) {
    const timeout = security?.renderTimeout ?? 15e3;
    let timer;
    const endRender = timings.start("render-total");
    image = await Promise.race([
      renderer.createImage(ctx),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`OG image render timed out after ${timeout}ms`)), timeout);
      })
    ]).catch((err) => {
      if (err?.message?.includes("timed out")) {
        logger$1.error(`renderer.createImage timeout for ${e.path}`);
        return createError({ statusCode: 408, statusMessage: `[Nuxt OG Image] Request timed out while waiting for OG image render.` });
      }
      logger$1.error(`renderer.createImage error for ${e.path}:`, err?.stack || err?.message || err);
      throw err;
    }).finally(() => {
      clearTimeout(timer);
      endRender();
    });
    if (image instanceof H3Error) {
      return image;
    }
    if (!image) {
      return createError({
        statusCode: 500,
        statusMessage: `Failed to generate og.${extension}.`
      });
    }
    await cacheApi.update(image);
  }
  return image;
}

const image = defineEventHandler(imageEventHandler);

export { image as default };
//# sourceMappingURL=image.mjs.map
