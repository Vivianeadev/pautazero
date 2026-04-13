// /js/articles.js
// Lista de artigos publicados na PautaZero
// Este arquivo é carregado pelo index.html e utilizado para alimentar o carrossel principal,
// a seção de destaques (spotlight) e outras listagens dinâmicas.

const articles = [
  // ========== DESTAQUES (SPOTLIGHT) ==========
  {
    titulo: "O silêncio que condena: omissões institucionais",
    url: "/artigo/polemicas/o-silencio-que-condena.html",
    tema: "Investigação",
    subtema: "Omissão e responsabilidade",
    tags: ["justiça", "instituições", "denúncia"],
    data: "2026-04-08",
    destaque: true,
    imagem: "/assets/images/silencio.jpg"
  },
  {
    titulo: "A psicopatia do poder: quando a falta de empatia vence eleições",
    url: "/artigo/psicopatia-e-comportamento-extremo/psicopatas-no-poder/autocratas-e-a-ausencia-de-freios-emocionais.html",
    tema: "Psicopatia",
    subtema: "Poder e Manipulação",
    tags: ["liderança", "manipulação", "psicologia"],
    data: "2026-04-12",
    destaque: true,
    imagem: "/assets/images/psicopatia.jpg"
  },
  {
    titulo: "Justiça às cegas: as entranhas do cárcere privado",
    url: "/artigo/sistema-prisional-e-policial/violencia-estrutural-no-carcere/superlotacao-como-tortura-indireta.html",
    tema: "Sistema Prisional",
    subtema: "Violência Estrutural",
    tags: ["cárcere", "direitos humanos", "facções"],
    data: "2026-04-05",
    destaque: true,
    imagem: "/assets/images/justica-cega.jpg"
  },

  // ========== DEMAIS ARTIGOS (CARROSSEL E ARQUIVO) ==========
  {
    titulo: "Alienação Parental: entre a proteção e a falsa acusação",
    url: "/artigo/familia-e-alienacao-parental/dinamicas-de-divorcio-litigioso/uso-de-pericias-psicologicas-como-arma.html",
    tema: "Família & Alienação",
    subtema: "Dinâmicas de Divórcio Litigioso",
    tags: ["alienação parental", "perícia", "guarda"],
    data: "2026-04-10",
    destaque: false,
    imagem: "/assets/images/alienacao.jpg"
  },
  {
    titulo: "Subdiagnóstico e negligência em pronto-socorros",
    url: "/artigo/saude-fisica-e-medicina/erros-medicos-e-impericia/subdiagnostico-e-negligencia-em-pronto-socorros.html",
    tema: "Saúde Física",
    subtema: "Erros Médicos e Imperícia",
    tags: ["saúde", "negligência", "emergência"],
    data: "2026-04-09",
    destaque: false,
    imagem: "/assets/images/pronto-socorro.jpg"
  },
  {
    titulo: "Greve dos caminhoneiros e impacto econômico",
    url: "/artigo/agronegocio-logistica-e-transporte/politica-de-fretes-e-greves-de-caminhoneiros/tabela-de-frete-minimo-e-judicializacao.html",
    tema: "Agronegócio & Logística",
    subtema: "Política de Fretes",
    tags: ["caminhoneiros", "greve", "economia"],
    data: "2026-04-07",
    destaque: false,
    imagem: "/assets/images/caminhoneiros.jpg"
  },
  {
    titulo: "Tokenização imobiliária: a nova fronteira do mercado",
    url: "/artigo/economia-e-super-ricos/estruturas-offshores-e-paraisos-fiscais/panama-papers-e-o-mercado-de-opacidade.html", // exemplo adaptado
    tema: "Economia & Super Ricos",
    subtema: "Tokenização e Blockchain",
    tags: ["blockchain", "imóveis", "investimento"],
    data: "2026-04-06",
    destaque: false,
    imagem: "/assets/images/token.jpg"
  },
  {
    titulo: "Nutrição baseada em evidências: desmistificando dietas",
    url: "/artigo/nutricao-e-pesquisa-alimentar/bases-cientificas-da-nutricao/macronutrientes-proteinas-carboidratos-e-gorduras-na-pratica-clinica.html",
    tema: "Nutrição",
    subtema: "Bases Científicas",
    tags: ["nutrição", "dietas", "evidência"],
    data: "2026-04-04",
    destaque: false,
    imagem: "/assets/images/nutricao.jpg"
  },
  {
    titulo: "IA no Judiciário: algoritmos de decisão e viés racial",
    url: "/artigo/justica-e-tecnologia/inteligencia-artificial-no-judiciario/algoritmos-de-decisao-e-vies-racial.html",
    tema: "Justiça & Tecnologia",
    subtema: "Inteligência Artificial",
    tags: ["IA", "judiciário", "viés"],
    data: "2026-04-03",
    destaque: false,
    imagem: "/assets/images/ia-justica.jpg"
  },
  {
    titulo: "Cristianismo e poder político no Brasil contemporâneo",
    url: "/artigo/religiao-cristianismo-perseguicoes/dominio-do-cristianismo-na-esfera-publica/poder-politico-evangelico-e-bancada-religiosa.html",
    tema: "Religião",
    subtema: "Domínio do Cristianismo",
    tags: ["religião", "política", "evangélicos"],
    data: "2026-04-02",
    destaque: false,
    imagem: "/assets/images/religiao-poder.jpg"
  },
  {
    titulo: "Futebol, ídolos e memória afetiva nacional",
    url: "/artigo/esportes-futebol-idolos/futebol-paixao-nacional/craques-que-marcaram-epoca-de-pele-a-neymar.html",
    tema: "Esportes",
    subtema: "Futebol: Paixão Nacional",
    tags: ["futebol", "ídolos", "cultura"],
    data: "2026-04-01",
    destaque: false,
    imagem: "/assets/images/futebol.jpg"
  }
];

// Nota: as URLs seguem a estrutura de pastas definida em topicFolderMap no motor.js.
// As imagens devem estar na pasta /assets/images/ com os nomes correspondentes.
// O campo 'destaque' controla se o artigo aparece na seção "Polêmicas & Bastidores" (spotlight).
