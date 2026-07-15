(function () {
  document.documentElement.classList.add('js');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll(
    '#about .about-label, #about .about-content, #about .about-school-media, #about .experience-bubble, #about .skills-heading, #about .skill, #about .resume-btn-wrapper, .projects-page .projects-header, .projects-page .project-card, .photography .intro-card, .photography .place, .photography .photo, .reveal'
  );

  if (!targets.length) return;

  targets.forEach((el) => {
    el.classList.add('scroll-reveal');
    el.classList.add('reveal');
  });

  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, 200);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -72px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();
