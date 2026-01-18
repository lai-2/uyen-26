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
 * ============================================
 */
function initLoveQuestion() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successMsg = document.getElementById('loveSuccess');
    const questionButtons = document.querySelector('.question-buttons');
    const section = document.querySelector('.question-section');

    if (!yesBtn || !noBtn || !successMsg || !section) return;

    // Set up section for absolute positioning
    section.style.position = 'relative';

    // Apply smooth transition to NO button
    noBtn.style.transition = 'left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    // Distance threshold - button will run away when mouse is within this distance
    const escapeDistance = 120;

    // YES button click handler
    yesBtn.addEventListener('click', function() {
        // Hide buttons
        questionButtons.style.display = 'none';

        // Show success message
        successMsg.classList.add('show');

        // Create confetti celebration
        createConfetti();
    });

    // Track mouse movement across the entire section
    section.addEventListener('mousemove', function(e) {
        const sectionRect = section.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Get mouse position relative to section
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Get button center position
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        // Calculate distance between mouse and button center
        const distance = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) +
            Math.pow(mouseY - btnCenterY, 2)
        );

        // If mouse is too close, move the button away
        if (distance < escapeDistance) {
            moveNoButton(mouseX, mouseY, sectionRect, btnRect);
        }
    });

    // Handle touch events for mobile
    section.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const sectionRect = section.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const touchX = touch.clientX;
        const touchY = touch.clientY;

        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const distance = Math.sqrt(
            Math.pow(touchX - btnCenterX, 2) +
            Math.pow(touchY - btnCenterY, 2)
        );

        if (distance < escapeDistance) {
            moveNoButton(touchX, touchY, sectionRect, btnRect);
        }
    }, { passive: true });

    // Also handle direct hover/touch on the button
    noBtn.addEventListener('mouseenter', function(e) {
        const sectionRect = section.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        moveNoButton(e.clientX, e.clientY, sectionRect, btnRect);
    });

    noBtn.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const sectionRect = section.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        moveNoButton(touch.clientX, touch.clientY, sectionRect, btnRect);
    }, { passive: true });

    function moveNoButton(mouseX, mouseY, sectionRect, btnRect) {
        const padding = 30;
        const maxX = sectionRect.width - btnRect.width - padding;
        const maxY = sectionRect.height - btnRect.height - padding;

        // Calculate direction away from mouse
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        // Vector from mouse to button
        let dirX = btnCenterX - mouseX;
        let dirY = btnCenterY - mouseY;

        // Normalize the direction
        const length = Math.sqrt(dirX * dirX + dirY * dirY);
        if (length > 0) {
            dirX /= length;
            dirY /= length;
        }

        // Move button in the opposite direction of mouse (away from it)
        // Add some randomness to make it more playful
        const moveDistance = 150 + Math.random() * 100;
        let newX = (btnRect.left - sectionRect.left) + dirX * moveDistance;
        let newY = (btnRect.top - sectionRect.top) + dirY * moveDistance;

        // Add slight randomness to angle
        const randomAngle = (Math.random() - 0.5) * 0.8;
        const cos = Math.cos(randomAngle);
        const sin = Math.sin(randomAngle);
        const centeredX = newX - sectionRect.width / 2;
        const centeredY = newY - sectionRect.height / 2;
        newX = centeredX * cos - centeredY * sin + sectionRect.width / 2;
        newY = centeredX * sin + centeredY * cos + sectionRect.height / 2;

        // Keep button within bounds
        newX = Math.max(padding, Math.min(maxX, newX));
        newY = Math.max(padding, Math.min(maxY, newY));

        // If button would still be near mouse, pick a random far position
        const newBtnCenterX = sectionRect.left + newX + btnRect.width / 2;
        const newBtnCenterY = sectionRect.top + newY + btnRect.height / 2;
        const newDistance = Math.sqrt(
            Math.pow(mouseX - newBtnCenterX, 2) +
            Math.pow(mouseY - newBtnCenterY, 2)
        );

        if (newDistance < escapeDistance) {
            // Pick a random position far from mouse
            let attempts = 0;
            while (attempts < 10) {
                newX = Math.random() * maxX + padding;
                newY = Math.random() * maxY + padding;

                const testCenterX = sectionRect.left + newX + btnRect.width / 2;
                const testCenterY = sectionRect.top + newY + btnRect.height / 2;
                const testDistance = Math.sqrt(
                    Math.pow(mouseX - testCenterX, 2) +
                    Math.pow(mouseY - testCenterY, 2)
                );

                if (testDistance >= escapeDistance * 1.5) break;
                attempts++;
            }
        }

        // Apply new position
        noBtn.style.position = 'absolute';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    }
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
