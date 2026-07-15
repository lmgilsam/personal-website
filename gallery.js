/**
 * gallery.js — Lightbox for photography place pages.
 * Shared by barcelona.html, lisbon.html, new-york.html.
 * Safe no-op on pages that have no .photography .photo elements.
 *
 * HOW TO ADD A NEW PLACE:
 *   1. Copy an existing place .html (e.g. barcelona.html) and rename it.
 *   2. Swap the <img> src values and alt text for your own photos.
 *   3. Add a matching .place tile to the #photography section in index.html.
 *   4. This script requires no changes — it auto-discovers .photo elements.
 */
(function () {
  'use strict';

  var photos = Array.from(document.querySelectorAll('.photography .photo'));
  if (!photos.length) return; // safe no-op on pages without photos

  var current = 0;

  /* ── Build lightbox DOM ── */
  var overlay = document.createElement('div');
  overlay.className = 'photography lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Photo viewer');
  overlay.style.display = 'none';

  var img = document.createElement('img');
  img.className = 'lightbox-img';
  img.alt = '';

  var closeBtn = makeBtn('\u2715', 'lightbox-close lightbox-btn', 'Close photo viewer');
  var prevBtn  = makeBtn('\u2039', 'lightbox-prev lightbox-btn',  'Previous photo');
  var nextBtn  = makeBtn('\u203a', 'lightbox-next lightbox-btn',  'Next photo');

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  overlay.appendChild(prevBtn);
  overlay.appendChild(nextBtn);
  document.body.appendChild(overlay);

  /* ── Helpers ── */
  function makeBtn(text, className, label) {
    var btn = document.createElement('button');
    btn.textContent = text;
    btn.className = className;
    btn.setAttribute('aria-label', label);
    btn.setAttribute('type', 'button');
    return btn;
  }

  function showPhoto(index) {
    var photoEl = photos[index];
    var photoImg = photoEl.querySelector('img');
    img.src = photoImg.src;
    img.alt = photoImg.alt;
    current = index;
  }

  function openLightbox(index) {
    showPhoto(index);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    // Return focus to the photo that was clicked
    if (photos[current]) photos[current].focus();
  }

  function goPrev() {
    showPhoto((current - 1 + photos.length) % photos.length);
  }

  function goNext() {
    showPhoto((current + 1) % photos.length);
  }

  /* ── Wire up photo click / keyboard triggers ── */
  photos.forEach(function (photo, i) {
    // Prevent navigation (href="#"); open lightbox instead
    photo.addEventListener('click', function (e) {
      e.preventDefault();
      openLightbox(i);
    });
    // Allow keyboard activation (Enter / Space)
    photo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  /* ── Lightbox controls ── */
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  // Close on backdrop click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  // Keyboard navigation: Escape, Left arrow, Right arrow
  document.addEventListener('keydown', function (e) {
    if (overlay.style.display === 'none') return;
    if (e.key === 'Escape')     { closeLightbox(); }
    if (e.key === 'ArrowLeft')  { goPrev(); }
    if (e.key === 'ArrowRight') { goNext(); }
  });
}());
