'use strict';

/* ── Data ── */
const products = [
  {
    id: 1,
    title: 'DataPulse',
    description: 'Real-time analytics dashboard for monitoring KPIs with customizable widgets, automated alerts, and exportable reports.',
    type: 'Analytics',
    tags: ['real-time', 'dashboards', 'alerts'],
    icon: '📊',
    link: 'https://www.test.com/'
  },
  {
    id: 2,
    title: 'MetricFlow',
    description: 'Business intelligence platform that transforms raw data into actionable insights with a drag-and-drop report builder.',
    type: 'Analytics',
    tags: ['BI', 'reporting', 'data'],
    icon: '📈',
    link: 'https://example.com/metricflow'
  },
  {
    id: 3,
    title: 'CodeSync',
    description: 'Collaborative code review platform with real-time annotations, inline discussion threads, and AI-assisted suggestions.',
    type: 'Developer Tools',
    tags: ['code-review', 'git', 'collaboration'],
    icon: '⌨️',
    link: 'https://example.com/codesync'
  },
  {
    id: 4,
    title: 'BuildBot',
    description: 'Automated CI/CD pipeline manager with smart failure analysis, one-click rollbacks, and multi-environment support.',
    type: 'Developer Tools',
    tags: ['CI/CD', 'automation', 'deployment'],
    icon: '🤖',
    link: 'https://example.com/buildbot'
  },
  {
    id: 5,
    title: 'DesignKit',
    description: 'Comprehensive UI component library with Figma sync, automatic code generation, and full accessibility compliance checks.',
    type: 'Design Systems',
    tags: ['components', 'Figma', 'a11y'],
    icon: '🎨',
    link: 'https://example.com/designkit'
  },
  {
    id: 6,
    title: 'TokenStudio',
    description: 'Design token management system that keeps typography, color, and spacing perfectly in sync across every platform.',
    type: 'Design Systems',
    tags: ['tokens', 'theming', 'sync'],
    icon: '🎛️',
    link: 'https://example.com/tokenstudio'
  },
  {
    id: 7,
    title: 'TaskMaster',
    description: 'Agile project management suite with sprint planning, burndown charts, dependency tracking, and velocity reports.',
    type: 'Productivity',
    tags: ['agile', 'sprints', 'planning'],
    icon: '✅',
    link: 'https://example.com/taskmaster'
  },
  {
    id: 8,
    title: 'Notex',
    description: 'Smart knowledge base with semantic search, bidirectional links, and real-time team collaboration built in.',
    type: 'Productivity',
    tags: ['notes', 'knowledge', 'search'],
    icon: '📝',
    link: 'https://example.com/notex'
  }
];

const documents = [
  {
    id: 1,
    title: 'System Architecture Guide',
    topic: 'Technical',
    size: '2.4 MB',
    url: 'assets/documents/sample_report.pdf'
  },
  {
    id: 2,
    title: 'API Reference Manual',
    topic: 'Technical',
    size: '5.1 MB',
    url: 'assets/documents/api-reference.pdf'
  },
  {
    id: 3,
    title: 'Security & Compliance',
    topic: 'Technical',
    size: '1.8 MB',
    url: 'assets/documents/security.pdf'
  },
  {
    id: 4,
    title: 'Company Handbook',
    topic: 'Business',
    size: '3.2 MB',
    url: 'assets/documents/handbook.pdf'
  },
  {
    id: 5,
    title: 'Partnership Program',
    topic: 'Business',
    size: '0.9 MB',
    url: 'assets/documents/partnership.pdf'
  },
  {
    id: 6,
    title: 'Annual Product Report 2025',
    topic: 'Research',
    size: '4.7 MB',
    url: 'assets/documents/annual-report-2025.pdf'
  }
];

/* ── Featured ── */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  const picks = [products[0], products[2], products[6]];
  grid.innerHTML = picks.map(p => `
    <div class="mini-card">
      <p class="mini-card__cat">${p.type}</p>
      <h3 class="mini-card__title">${p.title}</h3>
      <p class="mini-card__desc">${p.description}</p>
    </div>
  `).join('');
}

/* ── State ── */
let activeType = 'all';
let activeTag  = 'all';
let activeDocTopic = 'all';
let productQuery = '';
let docQuery = '';

