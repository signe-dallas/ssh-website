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
        faq: 'events-resources',
        events: 'events',
        'community-stories': 'community-stories',
        about: 'about',
        contact: 'contact',
        'get-started': 'get-started',
        'events-resources': 'events-resources'
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

function setupServiceCardFlip() {
    const cards = document.querySelectorAll('.framework-card');
    if (cards.length === 0) {
        return;
    }

    cards.forEach(card => {
        const frontLink = card.querySelector('.framework-card-front .card-flip-link');
        const backLink = card.querySelector('.framework-card-back .card-flip-back');
        const backFace = card.querySelector('.framework-card-back');

        if (frontLink) {
            frontLink.addEventListener('click', event => {
                event.preventDefault();
                card.classList.add('is-flipped');
            });
        }

        if (backLink) {
            backLink.addEventListener('click', event => {
                event.preventDefault();
                card.classList.remove('is-flipped');
            });
        } else if (backFace) {
            backFace.addEventListener('click', () => {
                card.classList.remove('is-flipped');
            });
        }
    });
}

function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-nav-link[data-tab-target]');
    const tabPanels = document.querySelectorAll('.tab-panel[data-tab-panel]');

    if (tabButtons.length === 0 || tabPanels.length === 0) {
        return;
    }

    const activateTab = (target) => {
        tabButtons.forEach(button => {
            button.classList.toggle('is-active', button.dataset.tabTarget === target);
        });
        tabPanels.forEach(panel => {
            panel.classList.toggle('is-active', panel.dataset.tabPanel === target);
        });
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            activateTab(button.dataset.tabTarget);
            if (button.getAttribute('href')) {
                history.replaceState(null, '', button.getAttribute('href'));
            }
        });
    });

    const hashTarget = window.location.hash.replace('#', '').trim();
    if (hashTarget && Array.from(tabPanels).some(panel => panel.dataset.tabPanel === hashTarget)) {
        activateTab(hashTarget);
    }
}

function setupHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) {
        return;
    }

    const slides = Array.from(carousel.querySelectorAll('[data-hero-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-hero-dot]'));
    const prevBtn = carousel.querySelector('.hero-carousel-control.prev');
    const nextBtn = carousel.querySelector('.hero-carousel-control.next');

    if (slides.length < 2) {
        return;
    }

    let currentIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
    if (currentIndex < 0) {
        currentIndex = 0;
    }

    const setActiveSlide = (index) => {
        currentIndex = ((index % slides.length) + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('is-active', slideIndex === currentIndex);
        });
        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', String(isActive));
        });
    };

    const nextSlide = () => setActiveSlide(currentIndex + 1);
    const prevSlide = () => setActiveSlide(currentIndex - 1);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveSlide(index);
        });
    });

    setActiveSlide(currentIndex);
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
        if (!select) {
            return '';
        }
        const selected = select.querySelector('[role="option"][aria-selected="true"]');
        return selected && selected.dataset ? (selected.dataset.value || '') : '';
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

function setupBlogTabFilters() {
    const blogsPanel = document.getElementById('blogs');
    const topicSelect = document.getElementById('blog-tab-topic');
    const audienceSelect = document.getElementById('blog-tab-audience');
    const postList = document.querySelector('#blogs .blog-post-list');
    const emptyState = document.getElementById('blog-tab-empty-state');
    const cards = Array.from(document.querySelectorAll('#blogs .blog-post-card'));

    if (cards.length === 0 || !topicSelect || !audienceSelect) {
        return;
    }

    const normalize = (value) => (value || '').trim().toLowerCase();

    const applyFilters = () => {
        const selectedTopic = normalize(topicSelect.value);
        const selectedAudience = normalize(audienceSelect.value);
        const selectedDate = normalize(dateSelect ? dateSelect.value : '');
        const hasTopicFilter = selectedTopic && selectedTopic !== 'all topics';
        const hasAudienceFilter = selectedAudience && selectedAudience !== 'all audiences';
        const hasDateFilter = selectedDate && selectedDate !== 'all dates';
        const hasAnyFilter = hasTopicFilter || hasAudienceFilter || hasDateFilter;

        cards.forEach(card => {
            const cardTopic = normalize(card.dataset.topic);
            const cardAudience = normalize(card.dataset.audience);
            const topicMatches = !hasTopicFilter || cardTopic === selectedTopic;
            const audienceMatches = !hasAudienceFilter || cardAudience === selectedAudience;
            const shouldShow = topicMatches && audienceMatches;

            card.style.display = shouldShow ? '' : 'none';

            const topicPill = card.querySelector('[data-pill="topic"]');
            const audiencePill = card.querySelector('[data-pill="audience"]');

            if (topicPill) {
                topicPill.hidden = !(shouldShow && hasTopicFilter && cardTopic === selectedTopic);
            }

            if (audiencePill) {
                audiencePill.hidden = !(shouldShow && hasAudienceFilter && cardAudience === selectedAudience);
            }
        });

        const visibleCards = cards.filter(card => card.style.display !== 'none').length;
        if (emptyState) {
            emptyState.hidden = visibleCards > 0;
        }
        if (postList) {
            postList.style.display = visibleCards > 0 ? '' : 'none';
        }

        if (blogsPanel) {
            blogsPanel.classList.toggle('filters-active', hasAnyFilter);
        }

        if (clearBtn) {
            clearBtn.disabled = !hasAnyFilter;
        }
    };

    topicSelect.addEventListener('change', applyFilters);
    audienceSelect.addEventListener('change', applyFilters);

    const dateSelect = document.getElementById('blog-tab-date');
    const clearBtn = document.getElementById('blog-tab-clear-filters');
    const selects = [topicSelect, audienceSelect, dateSelect].filter(Boolean);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            selects.forEach(select => {
                select.selectedIndex = 0;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });
    }

    applyFilters();
}

function setupBlogAuthorToggles() {
    const toggleButtons = Array.from(document.querySelectorAll('#blogs [data-author-toggle]'));
    if (toggleButtons.length === 0) {
        return;
    }

    toggleButtons.forEach(toggleButton => {
        const controlsId = toggleButton.getAttribute('aria-controls');
        const authorList = controlsId
            ? document.getElementById(controlsId)
            : (function() {
                const footer = toggleButton.closest('.blog-post-footer');
                return footer ? footer.querySelector('.blog-author-list') : null;
            })();

        if (!authorList) {
            toggleButton.hidden = true;
            return;
        }

        const authors = Array.from(authorList.querySelectorAll('.blog-author'));
        if (authors.length <= 1) {
            toggleButton.hidden = true;
            authorList.classList.remove('is-collapsible-authors');
            return;
        }

        const additionalCount = authors.length - 1;
        const noun = additionalCount === 1 ? 'author' : 'authors';

        authorList.classList.add('is-collapsible-authors');
        authorList.classList.remove('is-expanded');
        toggleButton.hidden = false;
        toggleButton.textContent = `+${additionalCount} more ${noun}`;
        toggleButton.setAttribute('aria-label', `Show ${additionalCount} additional ${noun}`);
        toggleButton.setAttribute('aria-expanded', 'false');

        toggleButton.addEventListener('click', () => {
            authorList.classList.add('is-expanded');
            toggleButton.hidden = true;
            toggleButton.setAttribute('aria-expanded', 'true');
        });
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
    setupServiceCardFlip();
    setupTabNavigation();
    setupHeroCarousel();
    setupBlogTabFilters();
    setupBlogAuthorToggles();
    console.log('NACUBO Student Success Hub - Page Loaded');
});
