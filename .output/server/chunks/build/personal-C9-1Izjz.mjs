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
  __name: "personal",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430 | \u041B\u0438\u0447\u043D\u0430\u044F \u0442\u0435\u0440\u0430\u043F\u0438\u044F",
      meta: [
        { name: "description", content: "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u043C\u043E\u0449\u044C \u043E\u043D\u043B\u0430\u0439\u043D. \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u043E \u0441\u0442\u0440\u0435\u0441\u0441\u043E\u043C, \u0441\u0430\u043C\u043E\u043E\u0446\u0435\u043D\u043A\u043E\u0439 \u0438 \u0441\u043B\u043E\u0436\u043D\u044B\u043C\u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F\u043C\u0438." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-view" }, _attrs))} data-v-d7f624d5><section class="hero" data-v-d7f624d5><div class="blob blob-1" data-v-d7f624d5></div><div class="blob blob-2" data-v-d7f624d5></div><div class="container" data-v-d7f624d5><div class="hero-inner" style="${ssrRenderStyle({ "grid-template-columns": "1fr", "text-align": "center", "justify-items": "center" })}" data-v-d7f624d5><div class="hero-content reveal" style="${ssrRenderStyle({ "max-width": "800px", "padding": "0" })}" data-v-d7f624d5><div class="hero-tag" data-v-d7f624d5><span data-v-d7f624d5>\u{1F331}</span> \u041B\u0438\u0447\u043D\u0430\u044F \u0442\u0435\u0440\u0430\u043F\u0438\u044F </div><h1 class="hero-title" data-v-d7f624d5> \u041F\u0443\u0442\u044C \u043A <em data-v-d7f624d5>\u0441\u0435\u0431\u0435</em> \u0438 \u0433\u0430\u0440\u043C\u043E\u043D\u0438\u0438 </h1><p class="hero-desc" style="${ssrRenderStyle({ "margin-left": "auto", "margin-right": "auto" })}" data-v-d7f624d5> \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E, \u0447\u0442\u043E\u0431\u044B \u0431\u044B\u0442\u044C \u0441\u043E\u0431\u043E\u0439, \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0432 \u0447\u0443\u0432\u0441\u0442\u0432\u0430\u0445 \u0438 \u043D\u0430\u0439\u0442\u0438 \u043E\u043F\u043E\u0440\u0443 \u0432\u043D\u0443\u0442\u0440\u0438. </p><div class="hero-actions" style="${ssrRenderStyle({ "justify-content": "center" })}" data-v-d7f624d5>`);
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
      _push(`</div></div></div></div></section><section class="therapy-info" style="${ssrRenderStyle({ "padding": "60px 0" })}" data-v-d7f624d5><div class="container" data-v-d7f624d5><div class="services-head reveal" data-v-d7f624d5><p class="section-label" data-v-d7f624d5>\u041F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B</p><h2 class="section-title" data-v-d7f624d5>\u0421\u0442\u0430\u0442\u044C\u0438 \u043F\u043E \u0442\u0435\u043C\u0430\u043C</h2><div class="article-blocks-grid" style="${ssrRenderStyle({ "margin-top": "40px", "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))", "gap": "24px" })}" data-v-d7f624d5>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/articles",
        class: "article-topic-card",
        style: { "display": "block", "padding": "32px 24px", "border-radius": "16px", "background": "var(--warm-white)", "border": "1px solid var(--border)", "text-decoration": "none", "transition": "all 0.3s ease" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" })}" data-v-d7f624d5${_scopeId}>\u0421\u0430\u043C\u043E\u043E\u0446\u0435\u043D\u043A\u0430 \u0438 \u0441\u0430\u043C\u043E\u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C</h3><span style="${ssrRenderStyle({ "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" })}" data-v-d7f624d5${_scopeId}>\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192</span>`);
          } else {
            return [
              createVNode("h3", { style: { "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" } }, "\u0421\u0430\u043C\u043E\u043E\u0446\u0435\u043D\u043A\u0430 \u0438 \u0441\u0430\u043C\u043E\u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C"),
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
            _push2(`<h3 style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" })}" data-v-d7f624d5${_scopeId}>\u041F\u043E\u0438\u0441\u043A \u0441\u0435\u0431\u044F \u0438 \u043C\u043E\u0442\u0438\u0432\u0430\u0446\u0438\u0438</h3><span style="${ssrRenderStyle({ "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" })}" data-v-d7f624d5${_scopeId}>\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192</span>`);
          } else {
            return [
              createVNode("h3", { style: { "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" } }, "\u041F\u043E\u0438\u0441\u043A \u0441\u0435\u0431\u044F \u0438 \u043C\u043E\u0442\u0438\u0432\u0430\u0446\u0438\u0438"),
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
            _push2(`<h3 style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" })}" data-v-d7f624d5${_scopeId}>\u042D\u043C\u043E\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0438 \u0442\u0440\u0435\u0432\u043E\u0433\u0430</h3><span style="${ssrRenderStyle({ "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" })}" data-v-d7f624d5${_scopeId}>\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192</span>`);
          } else {
            return [
              createVNode("h3", { style: { "font-size": "1.2rem", "color": "var(--text-dark)", "margin-bottom": "12px" } }, "\u042D\u043C\u043E\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0438 \u0442\u0440\u0435\u0432\u043E\u0433\u0430"),
              createVNode("span", { style: { "color": "var(--accent)", "font-weight": "500", "font-size": "0.9rem" } }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u0438 \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="info-grid reveal" style="${ssrRenderStyle({ "margin-top": "60px", "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))", "gap": "40px" })}" data-v-d7f624d5><div data-v-d7f624d5><h3 data-v-d7f624d5>\u0414\u043B\u044F \u0447\u0435\u0433\u043E \u043D\u0443\u0436\u043D\u0430 \u043B\u0438\u0447\u043D\u0430\u044F \u0442\u0435\u0440\u0430\u043F\u0438\u044F?</h3><ul style="${ssrRenderStyle({ "margin-top": "20px", "list-style": "disc", "margin-left": "20px", "line-height": "1.6", "color": "var(--text-mid)" })}" data-v-d7f624d5><li data-v-d7f624d5>\u0412\u044B\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u0438 \u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \xAB\u043D\u0435\u0442\xBB</li><li data-v-d7f624d5>\u0421\u043F\u0440\u0430\u0432\u0438\u0442\u044C\u0441\u044F \u0441 \u0442\u0440\u0435\u0432\u043E\u0433\u043E\u0439 \u0438\u043B\u0438 \u0432\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435\u043C</li><li data-v-d7f624d5>\u041D\u0430\u0439\u0442\u0438 \u0441\u0432\u043E\u0438 \u0446\u0435\u043B\u0438 \u0438 \u0436\u0435\u043B\u0430\u043D\u0438\u044F</li><li data-v-d7f624d5>\u041F\u0440\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 \u043A\u0440\u0438\u0437\u0438\u0441 \u0438\u043B\u0438 \u043F\u043E\u0442\u0435\u0440\u044E</li></ul></div><div data-v-d7f624d5><h3 data-v-d7f624d5>\u041A\u0430\u043A \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438?</h3><p style="${ssrRenderStyle({ "margin-top": "20px", "line-height": "1.6", "color": "var(--text-mid)" })}" data-v-d7f624d5> \u041E\u043D\u043B\u0430\u0439\u043D, 50 \u043C\u0438\u043D\u0443\u0442. \u041C\u0435\u0442\u043E\u0434\u044B \u041A\u041F\u0422 \u0438 \u0433\u0435\u0448\u0442\u0430\u043B\u044C\u0442. \u041D\u0430\u0447\u043D\u0451\u043C \u0441 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0432\u0441\u0442\u0440\u0435\u0447\u0438 \u2014 \u0431\u0435\u0437 \u0434\u0430\u0432\u043B\u0435\u043D\u0438\u044F. </p></div></div></div></section>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/personal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const personal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7f624d5"]]);

export { personal as default };
//# sourceMappingURL=personal-C9-1Izjz.mjs.map
