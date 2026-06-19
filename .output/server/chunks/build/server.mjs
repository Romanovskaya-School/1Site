import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { isRef, toValue, hasInjectionContext, inject, ref, watchEffect, getCurrentInstance, onBeforeUnmount, onDeactivated, onActivated, defineComponent, shallowRef, h, resolveComponent, reactive, computed, unref, createElementBlock, provide, cloneVNode, Suspense, Fragment, watch, createApp, mergeProps, withCtx, createVNode, createTextVNode, shallowReactive, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, effectScope, defineAsyncComponent, getCurrentScope, toRef, isReadonly, useSSRContext, isShallow, isReactive, toRaw, nextTick } from 'vue';
import { R as hasProtocol, K as withBase, S as parseQuery, T as joinURL, C as parseURL, e as encodePath, U as decodePath, V as isScriptProtocol, E as withQuery, W as getContext, w as withTrailingSlash, X as withoutTrailingSlash, Y as sanitizeStatusCode, $ as $fetch, c as createError$1, Z as hash, _ as executeAsync, P as defu, a0 as titleCase, a1 as toRouteMatcher, a2 as createRouter$1, a3 as withoutBase, a4 as stringifyQuery, F as withLeadingSlash, a5 as hasTrailingSlash } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { debounce } from 'perfect-debounce';
import { isPlainObject } from '@vue/shared';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { FlatMetaPlugin, TemplateParamsPlugin, InferSeoMetaPlugin, defineHeadPlugin } from 'unhead/plugins';
import { walkResolver, processTemplateParams } from 'unhead/utils';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";

