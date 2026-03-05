const APPLICATIONS_KEY = 'vt_applications';

function getApplications() {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveApplication(app) {
    const apps = getApplications();
    const idx = apps.findIndex(a => a.id === app.id);
    if (idx >= 0) {
        apps[idx] = app;
    } else {
        apps.unshift(app);
    }
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

function deleteApplication(id) {
    const apps = getApplications().filter(a => a.id !== id);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

function generateAppId() {
    return 'app-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}
