import { ref, computed, resolveComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useArticles } from './useArticles-BhXlEuYO.mjs';
import { _ as _export_sfc, u as useHead, b as useSiteData } from './server.mjs';
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

const APPLICATIONS_KEY = "vt_applications";
const getApplications = () => {
  const raw = localStorage.getItem(APPLICATIONS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};
const applications = ref(getApplications());
function useApplications() {
  const saveApplication = (app) => {
    const idx = applications.value.findIndex((a) => a.id === app.id);
    if (idx >= 0) {
      applications.value[idx] = app;
    } else {
      applications.value.unshift(app);
    }
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications.value));
  };
  const deleteApplication = (id) => {
    applications.value = applications.value.filter((a) => a.id !== id);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications.value));
  };
  const generateAppId = () => {
    return "app-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
  };
  return {
    applications,
    saveApplication,
    deleteApplication,
    generateAppId
  };
}

const _sfc_main = {
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u041F\u0430\u043D\u0435\u043B\u044C \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0430\u0439\u0442\u043E\u043C"
    });
    const { articles } = useArticles();
    const { siteData } = useSiteData();
    const { applications } = useApplications();
    const isAuthenticated = ref(false);
    const password = ref("");
    const authError = ref(false);
    const activePage = ref("dashboard");
    const sidebarOpen = ref(false);
    const pendingDeleteId = ref(null);
    const pendingDeleteTestId = ref(null);
    const editArticle = ref({});
    const editTest = ref(null);
    const toastMessage = ref("");
    const toastType = ref("success");
    const pageTitle = computed(() => {
      const titles = {
        dashboard: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434",
        articles: "\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u044C\u0438",
        editor: editArticle.value.id ? "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E" : "\u041D\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0442\u044C\u044F",
        applications: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043A\u0443\u0440\u0441\u044B",
        tests: "\u0422\u0435\u0441\u0442\u044B \u043D\u0430 \u0441\u0430\u0439\u0442\u0435",
        testEditor: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0442\u0435\u0441\u0442\u0430"
      };
      return titles[activePage.value];
    });
    const categories = computed(() => {
      return [...new Set(articles.value.map((a) => a.category).filter(Boolean))];
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "\u2014";
      return new Date(dateStr).toLocaleDateString("ru-RU");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-wrapper" }, _attrs))} data-v-24cfa3df>`);
      if (!isAuthenticated.value) {
        _push(`<div id="authScreen" data-v-24cfa3df><div class="auth-card" data-v-24cfa3df><div class="auth-logo" data-v-24cfa3df>\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430</div><div class="auth-sub" data-v-24cfa3df>\u041F\u0430\u043D\u0435\u043B\u044C \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F</div><h2 data-v-24cfa3df>\u0412\u0445\u043E\u0434</h2><p data-v-24cfa3df>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E \u0441\u0430\u0439\u0442\u0430</p><div class="${ssrRenderClass([{ show: authError.value }, "auth-error"])}" data-v-24cfa3df>\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.</div><form data-v-24cfa3df><div class="auth-input-group" data-v-24cfa3df><label for="authPassword" data-v-24cfa3df>\u041F\u0430\u0440\u043E\u043B\u044C</label><input type="password" id="authPassword"${ssrRenderAttr("value", password.value)} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" autocomplete="current-password" required data-v-24cfa3df></div><button type="submit" class="btn btn-primary auth-submit" data-v-24cfa3df>\u0412\u043E\u0439\u0442\u0438 \u2192</button></form></div></div>`);
      } else {
        _push(`<div id="adminApp" class="${ssrRenderClass({ active: isAuthenticated.value })}" data-v-24cfa3df><aside class="${ssrRenderClass([{ open: sidebarOpen.value }, "sidebar"])}" data-v-24cfa3df><div class="sidebar-logo" data-v-24cfa3df><div class="logo-name" data-v-24cfa3df>\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430</div><div class="logo-sub" data-v-24cfa3df>\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \xB7 \u041E\u043D\u043B\u0430\u0439\u043D</div><div class="sidebar-admin-badge" data-v-24cfa3df>\u2699\uFE0F \u0410\u0434\u043C\u0438\u043D</div></div><nav class="sidebar-nav" data-v-24cfa3df><button class="${ssrRenderClass([{ active: activePage.value === "dashboard" }, "nav-item"])}" data-v-24cfa3df><span class="nav-icon" data-v-24cfa3df>\u{1F3E0}</span> \u0414\u0430\u0448\u0431\u043E\u0440\u0434 </button><button class="${ssrRenderClass([{ active: activePage.value === "articles" }, "nav-item"])}" data-v-24cfa3df><span class="nav-icon" data-v-24cfa3df>\u{1F4DD}</span> \u0421\u0442\u0430\u0442\u044C\u0438 </button><button class="${ssrRenderClass([{ active: activePage.value === "applications" }, "nav-item"])}" data-v-24cfa3df><span class="nav-icon" data-v-24cfa3df>\u{1F393}</span> \u0417\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043A\u0443\u0440\u0441\u044B </button><button class="${ssrRenderClass([{ active: activePage.value === "tests" || activePage.value === "testEditor" }, "nav-item"])}" data-v-24cfa3df><span class="nav-icon" data-v-24cfa3df>\u{1F4CB}</span> \u0422\u0435\u0441\u0442\u044B </button><button class="${ssrRenderClass([{ active: activePage.value === "settings" }, "nav-item"])}" data-v-24cfa3df><span class="nav-icon" data-v-24cfa3df>\u2699\uFE0F</span> \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0430\u0439\u0442\u0430 </button></nav><div class="sidebar-footer" data-v-24cfa3df>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/",
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u{1F310} \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0430\u0439\u0442`);
            } else {
              return [
                createTextVNode("\u{1F310} \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0430\u0439\u0442")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_router_link, {
          to: "/articles",
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u{1F4F0} \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441\u0442\u0430\u0442\u0435\u0439`);
            } else {
              return [
                createTextVNode("\u{1F4F0} \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441\u0442\u0430\u0442\u0435\u0439")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<a href="#" data-v-24cfa3df>\u{1F6AA} \u0412\u044B\u0439\u0442\u0438</a></div></aside><main class="admin-main" data-v-24cfa3df><div class="topbar" data-v-24cfa3df><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "12px" })}" data-v-24cfa3df><button class="sidebar-toggle" data-v-24cfa3df>\u2630</button><div class="topbar-title" data-v-24cfa3df>${ssrInterpolate(pageTitle.value)}</div></div><div class="topbar-actions" data-v-24cfa3df><button class="btn btn-primary btn-sm" data-v-24cfa3df> + \u041D\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0442\u044C\u044F </button></div></div><div class="${ssrRenderClass([{ active: activePage.value === "dashboard" }, "page"])}" data-v-24cfa3df><div class="stats-row" data-v-24cfa3df><div class="stat-card" data-v-24cfa3df><div class="stat-icon" data-v-24cfa3df>\u{1F4DD}</div><div class="stat-content" data-v-24cfa3df><div class="stat-number" data-v-24cfa3df>${ssrInterpolate(unref(articles).length)}</div><div class="stat-label" data-v-24cfa3df>\u0412\u0441\u0435\u0433\u043E \u0441\u0442\u0430\u0442\u0435\u0439</div></div></div><div class="stat-card" data-v-24cfa3df><div class="stat-icon" data-v-24cfa3df>\u{1F3F7}\uFE0F</div><div class="stat-content" data-v-24cfa3df><div class="stat-number" data-v-24cfa3df>${ssrInterpolate(categories.value.length)}</div><div class="stat-label" data-v-24cfa3df>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439</div></div></div><div class="stat-card" data-v-24cfa3df><div class="stat-icon" data-v-24cfa3df>\u{1F393}</div><div class="stat-content" data-v-24cfa3df><div class="stat-number" data-v-24cfa3df>${ssrInterpolate(unref(applications).length)}</div><div class="stat-label" data-v-24cfa3df>\u0417\u0430\u044F\u0432\u043E\u043A</div></div></div><div class="stat-card" data-v-24cfa3df><div class="stat-icon" data-v-24cfa3df>\u{1F310}</div><div class="stat-content" data-v-24cfa3df><div class="stat-number" data-v-24cfa3df>${ssrInterpolate(unref(siteData).visits || 0)}</div><div class="stat-label" data-v-24cfa3df>\u0417\u0430\u0445\u043E\u0434\u043E\u0432</div></div></div></div><div class="table-wrap" data-v-24cfa3df><div class="table-head" data-v-24cfa3df><h3 data-v-24cfa3df>\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438</h3><button class="btn btn-outline btn-sm" data-v-24cfa3df>\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u044C\u0438</button></div><table data-v-24cfa3df><thead data-v-24cfa3df><tr data-v-24cfa3df><th data-v-24cfa3df>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A</th><th data-v-24cfa3df>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</th><th data-v-24cfa3df>\u0414\u0430\u0442\u0430</th><th data-v-24cfa3df>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F</th></tr></thead><tbody data-v-24cfa3df>`);
        if (unref(articles).length === 0) {
          _push(`<tr data-v-24cfa3df><td colspan="4" style="${ssrRenderStyle({ "text-align": "center", "color": "var(--text-light)", "padding": "32px" })}" data-v-24cfa3df>\u0421\u0442\u0430\u0442\u0435\u0439 \u043D\u0435\u0442</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(articles).slice(0, 5), (a) => {
          _push(`<tr data-v-24cfa3df><td class="td-title" data-v-24cfa3df>${ssrInterpolate(a.title || "\u0411\u0435\u0437 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430")} <small data-v-24cfa3df>${ssrInterpolate((a.excerpt || "").slice(0, 60) + "\u2026")}</small></td><td data-v-24cfa3df><span class="cat-badge" data-v-24cfa3df>${ssrInterpolate(a.category || "\u2014")}</span></td><td data-v-24cfa3df>${ssrInterpolate(formatDate(a.date))}</td><td class="td-actions" data-v-24cfa3df><button class="btn btn-outline btn-sm" data-v-24cfa3df>\u270F\uFE0F</button><button class="btn btn-danger btn-sm" data-v-24cfa3df>\u{1F5D1}</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div><div class="${ssrRenderClass([{ active: activePage.value === "articles" }, "page"])}" data-v-24cfa3df><div class="table-wrap" data-v-24cfa3df><div class="table-head" data-v-24cfa3df><h3 data-v-24cfa3df>\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u044C\u0438</h3><button class="btn btn-primary btn-sm" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div><table data-v-24cfa3df><thead data-v-24cfa3df><tr data-v-24cfa3df><th data-v-24cfa3df>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A</th><th data-v-24cfa3df>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</th><th data-v-24cfa3df>\u0414\u0430\u0442\u0430</th><th data-v-24cfa3df>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F</th></tr></thead><tbody data-v-24cfa3df><!--[-->`);
        ssrRenderList(unref(articles), (a) => {
          _push(`<tr data-v-24cfa3df><td class="td-title" data-v-24cfa3df>${ssrInterpolate(a.title || "\u0411\u0435\u0437 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430")} <small data-v-24cfa3df>${ssrInterpolate((a.excerpt || "").slice(0, 60) + "\u2026")}</small></td><td data-v-24cfa3df><span class="cat-badge" data-v-24cfa3df>${ssrInterpolate(a.category || "\u2014")}</span></td><td data-v-24cfa3df>${ssrInterpolate(formatDate(a.date))}</td><td class="td-actions" data-v-24cfa3df><button class="btn btn-outline btn-sm" data-v-24cfa3df>\u270F\uFE0F \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</button><button class="btn btn-danger btn-sm" data-v-24cfa3df>\u{1F5D1}</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (unref(articles).length === 0) {
          _push(`<div class="empty-state" data-v-24cfa3df><div class="empty-icon" data-v-24cfa3df>\u{1F4ED}</div><p data-v-24cfa3df>\u0421\u0442\u0430\u0442\u0435\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E!</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="${ssrRenderClass([{ active: activePage.value === "editor" }, "page"])}" data-v-24cfa3df><div class="form-card" data-v-24cfa3df><form data-v-24cfa3df><div class="form-section-title" data-v-24cfa3df>\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0442\u0430\u0442\u044C\u0438</label><input type="text"${ssrRenderAttr("value", editArticle.value.title)} required data-v-24cfa3df></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438</label><div class="image-upload-wrap" data-v-24cfa3df><img${ssrRenderAttr("src", editArticle.value.image)} class="${ssrRenderClass([{ show: editArticle.value.image }, "image-preview"])}" data-v-24cfa3df><label class="image-upload-btn" data-v-24cfa3df><span data-v-24cfa3df>${ssrInterpolate(editArticle.value.image ? "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443" : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443")}</span><input type="file" accept="image/*" style="${ssrRenderStyle({ "display": "none" })}" data-v-24cfa3df></label>`);
        if (editArticle.value.image) {
          _push(`<button type="button" class="btn btn-danger btn-sm" data-v-24cfa3df>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-row" data-v-24cfa3df><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</label><input type="text"${ssrRenderAttr("value", editArticle.value.category)} list="categorySuggestions" required data-v-24cfa3df><datalist id="categorySuggestions" data-v-24cfa3df><!--[-->`);
        ssrRenderList(categories.value, (c) => {
          _push(`<option${ssrRenderAttr("value", c)} data-v-24cfa3df></option>`);
        });
        _push(`<!--]--></datalist></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0414\u0430\u0442\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438</label><input type="date"${ssrRenderAttr("value", editArticle.value.date)} required data-v-24cfa3df></div></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0412\u0440\u0435\u043C\u044F \u0447\u0442\u0435\u043D\u0438\u044F</label><input type="text"${ssrRenderAttr("value", editArticle.value.readTime)} placeholder="7 \u043C\u0438\u043D\u0443\u0442" data-v-24cfa3df></div><div class="form-section-title" data-v-24cfa3df>\u041A\u043E\u043D\u0442\u0435\u043D\u0442</div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</label><textarea rows="3" required data-v-24cfa3df>${ssrInterpolate(editArticle.value.excerpt)}</textarea></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u041F\u043E\u043B\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0441\u0442\u0430\u0442\u044C\u0438</label><textarea class="content-editor" required data-v-24cfa3df>${ssrInterpolate(editArticle.value.content)}</textarea></div><div class="form-actions" data-v-24cfa3df><button type="submit" class="btn btn-primary" data-v-24cfa3df>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E</button><button type="button" class="btn btn-outline" data-v-24cfa3df>\u041E\u0442\u043C\u0435\u043D\u0430</button></div></form></div></div><div class="${ssrRenderClass([{ active: activePage.value === "applications" }, "page"])}" data-v-24cfa3df><div class="table-wrap" data-v-24cfa3df><div class="table-head" data-v-24cfa3df><h3 data-v-24cfa3df>\u0417\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043A\u0443\u0440\u0441\u044B</h3></div><table data-v-24cfa3df><thead data-v-24cfa3df><tr data-v-24cfa3df><th data-v-24cfa3df>\u0418\u043C\u044F \u0438 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</th><th data-v-24cfa3df>\u041A\u0443\u0440\u0441 / \u0417\u0430\u043F\u0440\u043E\u0441</th><th data-v-24cfa3df>\u0421\u0442\u0430\u0442\u0443\u0441</th><th data-v-24cfa3df>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F</th></tr></thead><tbody data-v-24cfa3df><!--[-->`);
        ssrRenderList(unref(applications), (app) => {
          _push(`<tr data-v-24cfa3df><td class="td-title" data-v-24cfa3df><strong data-v-24cfa3df>${ssrInterpolate(app.name)}</strong><small data-v-24cfa3df>${ssrInterpolate(app.contact)}</small></td><td data-v-24cfa3df><strong data-v-24cfa3df>${ssrInterpolate(app.courseName || "")}</strong><small style="${ssrRenderStyle({ "margin-top": "4px" })}" data-v-24cfa3df>${ssrInterpolate(app.query || "")}</small>`);
          if (app.date) {
            _push(`<small data-v-24cfa3df>${ssrInterpolate(formatDate(app.date))}</small>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td data-v-24cfa3df><span class="cat-badge" style="${ssrRenderStyle({ background: app.status === "processed" ? "var(--success-bg)" : "var(--danger-bg)", color: app.status === "processed" ? "var(--success)" : "var(--danger)" })}" data-v-24cfa3df>${ssrInterpolate(app.status === "processed" ? "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u0430" : "\u041D\u043E\u0432\u0430\u044F")}</span></td><td class="td-actions" data-v-24cfa3df>`);
          if (app.status !== "processed") {
            _push(`<button class="btn btn-outline btn-sm" data-v-24cfa3df>\u2705 \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="btn btn-danger btn-sm" data-v-24cfa3df>\u{1F5D1} \u0423\u0434\u0430\u043B\u0438\u0442\u044C</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (unref(applications).length === 0) {
          _push(`<div class="empty-state" data-v-24cfa3df><div class="empty-icon" data-v-24cfa3df>\u{1F393}</div><p data-v-24cfa3df>\u0417\u0430\u044F\u0432\u043E\u043A \u043F\u043E\u043A\u0430 \u043D\u0435\u0442.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="${ssrRenderClass([{ active: activePage.value === "tests" }, "page"])}" data-v-24cfa3df><div class="table-wrap" data-v-24cfa3df><div class="table-head" data-v-24cfa3df><h3 data-v-24cfa3df>\u0422\u0435\u0441\u0442\u044B \u043D\u0430 \u0441\u0430\u0439\u0442\u0435</h3><button class="btn btn-primary btn-sm" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u0441\u0442</button></div><table data-v-24cfa3df><thead data-v-24cfa3df><tr data-v-24cfa3df><th data-v-24cfa3df>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</th><th data-v-24cfa3df>\u0412\u043E\u043F\u0440\u043E\u0441\u043E\u0432</th><th data-v-24cfa3df>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F</th></tr></thead><tbody data-v-24cfa3df><!--[-->`);
        ssrRenderList(unref(siteData).tests, (t) => {
          _push(`<tr data-v-24cfa3df><td class="td-title" data-v-24cfa3df>${ssrInterpolate(t.title)}</td><td data-v-24cfa3df><span class="cat-badge" data-v-24cfa3df>${ssrInterpolate(t.questions.length)}</span></td><td class="td-actions" data-v-24cfa3df><button class="btn btn-outline btn-sm" data-v-24cfa3df>\u270F\uFE0F \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</button><button class="btn btn-danger btn-sm" style="${ssrRenderStyle({ "margin-left": "8px" })}" data-v-24cfa3df>\u{1F5D1}</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div><div class="${ssrRenderClass([{ active: activePage.value === "testEditor" }, "page"])}" data-v-24cfa3df>`);
        if (editTest.value) {
          _push(`<div class="form-card" data-v-24cfa3df><form data-v-24cfa3df><div class="form-section-title" data-v-24cfa3df>\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u0435\u0441\u0442\u0430</label><input type="text"${ssrRenderAttr("value", editTest.value.title)} required data-v-24cfa3df></div><div class="form-section-title" data-v-24cfa3df> \u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u043E\u0432 `);
          if (editTest.value.options) {
            _push(`<button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "16px" })}" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>`);
          } else {
            _push(`<!---->`);
          }
          if (editTest.value.options) {
            _push(`<button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "12px", "color": "#e74c3c" })}" data-v-24cfa3df>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (!editTest.value.options) {
            _push(`<div style="${ssrRenderStyle({ "margin-bottom": "16px" })}" data-v-24cfa3df><p style="${ssrRenderStyle({ "font-size": "0.85rem", "color": "var(--text-light)", "margin-bottom": "8px" })}" data-v-24cfa3df>\u0414\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0442\u0435\u0441\u0442\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B (\u0412\u0441\u0435\u0433\u0434\u0430, \u0427\u0430\u0441\u0442\u043E, \u0418\u043D\u043E\u0433\u0434\u0430...). \u0425\u043E\u0442\u0438\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0432\u043E\u0438 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u0431\u0430\u043B\u043B\u043E\u0432?</p><button type="button" class="btn btn-primary btn-sm" data-v-24cfa3df>\u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B</button></div>`);
          } else {
            _push(`<div class="options-container" style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "8px", "margin-bottom": "24px" })}" data-v-24cfa3df><!--[-->`);
            ssrRenderList(editTest.value.options, (opt, idx) => {
              _push(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center", "background": "var(--bg-alt)", "padding": "8px 12px", "border-radius": "8px" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "flex": "2" })}" data-v-24cfa3df><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-24cfa3df>\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430</label><input type="text"${ssrRenderAttr("value", editTest.value.options[idx].text)} required style="${ssrRenderStyle({ "padding": "4px 8px" })}" data-v-24cfa3df></div><div style="${ssrRenderStyle({ "flex": "1" })}" data-v-24cfa3df><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-24cfa3df>\u0411\u0430\u043B\u043B</label><input type="number" step="0.1"${ssrRenderAttr("value", editTest.value.options[idx].value)} required style="${ssrRenderStyle({ "padding": "4px 8px" })}" data-v-24cfa3df></div><div style="${ssrRenderStyle({ "flex": "1" })}" data-v-24cfa3df><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-24cfa3df>\u0420\u0435\u0432\u0435\u0440\u0441. \u0431\u0430\u043B\u043B</label><input type="number" step="0.1"${ssrRenderAttr("value", editTest.value.options[idx].reverseValue)} required style="${ssrRenderStyle({ "padding": "4px 8px" })}" data-v-24cfa3df></div><button type="button" class="btn btn-danger btn-sm" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-24cfa3df>\u{1F5D1}</button></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`<div class="form-section-title" data-v-24cfa3df> \u0412\u043E\u043F\u0440\u043E\u0441\u044B (${ssrInterpolate(editTest.value.questions.length)}) <button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "16px" })}" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div><!--[-->`);
          ssrRenderList(editTest.value.questions, (q, i) => {
            _push(`<div class="form-group" style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "flex-start", "flex-wrap": "wrap", "background": "var(--bg-alt)", "padding": "12px", "border-radius": "8px" })}" data-v-24cfa3df><span style="${ssrRenderStyle({ "padding-top": "8px", "font-weight": "bold", "width": "24px" })}" data-v-24cfa3df>${ssrInterpolate(i + 1)}.</span><div style="${ssrRenderStyle({ "flex": "1", "display": "flex", "flex-direction": "column", "gap": "8px" })}" data-v-24cfa3df><textarea rows="2" required placeholder="\u0422\u0435\u043A\u0441\u0442 \u0432\u043E\u043F\u0440\u043E\u0441\u0430" data-v-24cfa3df>${ssrInterpolate(editTest.value.questions[i].text)}</textarea><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center" })}" data-v-24cfa3df><label style="${ssrRenderStyle({ "font-size": "0.85rem", "color": "var(--text-mid)" })}" data-v-24cfa3df>\u0422\u0438\u043F \u043F\u043E\u0434\u0441\u0447\u0435\u0442\u0430:</label><select style="${ssrRenderStyle({ "padding": "4px 8px", "border-radius": "4px", "border": "1px solid var(--border)" })}" data-v-24cfa3df><option value="normal" data-v-24cfa3df${ssrIncludeBooleanAttr(Array.isArray(editTest.value.questions[i].type) ? ssrLooseContain(editTest.value.questions[i].type, "normal") : ssrLooseEqual(editTest.value.questions[i].type, "normal")) ? " selected" : ""}>\u041E\u0431\u044B\u0447\u043D\u044B\u0439 (\u043F\u0440\u044F\u043C\u043E\u0439 \u0431\u0430\u043B\u043B)</option><option value="reverse" data-v-24cfa3df${ssrIncludeBooleanAttr(Array.isArray(editTest.value.questions[i].type) ? ssrLooseContain(editTest.value.questions[i].type, "reverse") : ssrLooseEqual(editTest.value.questions[i].type, "reverse")) ? " selected" : ""}>\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 (\u0440\u0435\u0432\u0435\u0440\u0441. \u0431\u0430\u043B\u043B)</option><option value="ignore" data-v-24cfa3df${ssrIncludeBooleanAttr(Array.isArray(editTest.value.questions[i].type) ? ssrLooseContain(editTest.value.questions[i].type, "ignore") : ssrLooseEqual(editTest.value.questions[i].type, "ignore")) ? " selected" : ""}>\u041D\u0435 \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F</option></select></div></div><button type="button" class="btn btn-danger btn-sm" data-v-24cfa3df>\u{1F5D1}</button></div>`);
          });
          _push(`<!--]--><div class="form-section-title" data-v-24cfa3df> \u041F\u043E\u0434\u0441\u0447\u0435\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 `);
          if (!editTest.value.scales || editTest.value.scales.length === 0) {
            _push(`<button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "16px" })}" data-v-24cfa3df>\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043D\u0430 \u0441\u043B\u043E\u0436\u043D\u0443\u044E \u0448\u043A\u0430\u043B\u0443</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (!editTest.value.scales || editTest.value.scales.length === 0) {
            _push(`<div data-v-24cfa3df><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "margin-bottom": "12px" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-24cfa3df>\u041F\u043E\u0440\u043E\u0433\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 (${ssrInterpolate(((_a = editTest.value.results) == null ? void 0 : _a.length) || 0)})</div>`);
            if (editTest.value.results && editTest.value.results.length < 5) {
              _push(`<button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "16px" })}" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0440\u043E\u0433</button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><p style="${ssrRenderStyle({ "font-size": "0.85rem", "color": "var(--text-light)", "margin-bottom": "16px" })}" data-v-24cfa3df>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0431\u0430\u043B\u043B, \u043F\u0440\u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0438 \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0430 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F. \u041F\u043E\u0440\u043E\u0433\u0438 \u0434\u043E\u043B\u0436\u043D\u044B \u0438\u0434\u0442\u0438 \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 10, 20, 30, 999).</p><!--[-->`);
            ssrRenderList(editTest.value.results, (r, i) => {
              _push(`<div class="form-group" style="${ssrRenderStyle({ "background": "var(--bg-alt)", "padding": "16px", "border-radius": "var(--radius-sm)", "border": "1px solid var(--border)", "position": "relative" })}" data-v-24cfa3df>`);
              if (editTest.value.results && editTest.value.results.length > 1) {
                _push(`<button type="button" class="btn btn-danger btn-sm" style="${ssrRenderStyle({ "position": "absolute", "top": "12px", "right": "12px" })}" data-v-24cfa3df>\u{1F5D1}</button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div style="${ssrRenderStyle({ "font-weight": "600", "margin-bottom": "8px" })}" data-v-24cfa3df>\u041F\u043E\u0440\u043E\u0433 ${ssrInterpolate(i + 1)}</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "16px" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "width": "120px" })}" data-v-24cfa3df><label data-v-24cfa3df>\u0414\u043E (\u0431\u0430\u043B\u043B\u043E\u0432)</label><input type="number" step="0.1"${ssrRenderAttr("value", editTest.value.results[i].max)} required data-v-24cfa3df></div><div style="${ssrRenderStyle({ "flex": "1" })}" data-v-24cfa3df><label data-v-24cfa3df>\u0422\u0435\u043A\u0441\u0442 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 (\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 HTML)</label><input type="text"${ssrRenderAttr("value", editTest.value.results[i].text)} required data-v-24cfa3df></div></div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<div data-v-24cfa3df><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "margin-bottom": "16px" })}" data-v-24cfa3df><button type="button" class="btn btn-primary btn-sm" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0448\u043A\u0430\u043B\u0443</button><button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "auto" })}" data-v-24cfa3df>\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u043B\u043E\u0436\u043D\u044B\u0435 \u0448\u043A\u0430\u043B\u044B</button></div><!--[-->`);
            ssrRenderList(editTest.value.scales, (scale, sIdx) => {
              var _a2, _b2;
              _push(`<div style="${ssrRenderStyle({ "background": "var(--bg-alt)", "padding": "16px", "border-radius": "var(--radius-sm)", "border": "1px solid var(--border)", "margin-bottom": "24px", "position": "relative" })}" data-v-24cfa3df><button type="button" class="btn btn-danger btn-sm" style="${ssrRenderStyle({ "position": "absolute", "top": "12px", "right": "12px" })}" data-v-24cfa3df>\u{1F5D1} \u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0448\u043A\u0430\u043B\u0443</button><h4 style="${ssrRenderStyle({ "margin-bottom": "16px" })}" data-v-24cfa3df>\u0428\u043A\u0430\u043B\u0430 ${ssrInterpolate(sIdx + 1)}</h4><div style="${ssrRenderStyle({ "display": "flex", "gap": "16px", "margin-bottom": "16px", "flex-wrap": "wrap" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "flex": "2", "min-width": "200px" })}" data-v-24cfa3df><label data-v-24cfa3df>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0448\u043A\u0430\u043B\u044B</label><input type="text"${ssrRenderAttr("value", editTest.value.scales[sIdx].name)} required data-v-24cfa3df></div><div style="${ssrRenderStyle({ "flex": "1", "min-width": "100px" })}" data-v-24cfa3df><label data-v-24cfa3df>\u0412\u043E\u043F\u0440\u043E\u0441\u044B \u0441 \u2116</label><input type="number"${ssrRenderAttr("value", (((_a2 = editTest.value.scales[sIdx].range) == null ? void 0 : _a2[0]) || 0) + 1)} required data-v-24cfa3df></div><div style="${ssrRenderStyle({ "flex": "1", "min-width": "100px" })}" data-v-24cfa3df><label data-v-24cfa3df>\u043F\u043E \u2116</label><input type="number"${ssrRenderAttr("value", (((_b2 = editTest.value.scales[sIdx].range) == null ? void 0 : _b2[1]) || 0) + 1)} required data-v-24cfa3df></div><div style="${ssrRenderStyle({ "flex": "1", "min-width": "100px" })}" data-v-24cfa3df><label data-v-24cfa3df>\u0414\u0435\u043B\u0438\u0442\u0435\u043B\u044C</label><input type="number" step="0.1"${ssrRenderAttr("value", editTest.value.scales[sIdx].divider)} required data-v-24cfa3df></div></div><div style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.5)", "padding": "12px", "border-radius": "8px" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "margin-bottom": "12px" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "font-weight": "600", "font-size": "0.9rem" })}" data-v-24cfa3df>\u041F\u043E\u0440\u043E\u0433\u0438 \u0448\u043A\u0430\u043B\u044B</div><button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "16px" })}" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0440\u043E\u0433</button></div><!--[-->`);
              ssrRenderList(editTest.value.scales[sIdx].results, (r, i) => {
                _push(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center", "margin-bottom": "8px" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "width": "100px" })}" data-v-24cfa3df><input type="number" step="0.1"${ssrRenderAttr("value", editTest.value.scales[sIdx].results[i].max)} placeholder="\u041C\u0430\u043A\u0441. \u0431\u0430\u043B\u043B" required data-v-24cfa3df></div><div style="${ssrRenderStyle({ "flex": "1" })}" data-v-24cfa3df><input type="text"${ssrRenderAttr("value", editTest.value.scales[sIdx].results[i].text)} placeholder="\u0422\u0435\u043A\u0441\u0442 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438" required data-v-24cfa3df></div><button type="button" class="btn btn-danger btn-sm" data-v-24cfa3df>\u{1F5D1}</button></div>`);
              });
              _push(`<!--]--></div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`<div class="form-actions" style="${ssrRenderStyle({ "margin-top": "32px" })}" data-v-24cfa3df><button type="submit" class="btn btn-primary" data-v-24cfa3df>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u0441\u0442</button><button type="button" class="btn btn-outline" data-v-24cfa3df>\u041E\u0442\u043C\u0435\u043D\u0430</button></div></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="${ssrRenderClass([{ active: activePage.value === "settings" }, "page"])}" data-v-24cfa3df><div class="form-card" data-v-24cfa3df><h3 data-v-24cfa3df>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u043D\u0435\u0448\u043D\u0435\u0433\u043E \u0432\u0438\u0434\u0430 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430</h3><div class="form-section-title" data-v-24cfa3df>\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435</div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u0444\u043E\u0442\u043E \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u043E\u043C \u044D\u043A\u0440\u0430\u043D\u0435 (Hero Image)</label><div class="image-upload-wrap" data-v-24cfa3df><img${ssrRenderAttr("src", unref(siteData).heroImage)} class="${ssrRenderClass([{ show: unref(siteData).heroImage }, "image-preview"])}" style="${ssrRenderStyle({ "width": "100px", "height": "130px", "object-fit": "cover", "border-radius": "8px" })}" data-v-24cfa3df><label class="image-upload-btn" data-v-24cfa3df><span data-v-24cfa3df>${ssrInterpolate(unref(siteData).heroImage ? "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E" : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E")}</span><input type="file" accept="image/*" style="${ssrRenderStyle({ "display": "none" })}" data-v-24cfa3df></label>`);
        if (unref(siteData).heroImage) {
          _push(`<button type="button" class="btn btn-danger btn-sm" data-v-24cfa3df>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0424\u043E\u0442\u043E \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B &quot;\u041E\u0431\u043E \u043C\u043D\u0435&quot; (About Image)</label><div class="image-upload-wrap" data-v-24cfa3df><img${ssrRenderAttr("src", unref(siteData).aboutImage)} class="${ssrRenderClass([{ show: unref(siteData).aboutImage }, "image-preview"])}" style="${ssrRenderStyle({ "width": "100px", "height": "130px", "object-fit": "cover", "border-radius": "8px" })}" data-v-24cfa3df><label class="image-upload-btn" data-v-24cfa3df><span data-v-24cfa3df>${ssrInterpolate(unref(siteData).aboutImage ? "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E" : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E")}</span><input type="file" accept="image/*" style="${ssrRenderStyle({ "display": "none" })}" data-v-24cfa3df></label>`);
        if (unref(siteData).aboutImage) {
          _push(`<button type="button" class="btn btn-danger btn-sm" data-v-24cfa3df>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0424\u043E\u0442\u043E \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B &quot;\u0420\u041F\u041F&quot; (RPP Image)</label><div class="image-upload-wrap" data-v-24cfa3df><img${ssrRenderAttr("src", unref(siteData).rppImage)} class="${ssrRenderClass([{ show: unref(siteData).rppImage }, "image-preview"])}" style="${ssrRenderStyle({ "width": "100px", "height": "130px", "object-fit": "cover", "border-radius": "8px" })}" data-v-24cfa3df><label class="image-upload-btn" data-v-24cfa3df><span data-v-24cfa3df>${ssrInterpolate(unref(siteData).rppImage ? "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E" : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E")}</span><input type="file" accept="image/*" style="${ssrRenderStyle({ "display": "none" })}" data-v-24cfa3df></label>`);
        if (unref(siteData).rppImage) {
          _push(`<button type="button" class="btn btn-danger btn-sm" data-v-24cfa3df>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-section-title" data-v-24cfa3df>\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0433\u043B\u0430\u0432\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430 (Hero Title - \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 HTML \u0442\u0435\u0433 &lt;em&gt; \u0434\u043B\u044F \u043A\u0443\u0440\u0441\u0438\u0432\u0430)</label><input type="text"${ssrRenderAttr("value", unref(siteData).heroTitle)} placeholder="\u0411\u0435\u0440\u0435\u0436\u043D\u0430\u044F \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u043C\u043E\u0449\u044C &lt;em&gt;\u043E\u043D\u043B\u0430\u0439\u043D&lt;/em&gt;" required style="${ssrRenderStyle({ "width": "100%", "padding": "10px", "border": "1.5px solid rgba(72, 164, 165, 0.22)", "border-radius": "8px", "background": "var(--cream)", "outline": "none", "font-family": "inherit", "font-size": "0.95rem", "color": "var(--text-dark)" })}" data-v-24cfa3df></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0433\u043B\u0430\u0432\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430 (Hero Description)</label><textarea rows="3" placeholder="\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430..." required style="${ssrRenderStyle({ "width": "100%", "padding": "10px", "border": "1.5px solid rgba(72, 164, 165, 0.22)", "border-radius": "8px", "background": "var(--cream)", "outline": "none", "font-family": "inherit", "font-size": "0.95rem", "color": "var(--text-dark)", "resize": "vertical" })}" data-v-24cfa3df>${ssrInterpolate(unref(siteData).heroDesc)}</textarea></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0418\u043C\u044F/\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 &quot;\u041E\u0431\u043E \u043C\u043D\u0435&quot;</label><input type="text"${ssrRenderAttr("value", unref(siteData).aboutTitle)} placeholder="\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u0422\u0435\u0440\u0435\u0445\u043E\u0432\u0430" required style="${ssrRenderStyle({ "width": "100%", "padding": "10px", "border": "1.5px solid rgba(72, 164, 165, 0.22)", "border-radius": "8px", "background": "var(--cream)", "outline": "none", "font-family": "inherit", "font-size": "0.95rem", "color": "var(--text-dark)" })}" data-v-24cfa3df></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0410\u0431\u0437\u0430\u0446 1 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B &quot;\u041E\u0431\u043E \u043C\u043D\u0435&quot; (\u041F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435)</label><textarea rows="3" placeholder="\u041F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0438 \u043E\u0431\u0449\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F..." required style="${ssrRenderStyle({ "width": "100%", "padding": "10px", "border": "1.5px solid rgba(72, 164, 165, 0.22)", "border-radius": "8px", "background": "var(--cream)", "outline": "none", "font-family": "inherit", "font-size": "0.95rem", "color": "var(--text-dark)", "resize": "vertical" })}" data-v-24cfa3df>${ssrInterpolate(unref(siteData).aboutP1)}</textarea></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0410\u0431\u0437\u0430\u0446 2 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B &quot;\u041E\u0431\u043E \u043C\u043D\u0435&quot; (\u041F\u043E\u0434\u0445\u043E\u0434\u044B / \u041E\u043F\u044B\u0442)</label><textarea rows="3" placeholder="\u041E\u043F\u044B\u0442, \u043C\u0435\u0442\u043E\u0434\u044B \u0440\u0430\u0431\u043E\u0442\u044B, \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u044B..." required style="${ssrRenderStyle({ "width": "100%", "padding": "10px", "border": "1.5px solid rgba(72, 164, 165, 0.22)", "border-radius": "8px", "background": "var(--cream)", "outline": "none", "font-family": "inherit", "font-size": "0.95rem", "color": "var(--text-dark)", "resize": "vertical" })}" data-v-24cfa3df>${ssrInterpolate(unref(siteData).aboutP2)}</textarea></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 Telegram (\u043F\u043E\u043B\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430)</label><input type="text"${ssrRenderAttr("value", unref(siteData).contactTg)} placeholder="https://t.me/username" required style="${ssrRenderStyle({ "width": "100%", "padding": "10px", "border": "1.5px solid rgba(72, 164, 165, 0.22)", "border-radius": "8px", "background": "var(--cream)", "outline": "none", "font-family": "inherit", "font-size": "0.95rem", "color": "var(--text-dark)" })}" data-v-24cfa3df></div><div class="form-group" data-v-24cfa3df><label data-v-24cfa3df>\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 WhatsApp (\u043F\u043E\u043B\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430)</label><input type="text"${ssrRenderAttr("value", unref(siteData).contactWa)} placeholder="https://wa.me/79991234567" required style="${ssrRenderStyle({ "width": "100%", "padding": "10px", "border": "1.5px solid rgba(72, 164, 165, 0.22)", "border-radius": "8px", "background": "var(--cream)", "outline": "none", "font-family": "inherit", "font-size": "0.95rem", "color": "var(--text-dark)" })}" data-v-24cfa3df></div><div class="form-section-title" data-v-24cfa3df> \u0414\u0438\u043F\u043B\u043E\u043C\u044B \u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B (${ssrInterpolate(((_b = unref(siteData).diplomas) == null ? void 0 : _b.length) || 0)}) <button type="button" class="btn btn-outline btn-sm" style="${ssrRenderStyle({ "margin-left": "16px" })}" data-v-24cfa3df>+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0438\u043F\u043B\u043E\u043C</button></div><div class="diplomas-container" style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "16px", "margin-bottom": "24px", "margin-top": "16px" })}" data-v-24cfa3df><!--[-->`);
        ssrRenderList(unref(siteData).diplomas, (dip, idx) => {
          _push(`<div style="${ssrRenderStyle({ "background": "var(--cream)", "padding": "16px", "border-radius": "12px", "border": "1.5px solid rgba(72, 164, 165, 0.22)" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "display": "flex", "gap": "16px", "align-items": "flex-start", "flex-wrap": "wrap" })}" data-v-24cfa3df><div style="${ssrRenderStyle({ "width": "120px" })}" data-v-24cfa3df><img${ssrRenderAttr("src", dip.image)} class="${ssrRenderClass([{ show: dip.image }, "image-preview"])}" style="${ssrRenderStyle({ "width": "100px", "height": "130px", "object-fit": "cover", "border-radius": "8px" })}" data-v-24cfa3df><label class="image-upload-btn btn-sm" style="${ssrRenderStyle({ "margin-top": "8px", "width": "100px", "justify-content": "center", "padding": "6px", "cursor": "pointer" })}" data-v-24cfa3df><span style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-24cfa3df>\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C</span><input type="file" accept="image/*" style="${ssrRenderStyle({ "display": "none" })}" data-v-24cfa3df></label></div><div style="${ssrRenderStyle({ "flex": "1", "display": "flex", "flex-direction": "column", "gap": "8px" })}" data-v-24cfa3df><label style="${ssrRenderStyle({ "font-weight": "600", "font-size": "0.85rem", "color": "var(--text-mid)" })}" data-v-24cfa3df>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u0438\u043F\u043B\u043E\u043C\u0430 / \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430</label><input type="text"${ssrRenderAttr("value", unref(siteData).diplomas[idx].title)} placeholder="\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u041A\u041F\u0422" required style="${ssrRenderStyle({ "width": "100%", "padding": "8px", "border": "1px solid rgba(72, 164, 165, 0.22)", "border-radius": "6px", "background": "var(--cream)", "outline": "none" })}" data-v-24cfa3df></div><button type="button" class="btn btn-danger btn-sm" style="${ssrRenderStyle({ "align-self": "center" })}" data-v-24cfa3df>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0438\u043F\u043B\u043E\u043C</button></div></div>`);
        });
        _push(`<!--]--></div><div class="form-actions" data-v-24cfa3df><button type="button" class="btn btn-primary" data-v-24cfa3df>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F</button></div></div></div></main></div>`);
      }
      _push(`<div id="confirmModal" class="${ssrRenderClass({ open: pendingDeleteId.value || pendingDeleteTestId.value })}" data-v-24cfa3df><div class="modal-card" data-v-24cfa3df>`);
      if (pendingDeleteId.value) {
        _push(`<h3 data-v-24cfa3df>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E?</h3>`);
      } else {
        _push(`<h3 data-v-24cfa3df>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0435\u0441\u0442?</h3>`);
      }
      _push(`<p data-v-24cfa3df>\u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C. \u0417\u0430\u043F\u0438\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u0430 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430.</p><div class="modal-actions" data-v-24cfa3df><button class="btn btn-danger" data-v-24cfa3df>\u0414\u0430, \u0443\u0434\u0430\u043B\u0438\u0442\u044C</button><button class="btn btn-outline" data-v-24cfa3df>\u041E\u0442\u043C\u0435\u043D\u0430</button></div></div></div><div id="toast" class="${ssrRenderClass([toastType.value, { show: toastMessage.value }])}" data-v-24cfa3df>${ssrInterpolate(toastMessage.value)}</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-24cfa3df"]]);

export { admin as default };
//# sourceMappingURL=admin-BiFS6bOZ.mjs.map
