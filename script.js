/* ═══════════════════════════════════════════════════════════════
   INSOMNIA — NIGHTLIFE ENTERTAINMENT
   script.js — Phase 1: Core Interactions + i18n + Particles
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── 1. TRANSLATIONS ───────────────────────────────────────── */
const TRANSLATIONS = {
  en: {
    // Ticker
    ticker_1: 'Next event coming soon — stay tuned',
    ticker_2: 'VIP memberships now available',
    ticker_3: 'Join our Discord community today',
    ticker_4: 'INSOMNIA — Where the night never ends',

    // Nav
    nav_home:         'Home',
    nav_experience:   'Experience',
    nav_events:       'Events',
    nav_vip:          'VIP',
    nav_hof:          'Hall of Fame',
    nav_reservations: 'Reservations',
    nav_jobs:         'Jobs',
    nav_gallery:      'Gallery',
    nav_community:    'Community',
    nav_business:     'Business',

    // Hero
    hero_badge:       'Roblox Nightlife Experience',
    hero_tagline:     'Where the night never ends.',
    hero_description: 'A premium nightlife experience inside Roblox, built to connect music, events, community, status and social energy in one place.',

    // Buttons
    btn_play:    'Play on Roblox',
    btn_discord: 'Join Discord',

    // Stats
    stat_members: 'Members',
    stat_events:  'Events Held',
    stat_staff:   'Staff Members',

    // Scroll
    scroll_down: 'Scroll',

    // Phase placeholder
    phase_title:    'More sections loading soon',
    phase_sub:      'Events · VIP · Hall of Fame · Reservations · Jobs · Gallery · Community · Business',
    progress_label: 'Phase 1 of 3 — Base Structure',

    // Footer
    footer_privacy: 'Privacy',
    footer_terms:   'Terms',
    footer_contact: 'Contact',
    footer_copy:    '© 2025 INSOMNIA Nightlife Entertainment. All rights reserved.',
  },

  es: {
    // Ticker
    ticker_1: 'Próximo evento muy pronto — mantente atento',
    ticker_2: 'Membresías VIP ya disponibles',
    ticker_3: 'Únete a nuestra comunidad de Discord hoy',
    ticker_4: 'INSOMNIA — Donde la noche nunca termina',

    // Nav
    nav_home:         'Inicio',
    nav_experience:   'Experiencia',
    nav_events:       'Eventos',
    nav_vip:          'VIP',
    nav_hof:          'Hall of Fame',
    nav_reservations: 'Reservas',
    nav_jobs:         'Trabajos',
    nav_gallery:      'Galería',
    nav_community:    'Comunidad',
    nav_business:     'Negocios',

    // Hero
    hero_badge:       'Experiencia Nocturna en Roblox',
    hero_tagline:     'Donde la noche nunca termina.',
    hero_description: 'Una experiencia premium de vida nocturna dentro de Roblox, creada para conectar música, eventos, comunidad, estatus y energía social en un solo lugar.',

    // Buttons
    btn_play:    'Jugar en Roblox',
    btn_discord: 'Unirse a Discord',

    // Stats
    stat_members: 'Miembros',
    stat_events:  'Eventos Realizados',
    stat_staff:   'Miembros del Staff',

    // Scroll
    scroll_down: 'Bajar',

    // Phase placeholder
    phase_title:    'Más secciones próximamente',
    phase_sub:      'Eventos · VIP · Hall of Fame · Reservas · Trabajos · Galería · Comunidad · Negocios',
    progress_label: 'Fase 1 de 3 — Estructura Base',

    // Footer
    footer_privacy: 'Privacidad',
    footer_terms:   'Términos',
    footer_contact: 'Contacto',
    footer_copy:    '© 2025 INSOMNIA Nightlife Entertainment. Todos los derechos reservados.',
  }
};

