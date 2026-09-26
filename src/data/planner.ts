import { PlannerPhase, PlannerTask } from '@/types';

export const PLANNER_PHASES: PlannerPhase[] = [
  {
    id: 'fase-12',
    period: '12 Meses Antes',
    monthsLeft: 12,
    title: 'O Ponto de Partida: Sonhos, Estilo e Orçamento',
    description: 'A base de tudo o que você vai construir. Hora de definir os pilares e a identidade visual do seu casamento.',
    badge: '12 meses para o SIM',
    tasks: [
      { id: 't12-1', text: 'Definir orçamento geral e prioridades do casal', category: 'planejamento', important: true },
      { id: 't12-2', text: 'Escolher a data ou período do casamento', category: 'planejamento', important: true },
      { id: 't12-3', text: 'Fazer a lista inicial de convidados (estimativa)', category: 'planejamento' },
      { id: 't12-4', text: 'Definir o estilo do casamento (clássico, boho, campo, praia)', category: 'planejamento' },
      { id: 't12-5', text: 'Pesquisar e visitar locais para cerimônia e recepção', category: 'local' },
      { id: 't12-6', text: 'Começar pesquisa de fornecedores principais', category: 'fornecedores' },
      { id: 't12-7', text: 'Começar a salvar referências de vestidos de noiva dos seus sonhos', category: 'vestido', important: true }
    ]
  },
  {
    id: 'fase-10',
    period: '10 a 11 Meses Antes',
    monthsLeft: 10,
    title: 'Fechamentos Essenciais e Local',
    description: 'Garantir os fornecedores mais disputados da sua cidade com tranquilidade e sem correria.',
    badge: '10–11 meses',
    tasks: [
      { id: 't10-1', text: 'Fechar local da cerimônia e recepção', category: 'local', important: true },
      { id: 't10-2', text: 'Contratar assessoria / cerimonial', category: 'fornecedores', important: true },
      { id: 't10-3', text: 'Contratar fotografia e filmagem', category: 'fornecedores' },
      { id: 't10-4', text: 'Definir buffet e menu do evento', category: 'fornecedores' },
      { id: 't10-5', text: 'Contratar decorador(a) e definir paleta inicial', category: 'fornecedores' },
      { id: 't10-6', text: 'Contratar banda / DJ e sonorização', category: 'fornecedores' },
      { id: 't10-7', text: 'Pesquisar modelos reais de vestido e agendar visitas em ateliês especializados', category: 'vestido', important: true }
    ]
  },
  {
    id: 'fase-8',
    period: '8 a 9 Meses Antes',
    monthsLeft: 8,
    title: 'O Momento de Escolher o Vestido Perfeito',
    description: 'O vestido é o coração da sua imagem. Escolher agora permite planejar todos os acessórios com segurança.',
    badge: '8–9 meses',
    tasks: [
      { id: 't8-1', text: 'Experimentar silhuetas e escolher o Vestido de Noiva no Ateliê', category: 'vestido', important: true },
      { id: 't8-2', text: 'Definir paleta de cores das madrinhas e padrinhos', category: 'estetica', important: true },
      { id: 't8-3', text: 'Oficializar os convites para padrinhos e madrinhas', category: 'planejamento' },
      { id: 't8-4', text: 'Contratar celebrante ou marcar data na igreja/cartório', category: 'fornecedores' },
      { id: 't8-5', text: 'Pesquisar e definir o traje do noivo (alfaiataria/terno)', category: 'fornecedores' },
      { id: 't8-6', text: 'Começar planejamento da lua de mel', category: 'planejamento' }
    ]
  },
  {
    id: 'fase-6',
    period: '6 a 7 Meses Antes',
    monthsLeft: 6,
    title: 'Primeira Prova e Composição do Look',
    description: 'Harmonizando sapatos, véu, maquiagem e cabelo em perfeita sintonia com o corte do vestido.',
    badge: '6–7 meses',
    tasks: [
      { id: 't6-1', text: 'Realizar a Primeira Prova do Vestido no Ateliê', category: 'vestido', important: true },
      { id: 't6-2', text: 'Escolher sapatos confortáveis com a altura exata para a barra', category: 'estetica' },
      { id: 't6-3', text: 'Definir véu, mantilha, grinalda e joias da noiva', category: 'vestido' },
      { id: 't6-4', text: 'Contratar maquiagem e penteado (Dia da Noiva)', category: 'estetica' },
      { id: 't6-5', text: 'Encomendar convites físicos e criar site dos noivos', category: 'planejamento' },
      { id: 't6-6', text: 'Definir estilo do buquê com o florista', category: 'estetica' }
    ]
  },
  {
    id: 'fase-4',
    period: '4 a 5 Meses Antes',
    monthsLeft: 4,
    title: 'Convites, Ajustes Finos e Lembranças',
    description: 'Momento de enviar convites aos convidados e afinar as medidas do vestido.',
    badge: '4–5 meses',
    tasks: [
      { id: 't4-1', text: 'Começar a entrega dos convites (Save the Date / Oficiais)', category: 'planejamento', important: true },
      { id: 't4-2', text: 'Encomendar lembrancinhas e bem-casados', category: 'planejamento' },
      { id: 't4-3', text: 'Segunda Prova do Vestido com sapatos definitivos', category: 'vestido', important: true },
      { id: 't4-4', text: 'Acompanhar a escolha dos trajes das madrinhas na paleta correta', category: 'estetica' },
      { id: 't4-5', text: 'Comprar alianças e marcar dia do cartório', category: 'planejamento' }
    ]
  },
  {
    id: 'fase-2',
    period: '2 a 3 Meses Antes',
    monthsLeft: 2,
    title: 'Testes de Beleza e Confirmações',
    description: 'Alinhando tudo o que você imaginou com a realidade do grande dia.',
    badge: '2–3 meses',
    tasks: [
      { id: 't2-1', text: 'Realizar teste oficial de penteado e maquiagem (com grinalda)', category: 'estetica', important: true },
      { id: 't2-2', text: 'Fazer o ensaio pré-wedding', category: 'fornecedores' },
      { id: 't2-3', text: 'Iniciar confirmação de presença dos convidados (R.S.V.P.)', category: 'planejamento' },
      { id: 't2-4', text: 'Conferir todos os contratos e pagamentos dos fornecedores', category: 'planejamento' },
      { id: 't2-5', text: 'Definir roteiro musical e ordem de entrada com o cerimonial', category: 'planejamento' }
    ]
  },
  {
    id: 'fase-1',
    period: '1 Mês Antes',
    monthsLeft: 1,
    title: 'Última Prova e Reta Final',
    description: 'Quase lá! Sentir o vestido no corpo como uma luva e finalizar os detalhes.',
    badge: '30 dias',
    tasks: [
      { id: 't1-1', text: 'Prova Final do Vestido no Ateliê (medidas milimétricas)', category: 'vestido', important: true },
      { id: 't1-2', text: 'Conferir caimento do véu, sapatos e acessórios de cabelo', category: 'vestido' },
      { id: 't1-3', text: 'Reunião de alinhamento com cerimonialista e fotógrafo', category: 'fornecedores' },
      { id: 't1-4', text: 'Amaciar os sapatos em casa para evitar desconforto', category: 'estetica' },
      { id: 't1-5', text: 'Fechar lista definitiva de convidados com o buffet', category: 'planejamento' }
    ]
  },
  {
    id: 'fase-0',
    period: 'Semana do Casamento',
    monthsLeft: 0,
    title: 'A Grande Semana: Relaxar, Brilhar e Celebrar',
    description: 'Chegou o momento mais esperado da sua vida! Foco em você e no amor de vocês.',
    badge: 'Semana do SIM ❤️',
    tasks: [
      { id: 't0-1', text: 'Retirar o Vestido no Ateliê perfeitamente passado e ensacado', category: 'vestido', important: true },
      { id: 't0-2', text: 'Conferir kit de emergência (agulha, linha, band-aid, alfinetes)', category: 'planejamento' },
      { id: 't0-3', text: 'Fazer spa, massagem, unhas e cuidados de beleza', category: 'estetica' },
      { id: 't0-4', text: 'Confirmar horários de chegada de madrinhas e padrinhos', category: 'planejamento' },
      { id: 't0-5', text: 'Dormir bem, respirar fundo e aproveitar cada segundo do seu dia!', category: 'planejamento', important: true }
    ]
  }
];

