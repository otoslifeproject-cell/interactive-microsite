/* OTOS_JUMP_STYLE_STATS_GLASS_V3_20260627
   Odometer/reel stat motion rebuilt to emulate the Jump-style roll-and-settle feel.
   No proprietary code copied. */
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
    const shift = Math.min(160, Math.max(0, window.scrollY * 0.055));
    document.documentElement.style.setProperty('--atmo-shift', `${shift.toFixed(2)}px`);
    atmosphereTicking = false;
  };

  const requestAtmosphereShift = () => {
    if (prefersReducedMotion || atmosphereTicking) return;
    atmosphereTicking = true;
    requestAnimationFrame(setAtmosphereShift);
  };

  const isDigit = (char) => /\d/.test(char);
  const textPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const digitPool = '01234567890123456789';

  const randomFrom = (pool, offset) => pool[(offset * 7 + 3) % pool.length];

  const buildReelSequence = (char, index) => {
    if (isDigit(char)) {
      const final = Number(char);
      const start = (final + 5 + index) % 10;
      const seq = [];
      for (let i = 0; i < 18; i += 1) seq.push(String((start + i) % 10));
      seq.push(String(final));
      return seq;
    }
    if (/[A-Z]/i.test(char)) {
      const upper = char.toUpperCase();
      const seq = [];
      const start = (upper.charCodeAt(0) + index * 5) % textPool.length;
      for (let i = 0; i < 14; i += 1) seq.push(randomFrom(textPool, start + i));
      seq.push(char);
      return seq;
    }
    if (char === '&') return ['+', '/', '×', '·', '&'];
    if (char === '%') return ['+', '•', 'º', '%'];
    return [char];
  };

  const createReel = (char, index) => {
    const sequence = buildReelSequence(char, index);
    const viewport = document.createElement('span');
    viewport.className = `stat-reel-window${isDigit(char) ? ' is-digit' : ' is-symbol'}`;
    viewport.style.setProperty('--col-index', index);

    const strip = document.createElement('span');
    strip.className = 'stat-reel-strip';
    strip.style.setProperty('--steps', Math.max(0, sequence.length - 1));
    sequence.forEach((item) => {
      const cell = document.createElement('span');
      cell.className = 'stat-reel-cell';
      cell.textContent = item;
      strip.appendChild(cell);
    });
    viewport.appendChild(strip);
    return { viewport, strip, steps: sequence.length - 1, char };
  };

  const prepareReelStat = (el) => {
    if (el.dataset.reelPrepared === 'true') return;
    const finalRaw = (el.dataset.stat || el.textContent || '').trim();
    el.dataset.finalStat = finalRaw;
    el.dataset.reelPrepared = 'true';
    el.setAttribute('aria-label', finalRaw);
    el.textContent = '';

    const group = document.createElement('span');
    group.className = 'stat-reel-group';
    group.setAttribute('aria-hidden', 'true');
    const reels = [...finalRaw].map((char, index) => {
      const reel = createReel(char, index);
      group.appendChild(reel.viewport);
      return reel;
    });
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = finalRaw;
    el.append(group, sr);
    el._otosReels = reels;
  };

  const runReelStat = (el) => {
    if (!el || el.dataset.statAnimated === 'true') return;
    const finalRaw = (el.dataset.stat || el.textContent || '').trim();
    if (!finalRaw) return;
    el.dataset.statAnimated = 'true';

    if (prefersReducedMotion) {
      el.textContent = finalRaw;
      el.classList.add('is-settled');
      return;
    }

    prepareReelStat(el);
    const reels = el._otosReels || [];
    const parentCard = el.closest('article, .test-metrics div, .metric-card, .chapter-subsection, div');
    parentCard?.classList.add('stat-card-live');
    el.classList.remove('is-settled');
    el.classList.add('is-rolling');

    reels.forEach((reel, index) => {
      const duration = 1120 + index * 105;
      const delay = index * 72;
      const distance = `calc(var(--steps) * -1em)`;
      reel.strip.style.transition = 'none';
      reel.strip.style.transform = 'translate3d(0, 0, 0)';
      reel.viewport.classList.remove('is-settled');
      // Force layout so the reset is visible before the transition starts.
      void reel.strip.offsetHeight;
      window.setTimeout(() => {
        reel.viewport.classList.add('is-moving');
        reel.strip.style.transition = `transform ${duration}ms cubic-bezier(.12,.78,.17,1.02)`;
        reel.strip.style.transform = `translate3d(0, ${distance}, 0)`;
      }, delay);
      window.setTimeout(() => {
        reel.viewport.classList.remove('is-moving');
        reel.viewport.classList.add('is-settled');
      }, delay + duration + 40);
    });

    const total = 1320 + reels.length * 125;
    window.setTimeout(() => {
      el.classList.remove('is-rolling');
      el.classList.add('is-settled');
      parentCard?.classList.remove('stat-card-live');
    }, total);
  };

  statEls.forEach(prepareReelStat);

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
    const top = window.scrollY + target.getBoundingClientRect().top - headerH - chapterH - 28;
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
    statEls.forEach((el) => {
      el.textContent = el.dataset.finalStat || el.dataset.stat || el.textContent;
      el.classList.add('is-settled');
    });
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
        runReelStat(entry.target);
        statObserver.unobserve(entry.target);
      });
    }, { threshold: 0.42, rootMargin: '0px 0px -8% 0px' });
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
