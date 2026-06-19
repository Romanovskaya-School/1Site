import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './SiteContact-BcmO8F_M.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
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
  __name: "family",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u0421\u0435\u043C\u0435\u0439\u043D\u0430\u044F \u0442\u0435\u0440\u0430\u043F\u0438\u044F \u043E\u043D\u043B\u0430\u0439\u043D | \u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F \u0441\u0435\u043C\u0435\u0439\u043D\u043E\u0433\u043E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430",
      meta: [
        { name: "description", content: "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u043C\u043E\u0449\u044C \u043F\u0430\u0440\u0430\u043C \u0438 \u0441\u0435\u043C\u044C\u044F\u043C. \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u0438, \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u0438 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0434\u0438\u0430\u043B\u043E\u0433\u0430 \u043E\u043D\u043B\u0430\u0439\u043D." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-view" }, _attrs))} data-v-b8850b4b><section class="hero" data-v-b8850b4b><div class="blob blob-1" style="${ssrRenderStyle({ "background": "var(--blue-light)" })}" data-v-b8850b4b></div><div class="blob blob-2" style="${ssrRenderStyle({ "background": "var(--purple-light)" })}" data-v-b8850b4b></div><div class="container" data-v-b8850b4b><div class="hero-inner" style="${ssrRenderStyle({ "grid-template-columns": "1fr", "text-align": "center", "justify-items": "center" })}" data-v-b8850b4b><div class="hero-content reveal" style="${ssrRenderStyle({ "max-width": "800px", "padding": "0" })}" data-v-b8850b4b><div class="hero-tag" data-v-b8850b4b><span data-v-b8850b4b>\u{1F91D}</span> \u0421\u0435\u043C\u0435\u0439\u043D\u0430\u044F \u0442\u0435\u0440\u0430\u043F\u0438\u044F </div><h1 class="hero-title" data-v-b8850b4b> \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 <em data-v-b8850b4b>\u0441\u0432\u044F\u0437\u0438</em> \u0438 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u044F </h1><p class="hero-desc" style="${ssrRenderStyle({ "margin-left": "auto", "margin-right": "auto" })}" data-v-b8850b4b> \u041F\u043E\u043C\u043E\u0433\u0443 \u0443\u0441\u043B\u044B\u0448\u0430\u0442\u044C \u0434\u0440\u0443\u0433 \u0434\u0440\u0443\u0433\u0430, \u043F\u0440\u043E\u0439\u0442\u0438 \u043A\u0440\u0438\u0437\u0438\u0441 \u0438 \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u044C. </p><div class="hero-actions" style="${ssrRenderStyle({ "justify-content": "center" })}" data-v-b8850b4b>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/#contact",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E \u2192`);
          } else {
            return [
              createTextVNode("\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></section><section class="therapy-info" style="${ssrRenderStyle({ "padding": "60px 0" })}" data-v-b8850b4b><div class="container" data-v-b8850b4b><div class="services-head reveal" data-v-b8850b4b><p class="section-label" data-v-b8850b4b>\u041F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B</p><h2 class="section-title" data-v-b8850b4b>\u0421\u0442\u0430\u0442\u044C\u0438 \u043E \u0441\u0435\u043C\u0435\u0439\u043D\u044B\u0445 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u0445</h2><div class="article-blocks-grid" style="${ssrRenderStyle({ "margin-top": "40px", "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))", "gap": "24px" })}" data-v-b8850b4b>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/articles",
        class: "article-topic-card",
        style: { "display": "block", "padding": "32px 24px", "border-radius": "16px", "background": "var(--warm-white)", "border": "1px solid var(--border)", "text-decoration": "none", "transition": "all 0.3s ease" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" })}" data-v-b8850b4b${_scopeId}>\u041A\u0430\u043A \u044D\u043A\u043E\u043B\u043E\u0433\u0438\u0447\u043D\u043E \u0440\u0435\u0448\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u044B</h3><span style="${ssrRenderStyle({ "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" })}" data-v-b8850b4b${_scopeId}>\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192</span>`);
          } else {
            return [
              createVNode("h3", { style: { "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" } }, "\u041A\u0430\u043A \u044D\u043A\u043E\u043B\u043E\u0433\u0438\u0447\u043D\u043E \u0440\u0435\u0448\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u044B"),
              createVNode("span", { style: { "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" } }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/articles",
        class: "article-topic-card",
        style: { "display": "block", "padding": "32px 24px", "border-radius": "16px", "background": "var(--warm-white)", "border": "1px solid var(--border)", "text-decoration": "none", "transition": "all 0.3s ease" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" })}" data-v-b8850b4b${_scopeId}>\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0435 \u043A\u0440\u0438\u0437\u0438\u0441\u044B \u0438 \u043A\u0430\u043A \u0438\u0445 \u043F\u0440\u043E\u0439\u0442\u0438</h3><span style="${ssrRenderStyle({ "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" })}" data-v-b8850b4b${_scopeId}>\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192</span>`);
          } else {
            return [
              createVNode("h3", { style: { "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" } }, "\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0435 \u043A\u0440\u0438\u0437\u0438\u0441\u044B \u0438 \u043A\u0430\u043A \u0438\u0445 \u043F\u0440\u043E\u0439\u0442\u0438"),
              createVNode("span", { style: { "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" } }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/articles",
        class: "article-topic-card",
        style: { "display": "block", "padding": "32px 24px", "border-radius": "16px", "background": "var(--warm-white)", "border": "1px solid var(--border)", "text-decoration": "none", "transition": "all 0.3s ease" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" })}" data-v-b8850b4b${_scopeId}>\u041B\u0438\u0447\u043D\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u043F\u0430\u0440\u0435</h3><span style="${ssrRenderStyle({ "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" })}" data-v-b8850b4b${_scopeId}>\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192</span>`);
          } else {
            return [
              createVNode("h3", { style: { "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" } }, "\u041B\u0438\u0447\u043D\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u043F\u0430\u0440\u0435"),
              createVNode("span", { style: { "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" } }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/articles",
        class: "article-topic-card",
        style: { "display": "block", "padding": "32px 24px", "border-radius": "16px", "background": "var(--warm-white)", "border": "1px solid var(--border)", "text-decoration": "none", "transition": "all 0.3s ease" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" })}" data-v-b8850b4b${_scopeId}>\u041E\u0441\u043D\u043E\u0432\u044B \u043D\u0435\u043D\u0430\u0441\u0438\u043B\u044C\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0449\u0435\u043D\u0438\u044F</h3><span style="${ssrRenderStyle({ "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" })}" data-v-b8850b4b${_scopeId}>\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192</span>`);
          } else {
            return [
              createVNode("h3", { style: { "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" } }, "\u041E\u0441\u043D\u043E\u0432\u044B \u043D\u0435\u043D\u0430\u0441\u0438\u043B\u044C\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0449\u0435\u043D\u0438\u044F"),
              createVNode("span", { style: { "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" } }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="info-grid reveal" style="${ssrRenderStyle({ "margin-top": "60px", "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))", "gap": "40px" })}" data-v-b8850b4b><div data-v-b8850b4b><h3 data-v-b8850b4b>\u041A\u043E\u0433\u0434\u0430 \u0441\u0442\u043E\u0438\u0442 \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u044C\u0441\u044F \u043A \u0441\u0435\u043C\u0435\u0439\u043D\u043E\u043C\u0443 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0443?</h3><ul style="${ssrRenderStyle({ "margin-top": "20px", "list-style": "disc", "margin-left": "20px", "line-height": "1.6", "color": "var(--text-mid)" })}" data-v-b8850b4b><li data-v-b8850b4b>\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435 \u0441\u0441\u043E\u0440\u044B \u0438 \u043D\u0435\u0434\u043E\u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435</li><li data-v-b8850b4b>\u041E\u0449\u0443\u0449\u0435\u043D\u0438\u0435 \u043E\u0434\u0438\u043D\u043E\u0447\u0435\u0441\u0442\u0432\u0430 \u0432 \u043F\u0430\u0440\u0435</li><li data-v-b8850b4b>\u041F\u043E\u0442\u0435\u0440\u044F \u0434\u043E\u0432\u0435\u0440\u0438\u044F</li><li data-v-b8850b4b>\u0420\u0430\u0437\u043D\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u0432 \u0432\u043E\u0441\u043F\u0438\u0442\u0430\u043D\u0438\u0438</li></ul></div><div data-v-b8850b4b><h3 data-v-b8850b4b>\u041A\u0430\u043A \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442 \u0441\u0435\u043C\u0435\u0439\u043D\u044B\u0435 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438?</h3><p style="${ssrRenderStyle({ "margin-top": "20px", "line-height": "1.6", "color": "var(--text-mid)" })}" data-v-b8850b4b> 80\u201390 \u043C\u0438\u043D\u0443\u0442, \u043E\u0431\u0430 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430 \u043E\u043D\u043B\u0430\u0439\u043D. \u042F \u0432\u044B\u0441\u0442\u0443\u043F\u0430\u044E \u043D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u043C \u043F\u043E\u0441\u0440\u0435\u0434\u043D\u0438\u043A\u043E\u043C \u2014 \u043A\u0430\u0436\u0434\u044B\u0439 \u0431\u0443\u0434\u0435\u0442 \u0443\u0441\u043B\u044B\u0448\u0430\u043D. </p></div></div></div></section>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/family.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const family = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b8850b4b"]]);

export { family as default };
//# sourceMappingURL=family-CLPpmKYP.mjs.map