export const DRESS_CHECKLIST: PlannerTask[] = [
  { id: 'dc-1', text: 'Defini o estilo do casamento (Praia, Campo, Igreja Clássica ou Salão Moderno)', category: 'vestido', important: true },
  { id: 'dc-2', text: 'Sei qual modelo e tecido combinam com o clima e local da cerimônia', category: 'vestido' },
  { id: 'dc-3', text: 'Experimentei diferentes silhuetas (Sereia, Princesa, Evasê, Fluido, Semi-sereia)', category: 'vestido', important: true },
  { id: 'dc-4', text: 'Encontrei o modelo que me faz chorar de emoção ao me olhar no espelho', category: 'vestido', important: true },
  { id: 'dc-5', text: 'Defini véu, mantilha, grinalda e acessórios em perfeita harmonia', category: 'vestido' },
  { id: 'dc-6', text: 'Fiz a 1ª prova com as marcações de corte e cintura', category: 'vestido' },
  { id: 'dc-7', text: 'Fiz a 2ª prova com o sapato exato que usarei no altar', category: 'vestido' },
  { id: 'dc-8', text: 'Realizei a prova final impecável', category: 'vestido', important: true },
  { id: 'dc-9', text: 'Confirmei a retirada e cuidados para o dia do casamento', category: 'vestido', important: true }
];
