import { ColorPalette } from '@/types';

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'paleta-01',
    name: 'Sage + Off-White',
    subtitle: 'Verde Salvia, Areia & Ouro Suave',
    style: 'Natural, Elegante, Orgânico e Sofisticado',
    bestForTime: 'dia',
    bestForVenue: 'campo',
    description: 'A paleta mais desejada para casamentos no campo e ao ar livre. Transmite frescor, leveza e serenidade nas fotos.',
    colors: [
      { name: 'Verde Sage', hex: '#9CAF88', role: 'Madrinhas Principal', icon: '🌿' },
      { name: 'Off-White', hex: '#FAF9F6', role: 'Vestido da Noiva', icon: '🤍' },
      { name: 'Areia / Fendi', hex: '#D8CAB8', role: 'Padrinhos / Ternos', icon: '🌾' },
      { name: 'Dourado Suave', hex: '#D4AF37', role: 'Acessórios & Detalhes', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos em crepe georgette ou musseline fluida com decote ombro a ombro ou drapeados sutis.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Me apaixonei pela paleta *Sage + Off-White* do Guia de Cores. Gostaria de ver os vestidos disponíveis nessa tonalidade para minhas madrinhas!'
  },
  {
    id: 'paleta-02',
    name: 'Terracota + Areia',
    subtitle: 'Tons Terrosos, Caramelo & Oliva',
    style: 'Boho Chic, Rústico Nobre e Acolhedor',
    bestForTime: 'dia',
    bestForVenue: 'campo',
    description: 'Intensa, calorosa e moderna. Cria um contraste deslumbrante tanto em fotos sob o sol poente quanto em igrejas rústicas.',
    colors: [
      { name: 'Terracota Nobre', hex: '#C86446', role: 'Madrinhas Principal', icon: '🧡' },
      { name: 'Caramelo Suave', hex: '#B87A4D', role: 'Madrinhas Secundário', icon: '🤎' },
      { name: 'Areia Quente', hex: '#E6D7C3', role: 'Noivo / Padrinhos', icon: '🤍' },
      { name: 'Verde Oliva', hex: '#6B7A58', role: 'Arranjos & Detalhes', icon: '🌿' }
    ],
    dressSuggestion: 'Vestidos em crepe fluido ou acetinados com fendas elegantes e decotes nas costas.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Escolhi a paleta *Terracota + Areia* do Guia. Vocês têm modelos de vestidos para madrinhas nessa cor?'
  },
  {
    id: 'paleta-03',
    name: 'Rosé + Champagne',
    subtitle: 'Blush Delicado, Seda & Ouro Rosé',
    style: 'Romântico Tradicional, Doce e Atemporal',
    bestForTime: 'ambos',
    bestForVenue: 'salao',
    description: 'O clássico dos sonhos. Uma combinação poética que favorece todos os tons de pele e traz luminosidade cinematográfica.',
    colors: [
      { name: 'Rosé Blush', hex: '#E8B4B8', role: 'Madrinhas Principal', icon: '🌸' },
      { name: 'Champagne Seda', hex: '#F1E6D0', role: 'Base & Recepção', icon: '🥂' },
      { name: 'Off-White Puro', hex: '#FCFAF2', role: 'Vestido Noiva', icon: '🤍' },
      { name: 'Rosé Gold', hex: '#B76E79', role: 'Brilhos & Acessórios', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos com bordados delicados em renda floral, tule francês ou musseline plissada.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Gostei muito da paleta *Rosé + Champagne*. Quero agendar uma visita para ver os vestidos nesse estilo!'
  },
  {
    id: 'paleta-04',
    name: 'Azul Serenity',
    subtitle: 'Serenity, Nuvem, Cinza & Prata',
    style: 'Fresco, Moderno, Leve e Celestial',
    bestForTime: 'dia',
    bestForVenue: 'praia',
    description: 'Perfeito para celebrações à beira-mar ou casamentos diurnos. Passa sensação de tranquilidade e elegância refinada.',
    colors: [
      { name: 'Azul Serenity', hex: '#92A8D1', role: 'Madrinhas Principal', icon: '💙' },
      { name: 'Branco Perolado', hex: '#FDFBF7', role: 'Vestido da Noiva', icon: '🤍' },
      { name: 'Cinza Nevoeiro', hex: '#D1D5DB', role: 'Terno Padrinhos', icon: '🌫️' },
      { name: 'Prata Fina', hex: '#C0C0C0', role: 'Joias & Iluminação', icon: '✨' }
    ],
    dressSuggestion: 'Modelos fluidos com fenda sutil, mangas esvoaçantes ou decotes assimétricos modernos.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Minha paleta será *Azul Serenity*. Vocês têm vestidos de festa nessa cor disponíveis para aluguel?'
  },
  {
    id: 'paleta-05',
    name: 'Verde Oliva Real',
    subtitle: 'Oliva Profundo, Nude & Dourado Fosco',
    style: 'Orgânico Chic, Imponente e Autêntico',
    bestForTime: 'ambos',
    bestForVenue: 'campo',
    description: 'Para noivas que buscam fugir do comum com muito bom gosto. O verde oliva harmoniza magistralmente com tons de madeira e folhagens.',
    colors: [
      { name: 'Verde Oliva', hex: '#556B2F', role: 'Madrinhas Principal', icon: '🌿' },
      { name: 'Nude Fendi', hex: '#C2B280', role: 'Acompanhamento', icon: '🤎' },
      { name: 'Creme Baunilha', hex: '#FFFDD0', role: 'Toalhas & Flores', icon: '🤍' },
      { name: 'Ouro Envelhecido', hex: '#CFB53B', role: 'Detalhes Metálicos', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos com drapeados deusa grega, decote em V estruturado e tecidos com caimento impecável.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Quero as madrinhas na paleta *Verde Oliva*. Gostaria de consultar os tamanhos e modelos disponíveis!'
  },
  {
    id: 'paleta-06',
    name: 'Marsala Elegance',
    subtitle: 'Vinho Tinto, Nude Quente & Dourado Real',
    style: 'Impactante, Clássico Noturno e Glamouroso',
    bestForTime: 'noite',
    bestForVenue: 'salao',
    description: 'Uma das cores mais marcantes e sofisticadas para casamentos noturnos em grandes catedrais e salões nobres.',
    colors: [
      { name: 'Marsala Real', hex: '#68283B', role: 'Madrinhas Principal', icon: '🍷' },
      { name: 'Nude Rosado', hex: '#D4A5A5', role: 'Toque de Contraste', icon: '🤎' },
      { name: 'Champagne Ouro', hex: '#F7E7CE', role: 'Equilíbrio & Luz', icon: '🤍' },
      { name: 'Dourado Escovado', hex: '#E5C158', role: 'Acessórios & Brilho', icon: '✨' }
    ],
    dressSuggestion: 'Modelos sereia ou evasê estruturados com tecidos nobres como zibeline, cetim bucol ou rendas rebordadas.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Amei a paleta *Marsala*. Gostaria de saber quais modelos elegantes vocês têm no ateliê!'
  },
  {
    id: 'paleta-07',
    name: 'Lavanda & Lilás Sonho',
    subtitle: 'Lavanda Suave, Blush, Pérola & Prata',
    style: 'Encantador, Poético e Romântico',
    bestForTime: 'dia',
    bestForVenue: 'campo',
    description: 'Delicado como um campo de flores provençal. Fica fantástico tanto para madrinhas adultas quanto para daminhas e pajens.',
    colors: [
      { name: 'Lavanda Provençal', hex: '#BDB0D0', role: 'Madrinhas Principal', icon: '💜' },
      { name: 'Rosa Blush', hex: '#F4C2C2', role: 'Harmonia Floral', icon: '🌸' },
      { name: 'Pérola Natural', hex: '#EAE6DF', role: 'Vestido Noiva', icon: '🤍' },
      { name: 'Prata Espelhada', hex: '#E0E0E0', role: 'Brilho & Joias', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos em tule com sobreposições suaves e corpetes com aplicações florais 3D.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Escolhi *Lavanda* para as minhas madrinhas. Vocês têm opções prontas para prova?'
  },
  {
    id: 'paleta-08',
    name: 'Esmeralda & Ouro Nobre',
    subtitle: 'Verde Esmeralda, Fendi & Dourado Imperial',
    style: 'Rico, Majestoso, Aristocrático e Noturno',
    bestForTime: 'noite',
    bestForVenue: 'salao',
    description: 'Uma cor rica em significado e presença. Valoriza o altar com contraste elegante contra o vestido branco da noiva.',
    colors: [
      { name: 'Verde Esmeralda', hex: '#005A36', role: 'Madrinhas Principal', icon: '🌲' },
      { name: 'Fendi Nobre', hex: '#9E978E', role: 'Trajes Padrinhos', icon: '🌾' },
      { name: 'Off-White Seda', hex: '#F9F6F0', role: 'Noiva', icon: '🤍' },
      { name: 'Ouro Imperial', hex: '#D4AF37', role: 'Iluminação & Velas', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos com fendas poderosas, decotes em V profundo e tecidos encorpados com caimento fluido.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Quero as madrinhas de *Verde Esmeralda*. Gostaria de ver os vestidos nessa cor!'
  },
  {
    id: 'paleta-09',
    name: 'Tons Terrosos & Canela',
    subtitle: 'Canela, Cobre, Areia Quente & Marfim',
    style: 'Cálido, Outonal, Aconchegante e Chic',
    bestForTime: 'ambos',
    bestForVenue: 'campo',
    description: 'A tendência que conquistou noivas modernas. A gradação de tons permite que cada madrinha use a sua tonalidade favorita.',
    colors: [
      { name: 'Canela Especiaria', hex: '#A0522D', role: 'Tom Escuro', icon: '🍂' },
      { name: 'Cobre Acetinado', hex: '#B87333', role: 'Tom Médio', icon: '🧡' },
      { name: 'Areia Dourada', hex: '#E3C16F', role: 'Tom Claro', icon: '🤎' },
      { name: 'Marfim Clássico', hex: '#FFFFF0', role: 'Noiva', icon: '🤍' }
    ],
    dressSuggestion: 'Vestidos acetinados com caimento fluido em viés e alças finas minimalistas.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Quero usar *Tons Terrosos / Canela* no meu casamento. Vocês têm vestidos dessa paleta?'
  },
  {
    id: 'paleta-10',
    name: 'Azul Marinho & Rosé Gold',
    subtitle: 'Navy Profundo, Rosé Gold & Bronze Nobre',
    style: 'Contemporâneo, Solene, Fotogênico e Forte',
    bestForTime: 'noite',
    bestForVenue: 'salao',
    description: 'Combinação clássica que une a sobriedade do azul marinho ao toque feminino e cintilante do rosé gold.',
    colors: [
      { name: 'Azul Marinho Real', hex: '#0B1D3A', role: 'Madrinhas Principal', icon: '🌊' },
      { name: 'Rosé Gold', hex: '#C58F87', role: 'Acentuações & Flores', icon: '🌸' },
      { name: 'Gelo Cristal', hex: '#F0F4F8', role: 'Base & Ternos', icon: '🤍' },
      { name: 'Bronze Envelhecido', hex: '#8C5E3C', role: 'Detalhes Metálicos', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos com cortes retos elegantes, drapeados na cintura ou detalhes discretos em pedraria.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Gostei da paleta *Azul Marinho & Rosé Gold*. Quais vestidos vocês têm disponíveis?'
  },
  {
    id: 'paleta-11',
    name: 'Amarelo Manteiga & Floral',
    subtitle: 'Butter Yellow, Menta, Seda & Ouro Suave',
    style: 'Ensolarado, Alegre, Romântico e Delicado',
    bestForTime: 'dia',
    bestForVenue: 'campo',
    description: 'A grande novidade nas passarelas internacionais de casamento. Traz aconchego, frescor e um visual solar inesquecível.',
    colors: [
      { name: 'Amarelo Manteiga', hex: '#FDE49E', role: 'Madrinhas Principal', icon: '🌼' },
      { name: 'Verde Menta', hex: '#A8E6CF', role: 'Arranjos Florais', icon: '🌿' },
      { name: 'Branco Seda', hex: '#FDFBF7', role: 'Vestido da Noiva', icon: '🤍' },
      { name: 'Ouro Suave', hex: '#E6CA65', role: 'Toque Iluminado', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos fluidos em camadas, tecidos leves com babados sutis e costas abertas.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Achei lindo o *Amarelo Manteiga* para madrinhas. Gostaria de conhecer os modelos no ateliê!'
  },
  {
    id: 'paleta-12',
    name: 'Minimalista Black Tie (Preto & Off-White)',
    subtitle: 'Preto Black Tie, Off-White & Prata Pura',
    style: 'Ultra-Moderno, Editorial de Moda, Audacioso e Chique',
    bestForTime: 'noite',
    bestForVenue: 'salao',
    description: 'Inspirado em casamentos de alta costura em Nova York e Milão. As madrinhas de preto destacam o vestido da noiva de forma colossal.',
    colors: [
      { name: 'Preto Black Tie', hex: '#111111', role: 'Madrinhas & Padrinhos', icon: '🖤' },
      { name: 'Branco Puro Seda', hex: '#FFFFFF', role: 'Vestido da Noiva Único', icon: '🤍' },
      { name: 'Titânio Fume', hex: '#4A4A4A', role: 'Gravatas & Cortes', icon: '🌫️' },
      { name: 'Prata Diamante', hex: '#E5E4E2', role: 'Joias & Brilhos', icon: '✨' }
    ],
    dressSuggestion: 'Modelos minimalistas slip dress, tomara que caia escultural ou fendas retas imponentes.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Farei um casamento *Black Tie (Preto & Branco)*. Gostaria de agendar prova para os vestidos pretos das madrinhas!'
  },
  {
    id: 'paleta-13',
    name: 'Pêssego & Coral Romântico',
    subtitle: 'Peach Fuzz, Coral Suave, Nude & Dourado',
    style: 'Doce, Acolhedor, Caloroso e Gracioso',
    bestForTime: 'dia',
    bestForVenue: 'praia',
    description: 'Ilumina o tom de pele e combina perfeitamente com casamentos no pôr do sol, praia e decorações tropicais elegantes.',
    colors: [
      { name: 'Pêssego Aveludado', hex: '#FFBE98', role: 'Madrinhas Principal', icon: '🍑' },
      { name: 'Coral Suave', hex: '#F08080', role: 'Flores & Destaques', icon: '🪸' },
      { name: 'Nude Rosado', hex: '#F3E5DC', role: 'Neutro de Apoio', icon: '🤍' },
      { name: 'Dourado Cintilante', hex: '#D4AF37', role: 'Luz & Acessórios', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos com alças delicadas, fendas laterais e tecidos acetinados com movimento suave.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Gostaria de consultar vestidos na paleta *Pêssego / Coral* para minhas madrinhas!'
  },
  {
    id: 'paleta-14',
    name: 'Fúcsia & Berry Vibrante',
    subtitle: 'Fúcsia Intenso, Framboesa, Nude & Ouro',
    style: 'Marcante, Energético, Alegre e Apaixonante',
    bestForTime: 'ambos',
    bestForVenue: 'todos',
    description: 'Para noivas cheias de personalidade que querem fotos vibrantes e madrinhas com sorrisos radiantes que roubam a cena.',
    colors: [
      { name: 'Fúcsia Glamour', hex: '#C72C61', role: 'Madrinhas Principal', icon: '🌺' },
      { name: 'Framboesa Berry', hex: '#8E2849', role: 'Contraste Profundo', icon: '🍇' },
      { name: 'Nude Seda', hex: '#EFE7E1', role: 'Equilíbrio', icon: '🤍' },
      { name: 'Dourado Brilhante', hex: '#E1C158', role: 'Acessórios', icon: '✨' }
    ],
    dressSuggestion: 'Modelos com mangas volumosas bufantes, decotes em coração ou fendas espetaculares.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Vou usar a paleta *Fúcsia & Berry* no meu casamento. Quais modelos vocês têm nessa cor?'
  },
  {
    id: 'paleta-15',
    name: 'Tons Neutros & Linho Chique',
    subtitle: 'Linho Cru, Fendi Claro, Seda & Ouro Fosco',
    style: 'Clean, Quiet Luxury, Minimalista e Deslumbrante',
    bestForTime: 'dia',
    bestForVenue: 'campo',
    description: 'O luxo silencioso (quiet luxury). Para casamentos no campo ou praia onde a sofisticação está na simplicidade dos tecidos e cortes nobres.',
    colors: [
      { name: 'Linho Cru', hex: '#E4D5B7', role: 'Madrinhas Principal', icon: '🌾' },
      { name: 'Fendi Claro', hex: '#BFB5A2', role: 'Padrinhos / Ternos', icon: '🤎' },
      { name: 'Off-White Puro', hex: '#F9F8F6', role: 'Vestido da Noiva', icon: '🤍' },
      { name: 'Dourado Fosco', hex: '#C5A059', role: 'Metais & Velas', icon: '✨' }
    ],
    dressSuggestion: 'Vestidos com cortes retos minimalistas, tecidos texturizados e caimento limpo.',
    whatsappMessage: 'Olá, Ateliê Pretinha! Adorei a paleta *Tons Neutros & Linho Chique*. Gostaria de conhecer os modelos no ateliê!'
  }
];