/* ─── 2. I18N ENGINE ────────────────────────────────────────── */
let currentLang = localStorage.getItem('insomnia_lang') || 'en';

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('insomnia_lang', lang);

  const dict = TRANSLATIONS[lang];

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  // Update html lang attribute
  document.documentElement.setAttribute('lang', lang);

  // Update active state on all lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Dispatch custom event for future sections to hook into
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});

/* ─── 3. CUSTOM CURSOR ──────────────────────────────────────── */
(function initCursor() {
  let mouseX = -100, mouseY = -100;
  let rafId = null;

  function updateCSSVars() {
    document.body.style.setProperty('--cx', mouseX + 'px');
    document.body.style.setProperty('--cy', mouseY + 'px');
    rafId = null;
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(updateCSSVars);
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    document.body.style.setProperty('--cx', '-200px');
    document.body.style.setProperty('--cy', '-200px');
  });

  // Disable on touch devices
  window.addEventListener('touchstart', () => {
    document.body.style.setProperty('--cx', '-200px');
    document.body.style.setProperty('--cy', '-200px');
  }, { once: true });
})();

/* ─── 4. NAVIGATION ─────────────────────────────────────────── */
(function initNav() {
  const header    = document.getElementById('nav-header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const tickerH   = 38; // matches --ticker-h

  // Scroll shadow
  function onScroll() {
    const scrolled = window.scrollY > 20;
    header.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Mobile menu toggle
  function openMobileMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  window.closeMobileMenu = closeMobileMenu;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const navH      = 72 + tickerH;

  function setActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - navH - 60;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
})();

/* ─── 5. HERO CANVAS PARTICLES ──────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Disable on low-power devices
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const CONFIG = {
    count:      120,
    minSize:    0.5,
    maxSize:    2.5,
    speed:      0.18,
    colors:     ['#A855F7', '#00C8FF', '#FF2D9B', '#7C3AED', '#06EFC5'],
    lineColor:  'rgba(168, 85, 247, 0.06)',
    linkDist:   120,
    opacity:    { min: 0.1, max: 0.7 },
  };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize),
      vx:    (Math.random() - 0.5) * CONFIG.speed,
      vy:    (Math.random() - 0.5) * CONFIG.speed,
      color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
      alpha: CONFIG.opacity.min + Math.random() * (CONFIG.opacity.max - CONFIG.opacity.min),
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.count }, createParticle);
  }

  function drawParticles(ts) {
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.linkDist) {
          const opacity = (1 - dist / CONFIG.linkDist) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.pulse += 0.015;
      const pulseFactor = 0.8 + 0.2 * Math.sin(p.pulse);
      const r = p.r * pulseFactor;
      const alpha = p.alpha * pulseFactor;

      // Glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
      grad.addColorStop(0, hexToRgba(p.color, alpha * 0.8));
      grad.addColorStop(0.4, hexToRgba(p.color, alpha * 0.3));
      grad.addColorStop(1, hexToRgba(p.color, 0));
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(p.color, alpha);
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -r * 2) p.x = W + r;
      if (p.x > W + r * 2) p.x = -r;
      if (p.y < -r * 2) p.y = H + r;
      if (p.y > H + r * 2) p.y = -r;
    });

    animId = requestAnimationFrame(drawParticles);
  }

  function hexToRgba(hex, alpha) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(168,85,247,${alpha})`;
    return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${alpha})`;
  }

  // Init + start
  init();
  animId = requestAnimationFrame(drawParticles);

  // Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      init();
      animId = requestAnimationFrame(drawParticles);
    }, 200);
  });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(drawParticles);
    }
  });

  // Mouse repel effect
  let mousePos = { x: -9999, y: -9999 };
  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  });

  // Inject mouse repel into draw loop
  const origDraw = drawParticles;
  // We'll apply repel directly in the move step:
  const _originalStep = () => {};
  // Apply a light repel toward mouse
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    particles.forEach(p => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const force = (80 - dist) / 80 * 0.4;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        // Cap velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }
      }
    });
  }, { passive: true });

})();

/* ─── 6. STAT COUNTER ANIMATION ─────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOutExpo(progress) * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  // Trigger when stats are visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ─── 7. SMOOTH ANCHOR SCROLL ───────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const tickerH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--ticker-h'), 10) || 38;
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 72;
      const offset = target.getBoundingClientRect().top + window.scrollY - navH - tickerH - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
})();

/* ─── 8. TICKER PAUSE ON HOVER ──────────────────────────────── */
(function initTicker() {
  const ticker = document.querySelector('.ticker-content');
  if (!ticker) return;
  const bar = document.querySelector('.ticker-bar');
  bar.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  bar.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });
})();

