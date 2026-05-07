import { ref } from 'vue'

const STORAGE_KEY = 'vt_articles'

const DEFAULT_ARTICLES = [
    {
        id: 'article-1',
        title: 'Как справиться с тревожностью: практические шаги',
        category: 'Тревога',
        excerpt: 'Тревога — это нормальная реакция организма, но когда она становится постоянной, важно знать, как с ней работать...',
        image: 'images/article-anxiety.png',
        date: '2026-02-28',
        views: 120
    },
    {
        id: 'article-2',
        title: 'Личные границы: как научиться говорить «нет»',
        category: 'Отношения',
        excerpt: 'Умение отказывать — это не эгоизм, а забота о себе. Разбираемся, почему слово «нет» так сложно даётся...',
        image: 'images/article-boundaries.png',
        date: '2026-02-15',
        views: 85
    },
    {
        id: 'article-3',
        title: 'Путь к себе: зачем нужна психотерапия',
        category: 'О терапии',
        excerpt: 'Многие задаются вопросом: зачем идти к психологу, если можно справиться самому? Развенчиваем три главных мифа...',
        image: 'images/article-therapy.png',
        date: '2026-02-02',
        views: 200
    }
]

export function useArticles() {
    const articles = ref([])
    
    const loadArticles = () => {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES))
            articles.value = DEFAULT_ARTICLES
        } else {
            try {
                articles.value = JSON.parse(raw)
            } catch {
                articles.value = DEFAULT_ARTICLES
            }
        }
    }
    
    const saveArticle = (article) => {
        const idx = articles.value.findIndex(a => a.id === article.id)
        if (idx >= 0) {
            articles.value[idx] = article
        } else {
            articles.value.unshift(article)
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(articles.value))
    }

    const deleteArticle = (id) => {
        articles.value = articles.value.filter(a => a.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(articles.value))
    }
    
    loadArticles()
    
    return { articles, loadArticles, saveArticle, deleteArticle }
}
