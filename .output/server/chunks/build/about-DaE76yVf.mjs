import { resolveComponent, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead, b as useSiteData } from './server.mjs';
import { _ as _sfc_main$1 } from './SiteContact-BcmO8F_M.mjs';
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

const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u041E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0435 | \u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430",
      meta: [
        { name: "description", content: "\u0414\u0438\u043F\u043B\u043E\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433-\u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442 \u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430. \u041C\u043E\u0435 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435, \u043C\u0435\u0442\u043E\u0434\u044B \u0440\u0430\u0431\u043E\u0442\u044B (\u041A\u041F\u0422, \u0413\u0435\u0448\u0442\u0430\u043B\u044C\u0442) \u0438 \u0442\u0435\u0440\u0430\u043F\u0435\u0432\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u044B." }
      ]
    });
    const { siteData } = useSiteData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-35638614><section class="about-hero" data-v-35638614><div class="blob blob-1" data-v-35638614></div><div class="blob blob-2" data-v-35638614></div><div class="container" data-v-35638614><div class="about-hero-inner" data-v-35638614><div class="about-hero-text reveal" data-v-35638614><p class="section-label" data-v-35638614>\u041E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0435</p><h1 class="hero-title" data-v-35638614>${ssrInterpolate(unref(siteData).aboutTitle || "\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430")}</h1><p class="hero-desc" data-v-35638614>${ssrInterpolate(unref(siteData).aboutP1)}</p><div class="about-qualities" style="${ssrRenderStyle({ "margin-top": "28px" })}" data-v-35638614><span class="quality-tag" data-v-35638614>\u{1F9E0} \u041A\u041F\u0422-\u0442\u0435\u0440\u0430\u043F\u0438\u044F</span><span class="quality-tag" data-v-35638614>\u{1F331} \u0413\u0435\u0448\u0442\u0430\u043B\u044C\u0442</span><span class="quality-tag" data-v-35638614>\u{1F4AC} \u041F\u0441\u0438\u0445\u043E\u0441\u043E\u043C\u0430\u0442\u0438\u043A\u0430</span><span class="quality-tag" data-v-35638614>\u{1F91D} \u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F</span><span class="quality-tag" data-v-35638614>\u2728 \u0422\u0440\u0435\u0432\u043E\u0433\u0430</span><span class="quality-tag" data-v-35638614>\u{1F3E0} \u0413\u0440\u0430\u043D\u0438\u0446\u044B</span></div><div style="${ssrRenderStyle({ "margin-top": "36px", "display": "flex", "gap": "16px", "flex-wrap": "wrap" })}" data-v-35638614>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/#contact",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u2192`);
          } else {
            return [
              createTextVNode("\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="#principles" class="btn btn-outline" data-v-35638614>\u041C\u043E\u0438 \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u044B</a></div></div><div class="about-hero-photo reveal" style="${ssrRenderStyle({ "transition-delay": "0.2s" })}" data-v-35638614><div class="hero-photo-wrap" data-v-35638614><div class="hero-photo-bg" data-v-35638614></div>`);
      if (unref(siteData).aboutImage) {
        _push(`<img${ssrRenderAttr("src", unref(siteData).aboutImage)} class="hero-photo" style="${ssrRenderStyle({ "width": "100%", "aspect-ratio": "3/4", "border-radius": "var(--radius-lg)", "object-fit": "cover", "position": "relative", "z-index": "1" })}" data-v-35638614>`);
      } else {
        _push(`<div class="photo-placeholder" style="${ssrRenderStyle({ "aspect-ratio": "3/4", "border-radius": "var(--radius-lg)", "position": "relative", "z-index": "1" })}" data-v-35638614><span data-v-35638614>\u041C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0444\u043E\u0442\u043E</span></div>`);
      }
      _push(`<div class="hero-badge" data-v-35638614><div class="badge-icon" data-v-35638614>\u{1F393}</div><div class="badge-text" data-v-35638614><strong data-v-35638614>7+ \u043B\u0435\u0442 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438</strong> 400+ \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 </div></div></div></div></div></div></section><section class="about-stats-section" data-v-35638614><div class="container" data-v-35638614><div class="about-stats-grid" data-v-35638614><div class="about-stat-card reveal" data-v-35638614><div class="about-stat-num" data-v-35638614>7+</div><div class="about-stat-label" data-v-35638614>\u043B\u0435\u0442 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438</div></div><div class="about-stat-card reveal" style="${ssrRenderStyle({ "transition-delay": "0.1s" })}" data-v-35638614><div class="about-stat-num" data-v-35638614>400+</div><div class="about-stat-label" data-v-35638614>\u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</div></div><div class="about-stat-card reveal" style="${ssrRenderStyle({ "transition-delay": "0.2s" })}" data-v-35638614><div class="about-stat-num" data-v-35638614>3</div><div class="about-stat-label" data-v-35638614>\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F</div></div><div class="about-stat-card reveal" style="${ssrRenderStyle({ "transition-delay": "0.3s" })}" data-v-35638614><div class="about-stat-num" data-v-35638614>100%</div><div class="about-stat-label" data-v-35638614>\u043E\u043D\u043B\u0430\u0439\u043D</div></div></div></div></section><section class="about-principles" id="principles" style="${ssrRenderStyle({ "background": "var(--warm-white)" })}" data-v-35638614><div class="container" data-v-35638614><div class="services-head reveal" data-v-35638614><p class="section-label" data-v-35638614>\u041A\u0430\u043A \u044F \u0440\u0430\u0431\u043E\u0442\u0430\u044E</p><h2 class="section-title" data-v-35638614>\u041C\u043E\u0438 \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u044B</h2></div><div class="principles-grid" data-v-35638614><div class="principle-card reveal" data-v-35638614><div class="principle-icon" data-v-35638614>\u{1F512}</div><h3 data-v-35638614>\u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C</h3><p data-v-35638614>\u0412\u0441\u0451, \u0447\u0442\u043E \u043C\u044B \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u043C, \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0436\u0434\u0443 \u043D\u0430\u043C\u0438.</p></div><div class="principle-card reveal" style="${ssrRenderStyle({ "transition-delay": "0.1s" })}" data-v-35638614><div class="principle-icon" data-v-35638614>\u{1F33F}</div><h3 data-v-35638614>\u0411\u0435\u0440\u0435\u0436\u043D\u043E\u0441\u0442\u044C</h3><p data-v-35638614>\u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u0432\u0430\u0441 \u0431\u0435\u0437 \u0443\u0441\u043B\u043E\u0432\u0438\u0439, \u043E\u0446\u0435\u043D\u043E\u043A \u0438 \u043E\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F.</p></div><div class="principle-card reveal" style="${ssrRenderStyle({ "transition-delay": "0.2s" })}" data-v-35638614><div class="principle-icon" data-v-35638614>\u{1F52C}</div><h3 data-v-35638614>\u0414\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434</h3><p data-v-35638614>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E \u0442\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0442\u043E\u0434\u044B \u0441 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u043E\u0439 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C\u044E.</p></div><div class="principle-card reveal" style="${ssrRenderStyle({ "transition-delay": "0.3s" })}" data-v-35638614><div class="principle-icon" data-v-35638614>\u26A1</div><h3 data-v-35638614>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442</h3><p data-v-35638614>\u0414\u0432\u0438\u0433\u0430\u0435\u043C\u0441\u044F \u043A \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u043C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F\u043C \u0432 \u0432\u0430\u0448\u0435\u0439 \u0436\u0438\u0437\u043D\u0438.</p></div></div></div></section><section class="about-diplomas-section" style="${ssrRenderStyle({ "padding": "80px 0" })}" data-v-35638614><div class="container" data-v-35638614><div class="services-head reveal" data-v-35638614><p class="section-label" data-v-35638614>\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435</p><h2 class="section-title" data-v-35638614>\u0414\u0438\u043F\u043B\u043E\u043C\u044B \u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B</h2></div><div class="diplomas-grid" data-v-35638614><!--[-->`);
      ssrRenderList(unref(siteData).diplomas || [], (dip, idx) => {
        _push(`<div class="diploma-card-new reveal" style="${ssrRenderStyle({ transitionDelay: idx * 0.1 + "s" })}" data-v-35638614>`);
        if (dip.image) {
          _push(`<img${ssrRenderAttr("src", dip.image)} class="diploma-image" style="${ssrRenderStyle({ "width": "100%", "aspect-ratio": "3/4", "border-radius": "16px", "object-fit": "cover", "box-shadow": "0 8px 24px rgba(72,164,165,0.1)", "margin-bottom": "16px" })}" data-v-35638614>`);
        } else {
          _push(`<div class="photo-placeholder diploma-placeholder" data-v-35638614><span data-v-35638614>\u0414\u0438\u043F\u043B\u043E\u043C ${ssrInterpolate(idx + 1)}</span></div>`);
        }
        _push(`<p data-v-35638614>${ssrInterpolate(dip.title)}</p></div>`);
      });
      _push(`<!--]--></div></div></section>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-35638614"]]);

export { about as default };
//# sourceMappingURL=about-DaE76yVf.mjs.map
