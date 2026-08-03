export const statusRules = {
  published: { indexable: true, launchable: true },
  beta: { indexable: true, launchable: true },
  unavailable: { indexable: true, launchable: false },
  "in-development": { indexable: false, launchable: false },
  concept: { indexable: false, launchable: false }
};

export const statusLabels = {
  ja: {
    published: "公開中",
    beta: "ベータ版",
    unavailable: "一時利用不可",
    "in-development": "開発中",
    concept: "検討中"
  },
  en: {
    published: "Available",
    beta: "Beta",
    unavailable: "Unavailable",
    "in-development": "In development",
    concept: "Concept"
  }
};
