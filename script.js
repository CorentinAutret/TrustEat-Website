// ============================================
// TrustEat — Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Scroll animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.problem-card, .step-card, .advantage-card, .pricing-card, ' +
        '.team-card, .partner-card, .roadmap-item, ' +
        '.solution-layout, .design-layout, .steps-image, ' +
        '.problem-stats-bar, .comparison-table-wrapper, .cta-content'
    );

    animateElements.forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(i % 4) * 0.1}s`;
        observer.observe(el);
    });

    // --- Counter animation ---
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();
        const isDecimal = target % 1 !== 0;

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // --- Form submission (placeholder) ---
    const form = document.getElementById('ctaForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Merci !';
            btn.style.background = '#10b981';
            input.value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                link.style.color = (scrollY >= top && scrollY < top + height)
                    ? '#3b82f6'
                    : '';
            }
        });
    });
});
