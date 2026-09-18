// Ensure GSAP and ScrollTrigger are available
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 1. Intro Loader ---
    const loaderTl = gsap.timeline();
    
    if (!prefersReducedMotion) {
        loaderTl.to('.loader-text', {
            opacity: 1,
            y: -10,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
        })
        .to('.loader-text', {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in',
            delay: 0.5
        })
        .to('.intro-loader', {
            yPercent: -100,
            duration: 0.8,
            ease: 'expo.inOut'
        }, "-=0.2")
        .set('.intro-loader', { display: 'none' })
        // Trigger hero animations after loader
        .add(initHeroAnimations, "-=0.3");
    } else {
        // Fallback for reduced motion
        gsap.set('.intro-loader', { display: 'none' });
        initHeroAnimations();
    }

    // --- 2. Hero Animations ---
    function initHeroAnimations() {
        if (prefersReducedMotion) {
            gsap.set('.hero .line', { y: 0 });
            gsap.set('.hero .reveal-up', { opacity: 1, y: 0 });
            return;
        }

        const tl = gsap.timeline();
        
        tl.to('.hero .line', {
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out'
        })
        .fromTo('.hero .reveal-up', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
            "-=0.6"
        );
    }

    // --- 3. Hero Parallax ---
    if (!prefersReducedMotion && window.matchMedia('(min-width: 768px)').matches) {
        gsap.to('.hero-img', {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // --- 4. Navbar Scroll Effect ---
    const nav = document.querySelector('.site-nav');
    if (nav) {
        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            toggleClass: { className: 'scrolled', targets: '.site-nav' }
        });
    }

    // --- 5. Generic Reveal Up on Scroll ---
    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll('.statement-text, .section-label, .section-title, .about-text p, .badges, .treatment-item');
        
        revealElements.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    // --- 6. About Image Clip-Path Reveal ---
    if (!prefersReducedMotion) {
        gsap.fromTo('.about-image-wrapper',
            { clipPath: 'inset(100% 0 0 0)' },
            {
                clipPath: 'inset(0% 0 0 0)',
                duration: 1.2,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: '.about-grid',
                    start: 'top 75%'
                }
            }
        );
        
        // Subtle image scale
        gsap.fromTo('.about-img',
            { scale: 1.1 },
            {
                scale: 1,
                duration: 1.2,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: '.about-grid',
                    start: 'top 75%'
                }
            }
        );
    }

    // --- 7. SVG Journey Line Draw ---
    if (!prefersReducedMotion) {
        const journeyPath = document.querySelector('.journey-path');
        if (journeyPath) {
            // Ensure path length is correct
            const pathLength = journeyPath.getTotalLength();
            gsap.set(journeyPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

            gsap.to(journeyPath, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.process',
                    start: 'top 60%',
                    end: 'bottom 80%',
                    scrub: 1
                }
            });
            
            // Pop in dots
            gsap.fromTo('.step-dot', 
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.process',
                        start: 'top 50%'
                    }
                }
            );
        }
    }

    // --- 8. Technology Parallax ---
    if (!prefersReducedMotion && window.matchMedia('(min-width: 768px)').matches) {
        gsap.fromTo('.tech-img', 
            { yPercent: -10 },
            {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.technology',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    }

    // --- 9. Stats Counter Animation ---
    if (!prefersReducedMotion) {
        const ratingVal = document.getElementById('rating-val');
        const reviewCount = document.getElementById('review-count');
        
        if (ratingVal && reviewCount) {
            ScrollTrigger.create({
                trigger: '.reviews-header',
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.fromTo(ratingVal, { innerHTML: 0 }, { innerHTML: 5.0, duration: 2, ease: 'power2.out', snap: { innerHTML: 0.1 }});
                    gsap.fromTo(reviewCount, { innerHTML: 0 }, { innerHTML: 526, duration: 2, ease: 'power2.out', snap: { innerHTML: 1 }});
                }
            });
        }
    }

    // --- 10. Gallery Scroll ---
    if (!prefersReducedMotion) {
        gsap.to('.gallery-img', {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.gallery',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

});
