document.addEventListener("DOMContentLoaded", () => {

  // 🔥 ORDENAR POR DATA
  articles.sort((a, b) => new Date(b.data) - new Date(a.data));

  // 🎞️ CARROSSEL
  const carousel = document.getElementById("carouselScroll");

  if (carousel) {
    articles.slice(0, 10).forEach(a => {
      carousel.innerHTML += `
        <div class="card">
          <a href="${a.url}">
            <img src="${a.imagem}">
            <h3>${a.titulo}</h3>
          </a>
        </div>
      `;
    });
  }

  // 🌟 DESTAQUE
  const spotlight = document.getElementById("spotlight");

  if (spotlight) {
    const destaque = articles.find(a => a.destaque);

    if (destaque) {
      spotlight.innerHTML = `
        <a href="${destaque.url}">
          <img src="${destaque.imagem}">
          <h2>${destaque.titulo}</h2>
        </a>
      `;
    }
  }

  // 🧩 TEMAS
  const thematicGrid = document.getElementById("thematicGrid");

  if (thematicGrid) {
    const temas = [...new Set(articles.map(a => a.tema))];

    temas.forEach(tema => {
      thematicGrid.innerHTML += `
        <div class="tema">${tema}</div>
      `;
    });
  }

  // 🔍 BUSCA
  const searchInput = document.getElementById("search");
  const resultsBox = document.getElementById("results");

  if (searchInput && resultsBox) {
    searchInput.addEventListener("input", () => {

      const q = searchInput.value.toLowerCase();

      const results = articles.filter(a =>
        a.titulo.toLowerCase().includes(q) ||
        a.tema.toLowerCase().includes(q) ||
        a.tags.some(tag => tag.toLowerCase().includes(q))
      );

      resultsBox.innerHTML = results.map(a => `
        <div class="result">
          <a href="${a.url}">${a.titulo}</a>
        </div>
      `).join("");

    });
  }

});
