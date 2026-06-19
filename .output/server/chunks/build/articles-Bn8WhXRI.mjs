import { ref, computed, watch, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useArticles } from './useArticles-BhXlEuYO.mjs';
import { _ as _export_sfc, u as useHead, c as useRoute, d as useRouter } from './server.mjs';
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
  __name: "articles",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u0421\u0442\u0430\u0442\u044C\u0438 \u043E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0438 \u0438 \u0441\u0430\u043C\u043E\u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0438 | \u0411\u043B\u043E\u0433 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430",
      meta: [
        { name: "description", content: "\u041F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 \u043E \u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u043E\u043C \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435, \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u0445, \u0442\u0440\u0435\u0432\u043E\u0433\u0435 \u0438 \u043B\u0438\u0447\u043D\u044B\u0445 \u0433\u0440\u0430\u043D\u0438\u0446\u0430\u0445 \u043F\u0440\u043E\u0441\u0442\u044B\u043C \u044F\u0437\u044B\u043A\u043E\u043C." }
      ]
    });
    const { articles: articles2, saveArticle } = useArticles();
    const route = useRoute();
    const router = useRouter();
    const currentFilter = ref("all");
    const selectedArticle = ref(null);
    const searchQuery = ref("");
    const categories = computed(() => {
      return [...new Set(articles2.value.map((a) => a.category).filter(Boolean))];
    });
    const filteredArticles = computed(() => {
      let filtered = articles2.value;
      if (currentFilter.value !== "all") {
        filtered = filtered.filter((a) => a.category === currentFilter.value);
      }
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (a) => a.title && a.title.toLowerCase().includes(query) || a.excerpt && a.excerpt.toLowerCase().includes(query) || a.content && a.content.toLowerCase().includes(query)
        );
      }
      return filtered;
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
    };
    const openArticle = (article, pushHistory = true) => {
      selectedArticle.value = article;
      (void 0).body.style.overflow = "hidden";
      if (!article.views) article.views = 0;
      article.views += 1;
      saveArticle(article);
      if (pushHistory) {
        router.push({ query: { read: article.id } });
      }
    };
    const closeArticle = (pushHistory = true) => {
      selectedArticle.value = null;
      (void 0).body.style.overflow = "";
      if (pushHistory) {
        router.push({ query: {} });
      }
    };
    watch(() => route.query.read, (newRead) => {
      var _a;
      if (newRead) {
        const art = articles2.value.find((a) => a.id === newRead);
        if (art && ((_a = selectedArticle.value) == null ? void 0 : _a.id) !== newRead) {
          openArticle(art, false);
        }
      } else {
        if (selectedArticle.value) {
          closeArticle(false);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles-page" }, _attrs))} data-v-e5367213><section class="page-hero" data-v-e5367213><div class="container" data-v-e5367213><p class="section-label" data-v-e5367213>\u0411\u043B\u043E\u0433</p><h1 class="section-title" style="${ssrRenderStyle({ "margin-bottom": "16px" })}" data-v-e5367213>\u0421\u0442\u0430\u0442\u044C\u0438 \u043E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0438</h1><p class="section-subtitle" style="${ssrRenderStyle({ "margin": "0 auto" })}" data-v-e5367213> \u0414\u0435\u043B\u044E\u0441\u044C \u0437\u043D\u0430\u043D\u0438\u044F\u043C\u0438 \u0438 \u0441\u043E\u0432\u0435\u0442\u0430\u043C\u0438 \u043E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0438 \u2014 \u043F\u0440\u043E\u0441\u0442\u043E, \u043F\u043E\u043D\u044F\u0442\u043D\u043E \u0438 \u0431\u0435\u0437 \u043B\u0438\u0448\u043D\u0438\u0445 \u0442\u0435\u0440\u043C\u0438\u043D\u043E\u0432. </p></div></section><section style="${ssrRenderStyle({ "padding": "64px 0 100px", "background": "var(--warm-white)" })}" data-v-e5367213><div class="container" data-v-e5367213><div class="filter-bar" style="${ssrRenderStyle({ "justify-content": "space-between" })}" data-v-e5367213><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px", "align-items": "center", "flex-wrap": "wrap" })}" data-v-e5367213><span class="filter-label" data-v-e5367213>\u0424\u0438\u043B\u044C\u0442\u0440:</span><button class="${ssrRenderClass([{ active: currentFilter.value === "all" }, "filter-btn"])}" data-v-e5367213> \u0412\u0441\u0435 <span class="filter-count" data-v-e5367213>${ssrInterpolate(unref(articles2).length)}</span></button><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<button class="${ssrRenderClass([{ active: currentFilter.value === cat }, "filter-btn"])}" data-v-e5367213>${ssrInterpolate(cat)} <span class="filter-count" data-v-e5367213>${ssrInterpolate(unref(articles2).filter((a) => a.category === cat).length)}</span></button>`);
      });
      _push(`<!--]--></div><div class="search-box" data-v-e5367213><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="\u041F\u043E\u0438\u0441\u043A \u0441\u0442\u0430\u0442\u0435\u0439..." class="search-input" data-v-e5367213></div></div><div id="articlesList" data-v-e5367213><!--[-->`);
      ssrRenderList(filteredArticles.value, (a, i) => {
        _push(`<article class="article-full-card" style="${ssrRenderStyle({ "animation-delay": i * 0.06 + "s", animation: "fadeInUp 0.5s ease backwards" })}" data-v-e5367213><img${ssrRenderAttr("src", a.image || "images/article-anxiety.png")}${ssrRenderAttr("alt", a.title)} class="article-full-img" data-v-e5367213><div class="article-full-body" data-v-e5367213><div data-v-e5367213><span class="article-cat" data-v-e5367213>${ssrInterpolate(a.category || "")}</span></div><h2 class="article-full-title" data-v-e5367213>${ssrInterpolate(a.title)}</h2><div class="article-meta" style="${ssrRenderStyle({ "margin-bottom": "18px" })}" data-v-e5367213> \u{1F5D3} ${ssrInterpolate(formatDate(a.date))} ${ssrInterpolate(a.readTime ? "\xB7 \u23F1 " + a.readTime : "")} <span style="${ssrRenderStyle({ "margin-left": "8px" })}" data-v-e5367213>\u{1F441} ${ssrInterpolate(a.views || 0)}</span></div><p class="article-full-excerpt" data-v-e5367213>${ssrInterpolate(a.excerpt || "")}</p><div class="article-read-more" data-v-e5367213> \u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E \u2192 </div></div></article>`);
      });
      _push(`<!--]--></div>`);
      if (filteredArticles.value.length === 0) {
        _push(`<div class="no-results show" data-v-e5367213><div class="icon" data-v-e5367213>\u{1F50D}</div><p data-v-e5367213>\u0421\u0442\u0430\u0442\u0435\u0439 \u0432 \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><div id="articleOverlay" role="dialog" aria-modal="true" aria-label="\u0421\u0442\u0430\u0442\u044C\u044F" class="${ssrRenderClass({ open: selectedArticle.value })}" data-v-e5367213>`);
      if (selectedArticle.value) {
        _push(`<div class="overlay-card" data-v-e5367213><img${ssrRenderAttr("src", selectedArticle.value.image || "images/article-anxiety.png")}${ssrRenderAttr("alt", selectedArticle.value.title)} class="overlay-cover" data-v-e5367213><div class="overlay-body" data-v-e5367213><button class="overlay-close" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C" data-v-e5367213>\u2715</button><span class="overlay-cat" data-v-e5367213>${ssrInterpolate(selectedArticle.value.category || "")}</span><h1 class="overlay-title" data-v-e5367213>${ssrInterpolate(selectedArticle.value.title)}</h1><div class="overlay-meta" data-v-e5367213><span data-v-e5367213>\u{1F5D3} ${ssrInterpolate(formatDate(selectedArticle.value.date))}</span>`);
        if (selectedArticle.value.readTime) {
          _push(`<span data-v-e5367213>\u23F1 ${ssrInterpolate(selectedArticle.value.readTime)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-e5367213>\u{1F441} ${ssrInterpolate(selectedArticle.value.views || 0)}</span></div><div class="overlay-content" data-v-e5367213>${(_a = selectedArticle.value.content || "") != null ? _a : ""}</div><div class="overlay-cta" data-v-e5367213><p data-v-e5367213>\u0425\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u043D\u0430\u0434 \u043F\u043E\u0445\u043E\u0436\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u043C \u0432\u043C\u0435\u0441\u0442\u0435?</p>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/#contact",
          class: "btn btn-primary",
          onClick: closeArticle
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E`);
            } else {
              return [
                createTextVNode("\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const articles = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5367213"]]);

export { articles as default };
//# sourceMappingURL=articles-Bn8WhXRI.mjs.map
