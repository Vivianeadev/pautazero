// /js/motor.js
(function() {
  "use strict";
  
  console.log('🚀 Motor PautaZero iniciado');
  
  // ========== VERIFICAÇÃO DE AMBIENTE ==========
  const ENV_IS_LOCAL = window.location.protocol === 'file:';
  if (ENV_IS_LOCAL) {
    console.warn('⚠️ Executando em file:// - algumas funcionalidades (fetch HEAD) serão simuladas.');
  }

  // ========== DADOS DOS 24 EIXOS (incluindo NUTRIÇÃO) ==========
  const subtopicsByTopic = {
    // ... (COLE AQUI O MESMO OBJETO ENORME DO SEU CÓDIGO ORIGINAL) ...
    // Por brevidade, não repetirei o objeto inteiro. Use exatamente o mesmo que você já tem.
  };

  const topicFolderMap = { /* ... igual ao original ... */ };
  const topicTitles = { /* ... igual ao original ... */ };
  const topicIcons = { /* ... igual ao original ... */ };

  function getDescription(key) {
    const desc = { /* ... igual ao original ... */ };
    return desc[key] || "Análise estrutural e comportamental.";
  }

  function slugify(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function getArticleUrl(topicKey, subcategory, topic) {
    const folder = topicFolderMap[topicKey];
    const subcatSlug = slugify(subcategory);
    const topicSlug = slugify(topic);
    return `/artigo/${folder}/${subcatSlug}/${topicSlug}.html`;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[m]);
  }

  // ========== TÚNEL DE VERIFICAÇÃO (com fallback para file://) ==========
  const pageCache = new Map();
  function loadCacheFromStorage() {
    try {
      const stored = localStorage.getItem('PautaZero_pageCache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.expiry > Date.now()) {
          for (const [url, exists] of Object.entries(parsed.data)) pageCache.set(url, exists);
          return true;
        }
      }
    } catch(e) {}
    return false;
  }
  function saveCacheToStorage() {
    try {
      const cacheObj = {};
      for (const [url, exists] of pageCache.entries()) cacheObj[url] = exists;
      localStorage.setItem('PautaZero_pageCache', JSON.stringify({ data: cacheObj, expiry: Date.now() + 3600000 }));
    } catch(e) {}
  }
  async function checkIfPageExists(url) {
    if (pageCache.has(url)) return pageCache.get(url);
    if (ENV_IS_LOCAL) {
      // Em file:// não podemos fazer HEAD, assumimos que existe (ou false, depende do seu fluxo)
      // Para desenvolvimento, retornar true evita quebra.
      pageCache.set(url, true);
      return true;
    }
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch(url, { method: 'HEAD', signal: controller.signal });
      clearTimeout(timeoutId);
      const exists = response.ok;
      pageCache.set(url, exists);
      saveCacheToStorage();
      return exists;
    } catch(err) {
      pageCache.set(url, false);
      return false;
    }
  }
  let isNavigating = false;
  async function navigateToWithCheck(url) {
    if (isNavigating) return;
    if (url.includes('construcao.html')) {
      window.location.href = url;
      return;
    }
    isNavigating = true;
    document.body.classList.add('tunnel-loading');
    try {
      const exists = await checkIfPageExists(url);
      window.location.href = exists ? url : 'construcao.html';
    } catch (err) {
      window.location.href = 'construcao.html';
    } finally {
      isNavigating = false;
      document.body.classList.remove('tunnel-loading');
    }
  }

  document.body.addEventListener('click', (e) => {
    let target = e.target.closest('a');
    if (!target) return;
    const href = target.getAttribute('href');
    if (!href) return;
    if (href.startsWith('/artigo/') || href.includes('/artigo/')) {
      e.preventDefault();
      let absoluteUrl = href.startsWith('/') ? href : '/' + href;
      navigateToWithCheck(absoluteUrl);
    }
  });

  // ========== GARANTIA DE ARTICLES ==========
  if (typeof articles === 'undefined') {
    console.error('❌ articles.js não foi carregado! Usando array vazio.');
    window.articles = [];
  }
  const sortedArticles = [...articles].sort((a, b) => new Date(b.data) - new Date(a.data));

  // ========== RENDERIZAÇÃO SEGURA ==========
  
  // 1. Spotlight (Destaques)
  const destaques = sortedArticles.filter(a => a.destaque).slice(0, 3);
  const spotlightGrid = document.querySelector('.spotlight-grid');
  if (spotlightGrid) {
    if (destaques.length) {
      spotlightGrid.innerHTML = destaques.map((a, i) => `
        <div class="spotlight-card ${i === 1 ? 'larger' : ''}" data-article-link="${escapeHtml(a.url)}">
          <div class="card-image"><img src="${escapeHtml(a.imagem)}" class="img-placeholder" alt="${escapeHtml(a.titulo)}" onerror="this.src='https://placehold.co/400x200/fefaf5/D4AF37?text=PautaZero'"></div>
          <div class="card-content"><div class="card-badge">${escapeHtml(a.tema)}</div><h4>${escapeHtml(a.titulo)}</h4><p class="card-excerpt">${escapeHtml(a.subtema)}</p><a href="${escapeHtml(a.url)}" class="read-more">Ler artigo →</a></div>
        </div>
      `).join('');
    } else {
      spotlightGrid.innerHTML = '<p style="padding:1rem;">Nenhum artigo em destaque no momento.</p>';
    }
  }

  // 2. Carrossel Principal
  const carouselContainer = document.getElementById('carouselScroll');
  if (carouselContainer) {
    if (sortedArticles.length) {
      carouselContainer.innerHTML = sortedArticles.slice(0, 10).map(a => `
        <a href="${escapeHtml(a.url)}" class="carousel-card">
          <img class="carousel-img" src="${escapeHtml(a.imagem)}" alt="${escapeHtml(a.titulo)}" onerror="this.src='https://placehold.co/400x200/fefaf5/D4AF37?text=PautaZero'">
          <div class="carousel-content"><div class="carousel-category">${escapeHtml(a.tema)}</div><div class="carousel-title">${escapeHtml(a.titulo)}</div></div>
        </a>
      `).join('');
    } else {
      // Fallback para artigos mockados
      const articlesData = [
        { title: "Alienação Parental: entre a proteção e a falsa acusação", category: "Família & Alienação", url: getArticleUrl("familia-alienacao", "Dinâmicas de Divórcio Litigioso", "Uso de perícias psicológicas como arma") },
        { title: "Subdiagnóstico e negligência em pronto-socorros", category: "Saúde Física", url: getArticleUrl("saude-fisica", "Erros Médicos e Imperícia", "Subdiagnóstico e negligência em pronto-socorros") },
        { title: "A psicopatia do poder", category: "Psicopatia", url: getArticleUrl("psicopatia", "Psicopatas no Poder", "Autocratas e a ausência de freios emocionais") },
        { title: "Justiça às cegas", category: "Sistema Prisional", url: getArticleUrl("prisional-policial", "Violência Estrutural no Cárcere", "Superlotação como tortura indireta") },
        { title: "Greve dos caminhoneiros e impacto econômico", category: "Agronegócio", url: getArticleUrl("agro-logistica", "Política de Fretes e Greves de Caminhoneiros", "Tabela de frete mínimo e judicialização") }
      ];
      carouselContainer.innerHTML = articlesData.map(article => `
        <a href="${article.url}" class="carousel-card">
          <img class="carousel-img" src="assets/images/${slugify(article.title)}.jpg" alt="${escapeHtml(article.title)}" onerror="this.src='https://placehold.co/400x200/fefaf5/D4AF37?text=PautaZero'">
          <div class="carousel-content"><div class="carousel-category">${escapeHtml(article.category)}</div><div class="carousel-title">${escapeHtml(article.title)}</div></div>
        </a>
      `).join('');
    }
    
    let isDown = false, startX, scrollLeft;
    carouselContainer.addEventListener('mousedown', e => { isDown = true; carouselContainer.style.cursor = 'grabbing'; startX = e.pageX - carouselContainer.offsetLeft; scrollLeft = carouselContainer.scrollLeft; });
    carouselContainer.addEventListener('mouseleave', () => { isDown = false; carouselContainer.style.cursor = 'grab'; });
    carouselContainer.addEventListener('mouseup', () => { isDown = false; carouselContainer.style.cursor = 'grab'; });
    carouselContainer.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); carouselContainer.scrollLeft = scrollLeft - (e.pageX - carouselContainer.offsetLeft - startX) * 1.5; });
  }

  // 3. Grade de Temas (24 eixos)
  const grid = document.getElementById('thematicGrid');
  if (grid) {
    grid.innerHTML = '';
    for (const [key, title] of Object.entries(topicTitles)) {
      const card = document.createElement('div');
      card.className = 'theme-card';
      card.setAttribute('data-topic', key);
      card.innerHTML = `<div class="theme-icon"><i class="${topicIcons[key]}"></i></div><h3>${title}</h3><p>${getDescription(key)}</p><div class="theme-badge">clique para explorar →</div>`;
      grid.appendChild(card);
    }
  } else {
    console.warn('Elemento #thematicGrid não encontrado.');
  }

  // 4. Modal (implementação segura)
  const modal = document.getElementById('topicModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTopicsList = document.getElementById('modalTopicsList');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  function openModal(topicKey) {
    if (!modal || !modalTitle || !modalTopicsList) return;
    const title = topicTitles[topicKey] || "Tema";
    const subcategoriesObj = subtopicsByTopic[topicKey] || {};
    modalTitle.innerText = title;
    
    let html = '';
    
    // Artigos publicados neste tema
    if (typeof articles !== 'undefined') {
      const artigosPublicados = articles.filter(a => a.tema === topicKey);
      if (artigosPublicados.length) {
        html += `<div class="subcategory-group"><div class="subcategory-title">📰 Artigos Publicados</div><ul class="topics-list">`;
        artigosPublicados.forEach(a => html += `<li><a href="${escapeHtml(a.url)}">${escapeHtml(a.titulo)}</a></li>`);
        html += `</ul></div>`;
      }
    }
    
    // Subcategorias planejadas
    if (Object.keys(subcategoriesObj).length) {
      for (const [subcat, topics] of Object.entries(subcategoriesObj)) {
        html += `<div class="subcategory-group"><div class="subcategory-title">${escapeHtml(subcat)}</div><ul class="topics-list">`;
        if (topics.length === 0) {
          html += `<li style="width:100%; color: var(--color-text-light); font-style:italic;">Em breve</li>`;
        } else {
          topics.forEach(topic => {
            const url = getArticleUrl(topicKey, subcat, topic);
            html += `<li><a href="${url}">${escapeHtml(topic)}</a></li>`;
          });
        }
        html += `</ul></div>`;
      }
    }
    
    modalTopicsList.innerHTML = html || '<p style="color: var(--color-text-light);">Subtemas em breve.</p>';
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }
  
  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.getAttribute('data-topic')));
  });
  
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // 5. Word Carousel
  const track = document.getElementById('wordTrack');
  if (track) {
    const items = [
      { icon: "fas fa-gavel", name: "Direito e Justiça", topicKey: "justica-tecnologia" },
      { icon: "fas fa-chart-line", name: "Economia", topicKey: "economia-super-ricos" },
      { icon: "fas fa-stethoscope", name: "Medicina", topicKey: "saude-fisica" },
      { icon: "fas fa-robot", name: "Futurismo", topicKey: "futurismo" },
      { icon: "fas fa-brain", name: "Psicologia", topicKey: "psicopatia" },
      { icon: "fas fa-truck", name: "Logística", topicKey: "agro-logistica" },
      { icon: "fas fa-globe", name: "Geopolítica", topicKey: "politica" },
      { icon: "fas fa-church", name: "Religião", topicKey: "religiao" },
      { icon: "fas fa-futbol", name: "Esportes", topicKey: "esportes" },
      { icon: "fas fa-apple-alt", name: "Nutrição", topicKey: "nutricao" }
    ];
    let html = '';
    for (let i = 0; i < 3; i++) {
      items.forEach(item => html += `<a href="#" class="word-carousel-item" data-topic="${item.topicKey}"><i class="${item.icon}"></i> ${item.name}</a>`);
    }
    track.innerHTML = html;
    document.querySelectorAll('.word-carousel-item').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        openModal(link.getAttribute('data-topic'));
      });
    });
  }

  // 6. Compartilhamento
  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("PautaZero · Análise Institucional & Tecnologia");
  const fb = document.getElementById('shareFacebook'); if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  const tw = document.getElementById('shareTwitter'); if (tw) tw.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`;
  const li = document.getElementById('shareLinkedin'); if (li) li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
  const wa = document.getElementById('shareWhatsapp'); if (wa) wa.href = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;
  const em = document.getElementById('shareEmail'); if (em) em.href = `mailto:?subject=${shareText}&body=${currentUrl}`;

  // 7. Arquivo/Busca (com fallback seguro)
  const archiveOverlay = document.getElementById('archiveOverlay');
  const archiveList = document.getElementById('archiveList');
  const searchInput = document.getElementById('archiveSearchInput');
  
  function generateAllPotentialArticles() {
    const allArticles = [];
    for (const [topicKey, subcategories] of Object.entries(subtopicsByTopic)) {
      const categoryName = topicTitles[topicKey] || topicKey;
      for (const [subcat, topics] of Object.entries(subcategories)) {
        topics.forEach(topic => {
          allArticles.push({ title: topic, category: categoryName + " · " + subcat, url: getArticleUrl(topicKey, subcat, topic) });
        });
      }
    }
    return allArticles;
  }
  
  const allPotentialArticles = generateAllPotentialArticles();
  let existingArticles = [];
  let archiveLoaded = false;
  
  async function refreshArchiveList() {
    if (!archiveList) return;
    archiveList.innerHTML = '<div class="no-results"><i class="fas fa-spinner fa-pulse"></i> Verificando artigos publicados...</div>';
    const existing = [];
    
    // Primeiro adiciona artigos do articles.js
    if (typeof articles !== 'undefined') {
      articles.forEach(a => existing.push({ title: a.titulo, category: a.tema + " · " + a.subtema, url: a.url }));
    }
    
    // Depois verifica os potenciais
    for (const article of allPotentialArticles) {
      const exists = await checkIfPageExists(article.url);
      if (exists) existing.push(article);
    }
    
    existingArticles = [...new Map(existing.map(item => [item.url, item])).values()];
    archiveLoaded = true;
    renderArchiveList(searchInput ? searchInput.value : '');
  }
  
  function renderArchiveList(searchTerm = "") {
    if (!archiveList) return;
    if (!archiveLoaded) {
      archiveList.innerHTML = '<div class="no-results"><i class="fas fa-spinner fa-pulse"></i> Carregando...</div>';
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    let filtered = existingArticles;
    if (term !== "") {
      filtered = existingArticles.filter(a => a.title.toLowerCase().includes(term) || a.category.toLowerCase().includes(term));
    }
    if (filtered.length === 0) {
      archiveList.innerHTML = '<div class="no-results"><i class="fas fa-book-open"></i> Nenhum artigo encontrado.</div>';
      return;
    }
    archiveList.innerHTML = filtered.map(a => `
      <a class="archive-item" href="${escapeHtml(a.url)}">
        <div class="archive-item-title">${escapeHtml(a.title)}</div>
        <div class="archive-item-meta"><span><i class="far fa-calendar-alt"></i> Publicado</span><span><i class="fas fa-folder"></i> ${escapeHtml(a.category)}</span></div>
      </a>
    `).join('');
  }
  
  async function openArchive() {
    if (archiveOverlay) {
      archiveOverlay.classList.add('active');
      if (!archiveLoaded) await refreshArchiveList();
      renderArchiveList(searchInput ? searchInput.value : '');
    }
  }
  
  function closeArchive() {
    if (archiveOverlay) {
      archiveOverlay.classList.remove('active');
      if (searchInput) searchInput.value = '';
      renderArchiveList('');
    }
  }
  
  const archiveBtn = document.getElementById('archiveBtn');
  if (archiveBtn) archiveBtn.addEventListener('click', openArchive);
  const archiveCloseBtn = document.getElementById('archiveCloseBtn');
  if (archiveCloseBtn) archiveCloseBtn.addEventListener('click', closeArchive);
  if (archiveOverlay) archiveOverlay.addEventListener('click', e => { if (e.target === archiveOverlay) closeArchive(); });
  if (searchInput) searchInput.addEventListener('input', e => renderArchiveList(e.target.value));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeArchive(); });

  // 8. Privacidade
  document.querySelectorAll('.privacy-col-title').forEach(title => {
    title.addEventListener('click', function() {
      const content = this.parentElement.querySelector('.privacy-col-content');
      if (content) content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
  });
  document.querySelectorAll('.privacy-col-content').forEach(cont => cont.style.display = 'none');

  // 9. Spotlight cards (clique)
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.read-more')) return;
      const link = card.getAttribute('data-article-link');
      if (link) window.location.href = link;
    });
  });

  // 10. Carrossel Dinâmico (opcional, com tratamento de erro)
  async function initDynamicCarousel() {
    const mainContainer = document.querySelector('main.container');
    if (!mainContainer || document.getElementById('dynamicCarouselSection')) return;
    
    const dynamicSection = document.createElement('div');
    dynamicSection.id = 'dynamicCarouselSection';
    dynamicSection.className = 'dynamic-carousel-section';
    dynamicSection.innerHTML = `
      <div class="dynamic-header">
        <h3><i class="fas fa-robot"></i> Artigos dinâmicos · verificação profunda</h3>
        <span class="dynamic-sub"><i class="fas fa-sync-alt"></i> baseado em arquivos existentes</span>
      </div>
      <div class="carousel-fade">
        <div class="carousel-scroll" id="dynamicCarouselScroll"></div>
      </div>
    `;
    
    const originalCarousel = document.querySelector('.horizontal-carousel-section');
    if (originalCarousel && originalCarousel.nextSibling) {
      mainContainer.insertBefore(dynamicSection, originalCarousel.nextSibling);
    } else {
      mainContainer.appendChild(dynamicSection);
    }
    
    const dynamicScroll = document.getElementById('dynamicCarouselScroll');
    if (!dynamicScroll) return;
    
    dynamicScroll.innerHTML = '<div class="no-results" style="padding:2rem;"><i class="fas fa-spinner fa-pulse"></i> Verificando artigos...</div>';
    
    const existingList = [];
    for (const article of allPotentialArticles) {
      if (await checkIfPageExists(article.url)) existingList.push(article);
    }
    
    if (existingList.length === 0) {
      dynamicScroll.innerHTML = '<div class="no-results"><i class="fas fa-newspaper"></i> Nenhum artigo ainda.</div>';
      return;
    }
    
    dynamicScroll.innerHTML = existingList.slice(0, 12).map(article => `
      <a href="${escapeHtml(article.url)}" class="carousel-card--compact">
        <img class="carousel-img" src="assets/images/${slugify(article.title)}.jpg" alt="${escapeHtml(article.title)}" onerror="this.src='https://placehold.co/400x200/fefaf5/D4AF37?text=PautaZero'">
        <div class="carousel-content">
          <div class="carousel-category">${escapeHtml(article.category.split(' · ')[0])}</div>
          <div class="carousel-title">${escapeHtml(article.title)}</div>
        </div>
      </a>
    `).join('');
    
    let isDown = false, startX, scrollLeft;
    dynamicScroll.addEventListener('mousedown', e => { isDown = true; dynamicScroll.style.cursor = 'grabbing'; startX = e.pageX - dynamicScroll.offsetLeft; scrollLeft = dynamicScroll.scrollLeft; });
    dynamicScroll.addEventListener('mouseleave', () => { isDown = false; dynamicScroll.style.cursor = 'grab'; });
    dynamicScroll.addEventListener('mouseup', () => { isDown = false; dynamicScroll.style.cursor = 'grab'; });
    dynamicScroll.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); dynamicScroll.scrollLeft = scrollLeft - (e.pageX - dynamicScroll.offsetLeft - startX) * 1.5; });
  }

  // ========== INICIALIZAÇÃO ==========
  loadCacheFromStorage();
  // O carrossel dinâmico pode ser pesado em file://, então envolvemos em try/catch
  try {
    initDynamicCarousel();
  } catch (e) {
    console.warn('Carrossel dinâmico não pôde ser inicializado:', e);
  }
  
  console.log('✅ Motor PautaZero carregado com sucesso!');
})();
