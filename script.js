/**
 * ============================================
 * BIRTHDAY LOVE WEBSITE - JAVASCRIPT
 * A romantic birthday gift website
 * ============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFloatingHearts();
    initCarousel();
    initScrollAnimations();
    initLoveQuestion();
    initLoveMeter();
    initChecklist();
    initStars();
    initMusicPlayer();
});

/**
 * ============================================
 * SMOOTH SCROLL FUNCTION
 * Scrolls smoothly to a target section
 * ============================================
 */
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * ============================================
 * FLOATING HEARTS ANIMATION
 * Creates romantic floating hearts in the hero section
 * ============================================
 */
function initFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;

    // Heart emojis to use
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘'];

    // Create hearts at intervals
    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        // Random positioning and timing
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }

    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 500);
    }

    // Continue creating hearts
    setInterval(createHeart, 1500);
}

/**
 * ============================================
 * PHOTO CAROUSEL
 * Horizontal image carousel with touch support
 * ============================================
 */
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dot indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        updateCarousel();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Button event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only trigger if carousel is in viewport
        const carouselSection = document.querySelector('.memories-section');
        const rect = carouselSection.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });

    // Auto-advance carousel (optional)
    let autoPlayInterval;

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Pause on hover or focus
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    track.addEventListener('focusin', stopAutoPlay);
    track.addEventListener('focusout', startAutoPlay);
}

/**
 * ============================================
 * SCROLL ANIMATIONS
 * Fade-in elements on scroll using IntersectionObserver
 * ============================================
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length === 0) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

/**
 * ============================================
 * LOVE QUESTION INTERACTION
 * YES button shows success, NO button runs away
 * (Logic copied from index2.html)
 * ============================================
 */
function initLoveQuestion() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successMsg = document.getElementById('loveSuccess');
    const container = document.querySelector('.question-section');

    if (!yesBtn || !noBtn || !successMsg || !container) return;

    // Configuration - same as index2.html
    const SAFE_DISTANCE = 120;
    const MIN_ESCAPE_DISTANCE = 160;
    const EDGE_PADDING = 10;

    // Position NO button next to YES button initially
    const yesRect = yesBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Place NO button to the right of YES button with gap
    let btnX = (yesRect.right - containerRect.left) + 16;
    let btnY = yesRect.top - containerRect.top;

    noBtn.style.left = btnX + "px";
    noBtn.style.top = btnY + "px";

    // YES button click handler
    yesBtn.addEventListener('click', function() {
        // Hide NO button
        noBtn.style.display = 'none';

        // Show success message
        successMsg.classList.add('show');

        // Create confetti celebration
        createConfetti();
    });

    // YES button click handler
    noBtn.addEventListener('click', function() {
        // Hide NO button
        noBtn.style.display = 'none';
    });

    // Random escape position - exact copy from index2.html
    function randomEscapePosition(mouseX, mouseY) {
        const maxX = container.clientWidth - noBtn.offsetWidth - EDGE_PADDING;
        const maxY = container.clientHeight - noBtn.offsetHeight - EDGE_PADDING;
        const minX = EDGE_PADDING;
        const minY = EDGE_PADDING;

        let x, y, attempts = 0;

        do {
            x = Math.random() * (maxX - minX) + minX;
            y = Math.random() * (maxY - minY) + minY;
            attempts++;
        } while (
            Math.hypot(
                x + noBtn.offsetWidth / 2 - mouseX,
                y + noBtn.offsetHeight / 2 - mouseY
            ) < MIN_ESCAPE_DISTANCE &&
            attempts < 20
        );

        return { x, y };
    }

    // Mousemove handler - exact copy from index2.html
    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = btnX + noBtn.offsetWidth / 2;
        const centerY = btnY + noBtn.offsetHeight / 2;

        const dist = Math.hypot(centerX - mouseX, centerY - mouseY);

        if (dist < SAFE_DISTANCE) {
            const pos = randomEscapePosition(mouseX, mouseY);
            btnX = pos.x;
            btnY = pos.y;

            noBtn.style.left = btnX + "px";
            noBtn.style.top = btnY + "px";
        }
    });

    // Touch support for mobile
    container.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        const centerX = btnX + noBtn.offsetWidth / 2;
        const centerY = btnY + noBtn.offsetHeight / 2;

        const dist = Math.hypot(centerX - touchX, centerY - touchY);

        if (dist < SAFE_DISTANCE) {
            const pos = randomEscapePosition(touchX, touchY);
            btnX = pos.x;
            btnY = pos.y;

            noBtn.style.left = btnX + "px";
            noBtn.style.top = btnY + "px";
        }
    }, { passive: true });
}

/**
 * ============================================
 * CONFETTI CELEBRATION
 * Creates heart-shaped confetti when YES is clicked
 * ============================================
 */
function createConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;

    const colors = ['#ec407a', '#e91e63', '#f48fb1', '#ff80ab', '#ff4081', '#f50057'];
    const emojis = ['💕', '💖', '💗', '❤️', '💝', '✨', '🎉', '🥳'];

    // Create multiple confetti pieces
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.className = 'confetti';

            // Randomly use either colored div or emoji
            if (Math.random() > 0.5) {
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            } else {
                confetti.style.width = (Math.random() * 10 + 8) + 'px';
                confetti.style.height = (Math.random() * 10 + 8) + 'px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            }

            // Random position
            confetti.style.left = Math.random() * 100 + '%';

            // Random animation duration
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            container.appendChild(confetti);

            // Remove after animation
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

/**
 * ============================================
 * LOVE METER
 * Slider that always ends up at 100%
 * ============================================
 */
function initLoveMeter() {
    const slider = document.getElementById('meterSlider');
    const fill = document.getElementById('meterFill');
    const percentage = document.getElementById('meterPercentage');
    const result = document.getElementById('meterResult');
    const sparkles = document.getElementById('meterSparkles');

    if (!slider || !fill || !percentage) return;

    // Update meter as user drags
    slider.addEventListener('input', function() {
        const value = this.value;
        fill.style.width = value + '%';
        percentage.textContent = value + '%';
        percentage.classList.remove('full');
        result.classList.remove('show');
        sparkles.classList.remove('active');
    });

    // When user releases, animate to 100%
    function snapTo100() {
        // Animate slider value to 100
        let currentValue = parseInt(slider.value);
        const targetValue = 100;
        const duration = 800;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const newValue = Math.round(currentValue + (targetValue - currentValue) * easeOut);

            slider.value = newValue;
            fill.style.width = newValue + '%';
            percentage.textContent = newValue + '%';

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete - show result
                percentage.classList.add('full');
                result.classList.add('show');
                sparkles.classList.add('active');
                createMeterSparkles();
            }
        }

        animate();
    }

    // Listen for release events
    slider.addEventListener('mouseup', snapTo100);
    slider.addEventListener('touchend', snapTo100);

    // Create sparkles effect
    function createMeterSparkles() {
        sparkles.innerHTML = '';
        const sparkleEmojis = ['✨', '💖', '💕', '⭐'];

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
            sparkles.appendChild(sparkle);
        }
    }
}

/**
 * ============================================
 * GOOD BOYFRIEND CHECKLIST
 * Checklist with one impossible item
 * ============================================
 */
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const message = document.getElementById('checklistMessage');

    checkboxes.forEach((checkbox, index) => {
        const item = checkbox.closest('.checklist-item');
        const isCheckable = item.getAttribute('data-checkable') === 'true';

        if (!isCheckable) {
            // This is the impossible checkbox (last one)
            checkbox.addEventListener('click', function(e) {
                e.preventDefault();

                // Immediately uncheck
                this.checked = false;

                // Add shake animation
                item.classList.add('shake');
                setTimeout(() => {
                    item.classList.remove('shake');
                }, 500);

                // Show funny message
                message.classList.add('show');
            });

            // Also prevent change event
            checkbox.addEventListener('change', function(e) {
                if (this.checked) {
                    e.preventDefault();
                    this.checked = false;
                }
            });
        } else {
            // Normal checkboxes - add heart animation on check
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    // Small celebration
                    const heart = item.querySelector('.check-heart');
                    if (heart) {
                        heart.style.animation = 'none';
                        heart.offsetHeight; // Trigger reflow
                        heart.style.animation = 'pulse 0.5s ease';
                    }
                }
            });
        }
    });
}

/**
 * ============================================
 * STARS BACKGROUND
 * Creates twinkling stars for the final section
 * ============================================
 */
function initStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    // Create multiple stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Random animation delay
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';

        container.appendChild(star);
    }
}

/**
 * ============================================
 * MUSIC PLAYER
 * Toggle background music on/off
 * ============================================
 */
function initMusicPlayer() {
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    const musicText = musicBtn?.querySelector('.music-text');

    if (!musicBtn || !audio) return;

    let isPlaying = false;

    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            musicBtn.classList.remove('playing');
            if (musicText) musicText.textContent = 'Play Our Song';
        } else {
            audio.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
            musicBtn.classList.add('playing');
            if (musicText) musicText.textContent = 'Pause Music';
        }
        isPlaying = !isPlaying;
    });

    // Update button when audio ends
    audio.addEventListener('ended', function() {
        if (!audio.loop) {
            isPlaying = false;
            musicBtn.classList.remove('playing');
            if (musicText) musicText.textContent = 'Play Our Song';
        }
    });
}

/**
 * ============================================
 * PARALLAX EFFECT (Optional Enhancement)
 * Subtle parallax on scroll
 * ============================================
 */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Parallax for hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }

    // Parallax for moon
    const moon = document.querySelector('.moon');
    if (moon) {
        const moonSection = document.querySelector('.final-section');
        const rect = moonSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            moon.style.transform = `translateY(${rect.top * 0.1}px)`;
        }
    }
});

/**
 * ============================================
 * HELPER: Debounce function
 * Limits how often a function can be called
 * ============================================
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * ============================================
 * ACCESSIBILITY: Respect reduced motion preference
 * ============================================
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable or reduce animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0.01ms');
    document.documentElement.style.setProperty('--transition-medium', '0.01ms');
    document.documentElement.style.setProperty('--transition-slow', '0.01ms');
}
