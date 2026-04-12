// ============================================
// TrustEat — Website JavaScript (Animated)
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

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Scroll reveal animations ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Fade up (default)
    document.querySelectorAll(
        '.problem-stats-bar, .comparison-table-wrapper, .cta-content, .steps-image'
    ).forEach(el => {
        el.classList.add('reveal', 'reveal-up');
        revealObserver.observe(el);
    });

    // Stagger cards - fade up with delay
    document.querySelectorAll(
        '.problem-card, .step-card, .advantage-card, .pricing-card, .team-card, .partner-card'
    ).forEach((el, i) => {
        el.classList.add('reveal', 'reveal-up');
        el.style.transitionDelay = `${(i % 4) * 0.12}s`;
        revealObserver.observe(el);
    });

    // Slide from left
    document.querySelectorAll('.solution-image, .design-content').forEach(el => {
        el.classList.add('reveal', 'reveal-left');
        revealObserver.observe(el);
    });

    // Slide from right
    document.querySelectorAll('.solution-content, .design-image').forEach(el => {
        el.classList.add('reveal', 'reveal-right');
        revealObserver.observe(el);
    });

    // Roadmap items - slide from left with stagger
    document.querySelectorAll('.roadmap-item').forEach((el, i) => {
        el.classList.add('reveal', 'reveal-left');
        el.style.transitionDelay = `${i * 0.2}s`;
        revealObserver.observe(el);
    });

    // Section headers - fade up
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('reveal', 'reveal-up');
        revealObserver.observe(el);
    });

    // --- Hero entrance animations ---
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    if (heroContent) heroContent.classList.add('hero-animate-in');
    if (heroImage) heroImage.classList.add('hero-image-animate-in');

    // --- Parallax removed for cleaner feel ---

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

    // --- Tilt effect on cards ---
    document.querySelectorAll(
        '.problem-card, .step-card, .advantage-card, .pricing-card, .team-card, .partner-card'
    ).forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // --- Magnetic effect on CTA buttons ---
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // --- Glow cursor effect on hero ---
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty('--glow-x', `${x}px`);
            hero.style.setProperty('--glow-y', `${y}px`);
        });
    }

    // --- Animated gradient on hero highlight ---
    const highlight = document.querySelector('.hero-title .highlight');
    if (highlight) {
        let hue = 210;
        function animateGradient() {
            hue = (hue + 0.3) % 360;
            const h1 = hue;
            const h2 = (hue + 30) % 360;
            highlight.style.backgroundImage = `linear-gradient(135deg, hsl(${h1}, 80%, 60%), hsl(${h2}, 85%, 65%))`;
            requestAnimationFrame(animateGradient);
        }
        animateGradient();
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

    // --- Form submission ---
    const form = document.getElementById('ctaForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Merci !';
            btn.style.background = '#10b981';
            btn.style.transform = 'scale(1.05)';
            input.value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.transform = '';
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
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('nav-active');
                } else {
                    link.classList.remove('nav-active');
                }
            }
        });
    });

    // --- Typing effect on hero subtitle ---
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const fullText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.visibility = 'visible';
        heroSubtitle.classList.add('typing-active');
        let charIndex = 0;

        setTimeout(() => {
            function typeChar() {
                if (charIndex < fullText.length) {
                    heroSubtitle.textContent += fullText[charIndex];
                    charIndex++;
                    setTimeout(typeChar, 18);
                } else {
                    heroSubtitle.classList.remove('typing-active');
                    heroSubtitle.classList.add('typing-done');
                }
            }
            typeChar();
        }, 800);
    }

    // --- Typing effect on section descriptions ---
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const fullText = el.getAttribute('data-text');
                el.textContent = '';
                el.classList.add('typing-active');
                let i = 0;

                function typeChar() {
                    if (i < fullText.length) {
                        el.textContent += fullText[i];
                        i++;
                        setTimeout(typeChar, 12);
                    } else {
                        el.classList.remove('typing-active');
                        el.classList.add('typing-done');
                    }
                }
                typeChar();
                typingObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-description, .solution-text').forEach(el => {
        el.setAttribute('data-text', el.textContent);
        el.textContent = '';
        typingObserver.observe(el);
    });

    // --- Floating particles in hero ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('hero-particles');
        heroSection.prepend(particleContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${6 + Math.random() * 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.width = particle.style.height = `${2 + Math.random() * 3}px`;
            particleContainer.appendChild(particle);
        }
    }
});
