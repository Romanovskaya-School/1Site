const REVIEWS_KEY = 'vt_reviews';

const DEFAULT_REVIEWS = [
    {
        id: 'rev-1',
        name: 'Анна М.',
        text: 'После нескольких месяцев работы с Викторией я наконец почувствовала, что понимаю себя. Тревога стала гораздо тише. Благодарна за безопасное пространство и искреннее внимание.',
        date: '2024',
        status: 'approved',
        avatarText: 'А'
    },
    {
        id: 'rev-2',
        name: 'Сергей Р.',
        text: 'Виктория помогла мне разобраться в запутанных отношениях с семьёй. Её подход очень тёплый и при этом профессиональный. Я научился говорить «нет» и не чувствовать себя виноватым.',
        date: '2025',
        status: 'approved',
        avatarText: 'С'
    },
    {
        id: 'rev-3',
        name: 'Елена К.',
        text: 'Онлайн-формат сначала казался необычным, но оказался очень удобным. Чувствуется, что Виктория по-настоящему слышит. Рекомендую всем, кто хочет понять себя лучше.',
        date: '2025',
        status: 'approved',
        avatarText: 'Е'
    }
];

function getReviews() {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) {
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(DEFAULT_REVIEWS));
        return DEFAULT_REVIEWS;
    }
    try {
        return JSON.parse(raw);
    } catch {
        return DEFAULT_REVIEWS;
    }
}

function saveReview(review) {
    const reviews = getReviews();
    const idx = reviews.findIndex(r => r.id === review.id);
    if (idx >= 0) {
        reviews[idx] = review;
    } else {
        reviews.unshift(review);
    }
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function deleteReview(id) {
    const reviews = getReviews().filter(r => r.id !== id);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function getApprovedReviews() {
    return getReviews().filter(r => r.status === 'approved');
}

function getPendingReviews() {
    return getReviews().filter(r => r.status === 'pending');
}

function generateReviewId() {
    return 'rev-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}