/* ─── 9. NEON HOVER GLOW ON BUTTONS ─────────────────────────── */
(function initButtonGlow() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      btn.style.setProperty('--mx', x + '%');
      btn.style.setProperty('--my', y + '%');
    });
  });
})();

/* ─── 10. SECTION REVEAL ON SCROLL ──────────────────────────── */
(function initScrollReveal() {
  // For future sections — observe any .scroll-reveal class
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
})();

/* ─── 11. EXTERNAL LINK CONFIG ───────────────────────────────── */
// Replace '#' with real URLs when ready
const EXTERNAL_LINKS = {
  roblox:  'https://www.roblox.com/games/YOUR_GAME_ID',
  discord: 'https://discord.gg/YOUR_INVITE_CODE',
  group:   'https://www.roblox.com/groups/YOUR_GROUP_ID',
};

document.addEventListener('DOMContentLoaded', () => {
  const btnRoblox  = document.getElementById('btn-roblox');
  const btnDiscord = document.getElementById('btn-discord');

  if (btnRoblox) {
    btnRoblox.href   = EXTERNAL_LINKS.roblox;
    btnRoblox.target = '_blank';
    btnRoblox.rel    = 'noopener noreferrer';
  }

  if (btnDiscord) {
    btnDiscord.href   = EXTERNAL_LINKS.discord;
    btnDiscord.target = '_blank';
    btnDiscord.rel    = 'noopener noreferrer';
  }
});

/* ─── 12. DISCORD WEBHOOK HELPER (phase 2+) ─────────────────── */
// Pre-built architecture — activate when webhook URLs are ready
const WEBHOOKS = {
  applications:  null, // 'https://discord.com/api/webhooks/...'
  reservations:  null,
  partnerships:  null,
  contact:       null,
};

async function sendDiscordWebhook(type, data) {
  const url = WEBHOOKS[type];
  if (!url) {
    console.warn(`[INSOMNIA] Webhook "${type}" not configured yet.`);
    return { ok: false, reason: 'not_configured' };
  }

  const embed = buildEmbed(type, data);

  try {
    const res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ embeds: [embed] }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error('[INSOMNIA] Webhook error:', err);
    return { ok: false, reason: 'network_error' };
  }
}

