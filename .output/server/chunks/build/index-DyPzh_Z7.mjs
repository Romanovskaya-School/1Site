import { resolveComponent, mergeProps, unref, withCtx, createTextVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead, b as useSiteData, _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$4 } from './SiteContact-BcmO8F_M.mjs';
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
import 'unhead/server';
import 'devalue';
import 'perfect-debounce';
import '@vue/shared';
import 'vue-router';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$3 = {
  __name: "SiteHero",
  __ssrInlineRender: true,
  setup(__props) {
    const { siteData } = useSiteData();
    const blob1Style = ref("");
    const blob2Style = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_router_link = resolveComponent("router-link");
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "hero",
        id: "home"
      }, _attrs))}><div class="blob blob-1" style="${ssrRenderStyle(blob1Style.value)}"></div><div class="blob blob-2" style="${ssrRenderStyle(blob2Style.value)}"></div><div class="container"><div class="hero-inner"><div class="hero-content"><div class="hero-tag reveal-blur"><span>\u{1F33F}</span> \u0411\u0435\u0440\u0435\u0436\u043D\u044B\u0435 \u043E\u043D\u043B\u0430\u0439\u043D-\u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438 </div><h1 class="hero-title reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.1s" })}">${(_a = unref(siteData).heroTitle) != null ? _a : ""}</h1><p class="hero-desc reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.2s" })}">${ssrInterpolate(unref(siteData).heroDesc)}</p><div class="hero-actions reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.3s" })}">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/#contact",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u2192`);
          } else {
            return [
              createTextVNode("\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="#about" class="btn btn-outline">\u041F\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F</a></div><div class="hero-stats reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.4s" })}"><div><div class="stat-num">7+</div><div class="stat-label">\u043B\u0435\u0442<br>\u043E\u043F\u044B\u0442\u0430</div></div><div><div class="stat-num">400+</div><div class="stat-label">\u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</div></div><div><div class="stat-num">100%</div><div class="stat-label">\u043E\u043D\u043B\u0430\u0439\u043D</div></div></div></div><div class="hero-visual reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.3s" })}"><div class="hero-photo-wrap"><div class="hero-photo-bg"></div>`);
      if (unref(siteData).heroImage) {
        _push(`<img${ssrRenderAttr("src", unref(siteData).heroImage)} class="hero-photo" alt="\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430">`);
      } else {
        _push(`<div class="photo-placeholder" style="${ssrRenderStyle({ "aspect-ratio": "3/4", "border-radius": "var(--radius-lg)", "position": "relative", "z-index": "1" })}"><span>\u041C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0444\u043E\u0442\u043E</span></div>`);
      }
      _push(`<div class="hero-badge"><div class="badge-icon">\u{1F393}</div><div class="badge-text"><strong>\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439</strong> \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u043E\u043D\u043B\u0430\u0439\u043D </div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteHero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "SiteHero" });
const _sfc_main$2 = {
  __name: "SiteAbout",
  __ssrInlineRender: true,
  setup(__props) {
    const { siteData } = useSiteData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "about",
        id: "about"
      }, _attrs))}><div class="container"><div class="about-inner"><div class="about-image-wrap reveal-blur"><div class="hero-photo-wrap"><div class="hero-photo-bg"></div>`);
      if (unref(siteData).aboutImage) {
        _push(`<img${ssrRenderAttr("src", unref(siteData).aboutImage)} class="hero-photo" alt="\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430">`);
      } else {
        _push(`<div class="photo-placeholder" style="${ssrRenderStyle({ "aspect-ratio": "3/4", "border-radius": "var(--radius-lg)", "position": "relative", "z-index": "1" })}"><span>\u041C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0444\u043E\u0442\u043E</span></div>`);
      }
      _push(`<div class="about-cert"><strong>7+</strong> \u043B\u0435\u0442 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438 </div></div></div><div class="about-text reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.15s" })}"><p class="section-label">\u041E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0435</p><h2 class="section-title">${ssrInterpolate(unref(siteData).aboutTitle)}</h2><p class="about-body" style="${ssrRenderStyle({ "margin-top": "20px" })}">${ssrInterpolate(unref(siteData).aboutP1)}</p><p class="about-body">${ssrInterpolate(unref(siteData).aboutP2)}</p><div class="about-qualities"><span class="quality-tag">\u{1F9E0} \u041A\u041F\u0422-\u0442\u0435\u0440\u0430\u043F\u0438\u044F</span><span class="quality-tag">\u{1F331} \u0413\u0435\u0448\u0442\u0430\u043B\u044C\u0442</span><span class="quality-tag">\u{1F4AC} \u041F\u0441\u0438\u0445\u043E\u0441\u043E\u043C\u0430\u0442\u0438\u043A\u0430</span><span class="quality-tag">\u2728 \u0422\u0440\u0435\u0432\u043E\u0433\u0430 \u0438 \u0441\u0442\u0440\u0435\u0441\u0441</span><span class="quality-tag">\u{1F3E0} \u041B\u0438\u0447\u043D\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B</span></div>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/#contact",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043F\u0435\u0440\u0432\u0443\u044E \u0432\u0441\u0442\u0440\u0435\u0447\u0443`);
          } else {
            return [
              createTextVNode("\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043F\u0435\u0440\u0432\u0443\u044E \u0432\u0441\u0442\u0440\u0435\u0447\u0443")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteAbout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "how",
    id: "how"
  }, _attrs))}><div class="container"><div class="how-head reveal-blur"><p class="section-label">\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442</p><h2 class="section-title">4 \u043F\u0440\u043E\u0441\u0442\u044B\u0445 \u0448\u0430\u0433\u0430 \u043A \u043D\u0430\u0447\u0430\u043B\u0443</h2><p class="section-subtitle">\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u043E\u0449\u0435, \u0447\u0435\u043C \u043A\u0430\u0436\u0435\u0442\u0441\u044F.</p></div><div class="how-steps"><div class="how-step reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.05s" })}"><div class="step-num">1</div><h4 class="step-title">\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443</h4><p class="step-desc">\u0424\u043E\u0440\u043C\u0430 \u043D\u0438\u0436\u0435 \u0438\u043B\u0438 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440 \u2014 \u043A\u0430\u043A \u0432\u0430\u043C \u0443\u0434\u043E\u0431\u043D\u0435\u0435.</p></div><div class="how-step reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.12s" })}"><div class="step-num">2</div><h4 class="step-title">\u041F\u0435\u0440\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442</h4><p class="step-desc">\u041E\u0442\u0432\u0435\u0447\u0443 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F \u0438 \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F.</p></div><div class="how-step reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.18s" })}"><div class="step-num">3</div><h4 class="step-title">\u041E\u043F\u043B\u0430\u0442\u0430</h4><p class="step-desc">\u041A\u0430\u0440\u0442\u0430 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0432\u043E\u0434. \u0420\u0430\u0437\u043E\u0432\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F \u0438\u043B\u0438 \u043F\u0430\u043A\u0435\u0442.</p></div><div class="how-step reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.24s" })}"><div class="step-num">4</div><h4 class="step-title">\u0412\u0441\u0442\u0440\u0435\u0447\u0430 \u043E\u043D\u043B\u0430\u0439\u043D</h4><p class="step-desc">Zoom \u0438\u043B\u0438 Telegram, \u0438\u0437 \u0434\u043E\u043C\u0430, \u0431\u0435\u0437 \u043F\u043E\u0435\u0437\u0434\u043E\u043A.</p></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteHow.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "SiteHow" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430 \u2014 \u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0443\u044E\u0449\u0438\u0439 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u043E\u043D\u043B\u0430\u0439\u043D",
      meta: [
        { name: "description", content: "\u0411\u0435\u0440\u0435\u0436\u043D\u0430\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u043C\u043E\u0449\u044C \u043E\u043D\u043B\u0430\u0439\u043D. \u041F\u043E\u043C\u043E\u0433\u0443 \u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C\u0441\u044F \u0441 \u0442\u0440\u0435\u0432\u043E\u0433\u043E\u0439, \u0432\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435\u043C, \u0432\u044B\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043B\u0438\u0447\u043D\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u0438 \u043D\u0430\u043B\u0430\u0434\u0438\u0442\u044C \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SiteHero = __nuxt_component_0;
      const _component_SiteAbout = _sfc_main$2;
      const _component_SiteHow = __nuxt_component_2;
      const _component_SiteContact = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_SiteHero, null, null, _parent));
      _push(ssrRenderComponent(_component_SiteAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_SiteHow, null, null, _parent));
      _push(ssrRenderComponent(_component_SiteContact, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DyPzh_Z7.mjs.map
