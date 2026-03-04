/* ============================================================
   Main JS — Scroll Reveal, Sticky Header, Mobile Nav, Form
   ============================================================ */

// ── Sticky Header ──────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ── Scroll Reveal ──────────────────────────────────────────
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

// ── Mobile Navigation ──────────────────────────────────────
function openMobileNav() {
    document.getElementById('mobileNav').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('open');
    document.body.style.overflow = '';
}

const mobileNavClose = document.getElementById('mobileNavClose');
if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
}

// Close mobile nav on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});

// ── Form Submission ────────────────────────────────────────
function handleSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '✓ Заявка отправлена!';
    btn.style.background = 'var(--sage-dark)';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        event.target.reset();
    }, 3500);
}

// ── Smooth Scroll for anchor links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Parallax blobs on hero (subtle) ───────────────────────
const blobs = document.querySelectorAll('.blob');
if (blobs.length) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        blobs.forEach((blob, i) => {
            const factor = i % 2 === 0 ? 1 : -1;
            blob.style.transform = `translate(${x * factor * 0.3}px, ${y * factor * 0.3}px)`;
        });
    }, { passive: true });
}
