document.addEventListener('DOMContentLoaded', () => {
    
    // --- Current Year for Footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            body.classList.toggle('menu-open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('menu-open');
            });
        });
    }

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactables = document.querySelectorAll('a, button, .treatment-header, .faq-question');

    // Only run cursor logic if fine pointer is supported (desktop)
    if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smooth outline follow
        const animateCursor = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX = outlineX + (distX * 0.15);
            outlineY = outlineY + (distY * 0.15);
            
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover states
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // --- Magnetic Buttons ---
    const magneticElements = document.querySelectorAll('.magnetic');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const position = el.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                // Adjust strength based on element size
                const strength = el.classList.contains('btn') ? 0.3 : 0.1;
                
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate(0px, 0px)`;
                el.style.transition = 'transform 0.3s ease-out';
            });
            
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    }

    // --- Accordion Logic (Treatments & FAQ) ---
    
    // Treatments Accordion (GSAP handled height in animations.js, but vanilla toggle here)
    const treatmentHeaders = document.querySelectorAll('.treatment-header');
    treatmentHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Optional: Close others
            // document.querySelectorAll('.treatment-item').forEach(other => {
            //     if (other !== item) other.classList.remove('active');
            // });

            item.classList.toggle('active');
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Close others
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const ans = other.querySelector('.faq-answer');
                    if (ans) ans.style.height = '0px';
                }
            });

            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.height = answer.scrollHeight + 'px';
            } else {
                answer.style.height = '0px';
            }
        });
    });

});
