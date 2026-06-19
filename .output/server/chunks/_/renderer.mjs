import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { z as getRequestHost, I as getNitroOrigin, $ as $fetch$1, y as useOgImageRuntimeConfig, J as join, u as useRuntimeConfig, K as withBase, L as fontArrayCache, v as logger, M as fontCache, l as logger$1, N as toBase64Image, n as fetchIsland, O as withTimeout, P as defu } from '../nitro/nitro.mjs';
import { g as getFetchTimeout, r as resolvedFonts, a as applyEmojis } from './index.mjs';
import { readFile } from 'node:fs/promises';
import { parse, ELEMENT_NODE, TEXT_NODE } from 'ultrahtml';
import { querySelector } from 'ultrahtml/selector';
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

function getCloudflareAssets(event) {
  const assets = event.context.cloudflare?.env?.ASSETS || event.context.ASSETS;
  return assets && typeof assets.fetch === "function" ? assets : void 0;
}
async function tryCloudflareAssetsFetch(event, path, signal) {
  const assets = getCloudflareAssets(event);
  if (!assets)
    return;
  const origin = event.context.cloudflare?.request?.url || `https://${getRequestHost(event) || "localhost"}`;
  const url = new URL(path, origin).href;
  const res = await assets.fetch(url, signal ? { signal } : void 0).catch(() => null);
  if (!res || !res.ok)
    return;
  return res.arrayBuffer();
}

async function fetchLocalAsset(event, path, options) {
  const { fetchTimeout, headers, includeExternalFallback = false, onStepFailure } = options;
  const deadline = AbortSignal.timeout(fetchTimeout);
  let expired = false;
  const timer = new Promise((resolve) => {
    setTimeout(() => {
      expired = true;
      resolve(void 0);
    }, fetchTimeout);
  });
  const race = (p) => Promise.race([p, timer]);
  let result = await race(tryCloudflareAssetsFetch(event, path, deadline).catch((err) => {
    onStepFailure?.(path, err);
    return void 0;
  }));
  if (result || expired)
    return result;
  result = await race(event.$fetch(path, {
    responseType: "arrayBuffer",
    signal: deadline,
    timeout: fetchTimeout,
    headers
  }).catch((err) => {
    onStepFailure?.(path, err);
    return void 0;
  }));
  if (result || expired || !includeExternalFallback)
    return result;
  const absolute = `${getNitroOrigin(event)}${path}`;
  return await race($fetch$1(absolute, {
    responseType: "arrayBuffer",
    signal: deadline,
    timeout: fetchTimeout,
    headers
  }).catch((err) => {
    onStepFailure?.(absolute, err);
    return void 0;
  }));
}

const RE_IPV6_BRACKETS = /^\[|\]$/g;
const RE_DIGIT_ONLY = /^\d+$/;
const RE_INT_IP = /^(?:0x[\da-f]+|\d+)$/i;
const RE_HEX_GROUP = /^[0-9a-f]{1,4}$/i;
const RE_IPV6_CHARS = /^[0-9a-f:.]+$/i;
const RE_TRAILING_V4 = /(\d+\.\d+\.\d+\.\d+)$/;
const MAX_REDIRECTS = 5;
function isPrivateIPv4(a, b) {
  if (a === 127)
    return true;
  if (a === 10)
    return true;
  if (a === 172 && b >= 16 && b <= 31)
    return true;
  if (a === 192 && b === 168)
    return true;
  if (a === 169 && b === 254)
    return true;
  if (a === 0)
    return true;
  return false;
}
function expandIPv6(addr) {
  const noZone = addr.split("%")[0];
  if (!noZone || !RE_IPV6_CHARS.test(noZone))
    return null;
  let work = noZone;
  const v4Match = work.match(RE_TRAILING_V4);
  if (v4Match) {
    const octets = v4Match[1].split(".").map(Number);
    if (octets.some((o) => !Number.isFinite(o) || o < 0 || o > 255))
      return null;
    const hi = (octets[0] << 8 | octets[1]).toString(16);
    const lo = (octets[2] << 8 | octets[3]).toString(16);
    work = `${work.slice(0, -v4Match[1].length) + hi}:${lo}`;
  }
  const parts = work.split("::");
  if (parts.length > 2)
    return null;
  const head = parts[0] ? parts[0].split(":") : [];
  const tail = parts[1] !== void 0 && parts[1] ? parts[1].split(":") : [];
  if (parts.length === 1) {
    if (head.length !== 8)
      return null;
  } else if (head.length + tail.length > 7) {
    return null;
  }
  const fillCount = parts.length === 2 ? 8 - head.length - tail.length : 0;
  const allGroups = [...head, ...Array.from({ length: fillCount }).fill("0"), ...tail];
  const result = [];
  for (const g of allGroups) {
    if (!RE_HEX_GROUP.test(g))
      return null;
    result.push(Number.parseInt(g, 16));
  }
  return result;
}
function isPrivateIPv6(groups) {
  const [g0, g1, g2, g3, g4, g5, g6, g7] = groups;
  if (g0 === 0 && g1 === 0 && g2 === 0 && g3 === 0 && g4 === 0 && g5 === 0 && g6 === 0 && g7 === 1)
    return true;
  if (g0 === 0 && g1 === 0 && g2 === 0 && g3 === 0 && g4 === 0 && g5 === 0 && g6 === 0 && g7 === 0)
    return true;
  if (g0 === 0 && g1 === 0 && g2 === 0 && g3 === 0 && g4 === 0 && g5 === 65535) {
    const a = g6 >> 8 & 255;
    const b = g6 & 255;
    return isPrivateIPv4(a, b);
  }
  if (g0 === 0 && g1 === 0 && g2 === 0 && g3 === 0 && g4 === 0 && g5 === 0) {
    const a = g6 >> 8 & 255;
    const b = g6 & 255;
    return isPrivateIPv4(a, b);
  }
  if (g0 === 0 && g1 === 0 && g2 === 0 && g3 === 0 && g4 === 65535 && g5 === 0) {
    const a = g6 >> 8 & 255;
    const b = g6 & 255;
    return isPrivateIPv4(a, b);
  }
  if (g0 === 100 && g1 === 65435 && g2 === 0 && g3 === 0 && g4 === 0 && g5 === 0) {
    const a = g6 >> 8 & 255;
    const b = g6 & 255;
    return isPrivateIPv4(a, b);
  }
  if (g0 === 8194) {
    const a = g1 >> 8 & 255;
    const b = g1 & 255;
    return isPrivateIPv4(a, b);
  }
  if (g0 === 100 && g1 === 65435 && g2 === 1)
    return true;
  if ((g0 & 65024) === 64512)
    return true;
  if ((g0 & 65472) === 65152)
    return true;
  if ((g0 & 65472) === 65216)
    return true;
  if (g0 === 8193 && g1 === 3512)
    return true;
  if ((g0 & 65520) === 16368)
    return true;
  if (g0 === 24320)
    return true;
  if ((g0 & 65280) === 65280)
    return true;
  return false;
}
function isBlockedUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return true;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
    return true;
  const hostname = parsed.hostname.toLowerCase();
  const bare = hostname.replace(RE_IPV6_BRACKETS, "");
  if (bare === "localhost" || bare.endsWith(".localhost"))
    return true;
  const dottedParts = bare.split(".");
  if (dottedParts.length === 4 && dottedParts.every((p) => RE_DIGIT_ONLY.test(p))) {
    const octets = dottedParts.map(Number);
    if (octets.some((o) => o > 255))
      return true;
    return isPrivateIPv4(octets[0], octets[1]);
  }
  if (RE_INT_IP.test(bare)) {
    const num = Number(bare);
    if (Number.isFinite(num) && num >= 0 && num <= 4294967295)
      return isPrivateIPv4(num >>> 24 & 255, num >>> 16 & 255);
  }
  if (bare.includes(":")) {
    const groups = expandIPv6(bare);
    if (groups)
      return isPrivateIPv6(groups);
    return true;
  }
  return false;
}
async function fetchWithRedirectValidation(initialUrl, opts) {
  const controller = new AbortController();
  const externalAbort = opts.signal;
  const onExternalAbort = () => controller.abort(externalAbort?.reason);
  if (externalAbort) {
    if (externalAbort.aborted)
      controller.abort(externalAbort.reason);
    else
      externalAbort.addEventListener("abort", onExternalAbort, { once: true });
  }
  const timer = setTimeout(() => controller.abort(new Error("timeout")), opts.timeout);
  try {
    let url = initialUrl;
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      if (isBlockedUrl(url))
        return null;
      const res = await fetch(url, {
        redirect: "manual",
        signal: controller.signal,
        headers: opts.headers
      });
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc)
          return null;
        url = new URL(loc, url).toString();
        continue;
      }
      if (!res.ok)
        return null;
      return await res.arrayBuffer();
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
    if (externalAbort)
      externalAbort.removeEventListener("abort", onExternalAbort);
  }
}

