import { B as defineEventHandler, y as useOgImageRuntimeConfig, z as getRequestHost, A as getSiteConfig, c as createError, C as parseURL, D as isInternalRoute, g as getQuery, E as withQuery, F as withLeadingSlash, G as sendRedirect } from '../../../nitro/nitro.mjs';
import 'lru-cache';
import 'consola';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import 'node:url';
import 'nuxtseo-shared/utils';

const RE_META_TAG = /<meta\b[^>]*>/gi;
const RE_META_KEY = /\b(?:property|name)\s*=\s*(?:"([^"]+)"|'([^']+)')/i;
const RE_META_CONTENT = /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
const MAX_RESOLVE_PATH_LENGTH = 2048;
const RE_STRIP_PREFIX = /^.*?\/_og\/r/;
const RE_IMAGE_EXT = /\.(?:png|jpe?g|webp|svg)$/i;
const RE_DOUBLE_LEADING_SLASH = /^\/{2,}/;
function extractMeta(html, key) {
  for (const tagMatch of html.matchAll(RE_META_TAG)) {
    const tag = tagMatch[0];
    const keyMatch = tag.match(RE_META_KEY);
    const keyValue = keyMatch?.[1] ?? keyMatch?.[2];
    if (keyValue?.toLowerCase() !== key)
      continue;
    const contentMatch = tag.match(RE_META_CONTENT);
    const content = contentMatch?.[1] ?? contentMatch?.[2];
    if (content)
      return content;
  }
  return void 0;
}
function resolveTargetPath(event) {
  const pathname = parseURL(event.path).pathname;
  const stripped = pathname.replace(RE_STRIP_PREFIX, "") || "/";
  return stripped.replace(RE_IMAGE_EXT, "") || "/";
}
const resolve = defineEventHandler(async (event) => {
  const runtimeConfig = useOgImageRuntimeConfig(event);
  const security = runtimeConfig.security;
  if (security?.restrictRuntimeImagesToOrigin) {
    const requestHost = getRequestHost(event, { xForwardedHost: true });
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
      const siteHost = new URL(getSiteConfig(event).url).host;
      const allowedHosts = [siteHost, ...security.restrictRuntimeImagesToOrigin.map((o) => {
        try {
          return new URL(o).host;
        } catch {
          return o;
        }
      })];
      if (!requestHost || !allowedHosts.includes(requestHost)) {
        throw createError({
          statusCode: 403,
          statusMessage: "[Nuxt OG Image] Host not allowed."
        });
      }
    }
  }
  if (security?.maxQueryParamSize && true) {
    const queryString = parseURL(event.path).search || "";
    if (queryString.length > security.maxQueryParamSize) {
      throw createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Query string exceeds maximum allowed length of ${security.maxQueryParamSize} characters.`
      });
    }
  }
  const targetPath = resolveTargetPath(event);
  if (targetPath.length > MAX_RESOLVE_PATH_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Target path exceeds ${MAX_RESOLVE_PATH_LENGTH} characters.`
    });
  }
  if (targetPath.includes("://") || RE_DOUBLE_LEADING_SLASH.test(targetPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Target path must be a same-origin path."
    });
  }
  if (isInternalRoute(targetPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Cannot resolve og:image for internal route."
    });
  }
  const query = getQuery(event);
  const ogKey = typeof query._og_key === "string" ? query._og_key.toLowerCase() : "";
  const metaKey = ogKey === "twitter" ? "twitter:image" : "og:image";
  const forwardQuery = {};
  for (const [k, v] of Object.entries(query)) {
    if (!k.startsWith("_og_"))
      forwardQuery[k] = v;
  }
  const fetchPath = withQuery(withLeadingSlash(targetPath), forwardQuery);
  const html = await event.$fetch(fetchPath, {
    headers: { accept: "text/html" },
    responseType: "text"
  }).catch((err) => {
    throw createError({
      statusCode: 502,
      statusMessage: `[Nuxt OG Image] Failed to fetch ${fetchPath}: ${err?.message || "unknown error"}`
    });
  });
  const resolved = extractMeta(String(html), metaKey);
  if (!resolved) {
    throw createError({
      statusCode: 404,
      statusMessage: `[Nuxt OG Image] No <meta property="${metaKey}"> found on ${fetchPath}.`
    });
  }
  return sendRedirect(event, resolved, 302);
});

export { resolve as default };
//# sourceMappingURL=resolve.mjs.map
