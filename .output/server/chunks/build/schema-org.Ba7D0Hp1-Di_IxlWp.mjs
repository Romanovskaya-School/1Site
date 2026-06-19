import { e as defineSchemaOrgResolver } from './server.mjs';

const ratingResolver = defineSchemaOrgResolver({
  cast(node) {
    if (node === "number") {
      return {
        ratingValue: node
      };
    }
    return node;
  },
  defaults: {
    "@type": "Rating",
    "bestRating": 5,
    "worstRating": 1
  }
});

export { ratingResolver as r };
//# sourceMappingURL=schema-org.Ba7D0Hp1-Di_IxlWp.mjs.map
