import { ref } from 'vue'

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

const articles = ref([...DEFAULT_ARTICLES])
let loadedFromSupabase = false

export function useArticles() {
    const loadArticles = async () => {
        if (!import.meta.client || loadedFromSupabase) return { data: articles.value }
        try {
            const supabase = useSupabase()
            const { data, error } = await supabase.from('articles').select('*').order('date', { ascending: false })
            if (error) return { error }
            if (data.length) {
                articles.value = data.map(({ read_time, ...article }) => ({ ...article, readTime: read_time || '' }))
            }
            loadedFromSupabase = true
            return { data: articles.value }
        } catch (error) {
            return { error }
        }
    }

    const saveArticle = async (article) => {
        const idx = articles.value.findIndex(a => a.id === article.id)
        if (idx >= 0) {
            articles.value[idx] = article
        } else {
            articles.value.unshift(article)
        }
        try {
            const supabase = useSupabase()
            const payload = articles.value.map(({ readTime, ...article }) => ({
                ...article,
                read_time: readTime || null,
            }))
            const { error } = await supabase.from('articles').upsert(payload)
            return { error }
        } catch (error) {
            return { error }
        }
    }

    const deleteArticle = async (id) => {
        articles.value = articles.value.filter(a => a.id !== id)
        try {
            const supabase = useSupabase()
            const { error } = await supabase.from('articles').delete().eq('id', id)
            return { error }
        } catch (error) {
            return { error }
        }
    }
    
    return { articles, loadArticles, saveArticle, deleteArticle }
}
