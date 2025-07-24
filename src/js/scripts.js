/**
 * SITE SCRIPTS
 *
 * scripts.js contains all JavaScript functionality for the site, including UI
 * interactions, component behaviour, and event handling. Scripts are written
 * with performance and minimalism in mind, avoiding unnecessary bloat while
 * enhancing usability and accessibility.
 */

// Test if scripts.js has loaded
console.log('Hello from scripts.js');

/**
 * HEADER MENU TOGGLE
 * -----------------------------------------------------------------------------
 *
 * Adds interactive behaviour to the site header's mobile navigation toggle
 * button.
 *
 * - Toggles the visibility of the header menu by adding/removing the
 *   `data-visible` attribute
 * - Updates the `aria-expanded` attribute to ensure accessibility for screen
 *   readers.
 * - Adds a click listener to the document to close the menu when tapping
 *   outside of the header menu.
 */

document.addEventListener('DOMContentLoaded', function () {
    const headerMenuToggle = document.querySelector('.site-header-menu-toggle');
    const headerMenu = document.querySelector('#site-header-menu');

    headerMenuToggle.addEventListener('click', function () {
        const isMenuVisible = headerMenu.hasAttribute('data-visible');

        if (isMenuVisible) {
            headerMenu.removeAttribute('data-visible');
            headerMenuToggle.setAttribute('aria-expanded', 'false');
        } else {
            headerMenu.setAttribute('data-visible', '');
            headerMenuToggle.setAttribute('aria-expanded', 'true');

            document.addEventListener('click', closeMenuOnTapOutside);
        }
    });

    /**
     * Closes the header menu when a user taps outside the toggle button or the
     * header menu
     */
    function closeMenuOnTapOutside(event) {
        if (
            !headerMenu.contains(event.target) &&
            !headerMenuToggle.contains(event.target)
        ) {
            headerMenu.removeAttribute('data-visible');
            headerMenuToggle.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', closeMenuOnTapOutside);
        }
    }
});

/**
 * HEADER SCROLLED
 * -----------------------------------------------------------------------------
 *
 * The header scrolled script is used to control the behaviour of the header
 * when a page is scrolled. When the page is scrolled down the `.
 * site-header-scrolled` class will be applied to `<header
 * class="site-header">`, then when the page is back to it's original position
 * the `.site-header-scrolled` class will be dynamically removed. The site
 * header will also hide itself when the page is scrolled down.
 */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const menu = document.querySelector('.site-header-menu');
    const toggleButton = document.querySelector('.site-header-menu-toggle');
    let lastScrollY = getScrollPosition();
    let scrollTimeout;
    let scrollThreshold = getScrollThreshold();

    function getScrollThreshold() {
        const width = window.innerWidth;
        if (width >= 1440) return 50; // 90em+
        if (width >= 1280) return 40; // 80em+
        if (width >= 768) return 30; // 48em+
        return 20; // Below 48em (e.g., iPhone)
    }

    function getScrollPosition() {
        return window.scrollY || document.documentElement.scrollTop;
    }

    const updateHeaderState = () => {
        const currentScrollY = getScrollPosition();
        const isScrollingDown = currentScrollY > lastScrollY;

        // console.log(`ScrollY: ${currentScrollY}`); // Debugging

        header.classList.toggle(
            'site-header-hidden',
            isScrollingDown && currentScrollY > scrollThreshold
        );

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            header.classList.toggle(
                'site-header-menu-scrolled',
                currentScrollY > scrollThreshold
            );
        }, 150);

        // Close menu when scrolling
        if (menu.classList.contains('site-header-menu-open')) {
            menu.classList.remove('site-header-menu-open');
            toggleButton.setAttribute('aria-expanded', 'false');
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', () => {
        scrollThreshold = getScrollThreshold();
    });
});

/**
 * SITE BRANDING SWITCH
 * -----------------------------------------------------------------------------
 *
 * This script dynamically updates the logo appearance based on the scroll
 * position. When the user scrolls down the page, a specific CSS class is added
 * to the site header to change its style, and the site logo is swapped to the
 * "primary" version. When the user scrolls back to the top, the original
 * styles and logo are restored.
 */

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    const logo = document.querySelector('#site-branding');

    function updateHeaderOnScroll() {
        if (!logo || !header) return;

        if (window.scrollY > 10) {
            header.classList.add('site-header-menu-scrolled');
            logo.src = logo.dataset.logoPrimary;
        } else {
            header.classList.remove('header-menu-scrolled');
            logo.src = logo.dataset.logoSecondary;
        }
    }

    updateHeaderOnScroll(); // initial check
    window.addEventListener('scroll', updateHeaderOnScroll);
});

/**
 * FADE IN EFFECT UTILITY
 * -----------------------------------------------------------------------------
 *
 * The fade in script is used dynamically add the `.fade-in-active` class when
 * the `.fade-in` class is activated based on scroll position.
 */

const fadeInElements = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
                fadeInObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

fadeInElements.forEach((element) => fadeInObserver.observe(element));

/**
 * PARALLAX EFFECT UTILITY
 * -----------------------------------------------------------------------------
 *
 * The parallax script is used to create a parallax effect on scroll when the
 * .parallax class is added to an element. Note the parallax effect has been
 * disabled on mobile devices.
 */

document.addEventListener('DOMContentLoaded', () => {
    const parallax = document.querySelector('.parallax');

    function updateParallax() {
        if (window.matchMedia('(min-width: 40em)').matches) {
            const scrollY = window.scrollY;
            parallax.style.backgroundPosition = `center ${scrollY * 0.3}px`;
        } else {
            parallax.style.backgroundPosition = ''; // Reset on small screens
        }
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
});
