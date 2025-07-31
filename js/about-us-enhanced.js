// Enhanced About Us JavaScript with Modern Features
class AboutUsPage {
    constructor() {
        this.isLoaded = false;
        this.intersectionObserver = null;
        this.mutationObserver = null;
        this.scrollTimeout = null;
        this.resizeTimeout = null;
        
        // Performance optimization: bind methods once
        this.handleScroll = this.throttle(this.handleScroll.bind(this), 16);
        this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        this.checkTimeline = this.checkTimeline.bind(this);
        
        this.init();
    }
    
    init() {
        // Check if page is already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        try {
            this.setupPageTransition();
            this.setupHeader();
            this.setupMobileMenu();
            this.setupParticles();
            this.setupIntersectionObserver();
            this.setupScrollAnimations();
            this.setupCounterAnimations();
            this.setupSmoothScrolling();
            this.setupFormValidation();
            this.setupKeyboardNavigation();
            this.setupReducedMotion();
            this.setupErrorHandling();
            this.setupPerformanceMonitoring();
            
            this.isLoaded = true;
            this.logPageLoadTime();
        } catch (error) {
            console.error('Error initializing page components:', error);
            this.fallbackInitialization();
        }
    }
    
    // Enhanced Page Transition with Better Performance
    setupPageTransition() {
        const pageTransition = document.querySelector('.page-transition');
        if (!pageTransition) return;
        
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            pageTransition.classList.add('active');
        });
        
        // Clean up transition element after animation
        setTimeout(() => {
            pageTransition.style.display = 'none';
            pageTransition.remove(); // Remove from DOM to save memory
        }, 800);
    }
    
    // Enhanced Header with Mobile Support
    setupHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Add header hiding on scroll down (mobile UX improvement)
            if (window.innerWidth <= 768) {
                if (scrollY > lastScrollY && scrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    // Mobile Menu Implementation
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (!mobileToggle || !mainNav) return;
        
        let isMenuOpen = false;
        
        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            mobileToggle.setAttribute('aria-expanded', isMenuOpen);
            mainNav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (isMenuOpen) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        };
        
        mobileToggle.addEventListener('click', toggleMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });
    }
    
    // Enhanced Particles.js with Performance Optimization
    setupParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer || typeof particlesJS === 'undefined') return;
        
        // Reduce particles on mobile for better performance
        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 30 : 60;
        
        try {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: particleCount,
                        density: {
                            enable: true,
                            value_area: 1000
                        }
                    },
                    color: {
                        value: ["#64ffda", "#00bcd4", "#3f51b5", "#9c27b0", "#ff4081"]
                    },
                    shape: {
                        type: ["circle", "triangle", "polygon"],
                        polygon: { nb_sides: 6 }
                    },
                    opacity: {
                        value: 0.7,
                        random: true,
                        anim: { enable: false }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: false }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#64ffda",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: isMobile ? 1 : 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: !isMobile, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140 },
                        push: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        } catch (error) {
            console.warn('Particles.js failed to initialize:', error);
        }
    }
    
    // Enhanced Intersection Observer with Better Performance
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.setupFallbackAnimations();
            return;
        }
        
        const options = {
            root: null,
            rootMargin: '-50px 0px',
            threshold: 0.1
        };
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Unobserve element after animation to improve performance
                    if (entry.target.classList.contains('timeline-item') ||
                        entry.target.classList.contains('value-card') ||
                        entry.target.classList.contains('testimonial-card') ||
                        entry.target.classList.contains('award-card')) {
                        this.intersectionObserver.unobserve(entry.target);
                    }
                }
            });
        }, options);
        
        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            this.intersectionObserver.observe(item);
        });
        
        // Observe other animated elements
        document.querySelectorAll('.value-card, .testimonial-card, .award-card').forEach(item => {
            this.intersectionObserver.observe(item);
        });
    }
    
    // Fallback animations for older browsers
    setupFallbackAnimations() {
        const animateOnScroll = () => {
            const items = document.querySelectorAll('.timeline-item, .value-card, .testimonial-card, .award-card');
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    item.classList.add('visible');
                }
            });
        };
        
        window.addEventListener('scroll', this.throttle(animateOnScroll, 100), { passive: true });
        animateOnScroll(); // Initial check
    }
    
    // Enhanced Timeline Animation
    checkTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item:not(.visible)');
        
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                item.classList.add('visible');
            }
        });
    }
    
    setupScrollAnimations() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        this.checkTimeline(); // Initial check
    }
    
    handleScroll() {
        this.checkTimeline();
    }
    
    // Enhanced Counter Animation with Better Performance
    setupCounterAnimations() {
        const statsSection = document.querySelector('.stats-section');
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (!statsSection || !statNumbers.length) return;
        
        let hasAnimated = false;
        
        const animateCounters = () => {
            if (hasAnimated) return;
            hasAnimated = true;
            
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smoother animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(easeOutQuart * target);
                    
                    number.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        number.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCounter);
            });
        };
        
        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(statsSection);
        } else {
            // Fallback for older browsers
            const checkStats = () => {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    animateCounters();
                    window.removeEventListener('scroll', checkStats);
                }
            };
            window.addEventListener('scroll', checkStats, { passive: true });
        }
    }
    
    // Enhanced Smooth Scrolling
    setupSmoothScrolling() {
        // Modern smooth scrolling with fallback
        const smoothScroll = (target, duration = 1000) => {
            const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
            if (!targetElement) return;
            
            const targetPosition = targetElement.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const startTime = performance.now();
            
            const animation = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const ease = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            };
            
            requestAnimationFrame(animation);
        };
        
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    smoothScroll(targetElement);
                    
                    // Update focus for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            });
        });
        
        // Enhanced scroll down button
        const scrollDownBtn = document.querySelector('.scroll-down');
        if (scrollDownBtn) {
            scrollDownBtn.addEventListener('click', () => {
                smoothScroll(window.innerHeight);
            });
            
            // Add keyboard support
            scrollDownBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    smoothScroll(window.innerHeight);
                }
            });
        }
    }
    
    // Form Validation Enhancement
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Real-time validation
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearErrors(input));
            });
            
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }
        
        this.showFieldValidation(field, isValid, message);
        return isValid;
    }
    
    validateForm(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    showFieldValidation(field, isValid, message) {
        // Remove existing error messages
        this.clearErrors(field);
        
        if (!isValid) {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');
            
            field.parentNode.appendChild(errorElement);
        } else {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        }
    }
    
    clearErrors(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Enhanced Keyboard Navigation
    setupKeyboardNavigation() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }
        
        // Dropdown keyboard navigation
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('a[aria-haspopup]');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;
            
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded', !isExpanded);
                    
                    if (!isExpanded) {
                        const firstItem = menu.querySelector('a');
                        if (firstItem) firstItem.focus();
                    }
                }
                
                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });
        });
        
        // Modal keyboard trap (if modals exist)
        this.setupModalKeyboardTrap();
    }
    
    setupModalKeyboardTrap() {
        const modals = document.querySelectorAll('[role="dialog"]');
        
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
                
                if (e.key === 'Escape') {
                    const closeButton = modal.querySelector('[data-dismiss="modal"]');
                    if (closeButton) closeButton.click();
                }
            });
        });
    }
    
    // Reduced Motion Support
    setupReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable complex animations
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            
            // Remove particle animations
            const particlesContainer = document.getElementById('particles-js');
            if (particlesContainer) {
                particlesContainer.style.display = 'none';
            }
        }
    }
    
    // Error Handling and Graceful Degradation
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // Implement fallback functionality
            this.fallbackInitialization();
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    fallbackInitialization() {
        // Basic functionality without advanced features
        console.info('Running in fallback mode');
        
        // Simple scroll detection
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const header = document.querySelector('.header');
            
            if (header) {
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
    
    // Performance Monitoring
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.info('Page Performance:', {
                    'DOM Load': Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
                    'Full Load': Math.round(perfData.loadEventEnd - perfData.navigationStart),
                    'First Paint': this.getFirstPaintTime()
                });
            });
        }
    }
    
    getFirstPaintTime() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return firstPaint ? Math.round(firstPaint.startTime) : null;
    }
    
    logPageLoadTime() {
        if ('performance' in window) {
            const loadTime = performance.now();
            console.info(`Page components initialized in ${Math.round(loadTime)}ms`);
        }
    }
    
    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    handleResize() {
        // Handle responsive changes
        const isMobile = window.innerWidth <= 768;
        
        // Update particles count on resize
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.number.value = isMobile ? 30 : 60;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
        
        // Update mobile menu state
        const mainNav = document.querySelector('.main-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!isMobile && mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    }
    
    // Cleanup method
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Initialize the page when DOM is ready
const aboutUsPage = new AboutUsPage();

// Expose to global scope for debugging
if (typeof window !== 'undefined') {
    window.AboutUsPage = aboutUsPage;
}

// Progressive Web App Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.info('ServiceWorker registered:', registration);
        } catch (error) {
            console.warn('ServiceWorker registration failed:', error);
        }
    });
}

// Web Vitals Monitoring (if library is available)
if (typeof getCLS !== 'undefined') {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutUsPage;
}