function buildEmbed(type, data) {
  const embeds = {
    applications: {
      title:       '🎤 New Staff Application',
      color:       0xA855F7,
      description: 'A new application has been submitted.',
      fields: [
        { name: 'Roblox Username',  value: data.roblox   || '—', inline: true },
        { name: 'Discord Username', value: data.discord  || '—', inline: true },
        { name: 'Role',             value: data.role     || '—', inline: true },
        { name: 'Experience',       value: data.experience || '—' },
        { name: 'Availability',     value: data.availability || '—', inline: true },
        { name: 'Language',         value: data.language || '—', inline: true },
        { name: 'Why this role?',   value: data.reason   || '—' },
        { name: 'Extra Notes',      value: data.notes    || '—' },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'INSOMNIA Nightlife Entertainment' },
    },

    reservations: {
      title:       '🍾 New VIP Table Reservation',
      color:       0xFF2D9B,
      description: 'A new table reservation has been requested.',
      fields: [
        { name: 'Roblox Username',  value: data.roblox   || '—', inline: true },
        { name: 'Discord Username', value: data.discord  || '—', inline: true },
        { name: 'Event',            value: data.event    || '—', inline: true },
        { name: 'Table Type',       value: data.tableType || '—', inline: true },
        { name: 'Guests',           value: String(data.guests || '—'), inline: true },
        { name: 'Message',          value: data.message  || '—' },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'INSOMNIA Nightlife Entertainment' },
    },

    partnerships: {
      title:       '🤝 New Partnership Request',
      color:       0x00C8FF,
      description: 'A new partnership inquiry has been received.',
      fields: [
        { name: 'Name / Brand',     value: data.name     || '—', inline: true },
        { name: 'Discord',          value: data.discord  || '—', inline: true },
        { name: 'Type',             value: data.type     || '—', inline: true },
        { name: 'Message',          value: data.message  || '—' },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'INSOMNIA Nightlife Entertainment' },
    },
  };

  return embeds[type] || { title: 'New Submission', color: 0xA855F7, description: JSON.stringify(data) };
}

// Expose globally for future form integration
window.INSOMNIA = {
  setLanguage,
  sendDiscordWebhook,
  WEBHOOKS,
  EXTERNAL_LINKS,
  currentLang: () => currentLang,
};

console.log('%c INSOMNIA %c Nightlife Entertainment — v1.0.0 ',
  'background:#A855F7;color:#fff;font-weight:bold;padding:4px 8px;border-radius:3px 0 0 3px',
  'background:#080510;color:#A855F7;padding:4px 8px;border-radius:0 3px 3px 0;border:1px solid #A855F7'
);

/* ═══════════════════════════════════════════════════════════════
   PHASE 2A — EVENTS + HERO UPGRADES
   ═══════════════════════════════════════════════════════════════ */

