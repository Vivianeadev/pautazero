// /js/motor.js
(function() {
  "use strict";
  
  // Verifica se articles foi carregado
  if (typeof articles === 'undefined') {
    console.error('❌ ERRO: articles.js não foi carregado!');
    return;
  }
  
  console.log(`✅ Motor PautaZero iniciado com ${articles.length} artigos`);
  
  // ==================== UTILITÁRIOS ====================
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // Ordena por data (mais recente primeiro)
  const sortedArticles = [...articles].sort((a, b) => 
    new Date(b.data) - new Date(a.data)
  );
  
  // ==================== 1. SPOTLIGHT (DESTAQUES) ====================
  function renderSpotlight() {
    const grid = document.querySelector('.spotlight-grid');
    if (!grid) return;
    
    const destaques = sortedArticles.filter(a => a.destaque).slice(0, 3);
    
    if (destaques.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:2rem;">Nenhum artigo em destaque.</p>';
      return;
    }
    
    grid.innerHTML = destaques.map((a, i) => `
      <div class="spotlight-card ${i === 1 ? 'larger' : ''}" data-article-link="${escapeHtml(a.url)}">
        <div class="card-image">
          <img src="${escapeHtml(a.imagem)}" class="img-placeholder" alt="${escapeHtml(a.titulo)}" loading="lazy" onerror="this.src='https://placehold.co/400x200/0a3147/D4AF37?text=PautaZero'">
        </div>
        <div class="card-content">
          <div class="card-badge">${escapeHtml(a.tema)}</div>
          <h4>${escapeHtml(a.titulo)}</h4>
          <p class="card-excerpt">${escapeHtml(a.subtema)}</p>
          <a href="${escapeHtml(a.url)}" class="read-more">Ler artigo completo →</a>
        </div>
      </div>
    `).join('');
    
    // Torna o card clicável
    document.querySelectorAll('.spotlight-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.read-more')) return;
        window.location.href = card.dataset.articleLink;
      });
    });
  }
  
  // ==================== 2. CARROSSEL PRINCIPAL ====================
  function renderMainCarousel() {
    const container = document.getElementById('carouselScroll');
    if (!container) return;
    
    const carouselArticles = sortedArticles.slice(0, 10);
    
    if (carouselArticles.length === 0) {
      container.innerHTML = '<div class="no-results">Nenhum artigo ainda.</div>';
      return;
    }
    
    container.innerHTML = carouselArticles.map(a => `
      <a href="${escapeHtml(a.url)}" class="carousel-card">
        <img class="carousel-img" src="${escapeHtml(a.imagem)}" alt="${escapeHtml(a.titulo)}" loading="lazy" onerror="this.src='https://placehold.co/400x200/0a3147/D4AF37?text=PautaZero'">
        <div class="carousel-content">
          <div class="carousel-category">${escapeHtml(a.tema)}</div>
          <div class="carousel-title">${escapeHtml(a.titulo)}</div>
        </div>
      </a>
    `).join('');
    
    // Drag do carrossel
    let isDown = false, startX, scrollLeft;
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
  }
  
  // ==================== 3. GRADE DE TEMAS ====================
  function renderThematicGrid() {
    const grid = document.getElementById('thematicGrid');
    if (!grid) return;
    
    const temasUnicos = [...new Set(articles.map(a => a.tema))].sort();
    
    const icones = {
      'Psicopatia': 'fa-user-ninja',
      'Economia': 'fa-chart-pie',
      'Justiça': 'fa-gavel',
      'Nutrição': 'fa-apple-alt',
      'Esportes': 'fa-futbol',
      'Família': 'fa-heart-broken',
      'Futurismo': 'fa-robot',
      'Tecnologia': 'fa-microchip',
      'Política': 'fa-landmark',
      'default': 'fa-newspaper'
    };
    
    grid.innerHTML = temasUnicos.map(tema => `
      <div class="theme-card" data-topic="${escapeHtml(tema)}">
        <div class="theme-icon"><i class="fas ${icones[tema] || icones.default}"></i></div>
        <h3>${escapeHtml(tema)}</h3>
        <p>${articles.filter(a => a.tema === tema).length} artigo(s) publicado(s)</p>
        <div class="theme-badge">Explorar →</div>
      </div>
    `).join('');
    
    document.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.topic));
    });
  }
  
  // ==================== 4. MODAL ====================
  const modal = document.getElementById('topicModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalList = document.getElementById('modalTopicsList');
  const closeBtn = document.getElementById('closeModalBtn');
  
  function openModal(tema) {
    modalTitle.textContent = tema;
    
    const artigosDoTema = articles.filter(a => a.tema === tema);
    
    if (artigosDoTema.length === 0) {
      modalList.innerHTML = '<p>Nenhum artigo publicado neste tema.</p>';
    } else {
      const agrupado = {};
      artigosDoTema.forEach(a => {
        if (!agrupado[a.subtema]) agrupado[a.subtema] = [];
        agrupado[a.subtema].push(a);
      });
      
      let html = '';
      for (const [subtema, arts] of Object.entries(agrupado)) {
        html += `<div class="subcategory-group">
          <div class="subcategory-title">${escapeHtml(subtema)}</div>
          <ul class="topics-list">`;
        arts.forEach(a => {
          html += `<li><a href="${escapeHtml(a.url)}">${escapeHtml(a.titulo)}</a></li>`;
        });
        html += '</ul></div>';
      }
      modalList.innerHTML = html;
    }
    
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
  
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  
  // ==================== 5. CARROSSEL DE PALAVRAS ====================
  function renderWordCarousel() {
    const track = document.getElementById('wordTrack');
    if (!track) return;
    
    const temasUnicos = [...new Set(articles.map(a => a.tema))];
    
    let html = '';
    for (let i = 0; i < 3; i++) {
      temasUnicos.forEach(tema => {
        html += `<a href="#" class="word-carousel-item" data-topic="${escapeHtml(tema)}">✦ ${escapeHtml(tema)}</a>`;
      });
    }
    track.innerHTML = html;
    
    document.querySelectorAll('.word-carousel-item').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(link.dataset.topic);
      });
    });
  }
  
  // ==================== 6. ARQUIVO / BUSCA ====================
  function setupArchive() {
    const overlay = document.getElementById('archiveOverlay');
    const searchInput = document.getElementById('archiveSearchInput');
    const listContainer = document.getElementById('archiveList');
    const openBtn = document.getElementById('archiveBtn');
    const closeBtn = document.getElementById('archiveCloseBtn');
    
    function renderList(termo = '') {
      const filtrados = articles.filter(a =>
        a.titulo.toLowerCase().includes(termo) ||
        a.tema.toLowerCase().includes(termo) ||
        a.subtema.toLowerCase().includes(termo) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(termo)))
      );
      
      if (filtrados.length === 0) {
        listContainer.innerHTML = '<div class="no-results"><i class="fas fa-search"></i> Nenhum artigo encontrado.</div>';
        return;
      }
      
      listContainer.innerHTML = filtrados.map(a => `
        <a class="archive-item" href="${escapeHtml(a.url)}">
          <div class="archive-item-title">${escapeHtml(a.titulo)}</div>
          <div class="archive-item-meta">
            <span><i class="far fa-calendar-alt"></i> ${escapeHtml(a.data)}</span>
            <span><i class="fas fa-folder"></i> ${escapeHtml(a.tema)} · ${escapeHtml(a.subtema)}</span>
          </div>
        </a>
      `).join('');
    }
    
    openBtn.addEventListener('click', () => {
      overlay.classList.add('active');
      renderList(searchInput.value.toLowerCase());
    });
    
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
    
    searchInput.addEventListener('input', (e) => renderList(e.target.value.toLowerCase()));
    renderList();
  }
  
  // ==================== 7. COMPARTILHAMENTO ====================
  function setupShare() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('PautaZero · Análise Institucional & Tecnologia');
    
    document.getElementById('shareFacebook').href = `https://facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    document.getElementById('shareLinkedin').href = `https://linkedin.com/sharing/share-offsite/?url=${url}`;
    document.getElementById('shareWhatsapp').href = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    document.getElementById('shareEmail').href = `mailto:?subject=${text}&body=${url}`;
  }
  
  // ==================== 8. PRIVACIDADE ====================
  function setupPrivacy() {
    document.querySelectorAll('.privacy-col-title').forEach(title => {
      title.addEventListener('click', function() {
        const content = this.parentElement.querySelector('.privacy-col-content');
        if (content) {
          content.style.display = content.style.display === 'none' ? 'block' : 'none';
        }
      });
    });
    document.querySelectorAll('.privacy-col-content').forEach(c => c.style.display = 'none');
  }
  
  // ==================== INICIALIZAÇÃO ====================
  function init() {
    renderSpotlight();
    renderMainCarousel();
    renderThematicGrid();
    renderWordCarousel();
    setupArchive();
    setupShare();
    setupPrivacy();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
