(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const contentsView = document.querySelector('[data-view="contents"]');
  const readerView = document.querySelector('[data-view="reader"]');
  const moduleLinks = [...document.querySelectorAll('[data-module-target]')];
  const homeLinks = [...document.querySelectorAll('[data-home-link]')];
  const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getSections = () => [...document.querySelectorAll('.reader-page [data-section]')];

  const setReaderVisible = (visible) => {
    contentsView.hidden = visible;
    readerView.hidden = !visible;
    body.classList.toggle('reader-open', visible);
  };

  const setHeaderState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12 || body.classList.contains('reader-open'));
  };

  const revealVisible = () => {
    document.querySelectorAll('.reveal').forEach((el) => {
      if (prefersReducedMotion) el.classList.add('is-visible');
    });
  };

  const scrollToModule = (id, replace = false) => {
    setReaderVisible(true);
    setHeaderState();
    const target = document.getElementById(id);
    if (!target) return;
    const url = `#${id}`;
    if (replace) history.replaceState(null, '', url);
    else if (location.hash !== url) history.pushState(null, '', url);
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  };

  const showContents = (replace = false) => {
    setReaderVisible(false);
    setHeaderState();
    const url = '#contents';
    if (replace) history.replaceState(null, '', url);
    else if (location.hash !== url) history.pushState(null, '', url);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
  };

  moduleLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.dataset.moduleTarget;
      if (!id) return;
      event.preventDefault();
      scrollToModule(id);
    });
  });

  homeLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showContents();
    });
  });

  const routeFromHash = (replace = true) => {
    const id = (location.hash || '#contents').replace('#', '');
    if (id.startsWith('module-')) scrollToModule(id, replace);
    else showContents(replace);
  };

  window.addEventListener('hashchange', () => routeFromHash(true));
  window.addEventListener('popstate', () => routeFromHash(true));
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  }

  const activeObserver = new IntersectionObserver((entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
    if (!active) return;
    const activeId = active.target.id;
    chapterLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
        link.scrollIntoView({ inline: 'center', block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { threshold: [0.35, 0.55], rootMargin: '-20% 0px -45% 0px' });

  getSections().forEach((section) => activeObserver.observe(section));

  document.addEventListener('keydown', (event) => {
    if (!body.classList.contains('reader-open')) return;
    const activeElement = document.activeElement;
    const isTyping = activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName);
    if (isTyping || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

    const sections = getSections();
    const current = sections.reduce((nearest, section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().top - 140);
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: 0, distance: Infinity });
    const nextIndex = event.key === 'ArrowDown'
      ? Math.min(sections.length - 1, current.index + 1)
      : Math.max(0, current.index - 1);
    if (nextIndex !== current.index) {
      event.preventDefault();
      scrollToModule(sections[nextIndex].id);
    }
  });

  routeFromHash(true);
  revealVisible();
})();