/* ─── NEW i18n KEYS (Phase 2A) ──────────────────────────────── */
(function extendTranslations() {
  const ext = {
    en: {
      // Hero upgrades
      live_soon:    'LIVE SOON',
      live_tonight: "Tonight's doors open at 9PM",
      nev_label:    'Next Event',
      nev_name:     'Neon Latin Night',
      nev_date:     'SAT · JUL 12 · 9PM',
      nev_cta:      'See Event →',
      cd_days: 'd', cd_hours: 'h', cd_mins: 'm', cd_secs: 's',

      // Events section
      events_eyebrow:  'Upcoming Events',
      events_title:    'The Night Schedule',
      events_subtitle: 'Every event is a new world. Dress up, show up, and live the night.',
      filter_all:      'All Events',
      filter_upcoming: 'Upcoming',
      filter_vip:      'VIP Only',
      filter_past:     'Past Events',

      // Event statuses
      ev_featured: 'Featured',
      ev_upcoming: 'Upcoming',
      ev_vip_only: 'VIP Only',
      ev_past:     'Past Event',

      // Tags
      tag_latin:    'Latin Night',
      tag_vip_only: 'VIP Only',
      tag_exclusive:'Exclusive',
      tag_themed:   'Themed Night',
      tag_festival: 'Festival Night',
      tag_private:  'Private Night',

      // Event dates
      ev1_date: 'Saturday, Jul 12 · 9 PM',
      ev2_date: 'Friday, Jul 18 · 10 PM',
      ev3_date: 'Sat, Jul 26 · Midnight',
      ev4_date: 'Saturday, Aug 2 · 9 PM',
      ev5_date: 'Saturday, Aug 16 · 8 PM',
      ev6_date: 'Friday, Jun 20 · 10 PM',

      // Event details
      ev_dj:        'DJ',
      ev_host:      'Host',
      ev_dress:     'Dress Code',
      ev_access:    'Access',
      ev_attendees: 'Attendees',
      ev1_dress:    'Neon & Urban',
      ev2_dress:    'Elegant Black',
      ev3_dress:    'All Black',
      ev4_dress:    'Full White Only',
      ev5_dress:    'Festival Vibes',
      ev6_dress:    'Luxury Only',
      access_open:      'Open + VIP',
      access_vip:       'VIP + Royal',
      access_backstage: 'Backstage Pass',

      // Countdown
      ev_starts_in: 'Starts in',

      // Past
      ev_past_note: 'This event has ended. Check the gallery for highlights.',

      // Buttons
      btn_rsvp:      'RSVP Now',
      btn_reserve:   'Reserve Table',
      btn_join_event:'Join Event',
      btn_gallery:   'View Gallery',
      btn_all_events:'View All Events',
    },
    es: {
      // Hero upgrades
      live_soon:    'EN VIVO PRONTO',
      live_tonight: 'Las puertas abren esta noche a las 9PM',
      nev_label:    'Próximo Evento',
      nev_name:     'Neon Latin Night',
      nev_date:     'SAB · 12 JUL · 9PM',
      nev_cta:      'Ver Evento →',
      cd_days: 'd', cd_hours: 'h', cd_mins: 'm', cd_secs: 's',

      // Events section
      events_eyebrow:  'Próximos Eventos',
      events_title:    'El Horario de la Noche',
      events_subtitle: 'Cada evento es un mundo nuevo. Vístete, aparece y vive la noche.',
      filter_all:      'Todos',
      filter_upcoming: 'Próximos',
      filter_vip:      'Solo VIP',
      filter_past:     'Pasados',

      // Event statuses
      ev_featured: 'Destacado',
      ev_upcoming: 'Próximo',
      ev_vip_only: 'Solo VIP',
      ev_past:     'Evento Pasado',

      // Tags
      tag_latin:    'Noche Latina',
      tag_vip_only: 'Solo VIP',
      tag_exclusive:'Exclusivo',
      tag_themed:   'Noche Temática',
      tag_festival: 'Noche Festival',
      tag_private:  'Noche Privada',

      // Event dates
      ev1_date: 'Sábado, 12 Jul · 9 PM',
      ev2_date: 'Viernes, 18 Jul · 10 PM',
      ev3_date: 'Sáb, 26 Jul · Medianoche',
      ev4_date: 'Sábado, 2 Ago · 9 PM',
      ev5_date: 'Sábado, 16 Ago · 8 PM',
      ev6_date: 'Viernes, 20 Jun · 10 PM',

      // Event details
      ev_dj:        'DJ',
      ev_host:      'Anfitrión',
      ev_dress:     'Código de Vestimenta',
      ev_access:    'Acceso',
      ev_attendees: 'Asistentes',
      ev1_dress:    'Neón & Urbano',
      ev2_dress:    'Elegante Negro',
      ev3_dress:    'Todo Negro',
      ev4_dress:    'Solo Blanco',
      ev5_dress:    'Festival Vibes',
      ev6_dress:    'Solo Lujo',
      access_open:      'Abierto + VIP',
      access_vip:       'VIP + Royal',
      access_backstage: 'Pase Backstage',

      // Countdown
      ev_starts_in: 'Comienza en',

      // Past
      ev_past_note: 'Este evento ha terminado. Visita la galería para ver los highlights.',

      // Buttons
      btn_rsvp:      'Reservar Lugar',
      btn_reserve:   'Reservar Mesa',
      btn_join_event:'Unirse al Evento',
      btn_gallery:   'Ver Galería',
      btn_all_events:'Ver Todos los Eventos',
    }
  };

  // Merge into existing TRANSLATIONS
  Object.keys(ext).forEach(lang => {
    Object.assign(TRANSLATIONS[lang], ext[lang]);
  });
})();

