async function loadSharedShell() {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');

    if (!headerMount && !footerMount) {
        return;
    }

    const [headerHtml, footerHtml] = await Promise.all([
        fetch('header-old.html')
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
        'what-are-toolkits': 'toolkits',
        faq: 'insights',
        events: 'events',
        'community-stories': 'community-stories',
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

function setupFAQAccordion() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    if (faqHeaders.length === 0) {
        return; // No custom accordion items found
    }
    
    faqHeaders.forEach(header => {
        const item = header.closest('.faq-item');
        
        if (item) {
            header.addEventListener('click', function() {
                const allItems = document.querySelectorAll('.faq-item');
                
                // Close other open items
                allItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.querySelector('.faq-header')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

function setupCustomSelects() {
    const selects = document.querySelectorAll('.custom-select');

    if (selects.length === 0) {
        return;
    }

    const closeAll = (except = null) => {
        selects.forEach(select => {
            if (select !== except) {
                select.classList.remove('open');
                const trigger = select.querySelector('.custom-select-trigger');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    };

    selects.forEach(select => {
        const trigger = select.querySelector('.custom-select-trigger');
        const options = Array.from(select.querySelectorAll('[role="option"]'));

        if (!trigger || options.length === 0) {
            return;
        }

        trigger.addEventListener('click', event => {
            event.stopPropagation();
            const isOpen = select.classList.contains('open');
            closeAll(select);
            select.classList.toggle('open', !isOpen);
            trigger.setAttribute('aria-expanded', String(!isOpen));
        });

        options.forEach(option => {
            option.addEventListener('click', event => {
                event.stopPropagation();
                options.forEach(item => item.setAttribute('aria-selected', 'false'));
                option.setAttribute('aria-selected', 'true');
                const valueTarget = trigger.querySelector('span');
                if (valueTarget) {
                    valueTarget.textContent = option.textContent.trim();
                }
                select.dataset.value = option.dataset.value || '';
                if (select.dataset.select === 'toolkit-focus') {
                    filterToolkits(select.dataset.value || '');
                }
                if (select.dataset.select === 'filter-topic' ||
                    select.dataset.select === 'filter-institution' ||
                    select.dataset.select === 'filter-toolkit') {
                    filterCommunityStories();
                }
                select.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            });
        });
    });

    document.addEventListener('click', () => closeAll());
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeAll();
        }
    });
}

function filterToolkits(value) {
    const grid = document.querySelector('.toolkits-grid');
    if (!grid) {
        return;
    }

    const focusMap = {
        'data-decisions': 'data to inform decisions',
        'resource-optimization': 'financial resources optimization',
        'planning-processes': 'planning, processes and budgeting'
    };

    const cards = grid.querySelectorAll('.toolkit-card');
    cards.forEach(card => {
        if (!value) {
            card.style.display = '';
            return;
        }

        const tag = card.querySelector('.toolkit-tag');
        const tagText = tag ? tag.textContent.trim().toLowerCase() : '';
        const target = focusMap[value] || '';
        const shouldShow = tagText === target;
        card.style.display = shouldShow ? '' : 'none';
    });
}

function filterCommunityStories() {
    const page = document.body.dataset.page;
    if (page !== 'community-stories') {
        return;
    }

    const topicSelect = document.querySelector('[data-select="filter-topic"]');
    const institutionSelect = document.querySelector('[data-select="filter-institution"]');
    const toolkitSelect = document.querySelector('[data-select="filter-toolkit"]');

    const getSelectedValue = (select) => {
        const selected = select?.querySelector('[role="option"][aria-selected="true"]');
        return selected?.dataset.value || '';
    };

    const topicValue = getSelectedValue(topicSelect);
    const institutionValue = getSelectedValue(institutionSelect);
    const toolkitValue = getSelectedValue(toolkitSelect);

    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        const secondaryTag = card.querySelector('.event-meta .toolkit-tag.secondary');
        const primaryTag = card.querySelector('.event-meta .toolkit-tag:not(.secondary)');
        const toolkitText = card.querySelector('.toolkit-text');

        const topicText = secondaryTag ? secondaryTag.textContent.trim().toLowerCase() : '';
        const institutionText = primaryTag ? primaryTag.textContent.trim().toLowerCase() : '';
        const toolkitLabel = toolkitText
            ? toolkitText.textContent.replace('Toolkit Used:', '').trim().toLowerCase().replace(/\s+/g, ' ')
            : '';
        const normalizedToolkitValue = toolkitValue
            ? toolkitValue.replace(/-/g, ' ').toLowerCase().replace(/\s+/g, ' ')
            : '';

        const matchesTopic = !topicValue || topicText.includes(topicValue.replace(/-/g, ' ').toLowerCase()) || topicText === topicValue.toLowerCase();
        const matchesInstitution = !institutionValue || institutionText.includes(institutionValue.replace(/-/g, ' ').toLowerCase()) || institutionText === institutionValue.toLowerCase();
        const matchesToolkit = !toolkitValue || toolkitLabel.includes(normalizedToolkitValue) || toolkitLabel === normalizedToolkitValue;

        card.style.display = matchesTopic && matchesInstitution && matchesToolkit ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadSharedShell();
    setupSmoothScrolling();
    setupSearch();
    setupHeaderScroll();
    setupAnimations();
    setupMobileMenu();
    setupRippleEffect();
    setupFAQAccordion();
    setupCustomSelects();
    console.log('NACUBO Student Success Hub - Page Loaded');
});
