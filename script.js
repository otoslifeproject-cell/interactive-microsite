(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const sections = [...document.querySelectorAll('[data-section]')];
  const dots = [...document.querySelectorAll('.section-dots .dot')];
  const revealEls = [...document.querySelectorAll('.reveal')];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 0;
    root.style.setProperty('--progress', `${progress}%`);
    header?.classList.toggle('is-scrolled', scrollTop > 28);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  setProgress();

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.id;
      dots.forEach(dot => {
        dot.classList.toggle('is-active', dot.getAttribute('href') === `#${activeId}`);
      });
    });
  }, { threshold: 0.42 });

  sections.forEach(section => sectionObserver.observe(section));

  document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    const isTyping = activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName);
    if (isTyping || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

    const current = sections.reduce((nearest, section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().top - 96);
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: 0, distance: Infinity });

    const nextIndex = event.key === 'ArrowDown'
      ? Math.min(sections.length - 1, current.index + 1)
      : Math.max(0, current.index - 1);

    if (nextIndex !== current.index) {
      event.preventDefault();
      sections[nextIndex].scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
})();
