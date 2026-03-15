/* ============================================================
   site-data.js
   LocalStorage-based data layer for the Site Constructor
   ============================================================ */

const SITE_DATA_KEY = 'vt_site_data';

// Default content (matches original index.html)
const DEFAULT_SITE_DATA = {
    heroTitle: "Пространство для вашего <br><em>внутреннего роста</em>",
    heroDesc: "Я — Виктория Терехова, психолог с нежным и профессиональным подходом. Помогаю справляться с тревожностью, выстраивать личные границы и находить путь к себе в спокойной, безопасной обстановке.",
    aboutTitle: "Здравствуйте, я — Виктория",
    aboutP1: "Я верю, что каждый человек несёт в себе огромный ресурс и способность к исцелению. Моя задача — создать для вас безопасное пространство, где вы сможете открыто говорить, исследовать себя и двигаться вперёд в своём темпе.",
    aboutP2: "Работаю в интегративном подходе, объединяя методы когнитивно-поведенческой терапии (КПТ) и гештальт-терапии. Это позволяет мне помогать с широким кругом запросов — от ситуативной тревоги до глубинных личностных паттернов.",
    aboutP3: "Образование: высшее психологическое, Московский государственный университет. Дополнительные сертификаты: КПТ (Berlin Institute), гештальт-терапия (МГИ), психосоматика.",

    // Personal Therapy
    perTitle: "Личная терапия",
    perSubtitle: "Работаем бережно и в вашем ритме, опираясь на ваши потребности.",
    perCard1Title: "Работа с самооценкой",
    perCard1Desc: "Учимся замечать свои сильные стороны. Помогаю выстроить внутреннюю опору и здоровую уверенность в себе.",
    perCard2Title: "Поиск себя и мотивация",
    perCard2Desc: "Исследуем ваши истинные желания. Находим смыслы, возвращаем энергию и радость к жизни.",
    perCard3Title: "Эмоциональное состояние",
    perCard3Desc: "Бережная работа с тревогой и стрессом. Находим инструменты для возвращения спокойствия.",

    // Family Therapy
    famTitle: "Семейная терапия",
    famSubtitle: "Работа со взрослыми и детьми в едином пространстве для восстановления доверия.",
    famCard1Title: "Терапия для пар",
    famCard1Desc: "Помощь в преодолении кризисов, восстановление доверия и навыка слышать друг друга.",
    famCard2Title: "Детская психология",
    famCard2Desc: "Работа с детскими страхами, возрастными кризисами и трудностями в обучении.",

    contactTg: "https://t.me/vikaterekhova",
    contactWa: "https://wa.me/79001234567"
};

/**
 * Returns the current site data or defaults if none exist.
 */
function getSiteData() {
    const raw = localStorage.getItem(SITE_DATA_KEY);
    if (!raw) {
        // We don't necessarily seed it immediately to save storage if unchanged, 
        // but we return defaults for rendering.
        return { ...DEFAULT_SITE_DATA };
    }
    try {
        return { ...DEFAULT_SITE_DATA, ...JSON.parse(raw) };
    } catch {
        return { ...DEFAULT_SITE_DATA };
    }
}

/**
 * Saves the site data object to localStorage.
 */
function saveSiteData(data) {
    localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data));
}