// @__NO_SIDE_EFFECTS__
function injectHead$1() {
  if (hasInjectionContext()) {
    const instance = inject(headSymbol);
    if (instance) {
      return instance;
    }
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
function useHead$1(input, options = {}) {
  const head = options.head || /* @__PURE__ */ injectHead$1();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}
function useSeoMeta$1(input = {}, options = {}) {
  const head = options.head || /* @__PURE__ */ injectHead$1();
  head.use(FlatMetaPlugin);
  const { title, titleTemplate, ...meta } = input;
  return useHead$1({
    title,
    titleTemplate,
    _flatMeta: meta
  }, options);
}

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": false };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.4.8";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _state: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
const HTML_ATTR_ENCODE_MAP = {
  "&": "%26",
  '"': "%22",
  "'": "%27",
  "<": "%3C",
  ">": "%3E"
};
function encodeForHtmlAttr(value) {
  return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedHeader = encodeURL(location2, isExternalHost);
        const encodedLoc = encodeForHtmlAttr(encodedHeader);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    const pathname = url.pathname.replace(/^\/{2,}/, "/");
    return pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useSeoMeta(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useSeoMeta$1(input, { head, ...options });
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => comp.components && comp.components.default === from.matched[index2]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function defineKeyedFunctionFactory(factory) {
  const placeholder = function() {
    throw new Error(`[nuxt] \`${factory.name}\` is a compiler macro and cannot be called at runtime.`);
  };
  return Object.defineProperty(placeholder, "__nuxt_factory", {
    enumerable: false,
    get: () => factory.factory
  });
}
const createUseAsyncData = defineKeyedFunctionFactory({
  name: "createUseAsyncData",
  factory(options = {}) {
    function useAsyncData2(...args) {
      const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
      if (_isAutoKeyNeeded(args[0], args[1])) {
        args.unshift(autoKey);
      }
      let [_key, _handler, opts = {}] = args;
      const isKeyReactive = isRef(_key) || typeof _key === "function";
      const key = isKeyReactive ? computed(() => toValue(_key)) : { value: _key };
      if (!key.value || typeof key.value !== "string") {
        throw new TypeError("[nuxt] [useAsyncData] key must be a non-empty string.");
      }
      if (typeof _handler !== "function") {
        throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
      }
      const shouldFactoryOptionsOverride = typeof options === "function";
      const nuxtApp = useNuxtApp();
      const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
      if (!shouldFactoryOptionsOverride) {
        for (const key2 in factoryOptions) {
          if (factoryOptions[key2] === void 0) {
            continue;
          }
          if (opts[key2] !== void 0) {
            continue;
          }
          opts[key2] = factoryOptions[key2];
        }
      }
      opts.server ??= true;
      opts.default ??= getDefault;
      opts.getCachedData ??= getDefaultCachedData;
      opts.lazy ??= false;
      opts.immediate ??= true;
      opts.deep ??= asyncDataDefaults.deep;
      opts.dedupe ??= "cancel";
      if (shouldFactoryOptionsOverride) {
        for (const key2 in factoryOptions) {
          if (factoryOptions[key2] === void 0) {
            continue;
          }
          opts[key2] = factoryOptions[key2];
        }
      }
      nuxtApp._asyncData[key.value];
      function createInitialFetch() {
        const initialFetchOptions = { cause: "initial", dedupe: opts.dedupe };
        const existing = nuxtApp._asyncData[key.value];
        if (!existing?._init) {
          initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
          nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
          nuxtApp._asyncData[key.value]._initialCachedData = initialFetchOptions.cachedData;
        } else if (nuxtApp._asyncDataPromises[key.value]) {
          initialFetchOptions.cachedData = existing._initialCachedData;
        }
        return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
      }
      const initialFetch = createInitialFetch();
      const asyncData = nuxtApp._asyncData[key.value];
      asyncData._deps++;
      const fetchOnServer = opts.server !== false && nuxtApp.payload.serverRendered;
      if (fetchOnServer && opts.immediate) {
        const promise = initialFetch();
        if (getCurrentInstance()) {
          onServerPrefetch(() => promise);
        } else {
          nuxtApp.hook("app:created", async () => {
            await promise;
          });
        }
      }
      const asyncReturn = {
        data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
        pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
        status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
        error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
        refresh: (...args2) => {
          if (!nuxtApp._asyncData[key.value]?._init) {
            const initialFetch2 = createInitialFetch();
            return initialFetch2();
          }
          return nuxtApp._asyncData[key.value].execute(...args2);
        },
        execute: (...args2) => asyncReturn.refresh(...args2),
        clear: () => {
          const entry2 = nuxtApp._asyncData[key.value];
          if (entry2?._abortController) {
            try {
              entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
            } finally {
              entry2._abortController = void 0;
            }
          }
          clearNuxtDataByKey(nuxtApp, key.value);
        }
      };
      const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
      Object.assign(asyncDataPromise, asyncReturn);
      Object.defineProperties(asyncDataPromise, {
        then: { enumerable: true, value: asyncDataPromise.then.bind(asyncDataPromise) },
        catch: { enumerable: true, value: asyncDataPromise.catch.bind(asyncDataPromise) },
        finally: { enumerable: true, value: asyncDataPromise.finally.bind(asyncDataPromise) }
      });
      return asyncDataPromise;
    }
    return useAsyncData2;
  }
});
const useAsyncData = createUseAsyncData.__nuxt_factory();
createUseAsyncData.__nuxt_factory({
  lazy: true,
  // @ts-expect-error private property
  _functionName: "useLazyAsyncData"
});
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
    nuxtApp._asyncData[key]._initialCachedData = void 0;
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        if (nuxtApp._asyncDataPromises[key] === promise) {
          delete nuxtApp._asyncDataPromises[key];
        }
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (init) {
    nuxtApp._state[key] ??= { _default: init };
  }
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const entries = [];
      for (const entry2 of value.entries()) {
        const [key, val] = entry2;
        entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
      }
      segments.push(hash(entries));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const createUseFetch = defineKeyedFunctionFactory({
  name: "createUseFetch",
  factory(options = {}) {
    function useFetch2(request, arg1, arg2) {
      const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
      const factoryOptions = typeof options === "function" ? options(opts) : options;
      const {
        server,
        lazy,
        default: defaultFn,
        transform,
        pick: pick2,
        watch: watchSources,
        immediate,
        getCachedData,
        deep,
        dedupe,
        timeout,
        ...fetchOptions
      } = {
        ...typeof options === "function" ? {} : factoryOptions,
        ...opts,
        ...typeof options === "function" ? factoryOptions : {}
      };
      const _request = computed(() => toValue(request));
      const key = computed(() => toValue(fetchOptions.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(fetchOptions)]));
      if (!fetchOptions.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
        throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
      }
      const _fetchOptions = reactive({
        ...fetchDefaults,
        ...fetchOptions,
        cache: typeof fetchOptions.cache === "boolean" ? void 0 : fetchOptions.cache
      });
      const _asyncDataOptions = {
        server,
        lazy,
        default: defaultFn,
        transform,
        pick: pick2,
        immediate,
        getCachedData,
        deep,
        dedupe,
        timeout,
        watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
      };
      if (watchSources === false) {
        _asyncDataOptions._keyTriggersExecute = false;
      }
      const asyncData = useAsyncData(key, (_, { signal }) => {
        let _$fetch = fetchOptions.$fetch || globalThis.$fetch;
        if (!fetchOptions.$fetch) {
          const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(fetchOptions.baseURL) || toValue(fetchOptions.baseURL)[0] === "/");
          if (isLocalFetch) {
            _$fetch = useRequestFetch();
          }
        }
        return _$fetch(_request.value, { signal, ..._fetchOptions });
      }, _asyncDataOptions);
      return asyncData;
    }
    return useFetch2;
  }
});
createUseFetch.__nuxt_factory();
createUseFetch.__nuxt_factory({
  lazy: true,
  // @ts-expect-error private property
  _functionName: "useLazyFetch"
});
const matcher = /* @__PURE__ */ (() => {
  const $0 = {};
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    if (p === "/admin") {
      r.unshift({ data: $0 });
    } else if (p === "/_nuxt") {
      r.unshift({ data: $0 });
    }
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "_og") {
        if (l > 2) {
          if (s[2] === "d") {
            r.unshift({ data: $0, params: { "_": s.slice(3).join("/") } });
          } else if (s[2] === "r") {
            r.unshift({ data: $0, params: { "_": s.slice(3).join("/") } });
          } else if (s[2] === "s") {
            r.unshift({ data: $0, params: { "_": s.slice(3).join("/") } });
          }
        }
      }
    }
    return r;
  };
})();
const _routeRulesMatcher = (path) => defu({}, ...matcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
const routeRulesMatcher = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher(path.toLowerCase());
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    if (from === START_LOCATION) {
      return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
    }
    return new Promise((resolve) => {
      const doScroll = () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      };
      nuxtApp.hooks.hookOnce("page:loading:end", () => {
        const transitionPromise = nuxtApp["~transitionPromise"];
        if (transitionPromise) {
          transitionPromise.then(doScroll);
        } else {
          doScroll();
        }
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
function sanitizeExternalHref(value) {
  let candidate = value.replace(/[\u0000-\u001F\s]+/g, "");
  while (candidate.toLowerCase().startsWith("view-source:")) {
    candidate = candidate.slice("view-source:".length);
  }
  const colon = candidate.indexOf(":");
  if (colon > 0 && isScriptProtocol(candidate.slice(0, colon + 1))) {
    return null;
  }
  return value;
}
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = unref(props.to) || unref(props.href) || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (unref(props.external)) {
        return true;
      }
      const path = unref(props.to) || unref(props.href) || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = unref(props.to) || unref(props.href) || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to, viewTransition: unref(props.viewTransition) });
    const href = computed(() => {
      const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        const raw = to.value;
        return typeof raw === "string" ? sanitizeExternalHref(raw) : raw;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        const safe = typeof href2 === "string" ? sanitizeExternalHref(href2) : href2;
        return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        if (href.value === null) {
          return;
        }
        await navigateTo(href.value, { replace: unref(props.replace), external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: async (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            try {
              const encodedHref = encodeRoutePath(href.value ?? "");
              return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
            } finally {
            }
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _0_siteConfig_tU0SxKrPeVRXWcGu2sOnIfhNDbYiKNfDCvYZhRueG0Q = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-site-config:init",
  enforce: "pre",
  async setup(nuxtApp) {
    const stack = useRequestEvent()?.context?.siteConfig;
    const state = useState("site-config");
    {
      nuxtApp.hooks.hook("app:rendered", () => {
        state.value = stack?.get({
          debug: (/* @__PURE__ */ useRuntimeConfig())["nuxt-site-config"].debug,
          resolveRefs: true
        });
      });
    }
    return {
      provide: {
        nuxtSiteConfig: stack
      }
    };
  }
});
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const _routes = [
  {
    name: "about",
    path: "/about",
    component: () => import('./about-DaE76yVf.mjs')
  },
  {
    name: "admin",
    path: "/admin",
    component: () => import('./admin-BiFS6bOZ.mjs')
  },
  {
    name: "articles",
    path: "/articles",
    component: () => import('./articles-Bn8WhXRI.mjs')
  },
  {
    name: "family",
    path: "/family",
    component: () => import('./family-CLPpmKYP.mjs')
  },
  {
    name: "personal",
    path: "/personal",
    component: () => import('./personal-C9-1Izjz.mjs')
  },
  {
    name: "rpp",
    path: "/rpp",
    component: () => import('./rpp-D9YKZDVs.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-DyPzh_Z7.mjs')
  }
];
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
Object.assign(/* @__PURE__ */ Object.create(null), {});
const pageIslandRoutes = Object.assign(/* @__PURE__ */ Object.create(null), {});
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      const lastTo = to.matched.at(-1)?.components?.default;
      const lastFrom = from.matched.at(-1)?.components?.default;
      if (lastTo === lastFrom) {
        syncCurrentRoute();
        return;
      }
      if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
    if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    const hasDeferredRoute = false;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext && !isServerPage) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    if (isServerPage) {
      router.beforeResolve((to) => {
        const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
        const actual = to.matched.find((m) => m.components?.default?.__nuxt_island)?.components?.default;
        if (!expected || expected !== actual?.__nuxt_island) {
          nuxtApp.ssrContext["~renderResponse"] = {
            statusCode: 400,
            statusMessage: "Invalid island request path"
          };
          return false;
        }
      });
    }
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        if (hasDeferredRoute) ;
        else {
          await router.replace({
            ...resolvedInitialRoute,
            force: true
          });
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
function useSiteConfig(options) {
  const stack = useRequestEvent()?.context.siteConfig.get(defu({ resolveRefs: true }, options));
  delete stack._priority;
  return stack;
}
const siteConfig_vuqmRkLAUZxQvb5pvUwT3uUdVggfjhj1m5v7Pb6IE0w = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  const { tagPriority, separator, titleSeparator } = (/* @__PURE__ */ useRuntimeConfig()).public["seo-utils"];
  const siteConfig = useSiteConfig();
  const resolvedSeparator = siteConfig.separator || separator || siteConfig.titleSeparator || titleSeparator;
  const resolvedTitleSeparator = siteConfig.titleSeparator || titleSeparator || siteConfig.separator || separator;
  const input = {
    meta: [],
    templateParams: {
      site: siteConfig,
      // support legacy
      siteUrl: siteConfig.url,
      siteName: siteConfig.name
    }
  };
  if (resolvedSeparator)
    input.templateParams.separator = resolvedSeparator;
  if (resolvedTitleSeparator)
    input.templateParams.titleSeparator = resolvedTitleSeparator;
  if (siteConfig.description) {
    input.templateParams.siteDescription = siteConfig.description;
    input.meta.push(
      {
        name: "description",
        content: "%site.description",
        tagPriority
      }
    );
  }
  head.push(input);
});
const inferSeoMetaPlugin_KsEotgC9NJyW_guR_3z04hFN8TI2h5dgP8bzHmpMm5o = /* @__PURE__ */ defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  head.use(TemplateParamsPlugin);
  head.use(InferSeoMetaPlugin());
});
function useI18n() {
  const siteConfig = useSiteConfig({
    resolveRefs: false
  });
  return {
    t: (_, fallback, _options) => fallback,
    te: (_) => false,
    strategy: "no_prefix",
    defaultLocale: computed(() => {
      return toValue(siteConfig.defaultLocale) || "en";
    }),
    locale: computed(() => {
      return toValue(siteConfig.currentLocale) || toValue(siteConfig.defaultLocale) || "en";
    })
  };
}
function useFallbackTitle() {
  const route = useRoute();
  const err = /* @__PURE__ */ useError();
  let i18n;
  try {
    i18n = useI18n();
  } catch {
  }
  return computed(() => {
    if (err.value?.statusCode && [404, 500].includes(err.value.statusCode)) {
      return `${err.value.statusCode} - ${err.value.message}`;
    }
    if (typeof route.meta?.title === "string")
      return route.meta?.title;
    const path = withoutTrailingSlash(route.path || "/");
    const lastSegment = path.split("/").pop();
    let fallback = lastSegment ? titleCase(lastSegment) : null;
    const matched = route.matched?.at(-1);
    if (matched) {
      const routeName = String(matched.name).split("___")?.[0];
      if (routeName && i18n)
        fallback = i18n.t(`pages.${routeName}.title`, fallback || "", { missingWarn: false }) || fallback;
    }
    return fallback;
  });
}
const titles_Fth_MAhm7dgpxeTaMXibYXbcCjegjWK3QH9gKvbTRVg = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-seo:fallback-titles",
  env: {
    islands: false
  },
  setup() {
    const title = useFallbackTitle();
    const minimalPriority = {
      // give nuxt.config values higher priority
      tagPriority: 101
    };
    useHead({ title: () => title.value }, minimalPriority);
  }
});
function defineSchemaOrgResolver(schema) {
  return schema;
}
function idReference(node) {
  return {
    "@id": typeof node !== "string" ? node["@id"] : node
  };
}
function resolvableDateToDate(val) {
  try {
    const date = val instanceof Date ? val : new Date(Date.parse(val));
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  } catch {
  }
  return typeof val === "string" ? val : val.toString();
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function resolvableDateToIso(val) {
  if (!val)
    return val;
  try {
    if (val instanceof Date)
      return val.toISOString();
    else if (isValidW3CDate(val))
      return val;
    else
      return new Date(Date.parse(val)).toISOString();
  } catch {
  }
  return typeof val === "string" ? val : val.toString();
}
const IdentityId = "#identity";
function setIfEmpty(node, field, value) {
  if (!node?.[field] && value)
    node[field] = value;
}
function asArray(input) {
  return Array.isArray(input) ? input : [input];
}
function dedupeMerge(node, field, value) {
  const data = new Set(asArray(node[field]));
  data.add(value);
  node[field] = [...data].filter(Boolean);
}
function prefixId(url, id) {
  if (hasProtocol(id))
    return id;
  if (!id.includes("#"))
    id = `#${id}`;
  return `${url || ""}${id}`;
}
function trimLength(val, length) {
  if (!val)
    return val;
  if (val.length > length) {
    const trimmedString = val.substring(0, length);
    return trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
  }
  return val;
}
function resolveDefaultType(node, defaultType) {
  const val = node["@type"];
  if (val === defaultType)
    return;
  if (typeof val === "string" && typeof defaultType === "string") {
    if (val !== defaultType)
      node["@type"] = [defaultType, val];
    return;
  }
  const types = new Set(asArray(defaultType));
  for (const t of asArray(val))
    types.add(t);
  node["@type"] = types.size === 1 ? val : [...types];
}
function resolveWithBase(base, urlOrPath) {
  if (!urlOrPath || hasProtocol(urlOrPath) || urlOrPath[0] !== "/" && urlOrPath[0] !== "#")
    return urlOrPath;
  return withBase(urlOrPath, base);
}
function resolveAsGraphKey(key) {
  if (!key)
    return key;
  return key.substring(key.lastIndexOf("#"));
}
function stripEmptyProperties(obj) {
  for (const k in obj) {
    if (!Object.hasOwn(obj, k))
      continue;
    const v = obj[k];
    if (v === "" || v === null || v === void 0) {
      delete obj[k];
    } else if (typeof v === "object" && v !== null) {
      if (v.__v_isReadonly || v.__v_isRef)
        continue;
      stripEmptyProperties(v);
    }
  }
  return obj;
}
const imageResolver = defineSchemaOrgResolver({
  alias: "image",
  cast(input) {
    if (typeof input === "string") {
      input = {
        url: input
      };
    }
    return input;
  },
  defaults: {
    "@type": "ImageObject"
  },
  inheritMeta: [
    // @todo possibly only do if there's a caption
    "inLanguage"
  ],
  idPrefix: "host",
  resolve(image, { meta }) {
    image.url = resolveWithBase(meta.host, image.url);
    setIfEmpty(image, "contentUrl", image.url);
    if (image.height && !image.width)
      delete image.height;
    if (image.width && !image.height)
      delete image.width;
    return image;
  }
});
const index = {
  __proto__: null,
  imageResolver
};
function nextNodeId(ctx, alias) {
  ctx.nodeIdCounters[alias] = (ctx.nodeIdCounters[alias] || 0) + 1;
  return ctx.nodeIdCounters[alias].toString();
}
function resolveMeta(meta) {
  if (!meta.host && meta.canonicalHost)
    meta.host = meta.canonicalHost;
  if (!meta.tagPosition && meta.position)
    meta.tagPosition = meta.position;
  if (!meta.currency && meta.defaultCurrency)
    meta.currency = meta.defaultCurrency;
  if (!meta.inLanguage && meta.defaultLanguage)
    meta.inLanguage = meta.defaultLanguage;
  if (!meta.path)
    meta.path = "/";
  if (!meta.host && false)
    meta.host = (void 0).location.host;
  if (!meta.url && meta.canonicalUrl)
    meta.url = meta.canonicalUrl;
  if (meta.path !== "/") {
    if (meta.trailingSlash && !hasTrailingSlash(meta.path))
      meta.path = withTrailingSlash(meta.path);
    else if (!meta.trailingSlash && hasTrailingSlash(meta.path))
      meta.path = withoutTrailingSlash(meta.path);
  }
  meta.url = joinURL(meta.host || "", meta.path);
  return {
    ...meta,
    host: meta.host,
    url: meta.url,
    currency: meta.currency,
    image: meta.image,
    inLanguage: meta.inLanguage,
    title: meta.title,
    description: meta.description,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified
  };
}
function resolveNode(node, ctx, resolver) {
  if (resolver?.cast)
    node = resolver.cast(node, ctx);
  if (resolver?.defaults) {
    let defaults = resolver.defaults;
    if (typeof defaults === "function")
      defaults = defaults(ctx);
    node = { ...defaults, ...node };
  }
  const inheritMeta = resolver?.inheritMeta;
  if (inheritMeta) {
    for (let i = 0; i < inheritMeta.length; i++) {
      const entry2 = inheritMeta[i];
      if (typeof entry2 === "string")
        setIfEmpty(node, entry2, ctx.meta[entry2]);
      else
        setIfEmpty(node, entry2.key, ctx.meta[entry2.meta]);
    }
  }
  if (resolver?.resolve)
    node = resolver.resolve(node, ctx);
  for (const k in node) {
    const v = node[k];
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        const item = v[i];
        if (typeof item === "object" && item?._resolver)
          node[k][i] = resolveRelation(item, ctx, item._resolver);
      }
    } else if (typeof v === "object" && v?._resolver) {
      node[k] = resolveRelation(v, ctx, v._resolver);
    }
  }
  stripEmptyProperties(node);
  return node;
}
function resolveNodeId(node, ctx, resolver, resolveAsRoot = false) {
  if (node["@id"] && node["@id"].startsWith("http"))
    return node;
  const prefix = resolver ? (Array.isArray(resolver.idPrefix) ? resolver.idPrefix[0] : resolver.idPrefix) || "url" : "url";
  const rootId = node["@id"] || (resolver ? Array.isArray(resolver.idPrefix) ? resolver.idPrefix?.[1] : void 0 : "");
  if (!node["@id"] && resolveAsRoot && rootId) {
    node["@id"] = prefixId(ctx.meta[prefix], rootId);
    return node;
  }
  if (node["@id"]?.startsWith("#/schema/") || node["@id"]?.startsWith("/")) {
    node["@id"] = prefixId(ctx.meta[prefix], node["@id"]);
    return node;
  }
  let alias = resolver?.alias;
  if (!alias) {
    const type = asArray(node["@type"])?.[0] || "";
    alias = type.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  node["@id"] = prefixId(ctx.meta[prefix], `#/schema/${alias}/${node["@id"] || nextNodeId(ctx, alias)}`);
  return node;
}
function resolveRelation(input, ctx, fallbackResolver, options = {}) {
  if (!input)
    return input;
  const items = asArray(input);
  const ids = [];
  for (let i = 0; i < items.length; i++) {
    const a = items[i];
    let keyCount = 0;
    for (const _ in a) keyCount++;
    if (keyCount === 1 && a["@id"] || keyCount === 2 && a["@id"] && a["@type"]) {
      ids.push(resolveNodeId({
        "@id": ctx.find(a["@id"])?.["@id"] || a["@id"]
      }, ctx));
      continue;
    }
    let resolver = fallbackResolver;
    if (a._resolver && typeof a._resolver !== "string") {
      resolver = a._resolver;
      delete a._resolver;
    }
    if (!resolver) {
      ids.push(a);
      continue;
    }
    let node = resolveNode(a, ctx, resolver);
    if (options.afterResolve)
      options.afterResolve(node);
    if (options.generateId || options.root)
      node = resolveNodeId(node, ctx, resolver, false);
    if (options.root) {
      if (resolver.resolveRootNode)
        resolver.resolveRootNode(node, ctx);
      ctx.push(node);
      ids.push(idReference(node["@id"]));
      continue;
    }
    ids.push(node);
  }
  return !options.array && ids.length === 1 ? ids[0] : ids;
}
const UNSAFE_KEYS$1 = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function merge(target, source) {
  if (!source)
    return target;
  for (const key in source) {
    if (!Object.hasOwn(source, key) || UNSAFE_KEYS$1.has(key))
      continue;
    const value = source[key];
    if (value === void 0)
      continue;
    if (Array.isArray(target[key])) {
      if (Array.isArray(value)) {
        const merged = [...target[key], ...value];
        if (key === "@type") {
          target[key] = [...new Set(merged)];
        } else if (key === "itemListElement") {
          merged.sort((a, b) => (a.position || 0) - (b.position || 0));
          for (let i = 0; i < merged.length; i++)
            merged[i].position = i + 1;
          target[key] = merged;
        } else if (key === "potentialAction") {
          const byType = /* @__PURE__ */ Object.create(null);
          for (const action of merged) {
            const type = action["@type"];
            if (byType[type]) {
              if (action.target && byType[type].target) {
                const a = Array.isArray(byType[type].target) ? byType[type].target : [byType[type].target];
                const b = Array.isArray(action.target) ? action.target : [action.target];
                byType[type].target = [.../* @__PURE__ */ new Set([...a, ...b])];
              }
            } else {
              byType[type] = { ...action };
            }
          }
          target[key] = Object.values(byType);
        } else {
          target[key] = merged;
        }
      } else {
        target[key] = merge(target[key], [value]);
      }
    } else if (target[key] && typeof target[key] === "object" && typeof value === "object" && !Array.isArray(value)) {
      target[key] = merge({ ...target[key] }, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}
function indexNode(index2, node) {
  if (!node["@id"])
    return;
  const nodeId = node["@id"];
  const fragmentKey = resolveAsGraphKey(nodeId);
  index2.set(fragmentKey, node);
  index2.set(nodeId, node);
  const domainKey = nodeId.replace(/(https?:)?\/\//, "").split("/")[0];
  index2.set(domainKey, node);
}
function createSchemaOrgGraph() {
  const ctx = {
    find(id) {
      let resolver = (s) => s;
      if (id[0] === "#") {
        resolver = resolveAsGraphKey;
      } else if (id[0] === "/") {
        resolver = (s) => s.replace(/(https?:)?\/\//, "").split("/")[0];
      }
      const key = resolver(id);
      if (ctx.nodeIndex.size > 0) {
        return ctx.nodeIndex.get(key) || null;
      }
      return ctx.nodes.filter((n) => !!n["@id"]).find((n) => resolver(n["@id"]) === key);
    },
    push(input) {
      asArray(input).forEach((node) => {
        const registeredNode = node;
        ctx.nodes.push(registeredNode);
        if (ctx.nodeIndex.size > 0)
          indexNode(ctx.nodeIndex, registeredNode);
      });
    },
    resolveGraph(meta) {
      for (const k in ctx.nodeIdCounters) delete ctx.nodeIdCounters[k];
      ctx.meta = resolveMeta({ ...meta });
      const len = ctx.nodes.length;
      for (let i = 0; i < len; i++) {
        let node = ctx.nodes[i];
        const resolver = node._resolver;
        node = resolveNode(node, ctx, resolver);
        node = resolveNodeId(node, ctx, resolver, true);
        ctx.nodes[i] = node;
      }
      const dedupedNodes = /* @__PURE__ */ Object.create(null);
      ctx.nodeIndex = /* @__PURE__ */ new Map();
      for (let i = 0; i < ctx.nodes.length; i++) {
        const n = ctx.nodes[i];
        const nodeKey = resolveAsGraphKey(n["@id"]);
        if (dedupedNodes[nodeKey]) {
          if (n._dedupeStrategy !== "replace")
            dedupedNodes[nodeKey] = merge(dedupedNodes[nodeKey], n);
          else
            dedupedNodes[nodeKey] = n;
        } else {
          dedupedNodes[nodeKey] = n;
        }
      }
      ctx.nodes = Object.values(dedupedNodes);
      for (let i = 0; i < ctx.nodes.length; i++)
        indexNode(ctx.nodeIndex, ctx.nodes[i]);
      const countBeforeRelations = ctx.nodes.length;
      for (let i = 0; i < ctx.nodes.length; i++) {
        const node = ctx.nodes[i];
        if (node.image && typeof node.image === "string") {
          node.image = resolveRelation(node.image, ctx, imageResolver, {
            root: true
          });
        }
        node.translationOfWork = resolveRelation(node.translationOfWork, ctx);
        node.workTranslation = resolveRelation(node.workTranslation, ctx);
        if (node._resolver?.resolveRootNode)
          node._resolver.resolveRootNode(node, ctx);
        delete node._resolver;
      }
      const needsDedupe = ctx.nodes.length > countBeforeRelations;
      const normalizedNodes = needsDedupe ? /* @__PURE__ */ Object.create(null) : null;
      const result = needsDedupe ? null : [];
      for (let i = 0; i < ctx.nodes.length; i++) {
        const n = ctx.nodes[i];
        const nodeKey = resolveAsGraphKey(n["@id"]);
        const keys = Object.keys(n);
        const primitives = [];
        const relations = [];
        for (let j = 0; j < keys.length; j++) {
          const k = keys[j];
          if (k[0] === "_")
            continue;
          const v = n[k];
          if (v !== null && (Array.isArray(v) || typeof v === "object"))
            relations.push(k);
          else
            primitives.push(k);
        }
        primitives.sort();
        relations.sort();
        const newNode = {};
        for (let j = 0; j < primitives.length; j++)
          newNode[primitives[j]] = n[primitives[j]];
        for (let j = 0; j < relations.length; j++)
          newNode[relations[j]] = n[relations[j]];
        if (needsDedupe) {
          normalizedNodes[nodeKey] = normalizedNodes[nodeKey] ? merge(normalizedNodes[nodeKey], newNode) : newNode;
        } else {
          result.push(newNode);
        }
      }
      return needsDedupe ? Object.values(normalizedNodes) : result;
    },
    nodes: [],
    nodeIndex: /* @__PURE__ */ new Map(),
    nodeIdCounters: /* @__PURE__ */ Object.create(null),
    meta: {}
  };
  return ctx;
}
const resolverCache = {};
const resolverImports = {
  address: () => import('./index28-DsxNJ6eH.mjs'),
  aggregateOffer: () => import('./index-D6lJ55Tb.mjs'),
  aggregateRating: () => import('./index2-Bktus5GQ.mjs'),
  article: () => import('./index3-B00Q92fD.mjs').then(function(n) {
    return n.l;
  }),
  breadcrumb: () => import('./index3-B00Q92fD.mjs').then(function(n) {
    return n.i;
  }),
  comment: () => import('./index5-R-c4cKTF.mjs'),
  course: () => import('./index6-BSYiZgk5.mjs'),
  dataset: () => import('./index7-C_3uyty6.mjs'),
  event: () => import('./index10-CeVQaT4c.mjs'),
  foodEstablishment: () => import('./index11-DfX9Ui0y.mjs'),
  virtualLocation: () => import('./index9-ZOqKlgFs.mjs'),
  place: () => import('./index8-DxFtDNkt.mjs'),
  howTo: () => import('./index13-B959ztkE.mjs'),
  howToStep: () => import('./index12-D2jP8qdt.mjs').then(function(n) {
    return n.i;
  }),
  image: () => Promise.resolve().then(function() {
    return index;
  }),
  localBusiness: () => import('./index17-BIYYEoYD.mjs'),
  offer: () => import('./index23-CSLd9KeG.mjs'),
  openingHours: () => import('./index24-Qpc0YJnG.mjs'),
  organization: () => import('./index3-B00Q92fD.mjs').then(function(n) {
    return n.h;
  }),
  person: () => import('./index3-B00Q92fD.mjs').then(function(n) {
    return n.k;
  }),
  product: () => import('./index29-DqHKUUra.mjs'),
  question: () => import('./index30-BVoDY2iX.mjs'),
  recipe: () => import('./index31-BCE2ld9Y.mjs'),
  review: () => import('./index32-BVU8RAwA.mjs'),
  video: () => import('./index38-BXySBez2.mjs'),
  webPage: () => import('./index3-B00Q92fD.mjs').then(function(n) {
    return n.j;
  }),
  webSite: () => import('./index3-B00Q92fD.mjs').then(function(n) {
    return n.g;
  }),
  book: () => import('./index4-DQAjh1sv.mjs'),
  itemList: () => import('./index14-DJJ5snjg.mjs'),
  jobPosting: () => import('./index15-PzaEvpzL.mjs'),
  listItem: () => import('./index16-D5q7toI8.mjs'),
  movie: () => import('./index18-DNyqnIcL.mjs'),
  musicAlbum: () => import('./index19-BhrLKRS_.mjs'),
  musicGroup: () => import('./index20-BQ4ZWCmu.mjs'),
  musicPlaylist: () => import('./index21-CL5ccemJ.mjs'),
  musicRecording: () => import('./index22-DL4rvIJZ.mjs'),
  podcastEpisode: () => import('./index25-C_M_r3Yh.mjs'),
  podcastSeason: () => import('./index26-DN0B5Y3T.mjs'),
  podcastSeries: () => import('./index27-B73zGd_E.mjs'),
  searchAction: () => import('./index40-evICQSOX.mjs'),
  readAction: () => import('./index39-CNiSnBwJ.mjs'),
  service: () => import('./index33-D3hr6fjm.mjs'),
  softwareApp: () => import('./index34-B0toEsY9.mjs'),
  tvEpisode: () => import('./index35-CGHcmMLn.mjs'),
  tvSeason: () => import('./index36-BCtolFhl.mjs'),
  tvSeries: () => import('./index37-BY7MFu9s.mjs'),
  bookEdition: () => import('./index4-DQAjh1sv.mjs')
};
const resolverExportNames = {
  address: "addressResolver",
  aggregateOffer: "aggregateOfferResolver",
  aggregateRating: "aggregateRatingResolver",
  article: "articleResolver",
  breadcrumb: "breadcrumbResolver",
  comment: "commentResolver",
  course: "courseResolver",
  dataset: "datasetResolver",
  event: "eventResolver",
  foodEstablishment: "foodEstablishmentResolver",
  virtualLocation: "virtualLocationResolver",
  place: "placeResolver",
  howTo: "howToResolver",
  howToStep: "howToStepResolver",
  image: "imageResolver",
  localBusiness: "localBusinessResolver",
  offer: "offerResolver",
  openingHours: "openingHoursResolver",
  organization: "organizationResolver",
  person: "personResolver",
  product: "productResolver",
  question: "questionResolver",
  recipe: "recipeResolver",
  review: "reviewResolver",
  video: "videoResolver",
  webPage: "webPageResolver",
  webSite: "webSiteResolver",
  book: "bookResolver",
  itemList: "itemListResolver",
  jobPosting: "jobPostingResolver",
  listItem: "listItemResolver",
  movie: "movieResolver",
  musicAlbum: "musicAlbumResolver",
  musicGroup: "musicGroupResolver",
  musicPlaylist: "musicPlaylistResolver",
  musicRecording: "musicRecordingResolver",
  podcastEpisode: "podcastEpisodeResolver",
  podcastSeason: "podcastSeasonResolver",
  podcastSeries: "podcastSeriesResolver",
  searchAction: "searchActionResolver",
  readAction: "readActionResolver",
  service: "serviceResolver",
  softwareApp: "softwareAppResolver",
  tvEpisode: "tvEpisodeResolver",
  tvSeason: "tvSeasonResolver",
  tvSeries: "tvSeriesResolver",
  bookEdition: "bookEditionResolver"
};
async function loadResolver(resolver) {
  if (resolverCache[resolver])
    return resolverCache[resolver];
  const importFn = resolverImports[resolver];
  if (!importFn)
    return null;
  const mod = await importFn();
  const exportName = resolverExportNames[resolver];
  const loaded = mod[exportName] || mod.default;
  if (loaded)
    resolverCache[resolver] = loaded;
  return loaded || null;
}
const UNSAFE_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
async function preloadNestedResolvers(obj) {
  if (!obj || typeof obj !== "object")
    return;
  const promises = [];
  if (typeof obj._resolver === "string") {
    const resolverName = obj._resolver;
    promises.push(loadResolver(resolverName).then((loaded) => {
      if (loaded)
        obj._resolver = loaded;
    }));
  }
  for (const key in obj) {
    if (!Object.hasOwn(obj, key) || UNSAFE_KEYS.has(key))
      continue;
    const val = obj[key];
    if (val && typeof val === "object") {
      if (Array.isArray(val)) {
        for (const item of val) {
          promises.push(preloadNestedResolvers(item));
        }
      } else {
        promises.push(preloadNestedResolvers(val));
      }
    }
  }
  await Promise.all(promises);
}
function mergeObjects(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (!Object.hasOwn(source, key) || source[key] === void 0 || UNSAFE_KEYS.has(key))
      continue;
    const isNestedObject = result[key] && typeof result[key] === "object" && typeof source[key] === "object" && !Array.isArray(result[key]) && !Array.isArray(source[key]);
    if (isNestedObject)
      result[key] = mergeObjects(result[key], source[key]);
    else if (!result[key])
      result[key] = source[key];
  }
  return result;
}
function SchemaOrgUnheadPlugin(config, meta, options) {
  config = resolveMeta({ ...config });
  let graph;
  let resolvedMeta = {};
  return defineHeadPlugin((head) => {
    head.use(TemplateParamsPlugin);
    return {
      key: "schema-org",
      hooks: {
        "entries:normalize": async ({ tags }) => {
          graph = graph || createSchemaOrgGraph();
          for (const tag of tags) {
            if (tag.tag === "script" && tag.props.type === "application/ld+json" && tag.props.nodes) {
              const nodes = await tag.props.nodes;
              for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
                if (typeof node !== "object" || Object.keys(node).length === 0) {
                  continue;
                }
                await preloadNestedResolvers(node);
                const newNode = {
                  ...node,
                  _dedupeStrategy: tag.tagDuplicateStrategy
                };
                graph.push(newNode);
              }
              tag.tagPosition = tag.tagPosition || config.tagPosition === "head" ? "head" : "bodyClose";
            }
            if (tag.tag === "htmlAttrs" && tag.props.lang) {
              resolvedMeta.inLanguage = tag.props.lang;
            } else if (tag.tag === "title") {
              resolvedMeta.title = tag.textContent;
            } else if (tag.tag === "meta" && tag.props.name === "description") {
              resolvedMeta.description = tag.props.content;
            } else if (tag.tag === "link" && tag.props.rel === "canonical") {
              resolvedMeta.url = tag.props.href;
              if (resolvedMeta.url && !resolvedMeta.host) {
                try {
                  resolvedMeta.host = new URL(resolvedMeta.url).origin;
                } catch {
                }
              }
            } else if (tag.tag === "meta" && tag.props.property === "og:image") {
              resolvedMeta.image = tag.props.content;
            } else if (tag.tag === "templateParams" && tag.props.schemaOrg) {
              resolvedMeta = {
                ...resolvedMeta,
                // @ts-expect-error untyped
                ...tag.props.schemaOrg
              };
              delete tag.props.schemaOrg;
            }
          }
        },
        "tags:resolve": async (ctx) => {
          for (const k in ctx.tags) {
            const tag = ctx.tags[k];
            if (tag.tag === "script" && tag.props.type === "application/ld+json" && tag.props.nodes) {
              delete tag.props.nodes;
              const resolvedGraph = graph.resolveGraph({ ...await meta?.() || {}, ...config, ...resolvedMeta });
              if (!resolvedGraph.length) {
                tag.props = {};
                return;
              }
              options?.minify || "production" === "production";
              tag.innerHTML = JSON.stringify({
                "@context": "https://schema.org",
                "@graph": resolvedGraph
              }, (_, value) => {
                if (typeof value !== "object")
                  return processTemplateParams(value, head._templateParams, head._separator);
                return value;
              }, 0 );
              return;
            }
          }
        },
        "tags:afterResolve": (ctx) => {
          let firstNodeKey;
          for (const k in ctx.tags) {
            const tag = ctx.tags[k];
            if (!tag?.props)
              continue;
            if (tag.props.type === "application/ld+json" && tag.props.nodes || tag.key === "schema-org-graph") {
              delete tag.props.nodes;
              if (typeof firstNodeKey === "undefined") {
                firstNodeKey = k;
                continue;
              }
              ctx.tags[firstNodeKey].props = mergeObjects(ctx.tags[firstNodeKey].props, tag.props);
              delete ctx.tags[firstNodeKey].props.nodes;
              ctx.tags[k] = false;
            }
          }
          ctx.tags = ctx.tags.filter(Boolean);
        }
      }
    };
  });
}
function provideResolver(input, resolver) {
  if (!input)
    input = {};
  const target = isRef(input) ? input.value : input;
  target._resolver = resolver;
  return input;
}
function defineLocalBusiness(input) {
  return provideResolver(input, "localBusiness");
}
function defineOrganization(input) {
  return provideResolver(input, "organization");
}
function definePerson(input) {
  return provideResolver(input, "person");
}
function defineWebPage(input) {
  return provideResolver(input, "webPage");
}
function defineWebSite(input) {
  return provideResolver(input, "webSite");
}
function useSchemaOrgConfig() {
  const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
  return defu(runtimeConfig["nuxt-schema-org"], {
    scriptAttributes: {}
  });
}
function useSchemaOrg(input) {
  const config = useSchemaOrgConfig();
  useNuxtApp();
  let nodes = input;
  if (isRef(input)) {
    nodes = toValue(input);
  }
  const script = {
    type: "application/ld+json",
    key: "schema-org-graph",
    // @ts-expect-error untyped
    nodes,
    tagPriority: "high",
    ...config.scriptAttributes
  };
  {
    return useHead({
      script: [script]
    });
  }
}
const FILE_EXT_RE = /\.[0-9a-z]+$/i;
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
const fileExtensions = [
  // Images
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
  // Documents
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "md",
  "markdown",
  // Archives
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  // Audio
  "mp3",
  "wav",
  "flac",
  "ogg",
  "opus",
  "m4a",
  "aac",
  "midi",
  "mid",
  // Video
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  // Web
  "html",
  "css",
  "js",
  "json",
  "xml",
  "tsx",
  "jsx",
  "ts",
  "vue",
  "svelte",
  "xsl",
  "rss",
  "atom",
  // Programming
  "php",
  "py",
  "rb",
  "java",
  "c",
  "cpp",
  "h",
  "go",
  // Data formats
  "csv",
  "tsv",
  "sql",
  "yaml",
  "yml",
  // Fonts
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  // Executables/Binaries
  "exe",
  "msi",
  "apk",
  "ipa",
  "dmg",
  "iso",
  "bin",
  // Scripts/Config
  "bat",
  "cmd",
  "sh",
  "env",
  "htaccess",
  "conf",
  "toml",
  "ini",
  // Package formats
  "deb",
  "rpm",
  "jar",
  "war",
  // E-books
  "epub",
  "mobi",
  // Common temporary/backup files
  "log",
  "tmp",
  "bak",
  "old",
  "sav"
];
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  const ext = (lastSegment || path).match(FILE_EXT_RE)?.[0];
  return !!(ext && fileExtensions.includes(ext.replace(".", "")));
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
function getNitroOrigin(e) {
  {
    e = e || useRequestEvent();
    return e?.context?.siteConfigNitroOrigin || "";
  }
}
function useNitroOrigin(e) {
  return getNitroOrigin(e);
}
function createSitePathResolver(options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const nuxtBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return (path) => {
    return computed(() => resolveSitePath(unref(path), {
      absolute: unref(options.absolute),
      withBase: unref(options.withBase),
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    }));
  };
}
function withSiteUrl(path, options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const base = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return computed(() => {
    return resolveSitePath(unref(path), {
      absolute: true,
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base,
      withBase: unref(options.withBase)
    });
  });
}
function resolvePathDirect(siteConfig, path, options) {
  const nuxtBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL || "/";
  return resolveSitePath(path, {
    absolute: options.absolute,
    withBase: options.withBase,
    siteUrl: toValue(siteConfig.url),
    trailingSlash: toValue(siteConfig.trailingSlash),
    base: nuxtBase
  });
}
function initPlugin(nuxtApp) {
  const head = injectHead();
  const config = useSchemaOrgConfig();
  const route = useRoute();
  const siteConfig = useSiteConfig();
  const resolveUrl = (path) => resolvePathDirect(siteConfig, path, { absolute: true, withBase: true });
  function resolveSchemaOrg() {
    const siteConfigResolved = {};
    for (const key in siteConfig) {
      if (key.startsWith("_")) {
        continue;
      }
      siteConfigResolved[key] = toValue(siteConfig[key]);
      if (typeof siteConfigResolved[key] === "object") {
        for (const k in siteConfigResolved[key]) {
          siteConfigResolved[key][k] = toValue(siteConfigResolved[key][k]);
        }
      }
    }
    return {
      ...route.meta?.schemaOrg || {},
      ...siteConfigResolved,
      url: toValue(resolveUrl(route.path)),
      host: withTrailingSlash(toValue(resolveUrl("/"))),
      inLanguage: toValue(siteConfigResolved.currentLocale) || toValue(siteConfigResolved.defaultLocale),
      path: route.path
    };
  }
  useHead({
    templateParams: { schemaOrg: resolveSchemaOrg() }
  });
  const SchemaOrgPlugin = SchemaOrgUnheadPlugin;
  head.use(
    SchemaOrgPlugin({}, async () => {
      const meta = {};
      await nuxtApp.hooks.callHook("schema-org:meta", meta);
      return meta;
    }, {
      minify: config.minify,
      trailingSlash: siteConfig.trailingSlash
    })
  );
}
function maybeAddIdentitySchemaOrg() {
  const config = useSchemaOrgConfig();
  const siteConfig = useSiteConfig({
    resolveRefs: true
  });
  if (config.identity || siteConfig.identity) {
    const identity = config.identity || siteConfig.identity;
    let identityPayload = {
      name: () => toValue(siteConfig.name),
      url: () => toValue(siteConfig.url)
    };
    let identityType;
    if (typeof identity !== "string") {
      identityPayload = {
        ...identityPayload,
        ...identity
      };
      identityType = identity.type;
      delete identityPayload.type;
    } else {
      identityType = identity;
    }
    if (siteConfig.twitter) {
      const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter.slice(1) : siteConfig.twitter;
      identityPayload.sameAs = [
        `https://twitter.com/${id}`
      ];
    }
    const identityDefines = {
      organization: defineOrganization,
      person: definePerson,
      localbusiness: defineLocalBusiness
    };
    const defineIdentity = identityDefines[identityType?.toLowerCase()] || defineOrganization;
    useSchemaOrg([defineIdentity(identityPayload)]);
  }
}
const defaults_ZjgoYqsIrjWNaJMfDhci2B0eoNnvY4CDsoscm0L1fE0 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-schema-org:defaults",
  dependsOn: [
    "nuxt-schema-org:init"
  ],
  setup() {
    const error = /* @__PURE__ */ useError();
    if (error.value?.error) {
      return;
    }
    const siteConfig = useSiteConfig();
    useSchemaOrg([
      defineWebSite({
        name: () => toValue(siteConfig.name) || "",
        inLanguage: () => toValue(siteConfig.currentLocale) || "",
        description: () => toValue(siteConfig.description) || ""
      }),
      defineWebPage()
    ]);
    maybeAddIdentitySchemaOrg();
  }
});
const init_Ks1wcI1vuv3K3FXG7iAYRqIWlPli19G_eByed0tsXe0 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-schema-org:init",
  setup(nuxtApp) {
    initPlugin(nuxtApp);
  }
});
const componentNames = [{ "hash": "", "pascalName": "BlogPostTakumi", "kebabName": "blog-post-takumi", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "takumi", "propNames": [] }, { "hash": "", "pascalName": "BrutalistSatori", "kebabName": "brutalist-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "DocsTakumi", "kebabName": "docs-takumi", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "takumi", "propNames": [] }, { "hash": "", "pascalName": "FrameSatori", "kebabName": "frame-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "NuxtSatori", "kebabName": "nuxt-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "NuxtSeoSatori", "kebabName": "nuxt-seo-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "NuxtSeoTakumi", "kebabName": "nuxt-seo-takumi", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "takumi", "propNames": [] }, { "hash": "", "pascalName": "PergelSatori", "kebabName": "pergel-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "ProductCardTakumi", "kebabName": "product-card-takumi", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "takumi", "propNames": [] }, { "hash": "", "pascalName": "SaaSSatori", "kebabName": "saa-ssatori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "SimpleBlogSatori", "kebabName": "simple-blog-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "UnJsSatori", "kebabName": "un-js-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }, { "hash": "", "pascalName": "WithEmojiSatori", "kebabName": "with-emoji-satori", "path": "/Users/mrm/ViktoriaVue/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community", "category": "community", "renderer": "satori", "propNames": [] }];
const MAX_PATH_LENGTH = 200;
const RE_BASE64_PADDING = /=/g;
const RE_BASE64_PLUS = /\+/g;
const RE_BASE64_SLASH = /\//g;
const RE_UNDERSCORE = /_/g;
const RE_PERCENT20 = /%20/g;
const RE_NON_ASCII = /[^\u0000-\u007F]/;
const PARAM_ALIASES = {
  w: "width",
  h: "height",
  c: "component",
  em: "emojis",
  k: "key",
  a: "alt",
  u: "url",
  cache: "cacheMaxAgeSeconds",
  p: "_path",
  // page path - needs alias since _path starts with underscore
  q: "_query",
  // query params - needs alias since _query starts with underscore
  ch: "_componentHash"
  // component template hash for cache busting prerendered URLs
};
const PARAM_TO_ALIAS = Object.fromEntries(
  Object.entries(PARAM_ALIASES).map(([alias, param]) => [param, alias])
);
const COMPLEX_PARAMS = /* @__PURE__ */ new Set(["satori", "resvg", "sharp", "screenshot", "takumi", "fonts", "_query", "_path"]);
function b64Encode(str) {
  let encoded;
  if (typeof btoa === "function") {
    const utf8 = new TextEncoder().encode(str);
    const binary = String.fromCharCode(...utf8);
    encoded = btoa(binary);
  } else {
    encoded = Buffer.from(str, "utf8").toString("base64");
  }
  return encoded.replace(RE_BASE64_PADDING, "").replace(RE_BASE64_PLUS, "-").replace(RE_BASE64_SLASH, "~");
}
function simpleHash(str) {
  let hash2 = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash2 = (hash2 << 5) - hash2 + char;
    hash2 = hash2 & hash2;
  }
  return Math.abs(hash2).toString(36);
}
function hashOgImageOptions(options, componentHash, version) {
  const { _path, _hash, ...hashableOptions } = options;
  const hashInput = hashableOptions;
  return simpleHash(JSON.stringify(hashInput));
}
function encodeOgImageParams(options, defaults) {
  const parts = [];
  const flattened = {};
  for (const [key, value] of Object.entries(options)) {
    if (key === "props" && typeof value === "object") {
      for (const [propKey, propValue] of Object.entries(value)) {
        if (propValue === void 0 || propValue === null)
          continue;
        if (typeof propValue === "string" || typeof propValue === "number" || typeof propValue === "boolean") {
          flattened[propKey] = propValue;
        } else {
          flattened.props = flattened.props || {};
          flattened.props[propKey] = propValue;
        }
      }
    } else {
      flattened[key] = value;
    }
  }
  for (const [key, value] of Object.entries(flattened)) {
    if (value === void 0 || value === null || value === "") {
      continue;
    }
    if (key === "extension" || key === "socialPreview")
      continue;
    if (key === "_path" && value === "/")
      continue;
    if (key === "_query" && typeof value === "object" && Object.keys(value).length === 0)
      continue;
    if (defaults && key in defaults && defaults[key] === value && key !== "component")
      continue;
    const alias = PARAM_TO_ALIAS[key] || key;
    if (COMPLEX_PARAMS.has(key)) {
      const json = JSON.stringify(value);
      if (json === "{}")
        continue;
      const b64 = b64Encode(json);
      parts.push(`${alias}_${b64}`);
    } else if (typeof value === "object") {
      const json = JSON.stringify(value);
      if (json === "{}")
        continue;
      const b64 = b64Encode(json);
      parts.push(`${alias}_${b64}`);
    } else {
      const str = String(value);
      if (RE_NON_ASCII.test(str)) {
        parts.push(`${alias}_~${b64Encode(str)}`);
      } else {
        const escaped = str.startsWith("~") ? `~${str}` : str;
        const encoded = encodeURIComponent(escaped.replace(RE_UNDERSCORE, "__")).replace(RE_PERCENT20, "+");
        if (encoded.includes("%")) {
          parts.push(`${alias}_~${b64Encode(str)}`);
        } else {
          parts.push(`${alias}_${encoded}`);
        }
      }
    }
  }
  return parts.join(",");
}
function buildOgImageUrl(options, extension = "png", isStatic = false, defaults, secret) {
  const encoded = encodeOgImageParams(options, defaults);
  const prefix = isStatic ? "/_og/s" : "/_og/d";
  if (isStatic && (encoded.length > MAX_PATH_LENGTH || encoded.includes("%"))) {
    const hash2 = hashOgImageOptions(options);
    return {
      url: `${prefix}/o_${hash2}.${extension}`,
      hash: hash2
    };
  }
  const segment = encoded || "default";
  const signed = secret && !isStatic ? `${segment},s_${signEncodedParams(segment, secret)}` : segment;
  return {
    url: `${prefix}/${signed}.${extension}`
  };
}
function signEncodedParams(encoded, secret) {
  return hash(`${secret}:${encoded}`).slice(0, 16);
}
const RE_KEBAB_CASE = /-([a-z])/g;
function generateMeta(url, resolvedOptions) {
  const key = resolvedOptions.key || "og";
  const isTwitterOnly = key === "twitter";
  const includeTwitter = key === "og" || key === "twitter";
  const meta = [];
  if (includeTwitter) {
    meta.push({ name: "twitter:card", content: "summary_large_image" });
    meta.push({ name: "twitter:image", content: url });
    meta.push({ name: "twitter:image:src", content: url });
  }
  if (!isTwitterOnly) {
    meta.push({ property: "og:image", content: url });
    meta.push({ property: "og:image:type", content: () => `image/${getExtension(toValue(url)) || resolvedOptions.extension}` });
  }
  if (resolvedOptions.width) {
    if (!isTwitterOnly)
      meta.push({ property: "og:image:width", content: resolvedOptions.width });
    if (includeTwitter)
      meta.push({ name: "twitter:image:width", content: resolvedOptions.width });
  }
  if (resolvedOptions.height) {
    if (!isTwitterOnly)
      meta.push({ property: "og:image:height", content: resolvedOptions.height });
    if (includeTwitter)
      meta.push({ name: "twitter:image:height", content: resolvedOptions.height });
  }
  if (resolvedOptions.alt) {
    if (!isTwitterOnly)
      meta.push({ property: "og:image:alt", content: resolvedOptions.alt });
    if (includeTwitter)
      meta.push({ name: "twitter:image:alt", content: resolvedOptions.alt });
  }
  return meta;
}
function isInternalRoute(path) {
  return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
  const keys = [
    "url",
    "extension",
    "width",
    "height",
    "alt",
    "props",
    "renderer",
    "component",
    "emojis",
    "_query",
    "_hash",
    "fonts",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "takumi",
    "cacheMaxAgeSeconds",
    "cacheKey",
    "key"
  ];
  return keys.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(RE_KEBAB_CASE, (g) => String(g[1]).toUpperCase())] = val;
  });
  const result = Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k))
  );
  if (Object.keys(props).length > 0)
    result.props = props;
  return result;
}
function withoutQuery(path) {
  return path.split("?")[0];
}
function getExtension(path) {
  path = withoutQuery(path);
  const lastSegment = path.split("/").pop() || path;
  const extension = lastSegment.split(".").pop() || lastSegment;
  if (extension === "jpg")
    return "jpeg";
  return extension;
}
const RE_RENDERER_SUFFIX = /(Satori|Browser|Takumi)$/;
function createOgImageMeta(src, input, ssrContext, pagePath, head) {
  const ogImageConfig = useOgImageRuntimeConfig();
  const { defaults } = ogImageConfig;
  const resolvedOptions = separateProps(defu(input, defaults));
  resolvedOptions.key = resolvedOptions.key || "og";
  const payloads = ssrContext._ogImagePayloads || [];
  const currentPayloadIdx = payloads.findIndex(([k]) => k === resolvedOptions.key);
  const _input = separateProps(defu(input, currentPayloadIdx >= 0 ? payloads[currentPayloadIdx][1] : {}));
  if (!src && !input.url && !resolvedOptions.url)
    return;
  const basePath = "/";
  if (currentPayloadIdx === -1) {
    payloads.push([resolvedOptions.key, _input, basePath]);
  } else {
    payloads[currentPayloadIdx] = [resolvedOptions.key, _input, basePath];
  }
  const baseURL2 = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
  ssrContext._ogImageInstance?.dispose();
  ssrContext._ogImageInstance = useHead({
    // Meta is generated lazily so that title/description from useSeoMeta / useHead
    // are available regardless of call ordering (all component setups have completed
    // by the time Unhead resolves tags).
    meta() {
      const finalPayload = ssrContext._ogImagePayloads || [];
      return finalPayload.flatMap(([_, options, payloadBasePath]) => {
        const opts = { ...options, props: { ...options.props } };
        const rawComponentName = opts.component || componentNames?.[0]?.pascalName;
        const resolvedComponentName = rawComponentName ? resolveComponentName(rawComponentName) : void 0;
        const resolvedComponent = resolvedComponentName ? componentNames?.find((c) => c.pascalName === resolvedComponentName || c.kebabName === resolvedComponentName) : void 0;
        resolvedComponent?.propNames;
        const extension = opts.extension || defaults?.extension || "png";
        const isStatic = false;
        const urlOpts = { ...opts, _path: payloadBasePath };
        const componentName = opts.component || componentNames?.[0]?.pascalName;
        const component = componentNames?.find((c) => c.pascalName === componentName || c.kebabName === componentName);
        if (component?.hash)
          urlOpts._componentHash = component.hash;
        const result = buildOgImageUrl(urlOpts, extension, isStatic, defaults, ogImageConfig.security?.secret || void 0);
        if (result.hash) {
          opts._hash = result.hash;
          options._hash = result.hash;
        }
        const resolvedUrl = joinURL("/", baseURL2, result.url);
        const finalUrl = opts._query && Object.keys(opts._query).length ? withQuery(resolvedUrl, { _query: opts._query }) : resolvedUrl;
        return generateMeta(finalUrl, opts);
      });
    }
  }, {
    processTemplateParams: true,
    tagPriority: 35
  });
  ssrContext._ogImagePayloads = payloads;
}
function resolveComponentName(component) {
  component = component || componentNames?.[0]?.pascalName;
  if (component && componentNames) {
    const originalName = component;
    const normalizedName = originalName.split(".").map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join("");
    const inputBase = normalizedName.replace(RE_RENDERER_SUFFIX, "");
    for (const component2 of componentNames) {
      if (component2.pascalName === normalizedName)
        return component2.pascalName;
      const basePascalName = component2.pascalName.replace(RE_RENDERER_SUFFIX, "");
      if (basePascalName === originalName || basePascalName === inputBase)
        return component2.pascalName;
      const prefixes = [
        { prefix: "OgImageCommunity", overlapWord: "Community" },
        { prefix: "OgImageTemplate", overlapWord: "Template" },
        { prefix: "OgImage", overlapWord: "Image" }
      ];
      for (const { prefix, overlapWord } of prefixes) {
        if (!basePascalName.startsWith(prefix))
          continue;
        const withoutPrefix = basePascalName.slice(prefix.length);
        if (withoutPrefix === originalName || withoutPrefix === inputBase)
          return component2.pascalName;
        if (withoutPrefix && withoutPrefix !== overlapWord) {
          const withOverlap = overlapWord + withoutPrefix;
          if (withOverlap === originalName || withOverlap === inputBase)
            return component2.pascalName;
        }
        break;
      }
    }
  }
  return component;
}
function getOgImagePath(_pagePath, _options) {
  const { app, defaults, security } = useOgImageRuntimeConfig();
  const baseURL2 = app.baseURL;
  const extension = _options?.extension || defaults?.extension || "png";
  const isStatic = false;
  const options = { ..._options, _path: _pagePath };
  const componentName = _options?.component || componentNames?.[0]?.pascalName;
  const component = componentNames?.find((c) => c.pascalName === componentName || c.kebabName === componentName);
  if (component?.hash)
    options._componentHash = component.hash;
  const result = buildOgImageUrl(options, extension, isStatic, defaults, security?.secret || void 0);
  const path = joinURL("/", baseURL2, result.url);
  return {
    path,
    hash: result.hash
  };
}
function useOgImageRuntimeConfig() {
  const event = useRequestEvent();
  const c = event ? /* @__PURE__ */ useRuntimeConfig() : /* @__PURE__ */ useRuntimeConfig();
  const serverCfg = c["nuxt-og-image"] || {};
  const publicCfg = c.public?.["nuxt-og-image"] || {};
  const merged = { defaults: {}, ...publicCfg, ...serverCfg };
  const overrideSecret = c.ogImage?.secret;
  if (overrideSecret)
    merged.security = { ...merged.security || {}, secret: overrideSecret };
  merged.app = { baseURL: c.app.baseURL };
  return merged;
}
function ogImageCanonicalUrls(nuxtApp) {
  nuxtApp.hooks.hook("app:rendered", async (ctx) => {
    const { ssrContext } = ctx;
    const e = useRequestEvent();
    const path = parseURL(e?.path || "").pathname;
    if (isInternalRoute(path))
      return;
    ssrContext?.head.use(TemplateParamsPlugin);
    ssrContext?.head.use({
      key: "nuxt-og-image:overrides-and-canonical-urls",
      hooks: {
        "tags:afterResolve": (ctx2) => {
          let title = "";
          let description = "";
          for (const tag of ctx2.tags) {
            if (tag.tag === "title" && tag.textContent) {
              title = tag.textContent;
            } else if (tag.tag === "meta" && tag.props.name === "description") {
              description = tag.props.content || "";
            }
            if (title && description)
              break;
          }
          for (const tag of ctx2.tags) {
            if (tag.tag === "meta" && (tag.props.property === "og:image" || ["twitter:image:src", "twitter:image"].includes(tag.props.name || ""))) {
              if (!tag.props.content) {
                tag.props = {};
                continue;
              }
              tag.props.content = tag.props.content.replaceAll("%title", title).replaceAll("%description", description).replaceAll(" ", "+");
              if (!tag.props.content?.startsWith("https")) {
                nuxtApp.runWithContext(() => {
                  tag.props.content = toValue(withSiteUrl(tag.props.content || "", {
                    withBase: true,
                    canonical: true
                  }));
                });
              }
            }
          }
        }
      }
    });
  });
}
function routeRuleOgImage(nuxtApp) {
  nuxtApp.hooks.hook("app:rendered", async (ctx) => {
    const { ssrContext } = ctx;
    const e = useRequestEvent();
    const path = parseURL(e?.path || "").pathname;
    if (isInternalRoute(path))
      return;
    const _routeRulesMatcher2 = toRouteMatcher(
      createRouter$1({ routes: ssrContext?.runtimeConfig?.nitro?.routeRules })
    );
    const matchedRules = _routeRulesMatcher2.matchAll(
      withoutBase(path.split("?")?.[0] || "", ssrContext?.runtimeConfig?.app.baseURL || "")
    ).reverse();
    const combinedRules = defu({}, ...matchedRules);
    let routeRules = combinedRules?.ogImage;
    if (typeof routeRules === "undefined")
      return;
    if (routeRules === false) {
      nuxtApp.ssrContext._ogImageInstance?.dispose();
      nuxtApp.ssrContext._ogImageDevtoolsInstance?.dispose();
      nuxtApp.ssrContext._ogImageInstance = void 0;
      nuxtApp.ssrContext._ogImagePayloads = [];
      return;
    }
    routeRules = defu(nuxtApp.ssrContext?.event?.context._nitro?.routeRules?.ogImage, routeRules);
    const { path: src, hash: hash2 } = getOgImagePath(ssrContext.url, routeRules);
    if (hash2) {
      routeRules._hash = hash2;
    }
    createOgImageMeta(src, routeRules, nuxtApp.ssrContext);
  });
}
const og_image_canonical_urls_server_2uCBKzWxjEK91fSFBdBNPEWilWXRzR66cHJvjIi4FGA = /* @__PURE__ */ defineNuxtPlugin({
  setup(nuxtApp) {
    ogImageCanonicalUrls(nuxtApp);
  }
});
const route_rule_og_image_server_yrHfzNQxtCKZyHaGhWqsbaa4V0Y5WoBOo3_wqkmh41k = /* @__PURE__ */ defineNuxtPlugin({
  setup(nuxtApp) {
    routeRuleOgImage(nuxtApp);
  }
});
const robot_meta_server_bRHpso_4KN_Ec3RJzqCvbuvfZsNOeE_4TgpL8dCNuwk = /* @__PURE__ */ defineNuxtPlugin({
  setup() {
    const event = useRequestEvent();
    const ctx = event?.context?.robots;
    event?.context?.robotsProduction;
    if (!ctx)
      return;
    useHead({
      meta: [
        {
          "name": "robots",
          "content": () => ctx.rule || "",
          "data-hint": () => void 0,
          "data-production-content": () => void 0
        }
      ]
    });
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
function minifyJS(code) {
  let result = "";
  let i = 0;
  const len = code.length;
  while (i < len) {
    const ch = code[i];
    if (ch === "'" || ch === '"' || ch === "`") {
      const quote = ch;
      result += ch;
      i++;
      while (i < len && code[i] !== quote) {
        if (code[i] === "\\") {
          result += code[i++];
        }
        result += code[i++];
      }
      if (i < len)
        result += code[i++];
    } else if (ch === "/" && code[i + 1] === "/") {
      i += 2;
      while (i < len && code[i] !== "\n")
        i++;
    } else if (ch === "/" && code[i + 1] === "*") {
      i += 2;
      while (i < len && !(code[i] === "*" && code[i + 1] === "/"))
        i++;
      i += 2;
    } else if (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
      let hasNewline = false;
      while (i < len && (code[i] === " " || code[i] === "	" || code[i] === "\n" || code[i] === "\r")) {
        if (code[i] === "\n")
          hasNewline = true;
        i++;
      }
      const prev = result.at(-1);
      const next = code[i];
      if (hasNewline && prev && next && prev !== "{" && prev !== "}" && prev !== ";" && next !== "}" && next !== ";")
        result += "\n";
      else if (prev && next && isIdentChar(prev) && isIdentChar(next))
        result += " ";
      else if (prev && next && (prev === "+" && next === "+" || prev === "-" && next === "-"))
        result += " ";
    } else {
      result += ch;
      i++;
    }
  }
  return result.trim();
}
function minifyCSS(code) {
  let result = "";
  let i = 0;
  const parenStack = [];
  const len = code.length;
  while (i < len) {
    const ch = code[i];
    if (ch === "'" || ch === '"') {
      const quote = ch;
      result += ch;
      i++;
      while (i < len && code[i] !== quote) {
        if (code[i] === "\\")
          result += code[i++];
        result += code[i++];
      }
      if (i < len)
        result += code[i++];
    } else if (ch === "/" && code[i + 1] === "*") {
      i += 2;
      while (i < len && !(code[i] === "*" && code[i + 1] === "/"))
        i++;
      i += 2;
    } else if (ch === "(") {
      parenStack.push(isSelectorFunctionParen(result));
      result += ch;
      i++;
    } else if (ch === ")") {
      parenStack.pop();
      result += ch;
      i++;
    } else if (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
      while (i < len && (code[i] === " " || code[i] === "	" || code[i] === "\n" || code[i] === "\r"))
        i++;
      const prev = result.at(-1);
      const next = code[i];
      if (next === "!")
        continue;
      if (parenStack.length > 0) {
        const isPunct = parenStack[parenStack.length - 1] ? isCSSPunctuation : isCSSCalcPunctuation;
        if (prev && next && !isPunct(prev) && !isPunct(next))
          result += " ";
      } else if (prev && next && !isCSSPunctuation(prev) && !isCSSPunctuation(next)) {
        result += " ";
      }
    } else if (ch === ";") {
      let j = i + 1;
      while (j < len && (code[j] === " " || code[j] === "	" || code[j] === "\n" || code[j] === "\r"))
        j++;
      if (code[j] === "}") {
        i++;
      } else {
        result += ch;
        i++;
      }
    } else if (ch === "0" && code[i + 1] === "." && (code[i + 2] ?? "") >= "0" && (code[i + 2] ?? "") <= "9") {
      const prev = result.at(-1);
      if (prev && prev >= "0" && prev <= "9") {
        result += ch;
        i++;
      } else {
        i++;
      }
    } else {
      result += ch;
      i++;
    }
  }
  return result.trim();
}
function isIdentChar(ch) {
  return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || ch === "_" || ch === "$";
}
function isCSSBasePunctuation(ch) {
  return ch === "{" || ch === "}" || ch === ";" || ch === ":" || ch === ",";
}
function isCSSPunctuation(ch) {
  return isCSSBasePunctuation(ch) || ch === ">" || ch === "+" || ch === "~";
}
function isCSSCalcPunctuation(ch) {
  return isCSSBasePunctuation(ch) || ch === "*" || ch === "/";
}
function isCSSNameChar(ch) {
  return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch === "-";
}
function isSelectorFunctionParen(result) {
  let j = result.length - 1;
  while (j >= 0 && isCSSNameChar(result[j]))
    j--;
  if (result[j] !== ":")
    return false;
  const name = result.slice(j + 1).toLowerCase();
  return name === "is" || name === "where" || name === "not" || name === "has" || name === "matches" || name === "host" || name === "host-context" || name === "slotted";
}
function minifyJSON(code) {
  return JSON.stringify(JSON.parse(code));
}
const JSON_TYPES = /* @__PURE__ */ new Set(["application/json", "application/ld+json"]);
const SKIP_JS_TYPES = /* @__PURE__ */ new Set(["application/json", "application/ld+json", "speculationrules", "importmap"]);
const minifyScripts_server_vI_uAmhP3_n8myLPfw5_eV1I7D4ANVXFZoE6G_rspLU = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  setup() {
    const head = injectHead();
    if (!head)
      return;
    head.use({
      key: "minify-inline",
      hooks: {
        "ssr:render": ({ tags }) => {
          for (const tag of tags) {
            const content = tag.innerHTML;
            if (!content)
              continue;
            if (tag.tag === "script") {
              const type = tag.props.type;
              if (type && JSON_TYPES.has(type)) {
                try {
                  const minified = minifyJSON(content);
                  if (minified.length < content.length)
                    tag.innerHTML = minified;
                } catch {
                }
                continue;
              }
              if (type && SKIP_JS_TYPES.has(type))
                continue;
              try {
                const minified = minifyJS(content);
                if (minified.length < content.length)
                  tag.innerHTML = minified;
              } catch {
              }
            } else if (tag.tag === "style") {
              try {
                const minified = minifyCSS(content);
                if (minified.length < content.length)
                  tag.innerHTML = minified;
              } catch {
              }
            }
          }
        }
      }
    });
  }
});
const _1_absoluteImageUrls_server_2YTf8dZl0nl5nVc1xW7fV_4mFLM_syJu2DEHHvxD9lg = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  setup() {
    const head = injectHead();
    if (!head)
      return;
    const resolver = createSitePathResolver({
      withBase: true,
      absolute: true,
      canonical: true
    });
    head.use({
      key: "absoluteImageUrls",
      hooks: {
        "tags:resolve": async ({ tags }) => {
          for (const tag of tags) {
            if (tag.tag !== "meta")
              continue;
            if (tag.props.property !== "og:image:url" && tag.props.property !== "og:image" && tag.props.name !== "twitter:image" && tag.props.name !== "twitter:image:src")
              continue;
            if (typeof tag.props.content !== "string" || !tag.props.content.trim() || tag.props.content.startsWith("http") || tag.props.content.startsWith("//"))
              continue;
            tag.props.content = unref(resolver(tag.props.content));
          }
        }
      }
    });
  }
});
const _0_routeRules_3p7F2AZYQSP_eJRsw5nLkf3zyZXPOFcTrXNpZlBwROM = /* @__PURE__ */ defineNuxtPlugin({
  enforce: "post",
  env: { islands: false },
  async setup() {
    let __temp, __restore;
    const head = injectHead();
    if (!head)
      return;
    const { tagPriority } = (/* @__PURE__ */ useRuntimeConfig()).public["seo-utils"];
    const routeRuleState = useState("nuxt-seo-utils:routeRules", () => null);
    {
      const event = useRequestEvent();
      const routeRules = ([__temp, __restore] = executeAsync(() => getRouteRules(event)), __temp = await __temp, __restore(), __temp);
      const rules = routeRules;
      routeRuleState.value = {
        head: rules.head,
        seoMeta: rules.seoMeta
      };
    }
    if (routeRuleState.value) {
      const { head: headInput, seoMeta } = routeRuleState.value;
      if (headInput)
        head.push(headInput);
      if (seoMeta)
        useSeoMeta(seoMeta, { tagPriority });
    }
  }
});
const LOCALE_UNDERSCORE_RE = /_/g;
function applyDefaults() {
  const siteConfig = useSiteConfig({
    resolveRefs: false
  });
  const resolveCurrentLocale = () => {
    const locale = toValue(siteConfig.currentLocale) || toValue(siteConfig.defaultLocale) || "en";
    return locale.replace(LOCALE_UNDERSCORE_RE, "-");
  };
  const head = injectHead();
  head.use(TemplateParamsPlugin);
  const { canonicalQueryWhitelist, canonicalLowercase, tagPriority, separator, titleSeparator } = (/* @__PURE__ */ useRuntimeConfig()).public["seo-utils"];
  const route = useRoute();
  const resolveUrl = createSitePathResolver({ withBase: true, absolute: true });
  const err = /* @__PURE__ */ useError();
  const resolveSeparator = () => toValue(siteConfig.separator) || separator || toValue(siteConfig.titleSeparator) || titleSeparator;
  const resolveTitleSeparator = () => toValue(siteConfig.titleSeparator) || titleSeparator || toValue(siteConfig.separator) || separator;
  const canonicalUrl = computed(() => {
    if (err.value) {
      return false;
    }
    const { query } = route;
    let url = resolveUrl(route.path || "/").value || route.path;
    if (canonicalLowercase) {
      try {
        url = url.toLocaleLowerCase(resolveCurrentLocale());
      } catch {
        url = url.toLowerCase();
      }
    }
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([key]) => canonicalQueryWhitelist.includes(key)).sort(([a], [b]) => a.localeCompare(b))
      // Sort params
    );
    const href = Object.keys(filteredQuery).length ? `${url}?${stringifyQuery(filteredQuery)}` : url;
    return { rel: "canonical", href };
  });
  const minimalPriority = {
    // give nuxt.config values higher priority
    tagPriority: "low"
  };
  const seoMetaPriority = {
    tagPriority
  };
  useHead({
    htmlAttrs: { lang: resolveCurrentLocale },
    templateParams: {
      site: () => siteConfig,
      siteName: () => siteConfig.name,
      separator: resolveSeparator,
      titleSeparator: resolveTitleSeparator
    },
    titleTemplate: () => err.value ? "%s" : "%s %separator %siteName",
    link: [() => canonicalUrl.value]
  }, minimalPriority);
  useSeoMeta({
    ogLocale: () => {
      const locale = resolveCurrentLocale();
      if (locale) {
        const l = locale.replace("-", "_");
        if (l.includes("_")) {
          return l;
        }
      }
      return false;
    }
  }, minimalPriority);
  const seoMeta = {
    ogType: "website",
    ogUrl: () => {
      const url = canonicalUrl.value;
      return url ? url.href : false;
    },
    ogSiteName: siteConfig.name
  };
  if (siteConfig.description)
    useSeoMeta({ description: siteConfig.description }, minimalPriority);
  if (siteConfig.twitter) {
    const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
    seoMeta.twitterCreator = id;
    seoMeta.twitterSite = id;
  }
  useSeoMeta(seoMeta, seoMetaPriority);
}
const defaults_0Sn7xIMAzGkdbab2otVWD8mX4GpY74A3Jy_gY_4_qYk = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-seo:defaults",
  order: 999,
  env: {
    islands: false
  },
  setup() {
    applyDefaults();
  }
});
const plugins = [
  _0_siteConfig_tU0SxKrPeVRXWcGu2sOnIfhNDbYiKNfDCvYZhRueG0Q,
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  siteConfig_vuqmRkLAUZxQvb5pvUwT3uUdVggfjhj1m5v7Pb6IE0w,
  inferSeoMetaPlugin_KsEotgC9NJyW_guR_3z04hFN8TI2h5dgP8bzHmpMm5o,
  titles_Fth_MAhm7dgpxeTaMXibYXbcCjegjWK3QH9gKvbTRVg,
  defaults_ZjgoYqsIrjWNaJMfDhci2B0eoNnvY4CDsoscm0L1fE0,
  init_Ks1wcI1vuv3K3FXG7iAYRqIWlPli19G_eByed0tsXe0,
  og_image_canonical_urls_server_2uCBKzWxjEK91fSFBdBNPEWilWXRzR66cHJvjIi4FGA,
  route_rule_og_image_server_yrHfzNQxtCKZyHaGhWqsbaa4V0Y5WoBOo3_wqkmh41k,
  robot_meta_server_bRHpso_4KN_Ec3RJzqCvbuvfZsNOeE_4TgpL8dCNuwk,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  minifyScripts_server_vI_uAmhP3_n8myLPfw5_eV1I7D4ANVXFZoE6G_rspLU,
  _1_absoluteImageUrls_server_2YTf8dZl0nl5nVc1xW7fV_4mFLM_syJu2DEHHvxD9lg,
  _0_routeRules_3p7F2AZYQSP_eJRsw5nLkf3zyZXPOFcTrXNpZlBwROM,
  defaults_0Sn7xIMAzGkdbab2otVWD8mX4GpY74A3Jy_gY_4_qYk
];
const _sfc_main$5 = {
  __name: "SiteHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const isScrolled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<header${ssrRenderAttrs(mergeProps({
        id: "header",
        class: { scrolled: isScrolled.value }
      }, _attrs))}><div class="container"><nav>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "nav-logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="logo-name"${_scopeId}>Виктория Терехова</span><span class="logo-sub"${_scopeId}>Психолог · Онлайн</span>`);
          } else {
            return [
              createVNode("span", { class: "logo-name" }, "Виктория Терехова"),
              createVNode("span", { class: "logo-sub" }, "Психолог · Онлайн")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="nav-links"><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/about" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`О психологе`);
          } else {
            return [
              createTextVNode("О психологе")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/rpp" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`РПП`);
          } else {
            return [
              createTextVNode("РПП")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/personal" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Личная терапия`);
          } else {
            return [
              createTextVNode("Личная терапия")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/family" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Семейная терапия`);
          } else {
            return [
              createTextVNode("Семейная терапия")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/articles" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Статьи`);
          } else {
            return [
              createTextVNode("Статьи")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="nav-cta">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/#contact",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Записаться`);
          } else {
            return [
              createTextVNode("Записаться")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="burger" aria-label="Открыть меню"><span></span><span></span><span></span></button></div></nav></div></header>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$5, { __name: "SiteHeader" });
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const DEFAULT_SITE_DATA = {
  visits: 0,
  heroTitle: "Бережная психологическая помощь <em>онлайн</em>",
  heroDesc: "Помогаю справиться с тревогой, выгоранием, выстроить личные границы и наладить отношения с собой и близкими.",
  heroImage: "",
  aboutTitle: "Виктория Терехова",
  aboutP1: "Приветствую! Я дипломированный практикующий психолог-консультант. Работаю в интегративном подходе, сочетая методы когнитивно-поведенческой (КПТ) и гештальт-терапии.",
  aboutP2: "Моя цель — создать для вас бережное и безопасное пространство, где вы сможете открыто говорить о своих переживаниях, исследовать свои паттерны и найти внутренние ресурсы для качественных изменений в жизни.",
  aboutImage: "",
  rppImage: "",
  contactTg: "https://t.me/vika_terekhova",
  contactWa: "https://wa.me/79990000000",
  diplomas: [
    { title: "Высшее профильное образование", image: "" },
    { title: "Специализация КПТ", image: "" },
    { title: "Специализация Гештальт", image: "" }
  ],
  tests: [
    {
      "id": "bulimia",
      "title": "Тест на Булимию",
      "subtitle": "36 вопросов",
      "options": [
        { "text": "Никогда", "value": 1, "reverseValue": 5 },
        { "text": "Редко", "value": 2, "reverseValue": 4 },
        { "text": "Иногда", "value": 3, "reverseValue": 3 },
        { "text": "Часто", "value": 4, "reverseValue": 2 },
        { "text": "Очень часто / Всегда", "value": 5, "reverseValue": 1 }
      ],
      "questions": [
        { "text": "Бывает ли, что вы съедаете очень много за короткое время, чувствуя, что не можете остановиться?", "type": "normal" },
        { "text": "После такого переедания испытываете ли вы вину?", "type": "reverse" },
        { "text": "Вызываете ли вы рвоту, чтобы не набрать вес?", "type": "normal" },
        { "text": "Используете ли вы слабительные, мочегонные или клизмы для контроля веса?", "type": "normal" },
        { "text": "Пропускаете ли вы приёмы пищи, чтобы компенсировать переедание?", "type": "reverse" },
        { "text": "Есть ли у вас чувство, что потеря контроля над едой — это «провал» или «слабость»?", "type": "ignore" },
        { "text": "Бывает ли, что вы едите втайне от других?", "type": "reverse" },
        { "text": "Думаете ли вы о еде большую часть дня?", "type": "reverse" },
        { "text": "После приёма пищи чувствуете ли вы себя «плохим человеком» или испытываете слабость?", "type": "normal" },
        { "text": "Боитесь ли вы, что потеря контроля над едой приведёт к сильному набору веса?", "type": "reverse" },
        { "text": "Бывает ли, что вы сознательно ограничиваете еду, чтобы «потом можно было сорваться»?", "type": "ignore" },
        { "text": "После переедания наказываете ли вы себя (например, спортом, голодом или другими мерами)?", "type": "reverse" },
        { "text": "Замечаете ли, что ваше настроение зависит от того, сколько вы съели?", "type": "reverse" },
        { "text": "Бывает ли, что вы чувствуете отвращение к себе после еды?", "type": "reverse" },
        { "text": "Ощущаете ли вы, что еда управляет вашей жизнью?", "type": "reverse" },
        { "text": "Чувствуете ли вы давление со стороны других — быть худым(ой)?", "type": "reverse" },
        { "text": "Бывает ли, что вы покупаете еду специально для «срывов»?", "type": "reverse" },
        { "text": "После переедания чувствуете ли вы физическую боль или вздутие?", "type": "normal" },
        { "text": "Случалось ли, что вы испытывали облегчение после рвоты?", "type": "ignore" },
        { "text": "Часто ли вы сравниваете своё тело с другими и чувствуете себя хуже?", "type": "ignore" },
        { "text": "Ограничиваете ли вы приёмы пищи, даже когда голодны?", "type": "reverse" },
        { "text": "Чувствуете ли вы, что контроль над едой даёт вам чувство силы или порядка?", "type": "normal" },
        { "text": "Бывает ли, что вы думаете: «Я заслужил(а) еду» или «не заслужил(а)»?", "type": "reverse" },
        { "text": "Есть ли у вас периоды строгих диет, сменяющихся перееданием?", "type": "normal" },
        { "text": "После переедания избегали ли вы общения, чтобы никто не заметил?", "type": "normal" },
        { "text": "Испытываете ли вы страх, что не сможете остановиться, если начнёте есть?", "type": "reverse" },
        { "text": "Замечали ли вы, что переедаете, когда чувствуете стресс, грусть или тревогу?", "type": "ignore" },
        { "text": "Чувствуете ли вы облегчение или «онемение» во время переедания?", "type": "reverse" },
        { "text": "Бывает ли, что вы едите быстро, почти не замечая вкус?", "type": "ignore" },
        { "text": "После переедания обещаете ли вы себе «начать заново» или «с понедельника всё исправить»?", "type": "reverse" },
        { "text": "Скрываете ли вы количество съеденной еды от других?", "type": "ignore" },
        { "text": "Часто ли вы чувствуете, что не контролируете, сколько съедаете?", "type": "reverse" },
        { "text": "Испытываете ли вы стыд, когда другие видят, как вы едите?", "type": "normal" },
        { "text": "Изменилось ли ваше отношение к еде с тех пор, как вы стали ограничивать себя?", "type": "normal" },
        { "text": "Есть ли у вас ощущение, что без контроля над едой вы потеряете контроль над жизнью?", "type": "reverse" },
        { "text": "Ощущаете ли вы, что еда помогает вам справляться с эмоциями?", "type": "ignore" }
      ],
      "results": [
        {
          "max": 49,
          "text": "<b>Отсутствие риска булимии</b><br>Симптомы булимии либо полностью отсутствуют, либо выражены крайне слабо. У вас нет регулярных циклов переедания и последующего компенсаторного поведения (вызывание рвоты, слабительные, изнурительный спорт). Беспокойство о весе и внешности не доминирует в мышлении, контроль над пищевым поведением находится в норме.<br><br><i>Рекомендации: поддерживайте сбалансированное питание и здоровый образ жизни. Следите за своим эмоциональным состоянием. При желании можно повторять тест раз в несколько месяцев для отслеживания динамики.</i>"
        },
        {
          "max": 103,
          "text": "<b>Результат ниже клинического порога булимии (отдельные признаки)</b><br>Вы можете замечать некоторые тревожные симптомы (периодические переедания, беспокойство из-за веса или попытки компенсировать съеденное), но они пока не достигли клинического уровня. Это хорошая точка, чтобы обратить внимание на свои отношения с едой сейчас, пока паттерны не закрепились сильнее.<br><br><i>Рекомендации: постарайтесь не использовать строгие ограничения или очистительные процедуры. Прислушивайтесь к сигналам голода и насыщения, доверяйте своим ощущениям. Если симптомы беспокоят вас субъективно, полезно проконсультироваться со специалистом.</i>"
        },
        {
          "max": 999,
          "text": "<b>Высокий риск булимии</b><br>Результаты указывают на высокую вероятность нервной булимии. Скорее всего, вы испытываете частые циклы неконтролируемого переедания и компенсаторного поведения (вызывание рвоты, прием слабительных/мочегонных, чрезмерные тренировки или голодание), а также сильную озабоченность весом и фигурой. Это серьезное состояние, с которым необходимо и успешно работают специалисты.<br><br><i>Рекомендации: важно незамедлительно обратиться за профессиональной поддержкой к специалисту (психологу по РПП, психотерапевту или психиатру). Исключите самолечение и строгие диеты, которые только ухудшают ситуацию, и постарайтесь подключить поддержку близких людей.</i>"
        }
      ]
    },
    {
      "id": "compulsive",
      "title": "Тест на Компульсивное переедание",
      "subtitle": "16 вопросов",
      "options": [
        { "text": "Вариант 1 (0 баллов)", "value": 0, "reverseValue": 3 },
        { "text": "Вариант 2 (1 балл)", "value": 1, "reverseValue": 2 },
        { "text": "Вариант 3 (2 балла)", "value": 2, "reverseValue": 1 },
        { "text": "Вариант 4 (3 балла)", "value": 3, "reverseValue": 0 }
      ],
      "questions": [
        {
          "text": "Контроль над едой",
          "type": "normal",
          "options": [
            { "text": "Я почти всегда контролирую, сколько я ем", "value": 0 },
            { "text": "Иногда теряю контроль", "value": 1 },
            { "text": "Часто теряю контроль", "value": 2 },
            { "text": "Почти всегда ем без контроля", "value": 3 }
          ]
        },
        {
          "text": "Переедание",
          "type": "normal",
          "options": [
            { "text": "Я редко ем слишком много", "value": 0 },
            { "text": "Иногда ем больше, чем нужно", "value": 1 },
            { "text": "Часто переедаю", "value": 2 },
            { "text": "Очень часто переедаю большими объёмами", "value": 3 }
          ]
        },
        {
          "text": "Быстрый темп еды",
          "type": "normal",
          "options": [
            { "text": "Ем спокойно и медленно", "value": 0 },
            { "text": "Иногда ем слишком быстро", "value": 1 },
            { "text": "Часто ем очень быстро", "value": 2 },
            { "text": "Почти всегда ем поспешно", "value": 3 }
          ]
        },
        {
          "text": "Тайное переедание",
          "type": "normal",
          "options": [
            { "text": "Я не скрываю, что ем", "value": 0 },
            { "text": "Иногда стыжусь есть на людях", "value": 1 },
            { "text": "Часто ем тайком", "value": 2 },
            { "text": "Почти всегда переедаю в одиночестве", "value": 3 }
          ]
        },
        {
          "text": "Еда без голода",
          "type": "normal",
          "options": [
            { "text": "Почти всегда ем только при голоде", "value": 0 },
            { "text": "Иногда ем просто так", "value": 1 },
            { "text": "Часто ем из-за эмоций", "value": 2 },
            { "text": "Почти всегда ем, когда не голоден(а)", "value": 3 }
          ]
        },
        {
          "text": "Ощущение наполненности",
          "type": "normal",
          "options": [
            { "text": "Останавливаюсь вовремя", "value": 0 },
            { "text": "Иногда ем до переполнения", "value": 1 },
            { "text": "Часто ем до сильного дискомфорта", "value": 2 },
            { "text": "Почти всегда ем до боли и тошноты", "value": 3 }
          ]
        },
        {
          "text": "Мысли о еде",
          "type": "normal",
          "options": [
            { "text": "Думаю о еде только перед приёмом пищи", "value": 0 },
            { "text": "Иногда зацикливаюсь на еде", "value": 1 },
            { "text": "Часто думаю о еде", "value": 2 },
            { "text": "Еда занимает большую часть мыслей", "value": 3 }
          ]
        },
        {
          "text": "Эпизоды переедания",
          "type": "normal",
          "options": [
            { "text": "Почти никогда", "value": 0 },
            { "text": "1–2 раза в месяц", "value": 1 },
            { "text": "1–2 раза в неделю", "value": 2 },
            { "text": "3+ раз в неделю", "value": 3 }
          ]
        },
        {
          "text": "Контроль после начала еды",
          "type": "normal",
          "options": [
            { "text": "Легко остановиться", "value": 0 },
            { "text": "Иногда сложно", "value": 1 },
            { "text": "Часто трудно прекратить", "value": 2 },
            { "text": "Почти никогда не могу остановиться", "value": 3 }
          ]
        },
        {
          "text": "Эмоции после еды",
          "type": "normal",
          "options": [
            { "text": "Чувствую себя нормально", "value": 0 },
            { "text": "Иногда виню себя", "value": 1 },
            { "text": "Часто испытываю стыд и вину", "value": 2 },
            { "text": "Почти всегда ненавижу себя после переедания", "value": 3 }
          ]
        },
        {
          "text": "Отношение к телу",
          "type": "normal",
          "options": [
            { "text": "В целом доволен(на) телом", "value": 0 },
            { "text": "Иногда переживаю из-за веса", "value": 1 },
            { "text": "Часто недоволен(на) собой", "value": 2 },
            { "text": "Очень переживаю из-за формы тела", "value": 3 }
          ]
        },
        {
          "text": "Попытки ограничивать еду",
          "type": "normal",
          "options": [
            { "text": "Ем без особых ограничений", "value": 0 },
            { "text": "Иногда придерживаюсь диеты", "value": 1 },
            { "text": "Часто ограничиваю себя", "value": 2 },
            { "text": "Постоянно строгий контроль / диеты", "value": 3 }
          ]
        },
        {
          "text": "Стресс — еда",
          "type": "normal",
          "options": [
            { "text": "Почти никогда не ем из-за стресса", "value": 0 },
            { "text": "Иногда", "value": 1 },
            { "text": "Часто", "value": 2 },
            { "text": "Почти всегда", "value": 3 }
          ]
        },
        {
          "text": "Стыд за аппетит",
          "type": "normal",
          "options": [
            { "text": "Мне комфортно с тем, как я ем", "value": 0 },
            { "text": "Иногда стыдно за свой аппетит", "value": 1 },
            { "text": "Часто стыдно", "value": 2 },
            { "text": "Почти всегда скрываю свой аппетит", "value": 3 }
          ]
        },
        {
          "text": "Планирование переедания",
          "type": "normal",
          "options": [
            { "text": "Никогда не планирую заранее", "value": 0 },
            { "text": "Иногда думаю, что можно «оторваться»", "value": 1 },
            { "text": "Часто планирую большие перекусы", "value": 2 },
            { "text": "Почти всегда заранее готовлюсь к перееданию", "value": 3 }
          ]
        },
        {
          "text": "Желание быть худее",
          "type": "normal",
          "options": [
            { "text": "Не стремлюсь худеть", "value": 0 },
            { "text": "Иногда хочу быть худее", "value": 1 },
            { "text": "Часто чувствую давление похудеть", "value": 2 },
            { "text": "Почти всегда ненавижу свой лишний вес", "value": 3 }
          ]
        }
      ],
      "results": [
        {
          "max": 17,
          "text": "<b>Ваш результат ниже порогового значения для компульсивного переедания</b><br>Ваше пищевое поведение в целом сбалансировано, вы не испытываете частых приступов неконтролируемого переедания. <br><br><i>Рекомендации: даже при хорошем результате важно доверять своим ощущениям. Если вас всё же периодически беспокоят какие-то аспекты отношений с едой или телом, не игнорируйте их и позаботьтесь о себе.</i>"
        },
        {
          "max": 26,
          "text": "<b>У вас есть признаки компульсивного переедания</b><br>Возможно, вы замечаете периодические приступы переедания, потерю контроля над едой, использование еды для управления эмоциями или сильное чувство вины после приемов пищи. Рекомендуется обратить внимание на эти сигналы и начать работу над пищевым поведением.<br><br><i>Рекомендации: при компульсивном переедании важно работать с его психологическими причинами и эмоциями, а не бороться с самой едой. Помогает регулярное сбалансированное питание (3 приёма пищи и 2 перекуса с интервалом 3-4 часа), так как голод является главным триггером срывов. Также полезно вести дневник эмоциональных триггеров.</i>"
        },
        {
          "max": 999,
          "text": "<b>Результаты указывают на выраженное компульсивное переедание</b><br>Вы испытываете частые приступы неконтролируемого переедания, сильную вину и стыд после еды, еда стала основным способом справляться с эмоциями и стрессом. Это серьезно влияет на качество жизни, но компульсивное переедание успешно лечится.<br><br><i>Рекомендации: в первую очередь рекомендуется обратиться за помощью к специалисту по расстройствам пищевого поведения. Помните, что компульсивное переедание — это не вопрос слабой воли, а поведенческий паттерн. Важными шагами являются налаживание регулярного питания без ограничений и отказ от самостоятельных жёстких диет, которые обычно только ухудшают состояние.</i>"
        }
      ]
    },
    {
      "id": "rpp-general",
      "title": "Общий тест на РПП (EAT-26)",
      "subtitle": "26 вопросов",
      "options": [
        { "text": "Всегда", "value": 3, "reverseValue": 0 },
        { "text": "Очень часто", "value": 2, "reverseValue": 0 },
        { "text": "Часто", "value": 1, "reverseValue": 0 },
        { "text": "Иногда", "value": 0, "reverseValue": 1 },
        { "text": "Редко", "value": 0, "reverseValue": 2 },
        { "text": "Никогда", "value": 0, "reverseValue": 3 }
      ],
      "questions": [
        { "text": "Меня пугает мысль о наборе лишнего веса", "type": "normal" },
        { "text": "Я стараюсь избегать приёма пищи, даже когда голоден(а)", "type": "normal" },
        { "text": "Меня беспокоят постоянные мысли о еде", "type": "normal" },
        { "text": "У меня бывают приступы переедания, когда не могу остановиться", "type": "normal" },
        { "text": "Я разрезаю пищу на очень маленькие кусочки", "type": "normal" },
        { "text": "Я знаю калорийность большинства продуктов, которые ем", "type": "normal" },
        { "text": "Я избегаю пищи, содержащей углеводы (хлеб, макароны, картофель)", "type": "normal" },
        { "text": "Люди вокруг считают, что я должен(на) есть больше", "type": "normal" },
        { "text": "После еды мне иногда хочется вызвать рвоту", "type": "normal" },
        { "text": "Я чувствую вину после приёма пищи", "type": "normal" },
        { "text": "Меня беспокоит, что я слишком полный(ая)", "type": "normal" },
        { "text": "Во время занятий спортом я думаю о количестве сожжённых калорий", "type": "normal" },
        { "text": "Другие считают меня слишком худым(ой)", "type": "normal" },
        { "text": "Меня тревожит количество жира на теле", "type": "normal" },
        { "text": "Я ем медленнее, чем большинство людей", "type": "normal" },
        { "text": "Я избегаю сладкого", "type": "normal" },
        { "text": "Я выбираю только низкокалорийные или «диетические» продукты", "type": "normal" },
        { "text": "Мне кажется, что еда контролирует мою жизнь", "type": "normal" },
        { "text": "Я тщательно контролирую, сколько я ем", "type": "normal" },
        { "text": "Люди иногда уговаривают меня есть больше", "type": "normal" },
        { "text": "Я трачу слишком много времени на мысли о еде", "type": "normal" },
        { "text": "Мне некомфортно есть сладости или десерты", "type": "normal" },
        { "text": "Я стараюсь соблюдать диету", "type": "normal" },
        { "text": "Мне нравится ощущение пустого желудка", "type": "normal" },
        { "text": "Мне нравится пробовать калорийные блюда", "type": "reverse" },
        { "text": "После еды иногда возникает желание вырвать", "type": "normal" }
      ],
      "results": [
        {
          "max": 19,
          "text": "<b>У вас здоровые отношения с едой</b><br>Похоже, еда для вас — это просто еда, без лишнего напряжения. Вы не испытываете чрезмерного контроля, вины или одержимости едой и весом.<br><br><i>Рекомендации: прислушивайтесь к сигналам голода и насыщения, ешьте разнообразно без деления на «хорошие» и «плохие» продукты, поддерживайте позитивное отношение к телу. Если вас всё же беспокоят какие-то аспекты отношений с едой или телом, доверяйте своим ощущениям.</i>"
        },
        {
          "max": 29,
          "text": "<b>Умеренный уровень риска</b><br>Возможны отдельные тревожные признаки (например, озабоченность весом, пищевыми ограничениями, контроль и тревога вокруг еды). Это не говорит о расстройстве, но показывает, что еда постепенно становится эмоционально заряженной темой.<br><br><i>Рекомендации: четко прислушивайтесь к сигналам голода и насыщения, питайтесь регулярно и разнообразно, избегайте жёстких запретов.</i>"
        },
        {
          "max": 999,
          "text": "<b>Есть признаки РПП</b><br>Ваши результаты показывают, что отношения с едой стали источником напряжения и тревоги. Возможно, еда и мысли о весе занимают больше места в жизни, чем хотелось бы. Контроль мог приносить удовлетворение в начале, но со временем появились чувство вины, стыд или другие тревожные признаки.<br><br><i>Рекомендации: полезно вести дневник эмоций и еды (записывать чувства до и после, а не калории), отслеживать частоту проверок тела (зеркало, взвешивания) и рассмотреть возможность консультации со специалистом по РПП.</i>"
        }
      ]
    },
    {
      "id": "food-behavior",
      "title": "Тест на Пищевое поведение (DEBQ)",
      "subtitle": "33 вопроса",
      "options": [
        { "text": "Никогда", "value": 1, "reverseValue": 5 },
        { "text": "Редко", "value": 2, "reverseValue": 4 },
        { "text": "Иногда", "value": 3, "reverseValue": 3 },
        { "text": "Часто", "value": 4, "reverseValue": 2 },
        { "text": "Очень часто / всегда", "value": 5, "reverseValue": 1 }
      ],
      "questions": [
        { "text": "Если ваш вес начинает нарастать, вы едите меньше обычного?", "type": "normal" },
        { "text": "Стараетесь ли вы есть меньше, чем вам хотелось бы во время обычного приёма пищи?", "type": "normal" },
        { "text": "Часто ли вы отказываетесь от еды и питья из-за того, что беспокоитесь о своём весе?", "type": "normal" },
        { "text": "Аккуратно ли вы контролируете количество съеденного?", "type": "normal" },
        { "text": "Выбираете ли вы пищу преднамеренно, чтобы похудеть?", "type": "normal" },
        { "text": "Если вы переели, будете ли вы на следующий день есть меньше?", "type": "normal" },
        { "text": "Стараетесь ли вы есть меньше, чтобы не поправиться?", "type": "normal" },
        { "text": "Часто ли вы стараетесь не есть между обычными приёмами пищи из-за того, что следите за своим весом?", "type": "normal" },
        { "text": "Часто ли вы стараетесь не есть вечером из-за того, что следите за своим весом?", "type": "normal" },
        { "text": "Имеет ли значение ваш вес, когда вы едите?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы раздражены?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вам нечего делать?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы подавлены или обескуражены?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вам одиноко?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вас кто-либо подвёл?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вам что-либо препятствует, встаёт на вашем пути, или нарушаются ваши планы, либо что-то не удаётся?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы предчувствуете какую-либо неприятность?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы встревожены, озабочены или напряжены?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда «всё не так», «всё валится из рук»?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы испуганы?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы разочарованы, когда разрушены ваши надежды?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы взволнованы, расстроены?", "type": "normal" },
        { "text": "Возникает ли у вас желание есть, когда вы скучаете, утомлены, неспокойны?", "type": "normal" },
        { "text": "Едите ли вы больше чем обычно, когда еда вкусная?", "type": "normal" },
        { "text": "Если еда хорошо выглядит и хорошо пахнет, едите ли вы больше обычного?", "type": "normal" },
        { "text": "Если вы видите вкусную пищу и чувствуете её запах, едите ли вы больше обычного?", "type": "normal" },
        { "text": "Если у вас есть что-либо вкусное, съедите ли вы это немедленно?", "type": "normal" },
        { "text": "Если вы проходите мимо булочной (кондитерской), хочется ли вам купить что-либо вкусное?", "type": "normal" },
        { "text": "Если вы проходите мимо закусочной или кафе, хочется ли вам купить что-либо вкусное?", "type": "normal" },
        { "text": "Если вы видите, как едят другие, появляется ли у вас желание есть?", "type": "normal" },
        { "text": "Можете ли вы остановиться, если едите что-либо вкусное?", "type": "reverse" },
        { "text": "Едите ли вы больше чем обычно в компании (когда едят другие)?", "type": "normal" },
        { "text": "Когда вы готовите пищу, часто ли вы её пробуете?", "type": "normal" }
      ],
      "scales": [
        {
          "name": "Ограничительное пищевое поведение",
          "range": [0, 9],
          "divider": 10,
          "results": [
            { "max": 2, "text": "<b>Низкий уровень</b><br>Это означает, что вы, скорее всего, не склонны к жёстким ограничениям, строгим диетам и постоянному контролю питания ради веса. Еда не воспринимается как зона постоянных запретов, а питание может быть более гибким и спокойным.<br><br><i>Рекомендация: сохраняйте гибкий подход к питанию. Важно, чтобы отсутствие ограничений сочеталось с вниманием к насыщению, регулярности питания и потребностям организма.</i>" },
            { "max": 3.5, "text": "<b>Умеренный уровень</b><br>Это означает, что вы можете периодически контролировать питание, ограничивать порции, выбирать продукты с учётом веса или стараться есть меньше, чем хотелось бы. Такой контроль сам по себе не всегда является проблемой, но при усилении может повышать напряжение вокруг еды.<br><br><i>Рекомендация: обратите внимание, не возникает ли у вас цикл «ограничение → срыв → вина → новое ограничение». Если вы замечаете такой сценарий, лучше смещать фокус с жёсткого контроля на регулярное, достаточное и более гибкое питание.</i>" },
            { "max": 5, "text": "<b>Высокий уровень</b><br>Это означает, что контроль питания, ограничения, диеты или страх набора веса могут занимать значимое место в вашей жизни. Часто при выраженном ограничительном поведении еда делится на «можно» и «нельзя», а любые отступления могут вызывать тревогу, вину или желание снова усилить контроль.<br><br><i>Рекомендация: важно быть осторожнее с жёсткими диетами и запретами. Сильные ограничения могут усиливать тягу к еде и повышать риск перееданий. Полезно работать над более гибким отношением к питанию и при необходимости обратиться к специалисту, который работает с пищевым поведением.</i>" }
          ]
        },
        {
          "name": "Эмоциогенное пищевое поведение",
          "range": [10, 22],
          "divider": 13,
          "results": [
            { "max": 2, "text": "<b>Низкий уровень</b><br>Это означает, что эмоции редко становятся для вас причиной переедания. Вы, скорее всего, достаточно хорошо различаете физический голод и эмоциональное желание поесть. В стрессовых или неприятных ситуациях еда не является для вас основным способом справляться с переживаниями.<br><br><i>Рекомендация: продолжайте прислушиваться к сигналам голода и насыщения. Если иногда появляется желание «заесть» эмоции, попробуйте замечать, что именно его запускает: усталость, тревога, скука, раздражение или потребность в отдыхе.</i>" },
            { "max": 3.5, "text": "<b>Умеренный уровень</b><br>Это означает, что в некоторых ситуациях эмоции могут влиять на ваше питание. Желание поесть может появляться не только из-за физического голода, но и на фоне стресса, тревоги, скуки, одиночества, раздражения или усталости. Такой паттерн может усиливаться в периоды напряжения.<br><br><i>Рекомендация: начните отслеживать связь между эмоциями и едой. Перед едой можно задавать себе вопрос: «Я сейчас физически голодна/голоден или мне нужно снять напряжение?» Это поможет мягко отделять голод от эмоциональной потребности.</i>" },
            { "max": 5, "text": "<b>Высокий уровень</b><br>Это означает, что еда часто может использоваться как способ справиться с эмоциями, напряжением, тревогой, одиночеством, скукой или усталостью. При таком типе пищевого поведения человеку бывает сложно остановиться, потому что еда выполняет не только физиологическую, но и эмоциональную функцию.<br><br><i>Рекомендация: важно работать не только с питанием, но и с причинами эмоционального напряжения. Может помочь дневник эмоций и триггеров: записывать, что произошло до эпизода переедания, какую эмоцию вы испытывали и какая потребность за этим стояла. Если этот паттерн мешает качеству жизни, стоит обратиться к специалисту по пищевому поведению.</i>" }
          ]
        },
        {
          "name": "Экстернальное пищевое поведение",
          "range": [23, 32],
          "divider": 10,
          "results": [
            { "max": 2, "text": "<b>Низкий уровень</b><br>Это означает, что внешний вид еды, запах, реклама, доступность продуктов или то, что едят другие люди, редко становятся для вас сильным стимулом к еде. Вы, скорее всего, чаще ориентируетесь на внутренние сигналы голода и насыщения.<br><br><i>Рекомендация: продолжайте опираться на телесные сигналы. Если иногда хочется съесть что-то «за компанию» или из-за красивого вида еды, это нормально. Важно лишь замечать, насколько это связано с реальным голодом.</i>" },
            { "max": 3.5, "text": "<b>Умеренный уровень</b><br>Это означает, что внешние стимулы могут периодически влиять на ваше питание. Вид вкусной еды, запах выпечки, наличие сладкого дома, реклама или еда у других людей могут вызывать желание поесть даже тогда, когда физического голода почти нет.<br><br><i>Рекомендация: попробуйте замечать, какие внешние стимулы чаще всего запускают желание есть. Может помочь правило паузы: перед едой спросить себя, «я действительно голодна/голоден или меня привлёк вид, запах, доступность еды?»</i>" },
            { "max": 5, "text": "<b>Высокий уровень</b><br>Это означает, что питание сильно зависит от внешних стимулов: вида еды, запаха, доступности продуктов, красивой подачи, рекламы или ситуации, когда рядом едят другие люди. В таких случаях желание поесть может появляться автоматически, даже без физического голода.<br><br><i>Рекомендация: важно не обвинять себя, а работать с окружающей средой и привычками. Может помочь более осознанная организация пространства: не держать триггерные продукты на виду, планировать приёмы пищи заранее, делать паузу перед импульсивным перекусом и учиться отличать внешний стимул от настоящего голода.</i>" }
          ]
        }
      ]
    },
    {
      "id": "anxiety",
      "title": "Тест на Тревожность (GAD-7)",
      "subtitle": "7 вопросов",
      "options": [
        { "text": "Совсем не беспокоило", "value": 0, "reverseValue": 3 },
        { "text": "Несколько дней", "value": 1, "reverseValue": 2 },
        { "text": "Более половины дней", "value": 2, "reverseValue": 1 },
        { "text": "Почти каждый день", "value": 3, "reverseValue": 0 }
      ],
      "questions": [
        { "text": "Вы чувствовали нервозность, тревогу или сильное напряжение?", "type": "normal" },
        { "text": "Вы не могли остановить или контролировать беспокойство?", "type": "normal" },
        { "text": "Вы слишком сильно беспокоились по разным поводам?", "type": "normal" },
        { "text": "Вам было трудно расслабиться?", "type": "normal" },
        { "text": "Вы были настолько беспокойны, что было трудно усидеть на месте?", "type": "normal" },
        { "text": "Вы легко раздражались или становились вспыльчивыми?", "type": "normal" },
        { "text": "Вы испытывали страх, будто может случиться что-то ужасное?", "type": "normal" }
      ],
      "results": [
        {
          "max": 4,
          "text": "<b>Минимальная тревожность</b><br>Ваш результат указывает на минимальный уровень тревожности. На данный момент выраженных тревожных симптомов по результатам теста не выявлено. Возможно, тревога появляется ситуативно, но она, скорее всего, не оказывает сильного влияния на повседневную жизнь, сон, концентрацию и общее самочувствие.<br><br><i>Рекомендация: продолжайте заботиться о базовом состоянии: сон, регулярное питание, отдых, физическая активность и снижение перегрузки. Если тревога всё же беспокоит вас субъективно, даже при низком результате, стоит прислушаться к себе.</i>"
        },
        {
          "max": 9,
          "text": "<b>Лёгкая тревожность</b><br>Ваш результат указывает на лёгкий уровень тревожности. Это означает, что у вас могут быть отдельные тревожные симптомы: беспокойство, напряжение, трудности с расслаблением, раздражительность или ощущение, что сложно остановить поток тревожных мыслей. Пока уровень тревоги не выглядит высоким, но уже может влиять на качество отдыха и эмоциональное состояние.<br><br><i>Рекомендация: обратите внимание, в каких ситуациях тревога усиливается. Может помочь дневник тревоги, дыхательные техники, снижение информационной нагрузки, режим сна и регулярные паузы на восстановление.</i>"
        },
        {
          "max": 14,
          "text": "<b>Умеренная тревожность</b><br>Ваш результат указывает на умеренный уровень тревожности. Тревожные симптомы выражены заметно и могут влиять на сон, концентрацию, настроение, телесное напряжение и повседневные дела. На этом уровне тревога может становиться не просто реакцией на стресс, а устойчивым состоянием, которое требует внимания.<br><br><i>Рекомендация: желательно не игнорировать этот результат. Подумайте о консультации психолога, психотерапевта или врача, особенно если тревога длится несколько недель, мешает работе, отношениям, отдыху или сопровождается телесными симптомами.</i>"
        },
        {
          "max": 21,
          "text": "<b>Тяжёлая тревожность</b><br>Ваш результат указывает на высокий уровень тревожности. Симптомы тревоги выражены сильно и могут значительно снижать качество жизни. Тревожные мысли, напряжение, раздражительность, трудности с расслаблением, проблемы со сном или ощущение постоянной угрозы могут присутствовать большую часть времени.<br><br><i>Рекомендация: в такой ситуации важно получить профессиональную поддержку. Рекомендуется обратиться к психологу, психотерапевту или врачу-психиатру для более точной оценки состояния и подбора помощи. Этот результат не означает диагноз, но показывает, что тревогу важно не оставлять без внимания.</i>"
        }
      ]
    },
    {
      "id": "test-body",
      "title": "Опросник образа собственного тела",
      "subtitle": "16 вопросов",
      "options": [
        { "text": "Никогда", "value": 0, "reverseValue": 5 },
        { "text": "Редко", "value": 1, "reverseValue": 4 },
        { "text": "Иногда", "value": 2, "reverseValue": 3 },
        { "text": "Часто", "value": 3, "reverseValue": 2 },
        { "text": "Очень часто", "value": 4, "reverseValue": 1 },
        { "text": "Всегда", "value": 5, "reverseValue": 0 }
      ],
      "questions": [
        { "text": "Я не люблю смотреть на себя в зеркало", "type": "normal" },
        { "text": "Покупка одежды обращает моё внимание на то, как я выгляжу, и потому неприятна", "type": "normal" },
        { "text": "Я не люблю, когда на меня обращено внимание окружающих", "type": "normal" },
        { "text": "Я избегаю ситуаций, в которых окружающие могут увидеть моё тело (например, посещение бассейна, пляжа и т.д.)", "type": "normal" },
        { "text": "Я испытываю стыд за своё тело в присутствии определённых людей", "type": "normal" },
        { "text": "Я не люблю своё тело", "type": "normal" },
        { "text": "Мне кажется, что другие люди должны считать моё тело безобразным", "type": "normal" },
        { "text": "Я чувствую, что друзья и члены моей семьи смущаются при взгляде на меня", "type": "normal" },
        { "text": "Я сравниваю своё тело с другими для того, чтобы убедиться, что они полнее, чем я", "type": "normal" },
        { "text": "Мне сложно получать удовольствие от своей деятельности из-за того, что я испытываю неловкость в связи со своим внешним видом", "type": "normal" },
        { "text": "Я испытываю чувство вины в связи со своим весом", "type": "normal" },
        { "text": "У меня есть негативные мысли, и я самокритична в отношении своего тела и того, как я выгляжу", "type": "normal" },
        { "text": "Мне трудно принимать комплименты по поводу того, как я выгляжу", "type": "normal" },
        { "text": "Когда я смотрюсь в зеркало, то моё внимание сосредоточено преимущественно на тех частях тела, которые нуждаются в улучшении", "type": "normal" },
        { "text": "Я чувствую себя униженной и/или подавленной в присутствии человека, который, по моему мнению, более привлекателен, чем я", "type": "normal" },
        { "text": "Я беспокоюсь о собственном весе", "type": "normal" }
      ],
      "results": [
        {
          "max": 6,
          "text": "<b>Низкий уровень неудовлетворённости собственным телом</b><br>В целом ваше отношение к телу можно считать достаточно спокойным. Возможно, у вас бывают отдельные моменты критики внешности, но они не являются постоянными и, скорее всего, не оказывают сильного влияния на самооценку, питание и повседневную жизнь.<br><br><i>Рекомендации: сохраняйте это спокойное отношение. Помните, что тело меняется в течение жизни, и это естественно.</i>"
        },
        {
          "max": 12,
          "text": "<b>Умеренное напряжение в отношении собственного тела</b><br>Вы можете периодически испытывать недовольство внешностью, сравнивать себя с другими или критично оценивать отдельные части тела. Пока результат находится в допустимых пределах, но важно обращать внимание на то, как мысли о теле влияют на настроение, питание и самооценку.<br><br><i>Рекомендации: старайтесь бережнее относиться к себе в периоды, когда недовольство усиливается. Не забывайте благодарить своё тело за его функции и здоровье.</i>"
        },
        {
          "max": 24,
          "text": "<b>Выраженная неудовлетворённость собственным телом</b><br>Это означает, что отношение к внешности может быть связано с частой критикой себя, переживаниями из-за веса, формы тела или отдельных особенностей внешности. Такое состояние может влиять на уверенность, выбор одежды, питание и желание появляться в общественных местах.<br><br><i>Рекомендации: ведите дневник мыслей о теле. Записывайте критические мысли: «Что я подумал о себе? Сказал бы я это близкому человеку?». Это поможет увидеть, насколько вы строги к себе. Практикуйте нейтральность вместо борьбы: вместо «Я должен полюбить своё тело» → «Моё тело делает для меня много хорошего».</i>"
        },
        {
          "max": 36,
          "text": "<b>Высокий уровень неудовлетворённости собственным телом</b><br>Вероятно, мысли о внешности занимают значимое место и могут вызывать сильное напряжение, стыд, тревогу или желание контролировать тело через жесткие ограничения. Важно отнестись к этому бережно и снизить самокритику.<br><br><i>Рекомендации: ведите дневник мыслей о теле. Записывайте критические суждения и пробуйте заменять их более нейтральными и сострадательными. Практикуйте нейтральность: фокус на функциях тела, а не на его форме.</i>"
        },
        {
          "max": 999,
          "text": "<b>Очень высокий уровень неудовлетворённости собственным телом</b><br>Негативное отношение к телу может заметно снижать качество жизни, самооценку, ухудшать настроение и влиять на пищевое поведение. В такой ситуации особенно важно получить поддержку специалиста, который работает с образом тела, пищевым поведением и самооценкой.<br><br><i>Рекомендации: не оставайтесь с этим один на один. Обратитесь к специалисту (психологу, работающему с темой образа тела). Практикуйте сострадание к себе и старайтесь замечать критический голос как отдельный паттерн, а не абсолютную истину.</i>"
        }
      ]
    }
  ]
};
const SITE_DATA_KEY = "vt_site_data_v7";
const loadInitialData = () => {
  const stored = localStorage.getItem(SITE_DATA_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.tests && parsed.tests.length > 0 && typeof parsed.tests[0].questions[0] === "string") {
        return DEFAULT_SITE_DATA;
      }
      return parsed;
    } catch (e) {
      return DEFAULT_SITE_DATA;
    }
  }
  return DEFAULT_SITE_DATA;
};
const siteData = reactive(loadInitialData());
watch(siteData, (newVal) => {
  localStorage.setItem(SITE_DATA_KEY, JSON.stringify(newVal));
}, { deep: true });
(void 0).addEventListener("storage", (e) => {
  if (e.key === SITE_DATA_KEY && e.newValue) {
    try {
      const parsed = JSON.parse(e.newValue);
      Object.assign(siteData, parsed);
    } catch (err) {
      console.error("Failed to sync siteData across tabs", err);
    }
  }
});
function useSiteData() {
  const saveSiteData = (data) => {
    if (data) {
      Object.assign(siteData, data);
    }
    localStorage.setItem(SITE_DATA_KEY, JSON.stringify(siteData));
  };
  const incrementVisits = () => {
    if (typeof siteData.visits !== "number") {
      siteData.visits = 0;
    }
    siteData.visits++;
    saveSiteData();
  };
  return { siteData, saveSiteData, incrementVisits };
}
const _sfc_main$4 = {
  __name: "SiteFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { siteData: siteData2 } = useSiteData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<footer${ssrRenderAttrs(_attrs)}><div class="container"><div class="footer-inner"><div class="footer-brand"><div class="nav-logo"><span class="logo-name">Виктория Терехова</span><span class="logo-sub">Психолог онлайн</span></div><p style="${ssrRenderStyle({ "margin-top": "16px" })}">Бережная психологическая помощь.</p></div><ul class="footer-col"><h4>Навигация</h4><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/about" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`О психологе`);
          } else {
            return [
              createTextVNode("О психологе")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/rpp" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`РПП`);
          } else {
            return [
              createTextVNode("РПП")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/personal" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Личная терапия`);
          } else {
            return [
              createTextVNode("Личная терапия")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/family" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Семейная терапия`);
          } else {
            return [
              createTextVNode("Семейная терапия")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><ul class="footer-col"><h4>Связаться</h4><li><a${ssrRenderAttr("href", unref(siteData2).contactTg)} target="_blank">Telegram</a></li><li><a${ssrRenderAttr("href", unref(siteData2).contactWa)} target="_blank">WhatsApp</a></li><li><a href="mailto:vika@terekhova.ru">Email</a></li><li>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/#contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Записаться`);
          } else {
            return [
              createTextVNode("Записаться")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="footer-bottom"><span>© 2026 Виктория Терехова. Все права защищены.</span><span>Психолог-консультант · КПТ · Гештальт</span></div></div></footer>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteFooter.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  __name: "TestPrompt",
  __ssrInlineRender: true,
  setup(__props) {
    const showPrompt = ref(false);
    const route = useRoute();
    let timeoutId = null;
    const checkAndStartPrompt = (path) => {
      if (sessionStorage.getItem("testPromptShown")) {
        return;
      }
      if (path === "/" || path.startsWith("/articles")) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (route.path === "/" || route.path.startsWith("/articles")) {
            showPrompt.value = true;
            sessionStorage.setItem("testPromptShown", "true");
          }
        }, 5e3);
      }
    };
    watch(() => route.path, (newPath) => {
      checkAndStartPrompt(newPath);
    });
    const closePrompt = () => {
      if (timeoutId) clearTimeout(timeoutId);
      showPrompt.value = false;
      sessionStorage.setItem("testPromptShown", "true");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      if (showPrompt.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "test-prompt" }, _attrs))} data-v-54cd93fc><button class="prompt-close" data-v-54cd93fc>✕</button><div class="prompt-icon" data-v-54cd93fc>💡</div><div class="prompt-content" data-v-54cd93fc><h4 data-v-54cd93fc>Хотите узнать больше о себе?</h4><p data-v-54cd93fc>Пройдите наши психологические тесты.</p>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/rpp",
          class: "btn btn-primary btn-sm prompt-btn",
          onClick: closePrompt
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Пройти тест`);
            } else {
              return [
                createTextVNode("Пройти тест")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TestPrompt.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-54cd93fc"]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isAdmin = computed(() => route.path.startsWith("/admin"));
    const mobileNavOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SiteHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtPage = __nuxt_component_2;
      const _component_SiteFooter = _sfc_main$4;
      const _component_TestPrompt = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "app-root" }, _attrs))}>`);
      if (!isAdmin.value) {
        _push(ssrRenderComponent(_component_SiteHeader, {
          onOpenMobile: ($event) => mobileNavOpen.value = true
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ open: mobileNavOpen.value }, "mobile-nav"])}"><button class="mobile-nav-close">✕</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        onClick: ($event) => mobileNavOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`О психологе`);
          } else {
            return [
              createTextVNode("О психологе")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rpp",
        onClick: ($event) => mobileNavOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`РПП`);
          } else {
            return [
              createTextVNode("РПП")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/personal",
        onClick: ($event) => mobileNavOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Личная терапия`);
          } else {
            return [
              createTextVNode("Личная терапия")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/family",
        onClick: ($event) => mobileNavOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Семейная терапия`);
          } else {
            return [
              createTextVNode("Семейная терапия")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/articles",
        onClick: ($event) => mobileNavOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Статьи`);
          } else {
            return [
              createTextVNode("Статьи")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/#contact",
        onClick: ($event) => mobileNavOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Записаться`);
          } else {
            return [
              createTextVNode("Записаться")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      if (!isAdmin.value) {
        _push(ssrRenderComponent(_component_SiteFooter, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!isAdmin.value) {
        _push(ssrRenderComponent(_component_TestPrompt, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-uHOvuxT-.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-DuD1cjb-.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { IdentityId as I, _export_sfc as _, __nuxt_component_0$1 as a, useSiteData as b, useRoute as c, useRouter as d, entry_default as default, defineSchemaOrgResolver as e, resolvableDateToIso as f, resolveDefaultType as g, resolvableDateToDate as h, idReference as i, resolveNode as j, asArray as k, resolveWithBase as l, resolveAsGraphKey as m, imageResolver as n, dedupeMerge as o, prefixId as p, resolveRelation as r, setIfEmpty as s, trimLength as t, useHead as u };
//# sourceMappingURL=server.mjs.map
