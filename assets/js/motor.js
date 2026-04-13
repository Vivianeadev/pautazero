// /js/motor.js
(function() {
  "use strict";
  
  console.log('🚀 Motor PautaZero iniciado');
  
  // ==================== DADOS DOS 24 EIXOS (incluindo NUTRIÇÃO) ====================
  const subtopicsByTopic = {
    politica: {
      "Poder e Corrupção Estrutural": ["Caixa dois e financiamento ilegal de campanhas", "Lobby empresarial e captura do estado", "Propina sistêmica em contratos públicos", "Impunidade de altas patentes"],
      "Geopolítica e Conflitos Híbridos": ["Guerra de informação e fake news patrocinadas", "Intervenção militar e 'democracia' exportada", "Espionagem econômica e sabotagem industrial", "Sanções como arma geopolítica"],
      "Crise dos Sistemas Políticos": ["Ascensão do populismo autoritário", "Erosão da separação de poderes", "Judicialização da política e ativismo", "Crises de representação e partidos vazios"],
      "Regulação e Vigilância Global": ["Acordos de vigilância digital (Five Eyes, 14 Eyes)", "Controle de fronteiras e refugiados geopolíticos", "Regulação de armas e comércio de defesa", "Criptomoedas e guerra financeira"]
    },
    "seguranca-total": {
      "Segurança Pessoal em Ambiente Hostil": ["Avaliação de risco para juízes e promotores", "Proteção de ativistas e defensores de direitos", "Estratégias de baixo perfil para vítimas de ameaça", "Comportamento preventivo em áreas de conflito"],
      "Segurança Digital e Privacidade": ["Vazamento de dados íntimos e revenge porn", "Rastreamento governamental e quebra de sigilos", "Engenharia social em golpes financeiros", "Deepfakes e extorsão algorítmica"],
      "Segurança Patrimonial e Blindagem": ["Holdings e offshores: limites legais e éticos", "Proteção de heranças em divórcios de alta conflito", "Criptoativos e rastreabilidade forense", "Risco de sequestro patrimonial no exterior"],
      "Inteligência Estratégica": ["Contrainteligência em empresas familiares", "Análise de ameaças internas (funcionários e sócios)", "Perfil de risco de parceiros comerciais", "Coleta de informações em ambientes regulados"]
    },
    "prisional-policial": {
      "Violência Estrutural no Cárcere": ["Superlotação como tortura indireta", "Facções criminosas e controle do estado paralelo", "Morte sob custódia: estatísticas oficiais vs. realidade", "Trabalho análogo à escravidão dentro das prisões"],
      "Investigação e Perfilamento Criminal": ["Bases de dados genéticos e privacidade", "Reconhecimento facial e falsos positivos", "Perfil racial em abordagens policiais", "Interrogatórios coercitivos e confissões forjadas"],
      "Corrupção e Milícias": ["Milícias armadas e controle territorial", "Policiais envolvidos com tráfico de armas", "Desvio de verbas penitenciárias", "Sindicatos policiais e imunidade tácita"],
      "Reintegração e Reincidência": ["Falência dos programas de ressocialização", "Efeito carimbo e exclusão do mercado", "Monitoramento eletrônico como espetáculo punitivo", "Falta de políticas de saúde mental pós-prisão"]
    },
    "politicas-publicas": {
      "Segurança Pública e Violência": ["Uso de força letal por forças de segurança", "Política de drogas e encarceramento em massa", "Pacotes anticrime e endurecimento penal simbólico", "Prevenção comunitária vs. militarização"],
      "Saúde Coletiva e Negligência": ["Filas de espera para cirurgias eletivas", "Saúde mental desassistida nas periferias", "Pandemias e colapso do sistema público", "Indústria de planos de saúde e regulação falha"],
      "Economia Pública e Desigualdade": ["Renúncias fiscais para super-ricos", "Previdência complementar e rombo previdenciário", "Programas de renda mínima e condicionalidades", "Endividamento público e ajuste fiscal seletivo"],
      "Regulação e Controle": ["Anistia de multas ambientais", "Fragilidade da lei de acesso à informação", "Influência de setores regulados na criação de leis", "Patentes farmacêuticas e acesso a medicamentos"]
    },
    "economia-super-ricos": {
      "Estruturas Offshores e Paraísos Fiscais": ["Panama Papers e o mercado de opacidade", "Trusts e fundações privadas no Caribe", "Criptomoedas anônimas e lavagem facilitada", "Falsas doações para instituições de caridade"],
      "Family Offices e Blindagem Patrimonial": ["Estratégias legais de proteção contra credores", "Separação de patrimônio em divórcios bilionários", "Holdings familiares e conflitos de sucessão", "Investimento em arte e ativos não rastreáveis"],
      "Mercado de Luxo e Invisibilidade": ["Iates e jatos particulares como sonegação fiscal", "Propriedades fantasmas em paraísos fiscais", "Educação de elite e círculos de poder", "Assessoramento de risco para alta renda"],
      "Desigualdade e Herança": ["Concentração de riqueza em 0,1% da população", "Tributação regressiva e isenções fiscais", "Poder dinástico na política e economia", "Filantropia como escudo reputacional"]
    },
    "saude-mental": {
      "Transtornos e Estigma Social": ["Borderline e a patologização da emoção feminina", "TDAH em adultos: superdiagnóstico ou negligência?", "Depressão e o viés de gênero nos tratamentos", "Transtornos alimentares e pressão estética"],
      "Trauma e Abuso Infantil": ["Repetição transgeracional do abuso", "Vítimas que se tornam algozes", "Memória reprimida e falsas memórias em terapia", "Abuso espiritual e seitas religiosas"],
      "Saúde Mental no Sistema Prisional": ["Transtornos induzidos por isolamento", "Uso indiscriminado de psicotrópicos", "Suicídio como epidemia invisível", "Falta de assistência psiquiátrica pós-cárcere"],
      "Performance e Alto Rendimento": ["Burnout em executivos e a síndrome do impostor", "Doping cognitivo em ambientes competitivos", "Ansiedade de desempenho e cobrança tóxica", "Culto à produtividade e esgotamento extremo"]
    },
    psicopatia: {
      "Perfil Clínico e Forense": ["Traços antissociais em líderes corporativos", "Psicopatia primária vs. secundária", "Estrutura cerebral e empatia zero", "Teste PCL-R e polêmicas diagnósticas"],
      "Manipulação e Gaslighting": ["Táticas de isolamento social", "Distorção da realidade em relações abusivas", "Mentiras patológicas e criação de narrativas", "Coerção psicológica em ambientes de trabalho"],
      "Psicopatas no Poder": ["Autocratas e a ausência de freios emocionais", "Líderes religiosos manipuladores", "Executivos que destroem empresas", "Psicopatia institucionalizada em regimes autoritários"],
      "Serial Killers e Violência Extrema": ["Fascínio midiático e glamourização", "Motivações sexuais e rituais", "Comunicação com assassinos em série", "Falhas na investigação de vítimas marginalizadas"]
    },
    "familia-alienacao": {
      "Dinâmicas de Divórcio Litigioso": ["Uso de perícias psicológicas como arma", "Falsa denúncia de abuso sexual em disputas de guarda", "Perfil de genitores manipuladores", "Assédio judicial como ferramenta de controle"],
      "Alienação Parental e Seus Efeitos": ["Síndrome da alienação parental – controvérsia científica", "Consequências psicológicas a longo prazo", "Intervenção do judiciário e remoção da guarda", "Rejeição induzida e rompimento de vínculos"],
      "Violência Doméstica e Relações de Poder": ["Ciclo de violência e dificuldade de saída", "Feminicídio e falhas na rede de proteção", "Violência psicológica como prova pericial", "Medidas protetivas e revitimização"],
      "Interesse Superior da Criança": ["Conflito entre direitos parentais e proteção", "Abuso institucional em conselhos tutelares", "Adoção tardia e estigma", "Crianças como objeto de disputa emocional"]
    },
    "crime-investigacao": {
      "Crimes Financeiros e Lavagem": ["Esquemas de pirâmide financeira", "Criptomoedas em ransomwares", "Lavagem via setor imobiliário", "Corrupção em compras públicas"],
      "Crimes Violentos e Perícia": ["Homicídios por encomenda", "Violência sexual e cadeia de custódia", "Forense digital em crimes cibernéticos", "Reconstrução de cena do crime"],
      "Psicologia Criminal": ["Motivação por vingança ou ciúmes", "Assassinos em série com pausas", "Criminosos contadores e fraudadores", "Perfil de stalker e assédio obsessivo"],
      "Estratégia Investigativa": ["Entrevistas cognitivas e memória de testemunhas", "Delação premiada e credibilidade", "Inteligência de fontes abertas (OSINT)", "Infiltração policial e limites éticos"]
    },
    "saude-mental-extremo": {
      "Confinamento e Isolamento": ["Efeitos psicológicos do isolamento total", "Prisão domiciliar e saúde mental", "Estratégias de sobrevivência em cativeiro", "Transtorno de estresse pós-traumático complexo"],
      "Alta Pressão e Colapso": ["Burnout em profissionais da saúde", "Médicos plantonistas e transtornos do sono", "Síndrome de desgaste profissional em policiais", "Suicídio entre juízes e advogados"],
      "Trauma e Recuperação": ["Terapia de exposição prolongada", "EMDR e controvérsias científicas", "Uso de psicodélicos em PTSD", "Reintegração após tortura ou sequestro"],
      "Sobrevivência Psicológica": ["Resiliência em desastres naturais", "Apoio comunitário e saúde mental pós-catástrofe", "Culto à positividade tóxica", "Luto complicado e intervenções"]
    },
    negocios: {
      "Modelos de Negócio Disruptivos": ["Startups de vigilância e ética", "Economia de bicos e precarização", "Marketplaces e responsabilidade sobre vendedores", "Franchising e armadilhas contratuais"],
      "Estruturação Patrimonial Empresarial": ["Holdings familiares e conflitos", "Offshores como planejamento tributário", "Sucessão e guerra entre herdeiros", "Venda de empresas para fundos de private equity"],
      "Branding Pessoal e Reputação": ["Cancelamento e crise de imagem", "Assessoria de imprensa para acusações graves", "Construção de narrativa de superação", "Influenciadores digitais e responsabilidade"],
      "Estratégias de Crescimento Agressivo": ["Aquisições hostis e defesas antiaquisição", "Venture capital e perda de controle", "IPO e pressão de resultados", "Fusões e demissões em massa"]
    },
    "visao-global": {
      "Mobilidade Internacional e Refúgio": ["Vistos de investimento e cidadania por dinheiro", "Refugiados climáticos e lacuna legal", "Apátridas e direitos negados", "Extradição e tratados bilaterais"],
      "Cultura Institucional Global": ["Diferenças entre common law e civil law", "Arbitragem internacional e soberania", "Compliance anticorrupção em multinacionais", "Sanções da ONU e bloqueios comerciais"],
      "Networking de Alto Valor": ["Clubes privados e círculos de influência", "Conferências fechadas e tomada de decisão", "Famílias reais e poder simbólico", "Think tanks e formulação de políticas"],
      "Risco Geopolético para Investidores": ["Expropriação de ativos em governos instáveis", "Seguro de risco político", "Golpes de estado e contratos", "Zonas de conflito e oportunidades"]
    },
    filantropia: {
      "Filantropia Estratégica e Reputação": ["Doações com contrapartidas fiscais", "Fundações familiares e controle corporativo", "Causas de alto impacto vs. marketing social", "Voluntariado corporativo como lavagem de imagem"],
      "Investimento de Impacto Social": ["ESG e greenwashing", "Retorno financeiro vs. retorno social", "Avaliação de impacto real", "Títulos de impacto social e parcerias público-privadas"],
      "Educação e Merito": ["Bolsas de estudo para grupos privilegiados", "Ensino bilíngue e elitismo", "Cotas e ações afirmativas", "Educação a distância e qualidade"],
      "Justiça Social e Ativismo": ["Fundações financiadas por bilionários ativistas", "Movimentos sociais cooptados", "ONGs e dependência de doadores", "Ativismo judicial e limitações"]
    },
    "historias-reais": {
      "Superação e Traumas Públicos": ["Relato de ex-presidiário e reintegração", "Vítima de violência doméstica que reage", "Empresário falido que recomeça", "Depoimento de refugiado político"],
      "Queda e Ascensão Íntima": ["Do estrelato ao anonimato forçado", "Perda total de patrimônio e reconstrução", "Erro médico e luta por justiça", "Demissão humilhante e virada de carreira"],
      "Bastidores do Sucesso": ["O preço psicológico da fama", "Relações abusivas nos bastidores de empresas", "Segredos de família real", "Assédio moral em startups de sucesso"],
      "Erros e Aprendizados": ["Sócio que roubou a empresa", "Confiar em sócio errado", "Golpe financeiro que destruiu poupança", "Fraude contábil descoberta tarde"]
    },
    hibridos: {
      "Psicopatia + Negócios": ["CEO psicopata que destruiu a cultura", "Táticas de manipulação em reuniões", "Assédio moral estratégico para demissão", "Fundador narcisista e crise de sucessão"],
      "Segurança + Economia": ["Seguro contra sequestro para ultra-ricos", "Proteção de ativos em paraísos fiscais", "Risco geopolítico para holdings offshore", "Criptomoedas e extorsão digital"],
      "Política + Crime": ["Financiamento de campanha pelo tráfico", "Milícias digitais e desinformação eleitoral", "Corrupção em contratos de segurança", "Caixa dois e compra de sentenças"],
      "Prisional + Psicologia": ["Transtorno de estresse pós-cárcere", "Adaptação à violência como mecanismo", "Religião como refúgio no presídio", "Rituais de iniciação em facções"]
    },
    "familia-saude-mental": {
      "Sofrimento Materno e Perícias Psicológicas": ["Uso de laudos psiquiátricos em disputas de guarda", "Sobrecarga materna como alegação de incapacidade", "Manipulação narrativa por genitor dominante", "Esgotamento emocional vs. transtorno mental"],
      "Perfil do Genitor Manipulador": ["Gaslighting e desqualificação sistemática", "Construção de imagem pública estável vs. privada", "Estratégias de alienação indireta", "Uso de falsas acusações de abuso"],
      "Impacto da Alta Conflituosidade nas Crianças": ["Síndrome da alienação parental revisitada", "Ansiedade e depressão infantil pós-divórcio", "Lealdades divididas e culpa", "Testemunho infantil em vara de família"],
      "Defesa da Mãe no Sistema Judiciário": ["Como reunir provas de manipulação", "Importância de perícia psicossocial aprofundada", "Estratégias jurídicas para reverter guarda", "Rede de apoio e saúde mental durante processo"]
    },
    "justica-tecnologia": {
      "Inteligência Artificial no Judiciário": ["Algoritmos de decisão e viés racial", "Ferramentas de predição de reincidência", "Advocacia automatizada e acesso à justiça", "LGPD e tratamento de dados sensíveis"],
      "Provas Digitais e Cadeia de Custódia": ["Admissibilidade de prints e mensagens apagadas", "Perícia em criptomoedas e rastreamento", "Deepfake como prova falsa", "Acesso a dispositivos móveis na investigação"],
      "Cibercrimes e Legislação": ["Lei de segurança nacional e vigilância", "Doxing e stalking eletrônico", "Invasão de dispositivos por parceiros abusivos", "Responsabilidade de provedores por conteúdo"],
      "Automação e Eficiência Judicial": ["Processo eletrônico e exclusão digital", "Assinaturas digitais e fraudes", "Balcão virtual e atendimento remoto", "Risco de decisões automatizadas sem revisão"]
    },
    "educacao-desigualdade": {
      "Ensino Público e Abandono": ["Evasão escolar por pobreza extrema", "Violência nas escolas e falta de políticas", "Currículo defasado e desinteresse", "Greves de professores e impacto"],
      "Educação Privada e Elitismo": ["Ensino bilíngue como ferramenta de segregação", "Testes de admissão e exclusão", "Mensalidades abusivas e bolsas limitadas", "Rede de contatos como diferencial"],
      "Cotas e Ações Afirmativas": ["Debate sobre mérito vs. reparação", "Fraudes na autodeclaração racial", "Cotas para escolas públicas e regionais", "Resultados a longo prazo"],
      "Tecnologia na Educação": ["Ensino remoto e exclusão digital", "Plataformas de vigilância de alunos", "Gamificação e aprendizagem real", "Dependência de grandes techs"]
    },
    "meio-ambiente": {
      "Garimpo Ilegal e Violência": ["Invasão de terras indígenas", "Trabalho escravo em garimpos", "Contaminação por mercúrio e saúde", "Conflitos armados por recursos"],
      "Desmatamento e Impunidade": ["Fazendeiros e grileiros", "Fiscalização ambiental capturada", "Queimadas criminosas e agronegócio", "Licenciamento ambiental fraudulento"],
      "Justiça Climática e Refugiados": ["Deslocados por desastres naturais", "Responsabilidade de empresas poluidoras", "Litígios climáticos internacionais", "Políticas de adaptação ineficazes"],
      "Economia Verde e Greenwashing": ["Créditos de carbono falsos", "Empresas que poluem e compensam", "Energia limpa e impactos sociais", "Agroecologia vs. agronegócio"]
    },
    "direitos-humanos": {
      "Tortura e Maus-Tratos": ["Casos de tortura em delegacias", "Câmaras de gás em presídios", "Violência policial em protestos", "Responsabilização de agentes"],
      "População em Situação de Rua": ["Criminalização da pobreza", "Remoções forçadas e reintegração", "Saúde mental e dependência química", "Falta de políticas habitacionais"],
      "Migração e Apátridas": ["Detenção de migrantes e deportações", "Tráfico de pessoas e exploração", "Direitos de crianças migrantes", "Barreiras legais para refúgio"],
      "Comunidades Tradicionais": ["Quilombolas e ameaças de despejo", "Povos indígenas e mineração", "Quebra de consulta prévia", "Violência contra lideranças"]
    },
    "agro-logistica": {
      "Política de Fretes e Greves de Caminhoneiros": ["Tabela de frete mínimo e judicialização", "Impacto das greves no abastecimento nacional", "Caminhoneiros autônomos vs. transportadoras", "Participação política da categoria e pautas"],
      "Infraestrutura Rodoviária e Concessões": ["Pedágios abusivos e qualidade das estradas", "Corrupção em contratos de concessão", "Pontos críticos e acidentes fatais", "Privatização de rodovias e monopólios regionais"],
      "Agronegócio e Impactos Socioambientais": ["Concentração de terras e latifúndio improdutivo", "Uso de agrotóxicos e saúde dos trabalhadores", "Desmatamento para monocultura de soja e pecuária", "Conflitos agrários e violência no campo"],
      "Logística, Escoamento e Dependência do Diesel": ["Portos, ferrovias e o gargalo do escoamento", "Subsídio ao diesel e pressão sobre preços", "Custo Brasil logístico e competitividade", "Alternativas: hidrovias e cabotagem vs. lobby rodoviário"],
      "Homenagem aos Caminhoneiros": ["Histórias reais de caminhoneiros no Brasil", "A importância invisível da logística rodoviária", "Rotina, risco e resistência nas estradas", "Impacto dos caminhoneiros na economia nacional"]
    },
    "saude-fisica": {
      "Erros Médicos e Imperícia": ["Subdiagnóstico e negligência em pronto-socorros", "Cirurgias em paciente errado e falhas de protocolo", "Responsabilização criminal de médicos", "Indenizações milionárias e omissão de prontuários"],
      "Acesso a Tratamentos de Alto Custo": ["Judicialização da saúde e medicamentos fora da lista do SUS", "Planos de saúde que negam cobertura de terapias", "Tratamentos experimentais e comitês de ética", "Desabastecimento de fármacos essenciais"],
      "Pandemia e Resposta Institucional": ["Colapso de UTIs e decisões de alocação de recursos", "Vacinação obrigatória e liberdade individual", "Negacionismo científico no poder público", "Efeitos pós-pandemia na infraestrutura hospitalar"],
      "Sistema de Saúde e Desigualdade Regional": ["Fila única do SUS e diferenças entre estados", "Fugas de profissionais para a rede privada", "Hospitais filantrópicos e gestão por OSs", "Subfinanciamento crônico e sucateamento"]
    },
    futurismo: {
      "Inteligência Artificial e Sociedade": ["Ética da IA em decisões judiciais", "Automação e desemprego estrutural", "Viés algorítmico e discriminação", "Regulação de sistemas autônomos"],
      "Cidades Inteligentes e Vigilância": ["Monitoramento urbano e privacidade", "Dados em massa e controle social", "IoT e segurança pública", "Governança digital participativa"],
      "Transumanismo e Biotecnologia": ["Melhoramento humano e desigualdade", "Edição genética e dilemas morais", "Longevidade e previdência", "Ciborgues e direitos civis"],
      "Trabalho e Economia Pós-Escassez": ["Renda básica universal", "Plataformas descentralizadas", "Tokenização da economia", "Novos modelos de propriedade"]
    },
    religiao: {
      "Domínio do Cristianismo na Esfera Pública": ["Poder político evangélico e bancada religiosa", "Influência de lideranças cristãs nas decisões do STF", "Cristianismo como religião oficial implícita no Brasil", "Privilégios fiscais para igrejas e a questão da laicidade"],
      "Perseguição Religiosa e Mártires Contemporâneos": ["Cristãos perseguidos em países de maioria islâmica", "Mártires da fé no século XXI (Nigéria, Índia, Paquistão)", "Intolerância religiosa contra evangélicos em territórios de matriz afro", "Violência anticristã na China e Coreia do Norte"],
      "Teologia Política e Fundamentalismo": ["Teologia da dominação e o projeto de poder", "Nacionalismo cristão e seus impactos na democracia", "Fundamentalismo protestante e censura moral", "Cruzadas modernas: intervenções religiosas em políticas públicas"],
      "Cristianismo e Direitos Humanos": ["Apoio religioso a causas sociais (moradores de rua, presos)", "Igrejas como refúgio para vítimas de violência doméstica", "Contradições entre discurso cristão e práticas discriminatórias", "O papel dos cristãos na luta contra a fome e a desigualdade"]
    },
    esportes: {
      "Futebol: Paixão Nacional": ["Clássicos e rivalidades que movem multidões", "Torcidas organizadas: violência ou paixão extrema?", "Craques que marcaram época: de Pelé a Neymar", "Copa do Mundo e memória afetiva do brasileiro"],
      "Ídolos e Mitos Esportivos": ["Pelé, Maradona e a construção do mito no imaginário popular", "O peso da fama e da pressão psicológica sobre atletas", "Carreira pós-aposentadoria: glória ou ostracismo?", "Ídolos que viraram políticos: sucesso ou oportunismo?"],
      "Outros Esportes em Destaque": ["Vôlei brasileiro: conquistas, superação e identidade nacional", "Basquete: a influência da NBA e o crescimento no Brasil", "Esportes olímpicos: legado, desafios e novos talentos", "Automobilismo: Ayrton Senna e a paixão nacional pela velocidade"],
      "Política e Corrupção no Esporte": ["Máfia do apito e arbitragem: quando a justiça falha", "Desvio de verbas em confederações e federações", "Patrocínios milionários e suspeitas de lavagem de dinheiro", "Manipulação de resultados e apostas: o lado obscuro do esporte"],
      "Psicologia do Esporte e Performance": ["Pressão psicológica em atletas de alto rendimento", "Burnout e depressão no mundo esportivo", "Preparação mental para grandes competições", "Superação de lesões e traumas: histórias de resiliência"]
    },
    nutricao: {
      "Bases Científicas da Nutrição": ["Macronutrientes: proteínas, carboidratos e gorduras na prática clínica", "Micronutrientes e deficiências silenciosas (ferro, zinco, vitamina D)", "Nutrigenômica: como os alimentos interagem com seu DNA", "Cronobiologia alimentar: impacto dos horários nas refeições"],
      "Dietas e Estratégias Populares": ["Jejum intermitente: evidências e controvérsias", "Low carb vs. low fat: meta-análises recentes", "Dieta cetogênica para performance e epilepsia", "Plant-based e veganismo: nutrientes críticos e suplementação"],
      "Alimentos Funcionais e Fitoterápicos": ["Cúrcuma e curcumina: anti-inflamatório natural", "Probióticos, prebióticos e saúde intestinal", "Adaptógenos: ashwagandha, rhodiola e estresse", "Polifenóis do cacau, chá verde e resveratrol"],
      "Nutrição Esportiva e Performance": ["Periodização nutricional para hipertrofia e endurance", "Suplementos com evidência: creatina, beta-alanina, cafeína", "Hidratação e eletrólitos em atletas", "Janela anabólica: mito ou realidade?"],
      "Metabolismo, Emagrecimento e Composição Corporal": ["Termogênese e gasto calórico: o que realmente funciona", "Efeito rebote e reprogramação metabólica", "Avaliação de composição corporal (DEXA, bioimpedância)", "Estratégias comportamentais para adesão a longo prazo"],
      "Nutrição Clínica e Doenças Crônicas": ["Diabetes tipo 2: abordagem nutricional baseada em evidências", "Hipertensão e dieta DASH", "Nutrição oncológica: suporte durante quimioterapia", "Doenças autoimunes e dietas de eliminação"],
      "Receoterapia e Culinária Funcional": ["Preparo que preserva nutrientes: cocção a vapor, baixa temperatura", "Substituições inteligentes (farinhas, açúcares, gorduras)", "Planejamento de refeições e batch cooking", "Receitas anti-inflamatórias: exemplos práticos"]
    }
  };

  const topicFolderMap = {
    politica: "politica-e-geopolitica", "seguranca-total": "seguranca-total", "prisional-policial": "sistema-prisional-e-policial",
    "politicas-publicas": "politicas-publicas", "economia-super-ricos": "economia-e-super-ricos", "saude-mental": "saude-mental",
    psicopatia: "psicopatia-e-comportamento-extremo", "familia-alienacao": "familia-e-alienacao-parental",
    "crime-investigacao": "crime-e-investigacao", "saude-mental-extremo": "saude-mental-em-contextos-extremos",
    negocios: "negocios-e-estrategia", "visao-global": "visao-global", filantropia: "impacto-e-filantropia",
    "historias-reais": "historias-reais", hibridos: "conteudos-hibridos", "familia-saude-mental": "direito-de-familia-e-saude-mental",
    "justica-tecnologia": "justica-e-tecnologia", "educacao-desigualdade": "educacao-e-desigualdade",
    "meio-ambiente": "meio-ambiente-e-conflitos", "direitos-humanos": "direitos-humanos-e-sistema-de-justica",
    "agro-logistica": "agronegocio-logistica-e-transporte", "saude-fisica": "saude-fisica-e-medicina",
    futurismo: "futurismo-e-inovacao", religiao: "religiao-cristianismo-perseguicoes",
    esportes: "esportes-futebol-idolos", nutricao: "nutricao-e-pesquisa-alimentar"
  };

  const topicTitles = {
    politica: "Política & Geopolítica", "seguranca-total": "Segurança Total", "prisional-policial": "Sistema Prisional & Policial",
    "politicas-publicas": "Políticas Públicas", "economia-super-ricos": "Economia & Super Ricos", "saude-mental": "Saúde Mental",
    psicopatia: "Psicopatia & Comportamento Extremo", "familia-alienacao": "Família & Alienação Parental",
    "crime-investigacao": "Crime & Investigação", "saude-mental-extremo": "Saúde Mental em Contextos Extremos",
    negocios: "Negócios & Estratégia", "visao-global": "Visão Global", filantropia: "Impacto & Filantropia",
    "historias-reais": "Histórias Reais", hibridos: "Conteúdos Híbridos", "familia-saude-mental": "Direito de Família e Saúde Mental",
    "justica-tecnologia": "Justiça e Tecnologia", "educacao-desigualdade": "Educação e Desigualdade",
    "meio-ambiente": "Meio Ambiente e Conflitos", "direitos-humanos": "Direitos Humanos e Sistema de Justiça",
    "agro-logistica": "Agronegócio, Logística e Transporte", "saude-fisica": "Saúde Física e Medicina",
    futurismo: "Futurismo & Inovação", religiao: "Religião, Cristianismo & Perseguições",
    esportes: "Esportes, Futebol & Ídolos", nutricao: "Nutrição & Pesquisa Alimentar"
  };

  const topicIcons = {
    politica: "fas fa-landmark", "seguranca-total": "fas fa-shield-alt", "prisional-policial": "fas fa-gavel",
    "politicas-publicas": "fas fa-chalkboard-user", "economia-super-ricos": "fas fa-chart-pie", "saude-mental": "fas fa-brain",
    psicopatia: "fas fa-user-ninja", "familia-alienacao": "fas fa-heart-broken", "crime-investigacao": "fas fa-fingerprint",
    "saude-mental-extremo": "fas fa-skull", negocios: "fas fa-chart-line", "visao-global": "fas fa-globe-americas",
    filantropia: "fas fa-hand-holding-heart", "historias-reais": "fas fa-book-open", hibridos: "fas fa-code-branch",
    "familia-saude-mental": "fas fa-heartbeat", "justica-tecnologia": "fas fa-microchip", "educacao-desigualdade": "fas fa-graduation-cap",
    "meio-ambiente": "fas fa-tree", "direitos-humanos": "fas fa-hand-peace", "agro-logistica": "fas fa-truck",
    "saude-fisica": "fas fa-stethoscope", futurismo: "fas fa-robot", religiao: "fas fa-church",
    esportes: "fas fa-futbol", nutricao: "fas fa-apple-alt"
  };

  function getDescription(key) {
    const desc = {
      politica: "Monetária, relações internacionais, regulação e poder institucional.",
      "seguranca-total": "Pessoal, digital, patrimonial e inteligência estratégica.",
      "prisional-policial": "Estrutura carcerária, investigação, perícia e inteligência policial.",
      "politicas-publicas": "Segurança, saúde, economia pública e regulação.",
      "economia-super-ricos": "Alta renda, offshores, family offices e patrimônio invisível.",
      "saude-mental": "Transtornos, emoções, trauma e alta performance.",
      psicopatia: "Manipulação, liderança tóxica, serial killers e falta de empatia.",
      "familia-alienacao": "Divórcio, guarda, falsas acusações e danos psicológicos.",
      "crime-investigacao": "Perfil criminal, crimes financeiros, motivação e detecção.",
      "saude-mental-extremo": "Prisional, alta pressão, colapso e sobrevivência psicológica.",
      negocios: "Modelos de negócio, holdings, captação e branding.",
      "visao-global": "Networking internacional, mobilidade e expansão.",
      filantropia: "Social, educação, investimento de impacto e legado.",
      "historias-reais": "Superação, queda, ascensão e bastidores.",
      hibridos: "Psicopatia+negócios, segurança+economia, prisão+psicologia.",
      "familia-saude-mental": "Sofrimento materno, perícias psicológicas e manipulação narrativa.",
      "justica-tecnologia": "IA no judiciário, provas digitais, cibercrimes e automação.",
      "educacao-desigualdade": "Ensino público, privatização, cotas e tecnologia na educação.",
      "meio-ambiente": "Garimpo ilegal, desmatamento, justiça climática e greenwashing.",
      "direitos-humanos": "Tortura, população em situação de rua, migração e comunidades tradicionais.",
      "agro-logistica": "Política de fretes, greves de caminhoneiros, infraestrutura e impactos.",
      "saude-fisica": "Erros médicos, acesso a tratamentos, pandemias e sistema de saúde.",
      futurismo: "IA, cidades inteligentes, transumanismo e pós-escassez.",
      religiao: "Cristianismo, poder eclesiástico, perseguições, intolerância e fé.",
      esportes: "Futebol, ídolos, outros esportes, política esportiva e psicologia do atleta.",
      nutricao: "Bases científicas, dietas estratégicas, alimentos funcionais, nutrição esportiva e receoterapia."
    };
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

  // ========== TÚNEL DE VERIFICAÇÃO ==========
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

  // ========== ARTIGOS (do articles.js) ==========
  const sortedArticles = typeof articles !== 'undefined' ? [...articles].sort((a, b) => new Date(b.data) - new Date(a.data)) : [];

  // ========== RENDERIZAÇÃO ==========
  
  // 1. Spotlight (Destaques)
  const destaques = sortedArticles.filter(a => a.destaque).slice(0, 3);
  const spotlightGrid = document.querySelector('.spotlight-grid');
  if (spotlightGrid && destaques.length) {
    spotlightGrid.innerHTML = destaques.map((a, i) => `
      <div class="spotlight-card ${i === 1 ? 'larger' : ''}" data-article-link="${escapeHtml(a.url)}">
        <div class="card-image"><img src="${escapeHtml(a.imagem)}" class="img-placeholder" alt="${escapeHtml(a.titulo)}" onerror="this.src='https://placehold.co/400x200/fefaf5/D4AF37?text=PautaZero'"></div>
        <div class="card-content"><div class="card-badge">${escapeHtml(a.tema)}</div><h4>${escapeHtml(a.titulo)}</h4><p class="card-excerpt">${escapeHtml(a.subtema)}</p><a href="${escapeHtml(a.url)}" class="read-more">Ler artigo →</a></div>
      </div>
    `).join('');
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
  }

  // 4. Modal
  const modal = document.getElementById('topicModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTopicsList = document.getElementById('modalTopicsList');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  function openModal(topicKey) {
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
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
  
  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.getAttribute('data-topic')));
  });
  
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
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
  document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`;
  document.getElementById('shareLinkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
  document.getElementById('shareWhatsapp').href = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;
  document.getElementById('shareEmail').href = `mailto:?subject=${shareText}&body=${currentUrl}`;

  // 7. Arquivo/Busca
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
    archiveOverlay.classList.add('active');
    if (!archiveLoaded) await refreshArchiveList();
    renderArchiveList(searchInput.value);
  }
  
  function closeArchive() {
    archiveOverlay.classList.remove('active');
    if (searchInput) searchInput.value = '';
    renderArchiveList('');
  }
  
  document.getElementById('archiveBtn').addEventListener('click', openArchive);
  document.getElementById('archiveCloseBtn').addEventListener('click', closeArchive);
  archiveOverlay.addEventListener('click', e => { if (e.target === archiveOverlay) closeArchive(); });
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

  // 10. Carrossel Dinâmico
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
  initDynamicCarousel();
  
  console.log('✅ Motor PautaZero carregado com sucesso!');
})();
