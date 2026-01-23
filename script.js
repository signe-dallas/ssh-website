async function loadSharedShell() {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');

    if (!headerMount && !footerMount) {
        return;
    }

    const [headerHtml, footerHtml] = await Promise.all([
        fetch('header.html')
            .then(response => (response.ok ? response.text() : ''))
            .catch(() => ''),
        fetch('footer.html')
            .then(response => (response.ok ? response.text() : ''))
            .catch(() => '')
    ]);

    if (headerMount && headerHtml) {
        headerMount.innerHTML = headerHtml;
    }

    if (footerMount && footerHtml) {
        footerMount.innerHTML = footerHtml;
    }

    setActiveNav();
}

function setActiveNav() {
    const pageKey = document.body.dataset.page;
    if (!pageKey) {
        return;
    }

    const pageMap = {
        home: 'home',
        'browse-toolkits': 'toolkits',
        'about-toolkits': 'toolkits',
        faq: 'insights',
        events: 'events',
        about: 'about',
        contact: 'contact',
        'get-started': 'get-started'
    };

    const navKey = pageMap[pageKey] || pageKey;
    const navItem = document.querySelector(`[data-nav="${navKey}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) {
                return;
            }
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                alert('Search for \"' + searchTerm + '\" would filter toolkits');
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log('Searching for:', searchTerm);
                    alert('Search for \"' + searchTerm + '\" would filter toolkits');
                }
            }
        });
    }
}

function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) {
        return;
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
}

function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.highlight-card, .testimonial-card, .framework-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function setupMobileMenu() {
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            // Mobile view logic
        }
    });
}

function setupRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `\n        @keyframes ripple {\n            to {\n                transform: scale(4);\n                opacity: 0;\n            }\n        }\n    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadSharedShell();
    setupSmoothScrolling();
    setupSearch();
    setupHeaderScroll();
    setupAnimations();
    setupMobileMenu();
    setupRippleEffect();
    console.log('NACUBO Student Success Hub - Page Loaded');
});
