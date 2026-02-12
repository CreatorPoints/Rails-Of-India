 // === Navbar scroll effect ===
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
        // === Mobile menu ===
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
        function closeMobile() {
            mobileMenu.classList.remove('open');
        }
        // === Subtle hero parallax on scroll ===
        const heroBg = document.getElementById('hero-bg');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
            }
        });
        // === Scroll-triggered section reveals ===
        const revealElements = document.querySelectorAll('.section-reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation for sibling cards
                    const parent = entry.target.parentElement;
                    const siblings = parent.querySelectorAll('.section-reveal');
                    if (siblings.length > 1) {
                        const idx = Array.from(siblings).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${idx * 0.1}s`;
                    }
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));
        // === Animated stat counters ===
        const statNumbers = document.querySelectorAll('.stat-number');
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    const suffix = el.dataset.suffix || '';
                    const duration = 2000;
                    const startTime = performance.now();
                    function animateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);
                        if (target >= 1000) {
                            el.textContent = current.toLocaleString() + suffix;
                        } else {
                            el.textContent = current + suffix;
                        }
                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        }
                    }
                    requestAnimationFrame(animateCount);
                    statObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => statObserver.observe(el));
        // === Parallax for mid-page sections ===
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        window.addEventListener('scroll', () => {
            parallaxBgs.forEach(bg => {
                const section = bg.parentElement;
                const rect = section.getBoundingClientRect();
                const speed = 0.15;
                const yOffset = rect.top * speed;
                bg.style.transform = `translateY(${yOffset}px)`;
            });
        });