const buildDir = "/Users/mrm/ViktoriaVue/.nuxt";

async function resolve$2(event, font) {
  const path = font.src || font.localPath;
  const timeout = getFetchTimeout(useOgImageRuntimeConfig());
  if (font.absolutePath) {
    const data = await readFile(font.absolutePath).catch(() => null);
    if (data?.length)
      return data;
  }
  if (path.startsWith("/_og-static-fonts/")) {
    const filename = path.slice("/_og-static-fonts/".length);
    const cached = await readFile(join(buildDir, "cache", "og-image", "fonts-ttf", filename)).catch(() => null);
    if (cached?.length)
      return cached;
  }
  const { app } = useRuntimeConfig();
  const fullPath = withBase(path, app.baseURL);
  const arrayBuffer = await event.$fetch(fullPath, {
    responseType: "arrayBuffer",
    timeout
  });
  return Buffer.from(arrayBuffer);
}

async function resolve$1(event, font) {
  const path = font.src || font.localPath;
  const { app } = useRuntimeConfig();
  const fullPath = withBase(path, app.baseURL);
  const origin = getNitroOrigin(event);
  const timeout = getFetchTimeout(useOgImageRuntimeConfig());
  const res = await fetch(new URL(fullPath, origin).href, { signal: AbortSignal.timeout(timeout) }).catch(() => null);
  if (res?.ok) {
    return Buffer.from(await res.arrayBuffer());
  }
  const arrayBuffer = await event.$fetch(fullPath, {
    responseType: "arrayBuffer",
    timeout
  });
  return Buffer.from(arrayBuffer);
}

const resolve = (false || false) ? resolve$2 : resolve$1;

const fontRequirements = {"weights":[400],"styles":["normal"],"families":[],"hasDynamicBindings":false};
const _staticMap = {};
function getComponentFontMap() { return _staticMap }

const availableFonts = [];

function fontFormat(src) {
  if (src.endsWith(".woff2"))
    return "woff2";
  if (src.endsWith(".woff"))
    return "woff";
  if (src.endsWith(".otf"))
    return "otf";
  return "ttf";
}
function selectFontSource(f, supportedFormats, preferStatic) {
  const primarySupported = supportedFormats.has(fontFormat(f.src));
  const satoriSupported = !!(f.satoriSrc && supportedFormats.has(fontFormat(f.satoriSrc)));
  const isVariable = !!f.weightRange;
  if (preferStatic && !isVariable && satoriSupported && f.satoriSrc !== f.src)
    return { src: f.satoriSrc, isStaticFallback: true };
  if (primarySupported)
    return { src: f.src, isStaticFallback: false };
  if (satoriSupported)
    return { src: f.satoriSrc, isStaticFallback: true };
  return null;
}

function renameSubsetFonts(fonts) {
  const groups = /* @__PURE__ */ new Map();
  for (const f of fonts) {
    const key = `${f.family}\0${f.weight}\0${f.style}`;
    const arr = groups.get(key);
    if (arr)
      arr.push(f);
    else
      groups.set(key, [f]);
  }
  const result = [];
  let changed = false;
  for (const members of groups.values()) {
    const needsRename = members.length > 1 && new Set(members.map((f) => f.cacheKey)).size > 1;
    if (!needsRename) {
      result.push(...members);
      continue;
    }
    changed = true;
    for (let i = 0; i < members.length; i++) {
      const f = members[i];
      result.push({
        ...f,
        originalFamily: f.originalFamily || f.family,
        family: `${f.family}__${i}`
      });
    }
  }
  return changed ? result : fonts;
}
function buildSubsetFamilyChain(fonts) {
  const chains = /* @__PURE__ */ new Map();
  for (const f of fonts) {
    if (!f.originalFamily)
      continue;
    const arr = chains.get(f.originalFamily);
    if (arr)
      arr.push(f.family);
    else
      chains.set(f.originalFamily, [f.family]);
  }
  return chains;
}
function resolveSubsetChain(family, chains) {
  const direct = chains.get(family);
  if (direct)
    return direct;
  const lower = family.toLowerCase();
  for (const [key, value] of chains) {
    if (key.toLowerCase() === lower)
      return value;
  }
}

const RE_UNICODE_RANGE_PART = /^U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?$/;
function parseUnicodeRange(range) {
  const parts = range.split(",").map((s) => s.trim()).filter(Boolean);
  const result = [];
  for (const part of parts) {
    const match = part.match(RE_UNICODE_RANGE_PART);
    if (!match)
      return null;
    const start = Number.parseInt(match[1], 16);
    const end = match[2] ? Number.parseInt(match[2], 16) : start;
    result.push([start, end]);
  }
  return result.length > 0 ? result : null;
}
function codepointsIntersectRanges(codepoints, ranges) {
  for (const cp of codepoints) {
    for (const [start, end] of ranges) {
      if (cp >= start && cp <= end)
        return true;
    }
  }
  return false;
}
function addCodepointsFromString(str, codepoints) {
  for (const ch of str)
    codepoints.add(ch.codePointAt(0));
}
function extractCodepoints(node) {
  const codepoints = /* @__PURE__ */ new Set();
  const walk = (n) => {
    if (typeof n.text === "string")
      addCodepointsFromString(n.text, codepoints);
    const children = n.props?.children ?? n.children;
    if (typeof children === "string") {
      addCodepointsFromString(children, codepoints);
    } else if (Array.isArray(children)) {
      for (const child of children) {
        if (child == null)
          continue;
        if (typeof child === "string")
          addCodepointsFromString(child, codepoints);
        else
          walk(child);
      }
    }
  };
  walk(node);
  return codepoints;
}

