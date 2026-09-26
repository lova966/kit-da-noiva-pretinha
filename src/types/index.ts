export interface LeadFormData {
  name: string;
  phone: string;
  weddingDatePeriod: string; // '3m' | '6m' | '9m' | '12m' | '+12m' | 'definindo'
  dressStatus: string; // 'escolhido' | 'pesquisando' | 'nao_comecei'
  materialChoice: string; // 'ambos' | 'planner' | 'paletas'
  createdAt?: string;
}

export interface PlannerTask {
  id: string;
  text: string;
  category: 'vestido' | 'local' | 'fornecedores' | 'planejamento' | 'estetica';
  important?: boolean;
}

export interface PlannerPhase {
  id: string;
  period: string;
  monthsLeft: number;
  title: string;
  description: string;
  badge: string;
  tasks: PlannerTask[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string; // e.g. "Principal", "Acentuação", "Base", "Iluminação"
  icon: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  subtitle: string;
  style: string;
  bestForTime: 'dia' | 'noite' | 'ambos';
  bestForVenue: 'praia' | 'campo' | 'salao' | 'todos';
  description: string;
  colors: ColorSwatch[];
  dressSuggestion: string;
  whatsappMessage: string;
}
