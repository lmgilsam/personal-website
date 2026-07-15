function initPresentationViewer(options) {
  const slides = options.slides;
  const slideEl = document.querySelector('.presentation-slide');
  const counterEl = document.querySelector('.presentation-counter');
  const prevZone = document.querySelector('.presentation-zone--prev');
  const nextZone = document.querySelector('.presentation-zone--next');
  const backLink = document.querySelector('.presentation-back');
  let current = 0;

  function showSlide(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slideEl.src = slides[current];
    slideEl.alt = 'Slide ' + (current + 1);
    counterEl.textContent = (current + 1) + ' / ' + slides.length;
  }

  function nextSlide() {
    if (current < slides.length - 1) {
      showSlide(current + 1);
    }
  }

  function prevSlide() {
    if (current > 0) {
      showSlide(current - 1);
    }
  }

  prevZone.addEventListener('click', prevSlide);
  nextZone.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Escape' && backLink) {
      window.location.href = backLink.href;
    }
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) < 50) return;
    if (diff < 0) nextSlide();
    else prevSlide();
  }, { passive: true });

  showSlide(0);
}
