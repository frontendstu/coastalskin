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
