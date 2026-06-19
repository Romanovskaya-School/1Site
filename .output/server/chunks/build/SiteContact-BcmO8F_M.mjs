import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as useSiteData } from './server.mjs';

const _sfc_main = {
  __name: "SiteContact",
  __ssrInlineRender: true,
  setup(__props) {
    const { siteData } = useSiteData();
    const form = ref({ name: "", phone: "", query: "" });
    const submitted = ref(false);
    const phoneError = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "contact",
        id: "contact"
      }, _attrs))}><div class="container"><div class="contact-inner"><div class="contact-info reveal-blur"><p class="section-label">\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F</p><h2 class="section-title">\u0421\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0433</h2><p class="section-subtitle">\u041E\u0442\u0432\u0435\u0447\u0443 \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0438 \u043F\u043E\u043C\u043E\u0433\u0443 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u043E\u0440\u043C\u0430\u0442.</p><div class="contact-links"><a${ssrRenderAttr("href", unref(siteData).contactTg)} class="contact-link" target="_blank"><span class="contact-link-icon">\u2708\uFE0F</span><div class="contact-link-text"><span>Telegram</span><strong>\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</strong></div></a><a${ssrRenderAttr("href", unref(siteData).contactWa)} class="contact-link" target="_blank"><span class="contact-link-icon">\u{1F4AC}</span><div class="contact-link-text"><span>WhatsApp</span><strong>\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</strong></div></a><a href="mailto:vika@terekhova.ru" class="contact-link"><span class="contact-link-icon">\u{1F4E7}</span><div class="contact-link-text"><span>Email</span><strong>vika@terekhova.ru</strong></div></a></div></div><div class="reveal-blur" style="${ssrRenderStyle({ "transition-delay": "0.15s" })}"><form class="contact-form"><h3 style="${ssrRenderStyle({ "font-family": "var(--font-head)", "font-size": "1.4rem", "color": "var(--text-dark)", "margin-bottom": "28px" })}">\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443</h3><div class="form-group"><label>\u0412\u0430\u0448\u0435 \u0438\u043C\u044F</label><input type="text"${ssrRenderAttr("value", form.value.name)} placeholder="\u0410\u043D\u043D\u0430" required></div><div class="form-group"><label>\u0422\u0435\u043B\u0435\u0444\u043E\u043D / Telegram</label><input type="text"${ssrRenderAttr("value", form.value.phone)} placeholder="+7 999 000-00-00" class="${ssrRenderClass({ "input-error": phoneError.value })}" required>`);
      if (phoneError.value) {
        _push(`<small style="${ssrRenderStyle({ "color": "#e74c3c", "font-size": "0.8rem", "margin-top": "4px", "display": "block" })}">\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group"><label>\u0421 \u0447\u0435\u043C \u0432\u044B \u0445\u043E\u0442\u0435\u043B\u0438 \u0431\u044B \u043F\u043E\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C?</label><textarea placeholder="\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044E \u0432 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u0441\u043B\u043E\u0432\u0430\u0445">${ssrInterpolate(form.value.query)}</textarea></div>`);
      if (!submitted.value) {
        _push(`<button type="submit" class="btn btn-primary form-submit">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u2192</button>`);
      } else {
        _push(`<!---->`);
      }
      if (submitted.value) {
        _push(`<div style="${ssrRenderStyle({ "color": "var(--accent)", "text-align": "center", "margin-top": "16px", "font-weight": "600" })}">\u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u0417\u0430\u044F\u0432\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteContact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SiteContact-BcmO8F_M.mjs.map