async function loadFont(event, font, src) {
  const cacheKey = `${font.family}-${font.weight}-${font.style}-${src}`;
  const cached = fontCache.get(cacheKey);
  if (cached)
    return cached;
  const data = await resolve(event, { ...font, src }).catch((err) => {
    logger.warn(`Failed to load font ${font.family}: ${err.message}`);
    return null;
  });
  if (!data)
    return null;
  fontCache.set(cacheKey, data);
  return data;
}
function findClosestWeight(target, available) {
  return available.reduce(
    (closest, w) => Math.abs(w - target) < Math.abs(closest - target) ? w : closest
  );
}
function selectFontsForRequirements(allFonts, requirements) {
  if (requirements.hasDynamicBindings)
    return [...allFonts];
  const fallbackFonts = [];
  const byFamily = /* @__PURE__ */ new Map();
  const requiredFamilies = requirements.families.length > 0 ? new Set(requirements.families) : null;
  for (const f of allFonts) {
    if (f.fallback) {
      fallbackFonts.push(f);
      continue;
    }
    if (!requirements.styles.includes(f.style))
      continue;
    if (requiredFamilies && !requiredFamilies.has(f.family))
      continue;
    const arr = byFamily.get(f.family) || [];
    arr.push(f);
    byFamily.set(f.family, arr);
  }
  const selected = [];
  for (const [, familyFonts] of byFamily) {
    const availableWeights = [...new Set(familyFonts.map((f) => f.weight))].toSorted((a, b) => a - b);
    if (availableWeights.length === 0)
      continue;
    const selectedWeights = /* @__PURE__ */ new Set();
    for (const w of requirements.weights) {
      if (availableWeights.includes(w)) {
        selectedWeights.add(w);
      } else {
        selectedWeights.add(findClosestWeight(w, availableWeights));
      }
    }
    selected.push(...familyFonts.filter((f) => selectedWeights.has(f.weight)));
  }
  selected.push(...fallbackFonts);
  return selected;
}
const _warnedFontKeys = /* @__PURE__ */ new Set();
async function loadAllFonts(event, options) {
  const map = getComponentFontMap();
  const componentReqs = options.component ? map[options.component] : null;
  !!(componentReqs && componentReqs.hasDynamicBindings);
  const reqs = componentReqs && !componentReqs.hasDynamicBindings ? componentReqs : fontRequirements;
  const fonts = selectFontsForRequirements(resolvedFonts, reqs);
  if (options.fontFamilyOverride) {
    const loadedFamilies = new Set(fonts.map((f) => f.family));
    if (!loadedFamilies.has(options.fontFamilyOverride)) {
      const overrideFonts = availableFonts.filter((f) => f.family === options.fontFamilyOverride);
      if (overrideFonts.length > 0) {
        fonts.push(...overrideFonts);
      } else {
        const resolvedOverride = resolvedFonts.filter((f) => f.family === options.fontFamilyOverride);
        fonts.push(...resolvedOverride);
      }
    }
  }
  const resolved = [];
  for (const f of fonts) {
    const selection = selectFontSource(f, options.supportedFormats, options.preferStatic ?? false);
    if (selection)
      resolved.push({ font: f, ...selection });
  }
  const filtered = options.codepoints && options.codepoints.size > 0 ? resolved.filter(({ font: f, isStaticFallback }) => {
    if (isStaticFallback || !f.unicodeRange)
      return true;
    const ranges = parseUnicodeRange(f.unicodeRange);
    if (!ranges)
      return true;
    return codepointsIntersectRanges(options.codepoints, ranges);
  }) : resolved;
  const results = await Promise.all(
    filtered.map(async ({ font: f, src: initialSrc, isStaticFallback }) => {
      let src = initialSrc;
      let data = await loadFont(event, f, src);
      if (!data && src !== f.src && options.supportedFormats.has(fontFormat(f.src))) {
        data = await loadFont(event, f, f.src);
        if (data) {
          src = f.src;
          isStaticFallback = false;
        }
      }
      if (!data)
        return null;
      return {
        ...f,
        src,
        ...isStaticFallback ? { unicodeRange: void 0 } : {},
        cacheKey: `${f.family}-${f.weight}-${f.style}-${src}`,
        data
      };
    })
  );
  const loaded = results.filter((f) => f !== null);
  const fingerprint = loaded.map((f) => f.cacheKey).sort().join("|");
  const cachedArray = fontArrayCache.get(fingerprint);
  if (cachedArray)
    return cachedArray;
  fontArrayCache.set(fingerprint, loaded);
  const isCommunity = options.component && map[options.component]?.category === "community";
  if (!options.supportedFormats.has("woff2") && loaded.length === 0 && fonts.length > 0 && !isCommunity) {
    const variableFamilies = [...new Set(fonts.map((f) => f.family))];
    const warnKey = `variable-fonts-${variableFamilies.join(",")}`;
    if (!_warnedFontKeys.has(warnKey)) {
      if (_warnedFontKeys.size >= 100)
        _warnedFontKeys.clear();
      _warnedFontKeys.add(warnKey);
      logger.warn(`All fonts are variable fonts (${variableFamilies.join(", ")}). Variable fonts are not supported by Satori renderer. Falling back to bundled Inter font. Consider using the 'takumi' renderer for variable font support.`);
    }
  }
  return loaded;
}
async function loadDefinedFonts(event, fontDefs) {
  const results = [];
  for (const def of fontDefs) {
    if (!def || typeof def !== "object" || !def.path)
      continue;
    const name = def.name;
    const weight = def.weight || 400;
    const style = def.style === "italic" ? "italic" : "normal";
    const path = def.path;
    const fontConfig = { family: name, weight, style, src: path, localPath: path };
    const data = await resolve(event.e, fontConfig).catch(() => null);
    if (data) {
      results.push({
        ...fontConfig,
        cacheKey: `custom-${name}-${weight}-${style}-${path}`,
        data
      });
    }
  }
  return results;
}
async function loadFontsForRenderer(event, options) {
  const baseFonts = await loadAllFonts(event.e, options);
  const customFonts = Array.isArray(options.fontDefs) && options.fontDefs.length > 0 ? await loadDefinedFonts(event, options.fontDefs) : [];
  const allFonts = customFonts.length > 0 ? [...baseFonts, ...customFonts] : baseFonts;
  return renameSubsetFonts(allFonts);
}
function getDefaultFontFamily(options) {
  const fontFamilyOverride = options.props?.fontFamily;
  const defaultFont = resolvedFonts[0]?.family;
  return { fontFamilyOverride, defaultFont };
}

const takumiInstance = { instance: void 0 };
async function ensureInstance() {
  takumiInstance.instance = takumiInstance.instance || await import('./node.mjs').then((m) => m.default);
  await takumiInstance.instance.initWasmPromise;
  return takumiInstance.instance;
}
async function getTakumi() {
  return (await ensureInstance()).Renderer;
}
async function getExtractResourceUrls() {
  return (await ensureInstance()).extractResourceUrls;
}

const RE_QUOT = /&quot;/g;
const RE_APOS_DEC = /&#39;/g;
const RE_APOS_HEX = /&#x27;/g;
const RE_LT$1 = /&lt;/g;
const RE_GT$1 = /&gt;/g;
const RE_CENT = /&cent;/g;
const RE_POUND = /&pound;/g;
const RE_YEN = /&yen;/g;
const RE_EURO = /&euro;/g;
const RE_COPY = /&copy;/g;
const RE_REG = /&reg;/g;
const RE_SLASH_HEX = /&#x2F;/g;
const RE_DEC_ENTITY = /&#(\d+);/g;
const RE_AMP$1 = /&amp;/g;
function decodeHtml(html) {
  return html.replace(RE_LT$1, "<").replace(RE_GT$1, ">").replace(RE_CENT, "\xA2").replace(RE_POUND, "\xA3").replace(RE_YEN, "\xA5").replace(RE_EURO, "\u20AC").replace(RE_COPY, "\xA9").replace(RE_REG, "\xAE").replace(RE_QUOT, '"').replace(RE_APOS_DEC, "'").replace(RE_APOS_HEX, "'").replace(RE_SLASH_HEX, "/").replace(RE_DEC_ENTITY, (full, int) => {
    return String.fromCharCode(Number.parseInt(int));
  }).replace(RE_AMP$1, "&");
}