/* ─── COUNTDOWN ENGINE ──────────────────────────────────────── */
function getCountdownValues(targetDateStr) {
  const target = new Date(targetDateStr).getTime();
  const now    = Date.now();
  const diff   = target - now;

  if (diff <= 0) return { d:'00', h:'00', m:'00', s:'00', ended: true };

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  const pad = n => String(n).padStart(2, '0');
  return { d: pad(days), h: pad(hours), m: pad(mins), s: pad(secs), ended: false };
}

function initAllCountdowns() {
  // Hero floating card countdown (fixed target = first upcoming event)
  const heroTarget = '2025-07-12T21:00:00';
  const heroD = document.getElementById('hcd-d');
  const heroH = document.getElementById('hcd-h');
  const heroM = document.getElementById('hcd-m');
  const heroS = document.getElementById('hcd-s');

  // Card countdowns
  const cardCountdowns = document.querySelectorAll('.ev-countdown[data-target]');

  function tick() {
    // Hero card
    if (heroD) {
      const v = getCountdownValues(heroTarget);
      heroD.textContent = v.d;
      heroH.textContent = v.h;
      heroM.textContent = v.m;
      heroS.textContent = v.s;
    }

    // Event cards
    cardCountdowns.forEach(block => {
      const target = block.getAttribute('data-target');
      if (!target) return;
      const v = getCountdownValues(target);
      const nums = block.querySelectorAll('.ev-cd-num');
      if (nums.length >= 4) {
        nums[0].textContent = v.d;
        nums[1].textContent = v.h;
        nums[2].textContent = v.m;
        nums[3].textContent = v.s;
      }
      if (v.ended) {
        block.classList.add('ended');
        const label = block.querySelector('.ev-cd-label');
        if (label) label.textContent = currentLang === 'es' ? 'Evento finalizado' : 'Event ended';
      }
    });
  }

  tick();
  setInterval(tick, 1000);
}

/* ─── EVENT FILTER TABS ─────────────────────────────────────── */
function initEventFilters() {
  const filters = document.querySelectorAll('.ev-filter');
  const cards   = document.querySelectorAll('.event-card');

  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filters.forEach(f => { f.classList.remove('active'); f.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const show = filter === 'all' || cat === filter;

        if (show) {
          card.style.display = '';
          card.style.animation = 'reveal-up 0.4s var(--ease-out) forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─── CARD RSVP / RESERVE BUTTON FEEDBACK ───────────────────── */
function initEventButtons() {
  document.querySelectorAll('.ev-btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
      const orig = this.textContent;
      this.textContent = currentLang === 'es' ? '✓ Registrado' : '✓ Registered';
      this.style.background = 'linear-gradient(135deg, #06EFC5, #00C8FF)';
      this.disabled = true;
      setTimeout(() => {
        this.textContent = orig;
        this.style.background = '';
        this.disabled = false;
      }, 3000);
    });
  });

  document.querySelectorAll('.ev-btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
      // Smooth scroll to reservations (future section)
      const res = document.getElementById('reservations');
      if (res) {
        res.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Show a pulse feedback for now
        this.textContent = currentLang === 'es' ? '→ Reservas pronto' : '→ Coming soon';
        setTimeout(() => {
          this.setAttribute('data-i18n', 'btn_reserve');
          this.textContent = TRANSLATIONS[currentLang]['btn_reserve'];
        }, 2500);
      }
    });
  });
}

/* ─── SCROLL REVEAL (reinit for new elements) ────────────────── */
function initScrollRevealPhase2() {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--sr-delay') || '0s';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Stagger event cards
  document.querySelectorAll('.event-card').forEach((card, i) => {
    card.classList.add('scroll-reveal');
    card.style.setProperty('--sr-delay', `${i * 0.08}s`);
    revealObserver.observe(card);
  });

  // Section headers and filters
  document.querySelectorAll('.scroll-reveal:not(.event-card)').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ─── INIT ALL PHASE 2A ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAllCountdowns();
  initEventFilters();
  initEventButtons();
  initScrollRevealPhase2();

  // Re-apply language to new keys
  setLanguage(currentLang);
});
