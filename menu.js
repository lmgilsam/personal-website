/**
 * menu.js — Mobile navigation (hamburger) toggle.
 * Shared across every page. Safe no-op if the toggle button is absent
 * (e.g. above the 768px breakpoint the button is hidden but still present).
 *
 * Behavior:
 *   - Click hamburger to open / close the full-screen nav overlay.
 *   - Toggles the 'menu-open' class on <body> (all visuals live in CSS).
 *   - Closes when a nav link is clicked (navigation follows).
 *   - Closes on the Escape key.
 *   - Basic focus management: focus the first link on open, return focus
 *     to the toggle on close.
 */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('header nav');
  if (!toggle || !nav) return; // safe no-op

  var body = document.body;
  var navLinks = Array.from(nav.querySelectorAll('a'));

  function isOpen() {
    return body.classList.contains('menu-open');
  }

  function openMenu() {
    body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    if (navLinks.length) navLinks[0].focus();
  }

  function closeMenu(returnFocus) {
    body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    // Return focus to the toggle unless a link is taking over navigation
    if (returnFocus !== false) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }
  });
}());
