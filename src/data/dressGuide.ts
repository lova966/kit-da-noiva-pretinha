export interface DressSilhouette {
  id: string;
  name: string;
  subtitle: string;
  bestForBody: string;
  description: string;
  recommendedVenues: string;
  recommendedFabrics: string[];
  necklineTips: string;
  icon: string;
  tag: string;
}

export const DRESS_SILHOUETTES: DressSilhouette[] = [
  {
    id: 'princesa',
    name: 'Corte Princesa (Ball Gown)',
    subtitle: 'O clássico conto de fadas atemporal',
    tag: 'Mais Clássico',
    icon: '👑',
    bestForBody: 'Valoriza cintura fina, equilibra quadris largos e cria presença imponente.',
    description: 'Corselete estruturado que abraça o busto e a cintura, abrindo em uma saia volumosa e dramática. Perfeito para noivas que sonham com uma entrada triunfal na igreja ou salão nobre.',
    recommendedVenues: 'Igrejas tradicionais, catedrais, salões de festas e castelos.',
    recommendedFabrics: ['Tule Francês com glitter', 'Zibeline de Seda', 'Renda Bordada em Pedraria', 'Cetim Duchesse'],
    necklineTips: 'Decote Coração, Tomara-que-caia estruturado, Ombro a Ombro clássico.'
  },
  {
    id: 'sereia',
    name: 'Sereia & Semi-Sereia',
    subtitle: 'Sensualidade refinada e elegância marcante',
    tag: 'Mais Sofisticado',
    icon: '✨',
    bestForBody: 'Desenha curvas do corpo (busto, cintura e quadril) com máxima elegância.',
    description: 'Ajustado milimetricamente ao corpo, abrindo na altura dos joelhos (sereia clássico) ou no meio da coxa (semi-sereia, que permite muito mais movimento e dança).',
    recommendedVenues: 'Casamentos noturnos, salões modernos, rooftops e recepções sofisticadas.',
    recommendedFabrics: ['Crepe Georgette encorpado', 'Renda Guipir', 'Mikado de seda', 'Tule Ilusão'],
    necklineTips: 'Decote em V profundo, Decote Quadrado moderno, Alças delicadas com costas abertas.'
  },
  {
    id: 'evase',
    name: 'Evasê / Linha A (A-Line)',
    subtitle: 'O corte mais democrático e versátil do mundo',
    tag: 'Mais Procurado',
    icon: '🌸',
    bestForBody: 'Fica deslumbrante em absolutamente todos os tipos de silhueta e alturas.',
    description: 'Ajustado delicadamente no busto e na cintura, descendo suavemente em formato de "A" sem volume excessivo. Não aperta e permite andar, dançar e aproveitar a festa a noite inteira.',
    recommendedVenues: 'Praia, campo, fazenda, igreja e recepção ao ar livre.',
    recommendedFabrics: ['Chiffon de seda', 'Organza cristal', 'Renda Chantilly francesa', 'Crepe acetinado'],
    necklineTips: 'Decote Canoa, Ilusão em tule transparente, Mangas em renda transparente.'
  },
  {
    id: 'boho',
    name: 'Boho Chic & Fluido',
    subtitle: 'Leveza pura, movimento e romantismo livre',
    tag: 'Tendência 2026/2027',
    icon: '🌿',
    bestForBody: 'Alonga a silhueta, valoriza movimento natural e conforto extremo.',
    description: 'Sem armações duras, tecidos leves que balançam com o vento, rendas com padronagens florais e arabescos orgânicos. A noiva parece flutuar.',
    recommendedVenues: 'Casamentos pé na areia, campo, pôr do sol e celebrações intimistas.',
    recommendedFabrics: ['Mousseline de seda', 'Renda Renascença/Boho', 'Tule Poá delicado'],
    necklineTips: 'Decote frente única, Costas abertas rendadas, Alças finas com laços.'
  },
  {
    id: 'minimalista',
    name: 'Minimalista Contemporâneo (Clean Chic)',
    subtitle: 'O luxo do corte perfeito sem excesso de brilho',
    tag: 'Alta Costura Clean',
    icon: '💎',
    bestForBody: 'Linhas retas e arquitetônicas que expressam elegância pura e moderna.',
    description: 'Foco total no caimento da alfaiataria, nos tecidos de altíssima gramatura e nos acabamentos invisíveis. Nada de bordados pesados: o próprio corte do vestido é a joia.',
    recommendedVenues: 'Casamentos urbanos, hotéis boutique, galerias e mini-weddings.',
    recommendedFabrics: ['Zibeline pura fosca', 'Crepe pesado de seda', 'Cetim italiano encorpado'],
    necklineTips: 'Gola alta americana, Decote quadrado arquitetônico, Drapeado degagê.'
  }
];

export const NOIVA_SOS_KIT = [
  { item: 'Mini kit de costura com linha branca e agulha fina', reason: 'Para qualquer emergência de botão ou bainha (o Atelier Pretinha disponibiliza para noivas).' },
  { item: 'Alfinetes de segurança reforçados', reason: 'Para prender cauda na hora da festa e dançar à vontade.' },
  { item: 'Fita adesiva corporal transparente para tecidos', reason: 'Garante que o decote não saia do lugar em nenhum movimento.' },
  { item: 'Giz escolar branco', reason: 'Segredo das costureiras: apaga na hora manchas pequenas de maquiagem que caiam no vestido branco.' },
  { item: 'Canudos descartáveis ou de silicone', reason: 'Para beber água e champanhe durante os preparativos sem estragar o batom.' },
  { item: 'Protetor / amortecedor de calcanhar de silicone', reason: 'Evita bolhas e permite ficar 8 horas de salto sem dor.' },
  { item: 'Lenços anti-oleosidade / pó translúcido', reason: 'Para tirar o brilho da testa antes das fotos protocolares.' },
  { item: 'Escovinha de dentes e fio dental', reason: 'Essencial antes de entrar na igreja após o lanche do dia da noiva.' },
  { item: 'Colírio lubrificante e remédio para dor de cabeça', reason: 'Evita olhos vermelhos e garante bem-estar na festa.' },
  { item: 'Chinelo ou rasteirinha estilosa confortável', reason: 'Para o final da pista de dança quando os pés pedirem descanso.' }
];
