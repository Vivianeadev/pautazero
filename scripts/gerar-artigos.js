const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Função para extrair título do HTML (simples, usando <title>)
function extrairTituloDoArquivo(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/<title>(.*?)<\/title>/i);
  if (match) return match[1].trim();
  // fallback: nome do arquivo sem extensão
  return path.basename(filePath, '.html').replace(/-/g, ' ');
}

// Mapeamento do nome da pasta do eixo para o título bonito (já existe no seu HTML)
const eixoTitulo = {
  'politica-e-geopolitica': 'Política & Geopolítica',
  'seguranca-total': 'Segurança Total',
  // ... complete com os 25 mapeamentos que já estão no seu topicTitles
};

function gerarListaArtigos() {
  const artigos = [];
  const arquivos = glob.sync('artigo/**/*.html');

  for (const arquivo of arquivos) {
    const partes = arquivo.split(path.sep);
    // Exemplo: ['artigo', 'politica-e-geopolitica', 'poder-e-corrupcao-estrutural', 'caixa-dois.html']
    if (partes.length < 4) continue;

    const pastaEixo = partes[1];               // ex: 'politica-e-geopolitica'
    const subcategoria = partes[2].replace(/-/g, ' ');
    const nomeArquivo = partes[3];

    const titulo = extrairTituloDoArquivo(arquivo);
    const url = '/' + arquivo.replace(/\\/g, '/'); // URL relativa correta

    artigos.push({
      title: titulo,
      category: `${eixoTitulo[pastaEixo] || pastaEixo} · ${subcategoria}`,
      url: url
    });
  }

  return artigos;
}

function atualizarIndexHTML(artigos) {
  const indexPath = path.join(__dirname, '..', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  // Gera o código JavaScript que define o array articlesData
  const artigosJSON = JSON.stringify(artigos, null, 2);
  const novoBloco = `const articlesData = ${artigosJSON};`;

  // Substitui a linha que contém "const articlesData = [" no HTML
  // (ajuste a regex conforme a formatação exata do seu arquivo)
  const regex = /const articlesData = \[[\s\S]*?\];/;
  html = html.replace(regex, novoBloco);

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`✅ index.html atualizado com ${artigos.length} artigos.`);
}

// Execução principal
const artigosEncontrados = gerarListaArtigos();
atualizarIndexHTML(artigosEncontrados);