function walkTree(e, node, plugins) {
  const promises = [];
  for (const plugin of plugins.flat()) {
    if (plugin.filter(node)) {
      promises.push(plugin.transform(node, e));
    }
  }
  if (!node.props?.children || !Array.isArray(node.props.children))
    return promises;
  if (node.props.children.length === 0) {
    delete node.props.children;
    return promises;
  }
  for (const child of node.props.children || []) {
    if (child && typeof child === "object") {
      promises.push(
        ...walkTree(e, child, plugins)
      );
    }
  }
  return promises;
}
function defineTransformer(transformer) {
  return transformer;
}

const encoding = defineTransformer([
  // clean up vue inspector data attributes
  {
    filter: (node) => node.props?.["data-v-inspector"],
    transform: (node) => {
      delete node.props["data-v-inspector"];
    }
  },
  // decode HTML entities in string children
  {
    filter: (node) => typeof node.props?.children === "string",
    transform: (node) => {
      node.props.children = decodeHtml(node.props.children);
    }
  },
  // decode HTML entities in array children (text nodes with siblings)
  {
    filter: (node) => Array.isArray(node.props?.children),
    transform: (node) => {
      node.props.children = node.props.children.map(
        (child) => typeof child === "string" ? decodeHtml(child) : child
      );
    }
  }
]);

function getImageDimensions(data) {
  if (data[0] === 137 && data[1] === 80 && data.length >= 24) {
    const width = new DataView(data.buffer, data.byteOffset + 16).getUint32(0, false);
    const height = new DataView(data.buffer, data.byteOffset + 20).getUint32(0, false);
    return { width, height };
  }
  if (data[0] === 255 && data[1] === 216) {
    let i = 2;
    while (i < data.length - 8) {
      if (data[i] === 255) {
        const marker = data[i + 1];
        if (marker >= 192 && marker <= 195 || marker === 201) {
          const height = data[i + 5] << 8 | data[i + 6];
          const width = data[i + 7] << 8 | data[i + 8];
          return { width, height };
        }
        const len = data[i + 2] << 8 | data[i + 3];
        i += len + 2;
      } else {
        i++;
      }
    }
  }
  if (data[0] === 71 && data[1] === 73 && data[2] === 70 && data.length >= 10) {
    const width = data[6] | data[7] << 8;
    const height = data[8] | data[9] << 8;
    return { width, height };
  }
  return {};
}

const RE_URL_LEADING = /^url\(['"]?/;
const RE_URL_TRAILING = /['"]?\)$/;
const SUBREQUEST_HEADERS = { "x-nuxt-og-image": "1" };
function toBufferSourceAsBase64(buf) {
  const ab = buf instanceof ArrayBuffer ? buf : ArrayBuffer.isView(buf) ? buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) : buf;
  return toBase64Image(ab);
}
const renderCaches = /* @__PURE__ */ new WeakMap();
function getRenderCache(e) {
  let cache = renderCaches.get(e);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    renderCaches.set(e, cache);
  }
  return cache;
}
function resolveSrcToBuffer(src, kind, ctx) {
  const cache = getRenderCache(ctx.e);
  const existing = cache.get(src);
  if (existing)
    return existing;
  const promise = doResolveSrcToBuffer(src, kind, ctx);
  cache.set(src, promise);
  return promise;
}
async function doResolveSrcToBuffer(src, kind, { e, publicStoragePath, runtimeConfig, timings }) {
  const fetchTimeout = getFetchTimeout(runtimeConfig);
  const logFailure = (url, err) => {
    logger$1.debug(`[og-image] ${kind} fetch failed (${url}): ${err?.message || err}`);
  };
  if (src.startsWith("/")) {
    let buffer2;
    if (!buffer2 && true) {
      const ab = await timings.measure("image-fetch", () => fetchLocalAsset(e, src, {
        fetchTimeout,
        headers: SUBREQUEST_HEADERS,
        includeExternalFallback: true,
        onStepFailure: logFailure
      }));
      if (ab)
        buffer2 = new Uint8Array(ab);
    }
    return buffer2 ? { buffer: buffer2 } : {};
  }
  const decodedSrc = decodeHtml(src);
  if (isBlockedUrl(decodedSrc)) {
    logger$1.warn(`Blocked internal ${kind} fetch: ${decodedSrc}`);
    return { blocked: true };
  }
  const end = timings.start("image-fetch");
  let buffer;
  {
    const ab = await fetchWithRedirectValidation(decodedSrc, {
      timeout: fetchTimeout
    }).catch((err) => {
      logFailure(decodedSrc, err);
      return null;
    }).finally(end);
    if (ab)
      buffer = new Uint8Array(ab);
  }
  return buffer ? { buffer } : {};
}
function applyImageDimensions(node, buffer) {
  if (typeof node.props.width === "string")
    node.props.width = Number(node.props.width) || void 0;
  if (typeof node.props.height === "string")
    node.props.height = Number(node.props.height) || void 0;
  if (node.props.width && node.props.height)
    return;
  const view = buffer instanceof Uint8Array ? buffer : ArrayBuffer.isView(buffer) ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) : new Uint8Array(buffer);
  const dimensions = getImageDimensions(view);
  if (!dimensions?.width || !dimensions?.height)
    return;
  const naturalAspectRatio = dimensions.width / dimensions.height;
  if (node.props.width && !node.props.height) {
    node.props.height = Math.round(node.props.width / naturalAspectRatio);
  } else if (node.props.height && !node.props.width) {
    node.props.width = Math.round(node.props.height * naturalAspectRatio);
  } else {
    node.props.width = dimensions.width;
    node.props.height = dimensions.height;
  }
}
const imageSrc = defineTransformer([
  // fix <img src="">
  {
    filter: (node) => node.type === "img" && node.props?.src,
    transform: async (node, ctx) => {
      let src = node.props.src;
      if (src.startsWith("data:"))
        return;
      if (ctx.renderer.name === "satori" && src.endsWith(".webp")) {
        logger$1.warn("Using WebP images with Satori is not supported. Please consider switching image format or use the takumi or browser renderer.", src);
      }
      const isRelative = src.startsWith("/");
      if (!isRelative)
        src = node.props.src = decodeHtml(src);
      const result = await resolveSrcToBuffer(src, "image", ctx);
      if (result.blocked) {
        delete node.props.src;
        return;
      }
      if (result.buffer) {
        node.props.src = toBufferSourceAsBase64(result.buffer);
        applyImageDimensions(node, result.buffer);
        return;
      }
      if (isRelative) {
        node.props.src = withBase(src, `${getNitroOrigin(ctx.e)}`);
        return;
      }
      delete node.props.src;
    }
  },
  // fix style="background-image: url('')"
  {
    filter: (node) => node.props?.style?.backgroundImage?.includes("url("),
    transform: async (node, ctx) => {
      const backgroundImage = node.props.style.backgroundImage;
      const src = backgroundImage.replace(RE_URL_LEADING, "").replace(RE_URL_TRAILING, "");
      if (src.startsWith("data:"))
        return;
      const result = await resolveSrcToBuffer(src, "background-image", ctx);
      if (result.blocked) {
        delete node.props.style.backgroundImage;
        return;
      }
      if (result.buffer) {
        node.props.style.backgroundImage = `url(${toBufferSourceAsBase64(result.buffer)})`;
        return;
      }
      if (!src.startsWith("/"))
        delete node.props.style.backgroundImage;
    }
  }
]);

const tw4Breakpoints = {};