/* ── Products ── */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const types = [...new Set(products.map(p => p.type))];

  grid.className = 'products-grid-wrap';

  let anyVisible = false;
  const html = types.map(type => {
    if (activeType !== 'all' && activeType !== type) return '';

    let grouped = products.filter(p => p.type === type);
    if (activeTag !== 'all') grouped = grouped.filter(p => p.tags.includes(activeTag));

    if (productQuery) {
      const q = productQuery.toLowerCase();
      grouped = grouped.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (grouped.length === 0) return '';
    anyVisible = true;

    return `
      <div class="product-group" data-type="${type}">
        <div class="product-group__divider">
          <span class="product-group__name">${type}</span>
          <div class="product-group__line"></div>
        </div>
        <div class="product-group__grid">
          ${grouped.map(renderCard).join('')}
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = anyVisible ? html : `
    <div class="products-no-results">
      <p class="products-no-results__title">No products found</p>
      <p>Try a different search term or clear the filters</p>
    </div>
  `;

  renderTagFilter();
  bindPreviewButtons();
}

function renderTagFilter() {
  const wrap = document.getElementById('tagFilterWrap');
  const pool = activeType === 'all' ? products : products.filter(p => p.type === activeType);
  const tags = [...new Set(pool.flatMap(p => p.tags))].sort();

  wrap.innerHTML = `
    <div class="tag-filter-bar">
      <span class="tag-filter-label">Tags</span>
      <div class="filter-bar filter-bar--tags">
        <button class="filter-pill filter-pill--sm ${activeTag === 'all' ? 'active' : ''}" data-tag="all">All</button>
        ${tags.map(t => `<button class="filter-pill filter-pill--sm ${activeTag === t ? 'active' : ''}" data-tag="${t}">${t}</button>`).join('')}
      </div>
    </div>
  `;
}

function renderCard(p) {
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <article class="product-card" data-type="${p.type}">
      <div class="product-card__thumb">
        <div class="product-card__placeholder">
          <span class="product-card__placeholder-icon">${p.icon}</span>
          <span class="product-card__placeholder-label">${p.type}</span>
        </div>
      </div>
      <div class="product-card__body">
        <div class="product-card__row">
          <h3 class="product-card__title">${p.title}</h3>
          <span class="product-card__type">${p.type}</span>
        </div>
        <p class="product-card__desc">${p.description}</p>
        <div class="product-card__tags">${tags}</div>
        <div class="product-card__actions">
          <a href="${p.link}" target="_blank" rel="noopener noreferrer"
             class="btn btn--pill btn--outline btn--sm">Open Link</a>
          <button class="btn btn--pill btn--dark btn--sm preview-btn"
                  data-title="${p.title}" data-url="${p.link}">Preview</button>
        </div>
      </div>
    </article>
  `;
}

/* ── Filters ── */
function initFilters() {
  // Type filter
  document.getElementById('typeFilterBar').addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill[data-filter]');
    if (!btn) return;
    document.querySelectorAll('#typeFilterBar .filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeType = btn.dataset.filter;
    activeTag = 'all';
    renderProducts();
  });

  // Tag filter — delegated on wrapper so it survives re-renders
  document.getElementById('tagFilterWrap').addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill[data-tag]');
    if (!btn) return;
    activeTag = btn.dataset.tag;
    renderProducts(); // renderProducts calls renderTagFilter, which marks correct active pill
  });
}

/* ── Preview Modal ── */
function openPreview(title, url) {
  const modal = document.getElementById('previewModal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalFrame').src = url;
  document.getElementById('modalExt').href = url;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  const modal = document.getElementById('previewModal');
  modal.hidden = true;
  document.getElementById('modalFrame').src = '';
  document.body.style.overflow = '';
}

function bindPreviewButtons() {
  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', () => openPreview(btn.dataset.title, btn.dataset.url));
  });
}

function initModal() {
  document.getElementById('modalClose').addEventListener('click', closePreview);
  document.getElementById('modalScrim').addEventListener('click', closePreview);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('previewModal').hidden) closePreview();
  });
}

