import { createIcons, ChevronRight, Menu, MessageCircle, PlayCircle, Sparkles, Microscope, Shield, Check, Award, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide Icons
createIcons({
    icons: {
        ChevronRight,
        Menu,
        MessageCircle,
        PlayCircle,
        Sparkles,
        Microscope,
        Shield,
        Check,
        Award,
        MapPin,
        Phone,
        Mail,
        Instagram,
        Facebook,
        Youtube
    }
});

// Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis({
    lerp: 0.05, // Lower = smoother, "heavier" feel
    smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Implement Cinematic Animations

// 1. Hero Reveal Animation
const initHeroAnimation = () => {
    const tl = gsap.timeline();

    tl.fromTo('.hero-title-line',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
    )
        .fromTo('.hero-subtitle',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.8'
        )
        .fromTo('.hero-cta-group',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.8'
        );

    // Hero Parallax on Scroll
    gsap.to('.hero-bg', {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
    });
};

// 2. Navbar Scroll Effect
const initNavbar = () => {
    const navbar = document.getElementById('navbar');

    ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: navbar }
    });
};

// 3. Section Reveal Animations
const initScrollAnimations = () => {
    // Reveal Headers
    const sectionHeaders = document.querySelectorAll('.section-title, .section-label, .section-text');

    sectionHeaders.forEach((el) => {
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            }
        );
    });

    // Service Cards Stagger
    gsap.fromTo('.service-card',
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
            }
        }
    );

    // Image Reveals (Cinematic Unmasking)
    const images = document.querySelectorAll('.image-reveal');
    images.forEach((img) => {
        gsap.fromTo(img,
            { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                scale: 1,
                duration: 1.5,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: img,
                    start: 'top 75%',
                }
            }
        );
    });
};

// 4. Horizontal Gallery Scroll
const initHorizontalScroll = () => {
    const horizontalSection = document.querySelector('.gallery-wrapper');
    if (!horizontalSection) return;

    const track = document.querySelector('.gallery-track') as HTMLElement;

    // Calculate total translation needed
    const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
    };

    const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: '.gallery-section',
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1, // Smooth dragging
        invalidateOnRefresh: true
    });
};

// 5. Magnetic Buttons (Premium Touch)
const initMagneticButtons = () => {
    const magnets = document.querySelectorAll('.magnetic');

    magnets.forEach((magnet) => {
        if (window.innerWidth > 1024) {
            // @ts-ignore
            magnet.addEventListener('mousemove', (e: MouseEvent) => {
                const position = magnet.getBoundingClientRect();
                const x = e.pageX - position.left - position.width / 2;
                const y = e.pageY - position.top - position.height / 2;

                gsap.to(magnet, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });

            magnet.addEventListener('mouseleave', () => {
                gsap.to(magnet, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });
        }
    });
};


// Run all initializations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initNavbar();
    initScrollAnimations();
    initHorizontalScroll();
    initMagneticButtons();
});
