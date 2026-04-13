document.addEventListener("DOMContentLoaded", () => {

  // 🔥 ORDENAR POR DATA
  articles.sort((a, b) => new Date(b.data) - new Date(a.data));

  // =========================================
  // 🌟 SPOTLIGHT (featured-spotlight)
  // =========================================

  const spotlightGrid = document.querySelector(".spotlight-grid");

  if (spotlightGrid) {
    const destaques = articles.filter(a => a.destaque).slice(0, 3);

    spotlightGrid.innerHTML = destaques.map((a, i) => `
      <div class="spotlight-card ${i === 1 ? 'larger' : ''}">
        <div class="card-image">
          <img src="${a.imagem}" class="img-placeholder">
        </div>
        <div class="card-content">
          <div class="card-badge">${a.tema}</div>
          <h4>${a.titulo}</h4>
          <p class="card-excerpt">${a.subtema}</p>
          <a href="${a.url}" class="read-more">Ler mais</a>
        </div>
      </div>
    `).join("");
  }

  // =========================================
  // 🎞️ CARROSSEL PRINCIPAL
  // =========================================

  const carousel = document.querySelector(".carousel-scroll");

  if (carousel) {
    carousel.innerHTML = articles.slice(0, 10).map(a => `
      <a href="${a.url}" class="carousel-card">
        <img src="${a.imagem}" class="carousel-img">
        <div class="carousel-content">
          <div class="carousel-category">${a.tema}</div>
          <div class="carousel-title">${a.titulo}</div>
        </div>
      </a>
    `).join("");
  }

  // =========================================
  // 🧠 CARROSSEL DINÂMICO (compact)
  // =========================================

  const dynamicCarousel = document.querySelector(".dynamic-carousel-scroll");

  if (dynamicCarousel) {
    dynamicCarousel.innerHTML = articles.slice(5, 15).map(a => `
      <a href="${a.url}" class="carousel-card--compact">
        <img src="${a.imagem}" class="carousel-img">
        <div class="carousel-content">
          <div class="carousel-category">${a.tema}</div>
          <div class="carousel-title">${a.titulo}</div>
        </div>
      </a>
    `).join("");
  }

  // =========================================
  // 🧩 TEMAS (theme-card)
  // =========================================

  const thematicGrid = document.querySelector(".thematic-grid");

  if (thematicGrid) {
    const temas = [...new Set(articles.map(a => a.tema))];

    thematicGrid.innerHTML = temas.map(tema => `
      <div class="theme-card">
        <div class="theme-icon">✦</div>
        <h3>${tema}</h3>
        <p>Explorar conteúdos sobre ${tema}</p>
        <div class="theme-badge">Ver artigos</div>
      </div>
    `).join("");
  }

  // =========================================
  // 🔍 BUSCA PREMIUM (search + carousel)
  // =========================================

  const searchInput = document.querySelector("#search");
  const searchResults = document.querySelector("#results");

  if (searchInput && searchResults) {
    searchInput.addEventListener("input", () => {

      const q = searchInput.value.toLowerCase();

      const results = articles.filter(a =>
        a.titulo.toLowerCase().includes(q) ||
        a.tema.toLowerCase().includes(q) ||
        a.tags.some(tag => tag.toLowerCase().includes(q))
      );

      if (q.length === 0) {
        searchResults.innerHTML = "";
        return;
      }

      searchResults.innerHTML = `
        <div class="search-carousel-container">
          <div class="search-carousel-title">Resultados</div>
          <div class="search-carousel-scroll">
            ${results.map(a => `
              <a href="${a.url}" class="search-card">
                <img src="${a.imagem}" class="search-card-img">
                <div class="search-card-content">
                  <div class="search-card-category">${a.tema}</div>
                  <div class="search-card-title">${a.titulo}</div>
                </div>
              </a>
            `).join("")}
          </div>
        </div>
      `;
    });
  }

});