/* ── Documents ── */
function renderDocuments() {
  const list = document.getElementById('docsList');
  const topics = [...new Set(documents.map(d => d.topic))];

  const docIcon = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
            stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `;

  list.innerHTML = topics.map(topic => {
    const topicDocs = documents.filter(d => d.topic === topic);
    return `
      <div class="docs-topic" data-topic="${topic}">
        <p class="docs-topic__label">${topic}</p>
        <ul class="docs-topic__items">
          ${topicDocs.map(doc => `
            <li class="doc-item" data-id="${doc.id}"
                role="button" tabindex="0" aria-label="Open ${doc.title}">
              <div class="doc-item__icon">${docIcon}</div>
              <div class="doc-item__info">
                <p class="doc-item__name">${doc.title}</p>
                <p class="doc-item__size">${doc.size}</p>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }).join('');

  list.addEventListener('click', e => {
    const item = e.target.closest('.doc-item');
    if (item) selectDoc(parseInt(item.dataset.id));
  });
  list.addEventListener('keydown', e => {
    const item = e.target.closest('.doc-item');
    if (item && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      selectDoc(parseInt(item.dataset.id));
    }
  });
}

function selectDoc(id) {
  const doc = documents.find(d => d.id === id);
  if (!doc) return;

  document.querySelectorAll('.doc-item').forEach(el =>
    el.classList.toggle('active', parseInt(el.dataset.id) === id)
  );

  document.getElementById('viewerEmpty').hidden = true;
  const active = document.getElementById('viewerActive');
  active.hidden = false;


  document.getElementById('viewerTitle').textContent = doc.title;
  document.getElementById('viewerCat').textContent = doc.topic;
  document.getElementById('viewerDownload').href = doc.url;
  document.getElementById('viewerFrame').src = doc.url;
}

function initDocViewer() {
  document.getElementById('viewerClose').addEventListener('click', () => {
    document.getElementById('viewerEmpty').hidden = false;
    document.getElementById('viewerActive').hidden = true;
    document.getElementById('viewerFrame').src = '';
    document.querySelectorAll('.doc-item').forEach(el => el.classList.remove('active'));
  });
}

/* ── Navigation ── */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('.nav__link').forEach(link =>
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav__link[data-section]')];

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.classList.remove('active'));
      const match = navLinks.find(l => l.dataset.section === entry.target.id);
      if (match) match.classList.add('active');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => io.observe(s));
}

/* ── Doc Filter ── */
function initDocFilter() {
  const topics = [...new Set(documents.map(d => d.topic))];
  const bar = document.getElementById('docFilterBar');

  bar.innerHTML = [
    `<button class="filter-pill active" data-topic="all">All</button>`,
    ...topics.map(t => `<button class="filter-pill" data-topic="${t}">${t}</button>`)
  ].join('');

  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill[data-topic]');
    if (!btn) return;
    bar.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeDocTopic = btn.dataset.topic;
    applyDocTopicFilter();
  });
}

function applyDocTopicFilter() {
  applyDocSearch(); // applyDocSearch handles both topic + query together

  // Close viewer if active doc's topic is now hidden
  const activeItem = document.querySelector('.doc-item.active');
  if (activeItem) {
    const doc = documents.find(d => d.id === parseInt(activeItem.dataset.id));
    if (doc && activeDocTopic !== 'all' && doc.topic !== activeDocTopic) {
      document.getElementById('viewerEmpty').hidden = false;
      document.getElementById('viewerActive').hidden = true;
      document.getElementById('viewerFrame').src = '';
      document.querySelectorAll('.doc-item').forEach(el => el.classList.remove('active'));
    }
  }
}

function applyDocSearch() {
  const q = docQuery.toLowerCase();
  document.querySelectorAll('.docs-topic[data-topic]').forEach(topicEl => {
    const topic = topicEl.dataset.topic;
    if (activeDocTopic !== 'all' && topic !== activeDocTopic) {
      topicEl.classList.add('hidden');
      return;
    }
    let anyVisible = false;
    topicEl.querySelectorAll('.doc-item').forEach(item => {
      const doc = documents.find(d => d.id === parseInt(item.dataset.id));
      const matches = !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.topic.toLowerCase().includes(q);
      item.style.display = matches ? '' : 'none';
      if (matches) anyVisible = true;
    });
    topicEl.classList.toggle('hidden', !anyVisible);
  });
}

/* ── Product Search ── */
function initProductSearch() {
  const input = document.getElementById('productSearch');
  const clear = document.getElementById('productSearchClear');

  input.addEventListener('input', () => {
    productQuery = input.value.trim();
    clear.hidden = !productQuery;
    renderProducts();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    productQuery = '';
    clear.hidden = true;
    input.focus();
    renderProducts();
  });
}

/* ── Doc Search ── */
function initDocSearch() {
  const input = document.getElementById('docSearch');
  const clear = document.getElementById('docSearchClear');

  input.addEventListener('input', () => {
    docQuery = input.value.trim();
    clear.hidden = !docQuery;
    applyDocSearch();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    docQuery = '';
    clear.hidden = true;
    input.focus();
    applyDocSearch();
  });
}

/* ── Global Search ── */
function openGlobalSearch() {
  document.getElementById('searchOverlay').hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('globalSearchInput').focus(), 40);
}

function closeGlobalSearch() {
  document.getElementById('searchOverlay').hidden = true;
  document.getElementById('globalSearchInput').value = '';
  document.getElementById('searchBody').innerHTML =
    '<p class="search-overlay__hint">Start typing to search across all products and documents</p>';
  document.body.style.overflow = '';
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function highlight(text, query) {
  if (!query) return escHtml(text);
  const safe = escHtml(text);
  const safeQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp(`(${safeQ})`, 'gi'), '<mark>$1</mark>');
}

function renderGlobalResults(query) {
  const body = document.getElementById('searchBody');
  if (!query.trim()) {
    body.innerHTML = '<p class="search-overlay__hint">Start typing to search across all products and documents</p>';
    return;
  }

  const q = query.toLowerCase();
  const matchedProducts = products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.type.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
  const matchedDocs = documents.filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.topic.toLowerCase().includes(q)
  );

  if (!matchedProducts.length && !matchedDocs.length) {
    body.innerHTML = `<p class="search-overlay__empty">No results for &ldquo;${escHtml(query)}&rdquo;</p>`;
    return;
  }

  let html = '';
  if (matchedProducts.length) {
    html += `<div class="search-results-group">
      <p class="search-results-group__label">Products &mdash; ${matchedProducts.length}</p>
      ${matchedProducts.map(p => `
        <div class="search-result-item" role="button" tabindex="0"
             data-action="product" data-type="${escHtml(p.type)}">
          <span class="search-result-item__icon">${p.icon}</span>
          <div>
            <p class="search-result-item__title">${highlight(p.title, query)}</p>
            <p class="search-result-item__sub">${escHtml(p.type)} &middot; ${p.tags.map(escHtml).join(', ')}</p>
          </div>
        </div>`).join('')}
    </div>`;
  }
  if (matchedDocs.length) {
    html += `<div class="search-results-group">
      <p class="search-results-group__label">Documents &mdash; ${matchedDocs.length}</p>
      ${matchedDocs.map(d => `
        <div class="search-result-item" role="button" tabindex="0"
             data-action="doc" data-id="${d.id}">
          <span class="search-result-item__icon">📄</span>
          <div>
            <p class="search-result-item__title">${highlight(d.title, query)}</p>
            <p class="search-result-item__sub">${escHtml(d.topic)} &middot; ${escHtml(d.size)}</p>
          </div>
        </div>`).join('')}
    </div>`;
  }
  body.innerHTML = html;

  body.querySelectorAll('.search-result-item').forEach(item => {
    const go = () => {
      if (item.dataset.action === 'product') {
        closeGlobalSearch();
        activeType = item.dataset.type;
        activeTag = 'all';
        document.querySelectorAll('#typeFilterBar .filter-pill').forEach(b =>
          b.classList.toggle('active', b.dataset.filter === activeType)
        );
        renderProducts();
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
      } else {
        closeGlobalSearch();
        selectDoc(parseInt(item.dataset.id));
        document.getElementById('documents').scrollIntoView({ behavior: 'smooth' });
      }
    };
    item.addEventListener('click', go);
    item.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  });
}

function initGlobalSearch() {
  document.getElementById('globalSearchBtn').addEventListener('click', openGlobalSearch);
  document.getElementById('searchBackdrop').addEventListener('click', closeGlobalSearch);
  document.getElementById('searchOverlayClose').addEventListener('click', closeGlobalSearch);
  document.getElementById('globalSearchInput').addEventListener('input', e =>
    renderGlobalResults(e.target.value)
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('searchOverlay').hidden) closeGlobalSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchOverlay').hidden ? openGlobalSearch() : closeGlobalSearch();
    }
  });
}

/* ── Dark Mode ── */
function updateDarkIcon(isDark) {
  const btn = document.getElementById('darkModeToggle');
  btn.innerHTML = isDark
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>`;
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function initDarkMode() {
  const saved = localStorage.getItem('meridian-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateDarkIcon(true);
  }
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('meridian-theme', 'light');
      updateDarkIcon(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('meridian-theme', 'dark');
      updateDarkIcon(true);
    }
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderProducts();
  initFilters();
  initProductSearch();
  initModal();
  renderDocuments();
  initDocViewer();
  initDocFilter();
  initDocSearch();
  initGlobalSearch();
  initDarkMode();
  initNav();
});
