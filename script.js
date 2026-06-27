(() => {
  document.documentElement.classList.add('has-js');
  const header = document.querySelector('[data-header]');
  const contentsPage = document.querySelector('#contents');
  const readerPage = document.querySelector('#reader');
  const sections = [...document.querySelectorAll('[data-section]')];
  const chapterLinks = [...document.querySelectorAll('.chapter-nav [data-module-target]')];
  const moduleLinks = [...document.querySelectorAll('[data-module-target]')];
  const homeLinks = [...document.querySelectorAll('[data-home-link]')];
  const revealEls = [...document.querySelectorAll('.reveal')];
  const statEls = [...document.querySelectorAll('.stat-settle')];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let atmosphereTicking = false;

  const setHeaderState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 10);
  };

  const setAtmosphereShift = () => {
    const shift = Math.min(120, Math.max(0, window.scrollY * 0.035));
    document.documentElement.style.setProperty('--atmo-shift', `${shift.toFixed(2)}px`);
    atmosphereTicking = false;
  };

  const requestAtmosphereShift = () => {
    if (prefersReducedMotion || atmosphereTicking) return;
    atmosphereTicking = true;
    requestAnimationFrame(setAtmosphereShift);
  };

  const formatNumericStat = (value, decimals, suffix) => {
    const formatted = Number(value).toFixed(decimals);
    return `${formatted}${suffix}`;
  };

  const settleStat = (el) => {
    if (!el || el.dataset.statAnimated === 'true') return;
    const finalRaw = (el.dataset.stat || el.textContent || '').trim();
    el.dataset.statAnimated = 'true';
    el.setAttribute('aria-label', finalRaw);

    if (prefersReducedMotion) {
      el.textContent = finalRaw;
      el.classList.add('is-settled');
      return;
    }

    const suffix = finalRaw.endsWith('%') ? '%' : '';
    const numericRaw = suffix ? finalRaw.slice(0, -1) : finalRaw;
    const numeric = Number.parseFloat(numericRaw.replace(/,/g, ''));
    const isNumeric = Number.isFinite(numeric) && /^\d+(\.\d+)?%?$/.test(finalRaw);

    el.classList.add('is-counting');

    if (isNumeric) {
      const decimals = (numericRaw.split('.')[1] || '').length;
      const start = numeric >= 20 ? numeric * 0.92 : Math.max(0, numeric - 2);
      const overshoot = numeric >= 20 ? numeric * 1.035 : numeric + 1;
      el.textContent = formatNumericStat(start, decimals, suffix);
      window.setTimeout(() => { el.textContent = formatNumericStat(overshoot, decimals, suffix); }, 260);
      window.setTimeout(() => {
        el.textContent = finalRaw;
        el.classList.remove('is-counting');
        el.classList.add('is-settled');
      }, 650);
      return;
    }

    // Short non-numeric labels such as C&P get a tiny, non-slot-machine settle.
    if (finalRaw.includes('&')) el.textContent = finalRaw.replace('&', '·');
    window.setTimeout(() => {
      el.textContent = finalRaw;
      el.classList.remove('is-counting');
      el.classList.add('is-settled');
    }, 420);
  };

  const setActiveChapter = (id) => {
    document.body.dataset.activeModule = id || '';
    chapterLinks.forEach((link) => {
      const active = link.dataset.moduleTarget === id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
        link.scrollIntoView({ inline: 'center', block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const scrollToModule = (id, updateHash = true) => {
    const target = document.getElementById(id);
    if (!target) return;
    const headerH = header?.offsetHeight || 0;
    const chapterH = document.querySelector('.chapter-nav')?.offsetHeight || 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerH - chapterH - 18;
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setActiveChapter(id);
    if (updateHash && location.hash !== `#${id}`) history.pushState({ view: 'reader', id }, '', `#${id}`);
  };

  const showContents = (updateHash = true) => {
    readerPage.hidden = true;
    contentsPage.hidden = false;
    document.body.dataset.mode = 'contents';
    document.body.dataset.activeModule = '';
    chapterLinks.forEach(link => link.classList.remove('is-active'));
    if (updateHash && location.hash !== '#contents') history.pushState({ view: 'contents' }, '', '#contents');
    requestAnimationFrame(() => {
  document.documentElement.classList.add('has-js');
      contentsPage.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  };

  const showReader = (id = 'module-01', updateHash = true) => {
    contentsPage.hidden = true;
    readerPage.hidden = false;
    document.body.dataset.mode = 'reader';
    requestAnimationFrame(() => scrollToModule(id, updateHash));
  };

  moduleLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.dataset.moduleTarget;
      if (!id) return;
      event.preventDefault();
      showReader(id, true);
    });
  });

  homeLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showContents(true);
    });
  });

  window.addEventListener('popstate', () => {
    const id = location.hash.replace('#', '');
    if (id && id.startsWith('module-')) showReader(id, false);
    else showContents(false);
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.replace('#', '');
    if (id && id.startsWith('module-')) showReader(id, false);
    else if (id === 'contents') showContents(false);
  });

  window.addEventListener('scroll', () => {
    setHeaderState();
    requestAtmosphereShift();
  }, { passive: true });
  setHeaderState();
  setAtmosphereShift();

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
    statEls.forEach(el => settleStat(el));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        settleStat(entry.target);
        statObserver.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -4% 0px' });
    statEls.forEach(el => statObserver.observe(el));

  }

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
    if (!visible.length || readerPage.hidden) return;
    setActiveChapter(visible[0].target.id);
  }, { threshold: [0.28, 0.5], rootMargin: '-22% 0px -48% 0px' });
  sections.forEach(section => sectionObserver.observe(section));

  document.addEventListener('keydown', (event) => {
    if (readerPage.hidden) return;
    const activeElement = document.activeElement;
    const isTyping = activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName);
    if (isTyping || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    const current = sections.reduce((nearest, section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().top - ((header?.offsetHeight || 0) + 70));
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: 0, distance: Infinity });
    const nextIndex = event.key === 'ArrowDown'
      ? Math.min(sections.length - 1, current.index + 1)
      : Math.max(0, current.index - 1);
    if (nextIndex !== current.index) {
      event.preventDefault();
      const id = sections[nextIndex].id;
      scrollToModule(id, true);
    }
  });

  const initialId = location.hash.replace('#', '');
  if (initialId && initialId.startsWith('module-')) {
    showReader(initialId, false);
  } else {
    showContents(false);
  }
})();
