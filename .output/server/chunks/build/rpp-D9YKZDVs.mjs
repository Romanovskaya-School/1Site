import { computed, ref, watch, resolveComponent, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './SiteContact-BcmO8F_M.mjs';
import { _ as _export_sfc, u as useHead, d as useRouter, b as useSiteData } from './server.mjs';
import { u as useArticles } from './useArticles-BhXlEuYO.mjs';
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
  __name: "rpp",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    useHead({
      title: "\u041B\u0435\u0447\u0435\u043D\u0438\u0435 \u0420\u041F\u041F \u043E\u043D\u043B\u0430\u0439\u043D | \u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430",
      meta: [
        { name: "description", content: "\u0411\u0435\u0440\u0435\u0436\u043D\u0430\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u043C\u043E\u0449\u044C \u043F\u0440\u0438 \u0440\u0430\u0441\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430\u0445 \u043F\u0438\u0449\u0435\u0432\u043E\u0433\u043E \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F. \u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u0437\u0434\u043E\u0440\u043E\u0432\u044B\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u0435\u0434\u043E\u0439 \u0438 \u0441\u0432\u043E\u0438\u043C \u0442\u0435\u043B\u043E\u043C." }
      ]
    });
    useRouter();
    const { articles } = useArticles();
    const { siteData } = useSiteData();
    const rppArticles = computed(() => {
      return articles.value.slice(0, 3);
    });
    const tests = computed(() => siteData.tests || []);
    const activeTestIndex = ref(0);
    const answers = ref(new Array(((_a = siteData.tests[0]) == null ? void 0 : _a.questions.length) || 0).fill(null));
    const showResult = ref(false);
    const testText = ref("");
    const isModalOpen = ref(false);
    const currentQuestionIndex = ref(0);
    const isMaxResult = ref(false);
    const isTransitioning = ref(false);
    const defaultOptions = [
      { text: "\u0412\u0441\u0435\u0433\u0434\u0430", value: 5, reverseValue: 0 },
      { text: "\u041E\u0447\u0435\u043D\u044C \u0447\u0430\u0441\u0442\u043E", value: 4, reverseValue: 1 },
      { text: "\u0427\u0430\u0441\u0442\u043E", value: 3, reverseValue: 2 },
      { text: "\u0418\u043D\u043E\u0433\u0434\u0430", value: 2, reverseValue: 3 },
      { text: "\u0420\u0435\u0434\u043A\u043E", value: 1, reverseValue: 4 },
      { text: "\u041D\u0438\u043A\u043E\u0433\u0434\u0430", value: 0, reverseValue: 5 }
    ];
    watch(isModalOpen, (val) => {
      if (!val) {
        (void 0).body.style.overflow = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-af6ccb45><section class="hero" id="home" data-v-af6ccb45><div class="blob blob-1" data-v-af6ccb45></div><div class="blob blob-2" data-v-af6ccb45></div><div class="container" data-v-af6ccb45><div class="hero-inner" data-v-af6ccb45><div class="hero-content reveal" data-v-af6ccb45><div class="hero-tag" data-v-af6ccb45><span data-v-af6ccb45>\u{1F370}</span> \u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u043C\u043E\u0449\u044C </div><h1 class="hero-title" data-v-af6ccb45> \u0411\u0435\u0440\u0435\u0436\u043D\u0430\u044F \u043F\u043E\u043C\u043E\u0449\u044C \u043F\u0440\u0438 <em data-v-af6ccb45>\u0420\u041F\u041F</em></h1><p class="hero-desc" data-v-af6ccb45> \u0415\u0434\u0430 \u0441\u0442\u0430\u043B\u0430 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u043C \u0442\u0440\u0435\u0432\u043E\u0433\u0438? \u0412\u044B \u043D\u0435 \u043E\u0434\u0438\u043D\u043E\u043A\u0438. \u041F\u043E\u043C\u043E\u0433\u0443 \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0437\u0434\u043E\u0440\u043E\u0432\u044B\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u0435\u0434\u043E\u0439 \u0438 \u0442\u0435\u043B\u043E\u043C. </p><div class="hero-actions" data-v-af6ccb45>`);
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
      _push(`<a href="#rpp-test" class="btn btn-outline" data-v-af6ccb45>\u0422\u0435\u0441\u0442: \xAB\u0415\u0441\u0442\u044C \u043B\u0438 \u0443 \u043C\u0435\u043D\u044F \u0420\u041F\u041F?\xBB</a></div></div><div class="hero-visual reveal" style="${ssrRenderStyle({ "transition-delay": "0.2s" })}" data-v-af6ccb45><div class="hero-photo-wrap" data-v-af6ccb45><div class="hero-photo-bg" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, var(--mauve), var(--rose))" })}" data-v-af6ccb45></div>`);
      if (unref(siteData).rppImage) {
        _push(`<img${ssrRenderAttr("src", unref(siteData).rppImage)} class="hero-photo" alt="\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430" style="${ssrRenderStyle({ "width": "100%", "aspect-ratio": "3/4", "border-radius": "var(--radius-lg)", "object-fit": "cover", "position": "relative", "z-index": "1" })}" data-v-af6ccb45>`);
      } else {
        _push(`<div class="photo-placeholder" style="${ssrRenderStyle({ "aspect-ratio": "3/4", "border-radius": "var(--radius-lg)", "position": "relative", "z-index": "1" })}" data-v-af6ccb45><span data-v-af6ccb45>\u041C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0444\u043E\u0442\u043E</span></div>`);
      }
      _push(`<div class="hero-badge" data-v-af6ccb45><div class="badge-icon" data-v-af6ccb45>\u{1F33F}</div><div class="badge-text" data-v-af6ccb45><strong data-v-af6ccb45>\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u043F\u043E \u0420\u041F\u041F</strong> \u0431\u0435\u0440\u0435\u0436\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 </div></div></div></div></div></div></section><section class="rpp-info" id="rpp-info" data-v-af6ccb45><div class="container" data-v-af6ccb45><div class="about-inner" data-v-af6ccb45><div class="about-text reveal" data-v-af6ccb45><p class="section-label" data-v-af6ccb45>\u041E \u0440\u0430\u0441\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435</p><h2 class="section-title" data-v-af6ccb45>\u0427\u0442\u043E \u0442\u0430\u043A\u043E\u0435 \u0420\u041F\u041F?</h2><p class="about-body" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-af6ccb45> \u0420\u041F\u041F \u2014 \u043D\u0435 \u043F\u0440\u0438\u0447\u0443\u0434\u0430 \u0438 \u043D\u0435 \u0441\u043B\u0430\u0431\u043E\u0441\u0442\u044C. \u042D\u0442\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435, \u043A\u043E\u0433\u0434\u0430 \u043C\u044B\u0441\u043B\u0438 \u043E \u0435\u0434\u0435 \u0438 \u0432\u0435\u0441\u0435 \u043D\u0430\u0447\u0438\u043D\u0430\u044E\u0442 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0436\u0438\u0437\u043D\u044C. </p><p class="about-body" data-v-af6ccb45> \u0417\u0430 \u043B\u044E\u0431\u044B\u043C \u043F\u0440\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0441\u0442\u043E\u0438\u0442 \u044D\u043C\u043E\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0431\u043E\u043B\u044C, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0438 \u043D\u0443\u0436\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C. </p></div><div class="about-image-wrap reveal" style="${ssrRenderStyle({ "transition-delay": "0.15s" })}" data-v-af6ccb45><div style="${ssrRenderStyle({ "background": "var(--blush)", "padding": "40px", "border-radius": "var(--radius-lg)", "border": "2px solid var(--rose)" })}" data-v-af6ccb45><h3 style="${ssrRenderStyle({ "font-family": "var(--font-head)", "margin-bottom": "20px", "color": "var(--text-dark)" })}" data-v-af6ccb45>\u0412\u0430\u0436\u043D\u043E \u043F\u043E\u043C\u043D\u0438\u0442\u044C:</h3><ul style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "15px" })}" data-v-af6ccb45><li style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "flex-start" })}" data-v-af6ccb45><span style="${ssrRenderStyle({ "font-size": "1.2rem" })}" data-v-af6ccb45>\u2728</span><p style="${ssrRenderStyle({ "font-size": "0.95rem", "color": "var(--text-mid)" })}" data-v-af6ccb45>\u0420\u041F\u041F \u2014 \u044D\u0442\u043E \u043D\u0435 \u0432\u0430\u0448 \u0432\u044B\u0431\u043E\u0440 \u0438 \u043D\u0435 \u0432\u0430\u0448\u0430 \u0432\u0438\u043D\u0430</p></li><li style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "flex-start" })}" data-v-af6ccb45><span style="${ssrRenderStyle({ "font-size": "1.2rem" })}" data-v-af6ccb45>\u2728</span><p style="${ssrRenderStyle({ "font-size": "0.95rem", "color": "var(--text-mid)" })}" data-v-af6ccb45>\u042D\u0442\u043E \u043F\u043E\u0434\u0434\u0430\u0435\u0442\u0441\u044F \u043B\u0435\u0447\u0435\u043D\u0438\u044E \u0432 \u043B\u044E\u0431\u043E\u043C \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0435</p></li><li style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "flex-start" })}" data-v-af6ccb45><span style="${ssrRenderStyle({ "font-size": "1.2rem" })}" data-v-af6ccb45>\u2728</span><p style="${ssrRenderStyle({ "font-size": "0.95rem", "color": "var(--text-mid)" })}" data-v-af6ccb45>\u041F\u043E\u043C\u043E\u0449\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430, \u0438 \u043F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0433 \u043C\u043E\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0435\u0433\u043E\u0434\u043D\u044F</p></li></ul></div></div></div></div></section><section class="rpp-test" id="rpp-test" style="${ssrRenderStyle({ "padding": "80px 0" })}" data-v-af6ccb45><div class="container" style="${ssrRenderStyle({ "max-width": "800px" })}" data-v-af6ccb45><div class="services-head reveal" data-v-af6ccb45><p class="section-label" data-v-af6ccb45>\u0421\u0430\u043C\u043E\u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430</p><h2 class="section-title" data-v-af6ccb45>\u0415\u0441\u0442\u044C \u043B\u0438 \u0443 \u043C\u0435\u043D\u044F...?</h2></div><div class="test-catalog-grid reveal" style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(240px, 1fr))", "gap": "20px", "margin-bottom": "40px" })}" data-v-af6ccb45><!--[-->`);
      ssrRenderList(tests.value, (t, idx) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTestIndex.value === idx }, "test-card"])}" style="${ssrRenderStyle({ "padding": "24px", "border-radius": "16px", "background": "var(--warm-white)", "border": "1px solid var(--border)", "cursor": "pointer", "transition": "all 0.3s ease" })}" data-v-af6ccb45><h3 style="${ssrRenderStyle({ "font-size": "1.1rem", "color": "var(--text-dark)", "margin-bottom": "8px" })}" data-v-af6ccb45>${ssrInterpolate(t.title)}</h3><p style="${ssrRenderStyle({ "font-size": "0.85rem", "color": "var(--text-light)" })}" data-v-af6ccb45>${ssrInterpolate(t.questions.length)} \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432</p></div>`);
      });
      _push(`<!--]--></div>`);
      if (isModalOpen.value) {
        _push(`<div class="fullscreen-modal awwwards-bg" data-v-af6ccb45><div class="modal-content awwwards-modal" data-v-af6ccb45>`);
        if (!showResult.value) {
          _push(`<div class="awwwards-progress-line" data-v-af6ccb45><div class="awwwards-progress-fill" style="${ssrRenderStyle({ width: (currentQuestionIndex.value + 1) / tests.value[activeTestIndex.value].questions.length * 100 + "%" })}" data-v-af6ccb45></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="modal-close awwwards-close" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C" data-v-af6ccb45><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-af6ccb45><line x1="18" y1="6" x2="6" y2="18" data-v-af6ccb45></line><line x1="6" y1="6" x2="18" y2="18" data-v-af6ccb45></line></svg></button>`);
        if (!showResult.value) {
          _push(`<div class="test-inner awwwards-inner" data-v-af6ccb45><div class="awwwards-header" data-v-af6ccb45><h3 class="awwwards-test-title" data-v-af6ccb45>${ssrInterpolate(tests.value[activeTestIndex.value].title)}</h3><div class="awwwards-counter" data-v-af6ccb45>${ssrInterpolate(String(currentQuestionIndex.value + 1).padStart(2, "0"))} <span class="dim" data-v-af6ccb45>/ ${ssrInterpolate(String(tests.value[activeTestIndex.value].questions.length).padStart(2, "0"))}</span></div></div><div class="test-question-card awwwards-card" data-v-af6ccb45><p class="question-text awwwards-q-text" data-v-af6ccb45>${ssrInterpolate(typeof tests.value[activeTestIndex.value].questions[currentQuestionIndex.value] === "object" ? tests.value[activeTestIndex.value].questions[currentQuestionIndex.value].text : tests.value[activeTestIndex.value].questions[currentQuestionIndex.value])}</p><div class="options-grid awwwards-options" data-v-af6ccb45><!--[-->`);
          ssrRenderList(((_a2 = tests.value[activeTestIndex.value].questions[currentQuestionIndex.value]) == null ? void 0 : _a2.options) || tests.value[activeTestIndex.value].options || defaultOptions, (opt, oIdx) => {
            _push(`<button class="${ssrRenderClass([{ selected: answers.value[currentQuestionIndex.value] === oIdx, "is-transitioning": isTransitioning.value }, "custom-radio-btn awwwards-btn"])}"${ssrIncludeBooleanAttr(isTransitioning.value) ? " disabled" : ""} data-v-af6ccb45>${ssrInterpolate(opt.text)}</button>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (showResult.value) {
          _push(`<div class="test-inner" style="${ssrRenderStyle({ "text-align": "center", "padding-top": "40px" })}" data-v-af6ccb45><h3 style="${ssrRenderStyle({ "font-family": "var(--font-head)", "font-size": "2rem", "color": "var(--text-dark)", "margin-bottom": "16px" })}" data-v-af6ccb45>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B:</h3>`);
          if (Array.isArray(testText.value)) {
            _push(`<div class="multi-scale-results" style="${ssrRenderStyle({ "text-align": "left", "max-width": "600px", "margin": "0 auto 40px" })}" data-v-af6ccb45><!--[-->`);
            ssrRenderList(testText.value, (res, idx) => {
              var _a3;
              _push(`<div class="scale-result-card" style="${ssrRenderStyle({ "background": "var(--warm-white)", "padding": "20px", "border-radius": "var(--radius-md)", "border": "1px solid rgba(72,164,165,0.15)", "margin-bottom": "16px" })}" data-v-af6ccb45><h4 style="${ssrRenderStyle({ "font-family": "var(--font-head)", "font-size": "1.2rem", "color": "var(--accent)", "margin-bottom": "8px" })}" data-v-af6ccb45>${ssrInterpolate(res.name)}</h4><div style="${ssrRenderStyle({ "font-size": "0.9rem", "color": "var(--text-light)", "margin-bottom": "12px" })}" data-v-af6ccb45>\u0411\u0430\u043B\u043B: ${ssrInterpolate(res.score)}</div><div class="result-text" style="${ssrRenderStyle({ "font-size": "1rem", "color": "var(--text-mid)", "line-height": "1.5" })}" data-v-af6ccb45>${(_a3 = res.text) != null ? _a3 : ""}</div></div>`);
            });
            _push(`<!--]--><div style="${ssrRenderStyle({ "font-size": "0.85rem", "color": "var(--text-light)", "margin-top": "24px", "text-align": "center", "padding-top": "16px", "border-top": "1px solid rgba(0,0,0,0.05)" })}" data-v-af6ccb45> \u042D\u0442\u043E\u0442 \u0442\u0435\u0441\u0442 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0437\u043E\u043C \u0438 \u043D\u0435 \u0437\u0430\u043C\u0435\u043D\u044F\u0435\u0442 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430. \u041E\u043D \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0432\u0435\u0434\u0443\u0449\u0438\u0435 \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B \u043F\u0438\u0449\u0435\u0432\u043E\u0433\u043E \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F. </div></div>`);
          } else {
            _push(`<p style="${ssrRenderStyle({ "font-size": "1.2rem", "color": "var(--text-mid)", "margin-bottom": "40px" })}" data-v-af6ccb45>${(_b = testText.value) != null ? _b : ""}</p>`);
          }
          _push(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "16px", "justify-content": "center", "flex-wrap": "wrap" })}" data-v-af6ccb45>`);
          if (isMaxResult.value) {
            _push(`<button class="btn btn-primary" data-v-af6ccb45>\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="btn btn-outline" data-v-af6ccb45>\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0442\u0435\u0441\u0442\u0430\u043C</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<section class="articles-prev" id="articles" data-v-af6ccb45><div class="container" data-v-af6ccb45><div class="articles-head reveal" data-v-af6ccb45><div data-v-af6ccb45><p class="section-label" data-v-af6ccb45>\u041F\u043E\u043B\u0435\u0437\u043D\u043E \u043F\u043E\u0447\u0438\u0442\u0430\u0442\u044C</p><h2 class="section-title" data-v-af6ccb45>\u0421\u0442\u0430\u0442\u044C\u0438 \u043E\u0431 \u0420\u041F\u041F</h2></div>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/articles",
        class: "btn btn-outline btn-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u044C\u0438`);
          } else {
            return [
              createTextVNode("\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u044C\u0438")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="articles-grid" data-v-af6ccb45><!--[-->`);
      ssrRenderList(rppArticles.value, (a, i) => {
        _push(`<div class="article-card reveal" style="${ssrRenderStyle({ "transition-delay": i * 0.05 + "s", cursor: "pointer" })}" data-v-af6ccb45><div class="article-body" data-v-af6ccb45><span class="article-cat" data-v-af6ccb45>${ssrInterpolate(a.category)}</span><h3 class="article-title" data-v-af6ccb45>${ssrInterpolate(a.title)}</h3><p class="article-excerpt" data-v-af6ccb45>${ssrInterpolate((a.excerpt || "").slice(0, 100) + "...")}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rpp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rpp = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-af6ccb45"]]);

export { rpp as default };
//# sourceMappingURL=rpp-D9YKZDVs.mjs.map