const DEFAULT_BREAKPOINTS = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
};
const BREAKPOINTS = { ...DEFAULT_BREAKPOINTS, ...tw4Breakpoints };
const RESPONSIVE_PREFIX_RE = /^(sm|md|lg|xl|2xl):(.+)$/;
const DARK_MODE_PREFIX_RE = /^dark:(.+)$/;
const GAP_CLASS_RE = /^gap(?:-(x|y))?-(\d+(?:\.\d+)?)$/;
const GAP_ARBITRARY_RE = /^gap(?:-(x|y))?-\[(.+)\]$/;
const TEXT_SIZE_RE = /^(?:xs|sm|base|lg|xl|\d+xl)$/;
const BORDER_WIDTH_RE = /^\d+$/;
const BORDER_SIDE_RE = /^[trblxy](?:-\d+)?$/;
const RING_WIDTH_RE = /^\d+$/;
const DIVIDE_SIDE_RE = /^[xy](?:-\d+)?$/;
const DIVIDE_NUMERIC_RE = /^\d+$/;
const OUTLINE_NUMERIC_RE = /^\d+$/;
const OUTLINE_STYLE_RE = /^(?:none|dashed|dotted|double)$/;
function resolveGapToStyle(cls, style) {
  const match = cls.match(GAP_CLASS_RE);
  if (match) {
    const axis = match[1];
    const value = Number(match[2]);
    if (axis === "x")
      style.columnGap = value;
    else if (axis === "y")
      style.rowGap = value;
    else style.gap = value;
    return true;
  }
  const arbMatch = cls.match(GAP_ARBITRARY_RE);
  if (arbMatch) {
    const axis = arbMatch[1];
    const value = arbMatch[2];
    if (axis === "x")
      style.columnGap = value;
    else if (axis === "y")
      style.rowGap = value;
    else style.gap = value;
    return true;
  }
  return false;
}
const DISPLAY_CLASSES = /* @__PURE__ */ new Set([
  "hidden",
  "block",
  "flex",
  "grid",
  "inline",
  "inline-flex",
  "inline-block",
  "inline-grid",
  "contents",
  "table",
  "flow-root",
  "list-item"
]);
const OVERLOADED_GROUPS = [
  ["text-", (v) => TEXT_SIZE_RE.test(v) ? "text-size" : "text-color"],
  ["border-", (v) => BORDER_WIDTH_RE.test(v) || BORDER_SIDE_RE.test(v) ? "border-width" : "border-color"],
  ["ring-", (v) => RING_WIDTH_RE.test(v) ? "ring-width" : "ring-color"],
  ["divide-", (v) => DIVIDE_SIDE_RE.test(v) || DIVIDE_NUMERIC_RE.test(v) || v === "reverse" ? "divide-width" : "divide-color"],
  ["outline-", (v) => OUTLINE_NUMERIC_RE.test(v) || OUTLINE_STYLE_RE.test(v) ? "outline-style" : "outline-color"]
];
function getUtilityGroup(cls) {
  if (DISPLAY_CLASSES.has(cls))
    return "display";
  if (cls.includes("["))
    return `${cls.slice(0, cls.indexOf("["))}-arbitrary`;
  for (const [prefix, resolver] of OVERLOADED_GROUPS) {
    if (cls === prefix.slice(0, -1) || cls.startsWith(prefix)) {
      return resolver(cls.slice(prefix.length));
    }
  }
  const dashIdx = cls.indexOf("-");
  return dashIdx === -1 ? cls : cls.slice(0, dashIdx);
}
function resolveDarkToken(baseClass, renderWidth) {
  const respMatch = baseClass.match(RESPONSIVE_PREFIX_RE);
  if (respMatch) {
    const bp = respMatch[1];
    const finalClass = respMatch[2];
    const breakpointWidth = BREAKPOINTS[bp];
    return breakpointWidth && renderWidth >= breakpointWidth ? finalClass : null;
  }
  return baseClass;
}
const styleDirectives = defineTransformer({
  filter: (node) => !!node.props?.class,
  transform: (node, ctx) => {
    const classes = node.props.class || "";
    const renderWidth = Number(ctx.options.width) || 1200;
    const isDarkMode = ctx.options.props?.colorMode === "dark";
    const tokens = classes.split(" ").filter((c) => c.trim());
    const darkOverrideGroups = /* @__PURE__ */ new Set();
    const responsiveOverrideGroups = /* @__PURE__ */ new Set();
    for (const token of tokens) {
      if (isDarkMode) {
        const darkMatch = token.match(DARK_MODE_PREFIX_RE);
        if (darkMatch) {
          const resolved = resolveDarkToken(darkMatch[1], renderWidth);
          if (resolved)
            darkOverrideGroups.add(getUtilityGroup(resolved));
          continue;
        }
      }
      const respMatch = token.match(RESPONSIVE_PREFIX_RE);
      if (respMatch) {
        const bp = respMatch[1];
        const baseClass = respMatch[2];
        const breakpointWidth = BREAKPOINTS[bp];
        if (breakpointWidth && renderWidth >= breakpointWidth)
          responsiveOverrideGroups.add(getUtilityGroup(baseClass));
      }
    }
    const processedClasses = [];
    const gapStyles = {};
    for (const token of tokens) {
      const darkMatch = token.match(DARK_MODE_PREFIX_RE);
      if (darkMatch) {
        if (isDarkMode) {
          const resolved = resolveDarkToken(darkMatch[1], renderWidth);
          if (resolved) {
            if (!resolveGapToStyle(resolved, gapStyles))
              processedClasses.push(resolved);
          }
        }
        continue;
      }
      const respMatch = token.match(RESPONSIVE_PREFIX_RE);
      if (respMatch) {
        const bp = respMatch[1];
        const baseClass = respMatch[2];
        const breakpointWidth = BREAKPOINTS[bp];
        if (breakpointWidth && renderWidth >= breakpointWidth) {
          if (isDarkMode && darkOverrideGroups.has(getUtilityGroup(baseClass)))
            continue;
          if (!resolveGapToStyle(baseClass, gapStyles))
            processedClasses.push(baseClass);
        }
      } else {
        const group = getUtilityGroup(token);
        if (isDarkMode && darkOverrideGroups.has(group) || responsiveOverrideGroups.has(group))
          continue;
        if (!resolveGapToStyle(token, gapStyles))
          processedClasses.push(token);
      }
    }
    if (Object.keys(gapStyles).length > 0) {
      node.props.style = { ...node.props.style, ...gapStyles };
    }
    node.props.class = processedClasses.join(" ");
  }
});

function splitCssDeclarations(style) {
  const declarations = [];
  let current = "";
  let parenDepth = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  for (let i = 0; i < style.length; i++) {
    const char = style[i];
    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    } else if (!inSingleQuote && !inDoubleQuote) {
      if (char === "(") {
        parenDepth++;
      } else if (char === ")") {
        parenDepth = Math.max(0, parenDepth - 1);
      } else if (char === ";" && parenDepth === 0) {
        if (current.trim())
          declarations.push(current);
        current = "";
        continue;
      }
    }
    current += char;
  }
  if (current.trim())
    declarations.push(current);
  return declarations;
}

const RE_KEBAB_SEGMENT = /-([a-z])/g;
const RE_CSS_QUOTES = /^['"](.+)['"]$/;
const RE_IMPORTANT = /\s*!important\s*$/;
const RE_HTML_ENTITY = /&(?:amp|quot|#39|#x27);/g;
const HTML_ENTITY_MAP = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'"
};
function camelCase(str) {
  return str.replace(RE_KEBAB_SEGMENT, (_, c) => c.toUpperCase());
}
function decodeHtmlEntities(value) {
  return value.replace(RE_HTML_ENTITY, (m) => HTML_ENTITY_MAP[m] ?? m);
}
function parseStyleAttr(style) {
  if (!style)
    return void 0;
  const result = {};
  for (const decl of splitCssDeclarations(decodeHtmlEntities(style))) {
    const colonIdx = decl.indexOf(":");
    if (colonIdx === -1)
      continue;
    const prop = decl.slice(0, colonIdx).trim();
    const val = decl.slice(colonIdx + 1).trim();
    if (prop && val) {
      const cleanVal = val.replace(RE_IMPORTANT, "");
      result[camelCase(prop)] = prop === "font-family" ? cleanVal.replace(RE_CSS_QUOTES, "$1") : cleanVal;
    }
  }
  return Object.keys(result).length ? result : void 0;
}

const RE_BODY_CONTENT = /<body>([\s\S]*)<\/body>/;
const SVG_CAMEL_ATTRS = {
  viewbox: "viewBox",
  preserveaspectratio: "preserveAspectRatio",
  basefrequency: "baseFrequency",
  baseprofile: "baseProfile",
  clippathunits: "clipPathUnits",
  diffuseconstant: "diffuseConstant",
  edgemode: "edgeMode",
  filterunits: "filterUnits",
  glyphref: "glyphRef",
  gradienttransform: "gradientTransform",
  gradientunits: "gradientUnits",
  kernelmatrix: "kernelMatrix",
  kernelunitlength: "kernelUnitLength",
  keypoints: "keyPoints",
  keysplines: "keySplines",
  keytimes: "keyTimes",
  lengthadjust: "lengthAdjust",
  limitingconeangle: "limitingConeAngle",
  markerheight: "markerHeight",
  markerunits: "markerUnits",
  markerwidth: "markerWidth",
  maskcontentunits: "maskContentUnits",
  maskunits: "maskUnits",
  numoctaves: "numOctaves",
  pathlength: "pathLength",
  patterncontentunits: "patternContentUnits",
  patterntransform: "patternTransform",
  patternunits: "patternUnits",
  pointsatx: "pointsAtX",
  pointsaty: "pointsAtY",
  pointsatz: "pointsAtZ",
  repeatcount: "repeatCount",
  repeatdur: "repeatDur",
  requiredextensions: "requiredExtensions",
  specularconstant: "specularConstant",
  specularexponent: "specularExponent",
  spreadmethod: "spreadMethod",
  startoffset: "startOffset",
  stddeviation: "stdDeviation",
  stitchtiles: "stitchTiles",
  surfacescale: "surfaceScale",
  systemlanguage: "systemLanguage",
  tablevalues: "tableValues",
  targetx: "targetX",
  targety: "targetY",
  textlength: "textLength",
  xchannelselector: "xChannelSelector",
  ychannelselector: "yChannelSelector",
  zoomandpan: "zoomAndPan"
};
const SVG_CAMEL_ATTR_VALUES = new Set(Object.values(SVG_CAMEL_ATTRS));
const RE_PERCENT = /^\d+%$/;
const RE_VIEWBOX_SEP = /[\s,]+/;
function resolveSvgDimension(props, style, key) {
  const attr = props[key];
  if (attr != null && !RE_PERCENT.test(String(attr))) {
    const n = Number(attr);
    if (!Number.isNaN(n))
      return n;
  }
  const sv = style?.[key];
  if (sv != null) {
    const n = typeof sv === "number" ? sv : Number.parseInt(String(sv));
    if (!Number.isNaN(n))
      return n;
  }
  const vb = props.viewBox || props.viewbox;
  if (typeof vb === "string") {
    const parts = vb.split(RE_VIEWBOX_SEP);
    if (parts.length === 4) {
      const n = Number(parts[key === "width" ? 2 : 3]);
      if (!Number.isNaN(n))
        return n;
    }
  }
}
function elementToVNode(el) {
  const props = {};
  const { style, ...attrs } = el.attributes;
  const parsedStyle = parseStyleAttr(style);
  if (parsedStyle)
    props.style = parsedStyle;
  for (const [name, value] of Object.entries(attrs)) {
    const key = SVG_CAMEL_ATTRS[name] || name;
    props[key] = typeof value === "string" ? decodeHtml(value) : value;
  }
  const children = [];
  for (const child of el.children) {
    if (child.type === ELEMENT_NODE) {
      children.push(elementToVNode(child));
    } else if (child.type === TEXT_NODE) {
      const text = child.value;
      if (text.trim())
        children.push(text);
    }
  }
  if (children.length)
    props.children = children;
  return { type: el.name, props };
}
function htmlToVNode(html) {
  const doc = parse(html);
  const root = querySelector(doc, "div");
  if (!root)
    throw new Error("Failed to parse HTML - no root div found");
  return elementToVNode(root);
}
const UNSUPPORTED_SVG_ELEMENTS = /* @__PURE__ */ new Set(["text", "tspan", "textPath", "foreignObject", "switch", "a"]);
function warnUnsupportedSvgElements(vnode, component) {
  const unsupported = /* @__PURE__ */ new Set();
  const collectUnsupported = (node) => {
    if (UNSUPPORTED_SVG_ELEMENTS.has(node.type))
      unsupported.add(`<${node.type}>`);
    if (Array.isArray(node.props?.children)) {
      for (const child of node.props.children) {
        if (child && typeof child === "object")
          collectUnsupported(child);
      }
    }
  };
  const walk = (node) => {
    if (node.type === "svg") {
      collectUnsupported(node);
    } else if (Array.isArray(node.props?.children)) {
      for (const child of node.props.children) {
        if (child && typeof child === "object")
          walk(child);
      }
    }
  };
  walk(vnode);
  if (unsupported.size) {
    const elements = [...unsupported].join(", ");
    const source = component ? ` in "${component}"` : "";
    logger$1.warn(`SVG ${elements} elements${source} are not supported by image renderers and will not be displayed. Convert text to <path> elements instead.`);
  }
}
async function createVNodes(ctx, options) {
  let html = ctx.options.html;
  if (html) {
    logger$1.warn("The `html` option is deprecated and will be removed in the next major version. Use a Vue component instead.");
  }
  if (!html) {
    const islandTimeout = ctx.runtimeConfig.security?.renderTimeout ?? 15e3;
    const island = await ctx.timings.measure("island-fetch", () => fetchIsland(ctx.e, ctx.options.component, typeof ctx.options.props !== "undefined" ? ctx.options.props : ctx.options, islandTimeout));
    await applyEmojis(ctx, island);
    html = island.html;
    if (html?.includes("<body>")) {
      html = html.match(RE_BODY_CONTENT)?.[1] || "";
    }
  }
  const baseStyle = `position: relative; display: flex; margin: 0 auto; width: ${ctx.options.width}px; height: ${ctx.options.height}px; overflow: hidden;`;
  const fullStyle = baseStyle;
  const template = `<div style="${fullStyle}">${html}</div>`;
  const vnodeTree = htmlToVNode(template);
  const rootChild = vnodeTree.props.children?.[0];
  if (rootChild && typeof rootChild === "object") {
    rootChild.props.style = { width: "100%", height: "100%", ...rootChild.props.style };
  }
  warnUnsupportedSvgElements(vnodeTree, ctx.options.component);
  await ctx.timings.measure("vnode-walk", () => Promise.all(walkTree(ctx, vnodeTree, [encoding, styleDirectives, imageSrc])));
  return vnodeTree;
}

const RE_RELATIVE_UNIT = /^([\d.]+)(em|rem)$/;
const RE_TW_TEXT_ARBITRARY = /(?:^|\s)text-\[(\d+(?:\.\d+)?)(px|rem|em)\]/;
const RE_FONT_SIZE_PX = /^(\d+(?:\.\d+)?)(px)?$/;
const DEFAULT_FONT_SIZE = 16;
const RE_UPPERCASE = /[A-Z]/g;
const RE_DQUOTE = /"/g;
const RE_AMP = /&/g;
const RE_LT = /</g;
const RE_GT = />/g;
async function createTakumiNodes(ctx) {
  const vnodeTree = await createVNodes(ctx);
  return await ctx.timings.measure("takumi-nodes", () => vnodeToTakumiNode(vnodeTree, DEFAULT_FONT_SIZE));
}
function pickNumericDimension(props, key) {
  const v = props[key];
  if (v == null)
    return void 0;
  const n = Number(v);
  return Number.isNaN(n) ? void 0 : n;
}
function resolveRelativeUnit(value, inheritedFontSize) {
  if (value == null)
    return void 0;
  const match = String(value).match(RE_RELATIVE_UNIT);
  if (!match)
    return void 0;
  const n = Number.parseFloat(match[1]);
  return match[2] === "rem" ? n * DEFAULT_FONT_SIZE : n * inheritedFontSize;
}
function extractFontSize(props, style) {
  if (style?.fontSize != null) {
    const m = String(style.fontSize).match(RE_FONT_SIZE_PX);
    if (m)
      return Number.parseFloat(m[1]);
  }
  const twStr = props.tw || props.class || "";
  const twMatch = twStr.match(RE_TW_TEXT_ARBITRARY);
  if (twMatch) {
    const val = Number.parseFloat(twMatch[1]);
    if (twMatch[2] === "px")
      return val;
  }
  return void 0;
}
async function vnodeToTakumiNode(vnode, inheritedFontSize) {
  const { style, children, class: cls, tw, src, ...rest } = vnode.props;
  const baseMetadata = {
    tw: tw || cls || void 0,
    style
  };
  if (vnode.type === "svg") {
    const hasExplicitFontSize = inheritedFontSize !== DEFAULT_FONT_SIZE;
    const isRelativeW = RE_RELATIVE_UNIT.test(String(rest.width ?? ""));
    const isRelativeH = RE_RELATIVE_UNIT.test(String(rest.height ?? ""));
    return {
      ...baseMetadata,
      type: "image",
      src: vnodeToHtmlString(vnode),
      // When em/rem + explicit parent font size → resolve to px.
      // When em/rem + default font size → leave undefined (takumi handles natively).
      // Otherwise → use standard resolution chain (numeric attrs → style → viewBox).
      width: isRelativeW ? hasExplicitFontSize ? resolveRelativeUnit(rest.width, inheritedFontSize) : void 0 : resolveSvgDimension(rest, style, "width"),
      height: isRelativeH ? hasExplicitFontSize ? resolveRelativeUnit(rest.height, inheritedFontSize) : void 0 : resolveSvgDimension(rest, style, "height")
    };
  }
  if (vnode.type === "img") {
    return {
      ...baseMetadata,
      type: "image",
      src: src || rest.href || "",
      width: pickNumericDimension(rest, "width"),
      height: pickNumericDimension(rest, "height")
    };
  }
  const nodeFontSize = extractFontSize(vnode.props, style);
  const childFontSize = nodeFontSize ?? inheritedFontSize;
  const containerStyle = { ...style };
  const w = pickNumericDimension(rest, "width");
  const h = pickNumericDimension(rest, "height");
  if (w != null && !containerStyle.width)
    containerStyle.width = w;
  if (h != null && !containerStyle.height)
    containerStyle.height = h;
  const hasStyle = Object.keys(containerStyle).length > 0;
  const containerMetadata = {
    tw: baseMetadata.tw,
    style: hasStyle ? containerStyle : void 0
  };
  const textContent = typeof children === "string" ? children : Array.isArray(children) && children.length >= 1 && children.every((c) => typeof c === "string") ? children.join("") : void 0;
  if (textContent !== void 0) {
    return {
      ...containerMetadata,
      type: "text",
      text: textContent
    };
  }
  if (Array.isArray(children)) {
    const takumiChildren = [];
    for (const child of children) {
      if (child && typeof child === "object")
        takumiChildren.push(await vnodeToTakumiNode(child, childFontSize));
      else if (typeof child === "string" && child.trim())
        takumiChildren.push({ type: "text", text: child.trim() });
    }
    return {
      ...containerMetadata,
      type: "container",
      children: takumiChildren.length ? takumiChildren : void 0
    };
  }
  return {
    ...containerMetadata,
    type: "container"
  };
}
function vnodeToHtmlString(vnode) {
  const { style, children, ...attrs } = vnode.props;
  const attrParts = [];
  const kebabCase = (str) => str.replace(RE_UPPERCASE, (m) => `-${m.toLowerCase()}`);
  if (vnode.type === "svg") {
    if (!attrs.xmlns)
      attrParts.push('xmlns="http://www.w3.org/2000/svg"');
    if (!attrs.width && vnode.props.width)
      attrParts.push(`width="${vnode.props.width}"`);
    if (!attrs.height && vnode.props.height)
      attrParts.push(`height="${vnode.props.height}"`);
  }
  const resolveValue = (val) => {
    if (typeof val === "string") {
      if (val.includes("calc("))
        return val;
      if (val.endsWith("em") || val.endsWith("rem")) {
        const num = Number.parseFloat(val);
        return !Number.isNaN(num) ? `${num * 16}px` : val;
      }
    }
    return val;
  };
  if (style && typeof style === "object") {
    const styleStr = Object.entries(style).filter(([_, v]) => v !== void 0 && v !== null && v !== "").map(([k, v]) => `${kebabCase(k)}:${resolveValue(v)}`).join(";");
    if (styleStr)
      attrParts.push(`style="${styleStr.replace(RE_DQUOTE, "&quot;")}"`);
  } else if (typeof style === "string") {
    attrParts.push(`style="${style.replace(RE_DQUOTE, "&quot;")}"`);
  }
  for (const [key, val] of Object.entries(attrs)) {
    if (key === "tw" || key === "class" || val == null)
      continue;
    const finalKey = SVG_CAMEL_ATTR_VALUES.has(key) ? key : kebabCase(key);
    attrParts.push(`${finalKey}="${String(resolveValue(val)).replace(RE_DQUOTE, "&quot;")}"`);
  }
  const open = attrParts.length ? `<${vnode.type} ${attrParts.join(" ")}>` : `<${vnode.type}>`;
  const inner = Array.isArray(children) ? children.map((c) => {
    if (typeof c === "string")
      return c.replace(RE_AMP, "&amp;").replace(RE_LT, "&lt;").replace(RE_GT, "&gt;");
    if (c && typeof c === "object")
      return vnodeToHtmlString(c);
    return "";
  }).join("") : typeof children === "string" ? children.replace(RE_AMP, "&amp;").replace(RE_LT, "&lt;").replace(RE_GT, "&gt;") : "";
  return `${open}${inner}</${vnode.type}>`;
}

const RE_QUOTES = /['"]/g;
async function getTakumiState(event) {
  const nitro = event._nitro;
  if (nitro._takumiState)
    return nitro._takumiState;
  const Renderer = await getTakumi();
  nitro._takumiState = {
    renderer: new Renderer(),
    loadedFontKeys: /* @__PURE__ */ new Set(),
    loadedFamilies: /* @__PURE__ */ new Set(),
    lock: Promise.resolve()
  };
  return nitro._takumiState;
}
function withTakumiLock(state, timeoutMs, fn, onLockTimeout) {
  const guarded = async () => {
    let timer;
    try {
      return await Promise.race([
        fn(),
        new Promise((_, reject) => {
          timer = setTimeout(
            () => reject(new Error(`takumi render timed out after ${timeoutMs}ms (lock-held)`)),
            timeoutMs
          );
        })
      ]);
    } catch (err) {
      try {
        const Renderer = await getTakumi();
        state.renderer = new Renderer();
        state.loadedFontKeys.clear();
        state.loadedFamilies.clear();
      } catch (resetErr) {
        logger.warn(`failed to reset takumi renderer after lock timeout: ${resetErr?.message || resetErr}`);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  };
  const work = state.lock.then(guarded, guarded);
  state.lock = work.catch((err) => {
  });
  let acquireTimer;
  return Promise.race([
    work,
    new Promise((_, reject) => {
      acquireTimer = setTimeout(() => {
        onLockTimeout?.();
        reject(new Error(`takumi lock acquire timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    })
  ]).finally(() => clearTimeout(acquireTimer));
}
function dedupeFontsByBinary(fonts) {
  const byBinary = /* @__PURE__ */ new Map();
  for (const font of fonts) {
    if (!font.data)
      continue;
    const binaryKey = `${font.family}|${font.style || "normal"}|${font.src || ""}`;
    const existing = byBinary.get(binaryKey);
    if (existing) {
      existing.weights.add(font.weight);
      if (font.weightRange)
        existing.hasRange = true;
    } else {
      byBinary.set(binaryKey, {
        family: font.family,
        style: font.style,
        data: font.data,
        weights: /* @__PURE__ */ new Set([font.weight]),
        hasRange: !!font.weightRange
      });
    }
  }
  const result = [];
  for (const [binaryKey, entry] of byBinary) {
    const isVariable = entry.weights.size > 1 || entry.hasRange;
    result.push({
      binaryKey,
      family: entry.family,
      style: entry.style,
      data: entry.data,
      weight: isVariable ? void 0 : [...entry.weights][0]
    });
  }
  return result;
}
async function loadFontsIntoRenderer(state, fonts) {
  for (const entry of dedupeFontsByBinary(fonts)) {
    if (state.loadedFontKeys.has(entry.binaryKey))
      continue;
    const fontData = entry.data instanceof ArrayBuffer ? new Uint8Array(entry.data) : Uint8Array.from(entry.data);
    try {
      await state.renderer.loadFont({
        name: entry.family,
        data: fontData,
        ...entry.weight !== void 0 ? { weight: entry.weight } : {},
        style: entry.style
      });
      state.loadedFamilies.add(entry.family);
    } catch (err) {
      logger.warn(`Failed to load font "${entry.family}" into takumi renderer: ${err.message}`);
    }
    state.loadedFontKeys.add(entry.binaryKey);
  }
}
function lookupFontFamily(family, loadedFamilies) {
  if (loadedFamilies.has(family))
    return family;
  for (const loaded of loadedFamilies) {
    if (loaded.toLowerCase() === family.toLowerCase())
      return loaded;
  }
}
function rewriteFontFamilies(node, loadedFamilies, subsetChains) {
  if (node.style?.fontFamily) {
    const families = node.style.fontFamily.split(",").map((f) => f.trim().replace(RE_QUOTES, ""));
    const resolved = [];
    const seen = /* @__PURE__ */ new Set();
    const addUnique = (name) => {
      if (!seen.has(name.toLowerCase())) {
        resolved.push(name);
        seen.add(name.toLowerCase());
      }
    };
    for (const f of families) {
      const chain = resolveSubsetChain(f, subsetChains);
      if (chain) {
        chain.forEach(addUnique);
        continue;
      }
      addUnique(lookupFontFamily(f, loadedFamilies) || f);
    }
    for (const family of loadedFamilies)
      addUnique(family);
    node.style.fontFamily = resolved.map((f) => `"${f}"`).join(", ");
  }
  if ("children" in node && node.children) {
    for (const child of node.children)
      rewriteFontFamilies(child, loadedFamilies, subsetChains);
  }
}
async function createImage(event, format) {
  const { options, timings } = event;
  const { fontFamilyOverride, defaultFont } = getDefaultFontFamily(options);
  const nodes = await createTakumiNodes(event);
  const codepoints = extractCodepoints(nodes);
  const fonts = await timings.measure("font-load", () => loadFontsForRenderer(event, { supportedFormats: /* @__PURE__ */ new Set(["ttf", "woff2"]), preferStatic: true, component: options.component, fontFamilyOverride: fontFamilyOverride || defaultFont, codepoints }));
  const hookTimeout = event.runtimeConfig.security?.renderTimeout ?? 15e3;
  await withTimeout(
    event._nitro.hooks.callHook("nuxt-og-image:takumi:nodes", nodes, event),
    hookTimeout,
    "nuxt-og-image:takumi:nodes hook"
  );
  const subsetChains = buildSubsetFamilyChain(fonts);
  const state = await timings.measure("takumi-init", () => getTakumiState(event));
  const extractResourceUrls = await timings.measure("takumi-extract-init", () => getExtractResourceUrls());
  const resourceUrls = await extractResourceUrls(nodes);
  const baseURL = event.runtimeConfig.app.baseURL;
  const fetchedResources = [];
  if (resourceUrls.length) {
    const fetchTimeout = getFetchTimeout(event.runtimeConfig);
    const headers = { "x-nuxt-og-image": "1" };
    await timings.measure("resource-fetch", () => Promise.all(resourceUrls.map(async (src) => {
      let data;
      if (src.startsWith("/")) {
        const path = withBase(src, baseURL);
        data = await fetchLocalAsset(event.e, path, {
          fetchTimeout,
          headers,
          includeExternalFallback: true
        });
      } else if (!isBlockedUrl(src)) {
        data = await fetchWithRedirectValidation(src, {
          timeout: fetchTimeout,
          headers
        }) ?? void 0;
      }
      if (data)
        fetchedResources.push({ src, data: new Uint8Array(data) });
    })));
  }
  const maxDpr = event.runtimeConfig.security?.maxDpr || 2;
  const maxDim = event.runtimeConfig.security?.maxDimension || 2048;
  const dpr = Math.min(Math.max(1, options.takumi?.devicePixelRatio ?? 1), maxDpr);
  const renderOptions = defu(options.takumi, {
    width: Math.min(Number(options.width) * dpr, maxDim),
    height: Math.min(Number(options.height) * dpr, maxDim),
    format,
    fetchedResources,
    devicePixelRatio: dpr
  });
  const lockTimeout = event.runtimeConfig.security?.renderTimeout ?? 15e3;
  const endLockWait = timings.start("lock-wait");
  return await withTakumiLock(state, lockTimeout, () => {
    endLockWait();
    return timings.measure("render-takumi", async () => {
      await loadFontsIntoRenderer(state, fonts);
      const rootStyle = nodes.style ?? {};
      if (fontFamilyOverride) {
        const chain = subsetChains.get(fontFamilyOverride);
        if (chain) {
          rootStyle.fontFamily = chain.map((f) => `"${f}"`).join(", ");
        } else if (state.loadedFamilies.has(fontFamilyOverride)) {
          rootStyle.fontFamily = fontFamilyOverride;
        }
      }
      nodes.style = rootStyle;
      rewriteFontFamilies(nodes, state.loadedFamilies, subsetChains);
      return state.renderer.render(nodes, renderOptions);
    });
  }, endLockWait);
}
const TakumiRenderer = {
  name: "takumi",
  supportedFormats: ["png", "jpeg", "jpg", "webp", "json"],
  async createImage(e) {
    switch (e.extension) {
      case "png":
        return createImage(e, "png");
      case "jpeg":
      case "jpg":
        return createImage(e, "jpeg");
      case "webp":
        return createImage(e, "webp");
    }
  },
  async debug(e) {
    const [vnodes, fonts] = await Promise.all([
      createTakumiNodes(e),
      loadFontsForRenderer(e, { supportedFormats: /* @__PURE__ */ new Set(["ttf", "woff2"]), preferStatic: true, component: e.options.component })
    ]);
    return {
      vnodes,
      fonts: fonts.map(({ data, ...f }) => ({
        ...f,
        size: data.byteLength
      }))
    };
  }
};

export { TakumiRenderer as default };
//# sourceMappingURL=renderer.mjs.map
