'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Palette, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Check, 
  ChevronRight, 
  Crown, 
  MapPin, 
  Sun, 
  Moon, 
  MessageCircle, 
  HelpCircle, 
  Layers, 
  Scissors, 
  ShieldCheck, 
  Gem, 
  CheckSquare 
} from 'lucide-react';
import { LeadFormData, ColorPalette } from '@/types';
import { PLANNER_PHASES, DRESS_CHECKLIST } from '@/data/planner';
import { COLOR_PALETTES } from '@/data/palettes';
import { DRESS_SILHOUETTES, NOIVA_SOS_KIT, DressSilhouette } from '@/data/dressGuide';

interface InteractiveHubProps {
  lead: LeadFormData;
  onReset: () => void;
}

const WHATSAPP_NUMBER = '5583996146261'; // WhatsApp oficial Ateliê Pretinha ((83) 99614-6261 / (83) 9614-6261)

export const InteractiveHub: React.FC<InteractiveHubProps> = ({ lead, onReset }) => {
  const [activeTab, setActiveTab] = useState<'planner' | 'silhuetas' | 'sos' | 'paletas' | 'imprimir'>('planner');
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [selectedVenueFilter, setSelectedVenueFilter] = useState<'todos' | 'praia' | 'campo' | 'salao'>('todos');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'todos' | 'dia' | 'noite'>('todos');
  const [selectedSilhouette, setSelectedSilhouette] = useState<DressSilhouette>(DRESS_SILHOUETTES[0]);

  // Carrega tarefas marcadas do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pretinha_noiva_checked_tasks');
      if (saved) setCheckedTasks(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleTask = (taskId: string) => {
    setCheckedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem('pretinha_noiva_checked_tasks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Calcula progresso total do checklist
  const allTasksCount = PLANNER_PHASES.reduce((acc, p) => acc + p.tasks.length, 0) + DRESS_CHECKLIST.length;
  const completedCount = Object.values(checkedTasks).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / allTasksCount) * 100));

  // Link do WhatsApp para agendar atendimento VIP
  const handleScheduleFitting = (customMsg?: string) => {
    const baseMsg = customMsg || 
      `Olá, Ateliê Pretinha! Me chamo *${lead.name}*, meu casamento está previsto para *${lead.weddingDatePeriod}* e acabei de acessar o Kit da Noiva. Gostaria de agendar um horário para conhecer os vestidos e fazer uma prova com a estilista! ✨👰`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMsg)}`;
    window.open(url, '_blank');
  };

  // Filtragem de Paletas
  const filteredPalettes = COLOR_PALETTES.filter((p) => {
    const matchVenue = selectedVenueFilter === 'todos' || p.bestForVenue === selectedVenueFilter || p.bestForVenue === 'todos';
    const matchTime = selectedTimeFilter === 'todos' || p.bestForTime === selectedTimeFilter || p.bestForTime === 'ambos';
    return matchVenue && matchTime;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#c5a059]/20 shadow-sm no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9A7A4A] via-[#E8D4A8] to-[#9A7A4A] p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
                AP
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8c6732]">
                Kit da Noiva Premium
              </p>
              <h2 className="text-xs sm:text-sm font-serif font-bold text-slate-900 leading-tight">
                Atelier Pretinha Costureira
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScheduleFitting()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full gold-gradient-bg text-slate-950 text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-slate-950" />
              <span>Agendar Prova VIP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Welcome Personalized Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-[#fbf7ee] to-white border border-[#c5a059]/30 silk-shadow mb-6 no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kit liberado com carinho para {lead.name}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Seu Espaço Exclusivo de Organização 💍
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl">
                Tudo o que você precisa para planejar seu casamento com tranquilidade: cronograma mês a mês, guia de silhuetas e tecidos, kit SOS do grande dia e 15 paletas de cores.
              </p>
            </div>

            {/* Checklist Progress Ring / Bar */}
            <div className="bg-white/90 p-4 rounded-2xl border border-[#c5a059]/20 shadow-sm shrink-0 w-full md:w-64 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Seu Progresso:</span>
                <span className="font-bold text-[#8c6732]">{progressPercent}% Concluído</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className="h-full gold-gradient-bg transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                {completedCount} de {allTasksCount} tarefas realizadas
              </p>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CONVITE DE EXPERIÊNCIA VIP NO ATELIÊ (SEM PREÇOS) */}
          {/* ========================================================== */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#180e0a] via-[#2a170f] to-[#180e0a] border-2 border-[#d4af37] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#d4af37]/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d77f] text-[10px] font-bold tracking-wider uppercase">
                  <Crown className="w-3 h-3 text-[#f5d77f]" />
                  <span>Experiência no Ateliê • Atendimento Exclusivo</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#ffffff] flex items-center gap-2">
                  <span>AGENDE SUA SESSÃO DE PROVA COM A ESTILISTA</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Viva a emoção única de experimentar os vestidos no <strong>Atelier Pretinha Costureira</strong>. Você terá um horário reservado com assessoria de imagem para descobrir o caimento e o modelo que fazem seu coração bater mais forte!
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-amber-200/90">
                  <span>✨ Atendimento com hora marcada</span>
                  <span>✨ Prova de silhuetas e véus</span>
                  <span className="text-emerald-400 font-semibold">● Agendamento Aberto</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
                <button
                  onClick={() => handleScheduleFitting()}
                  className="px-6 py-3.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-slate-950" />
                  <span>AGENDAR MINHA PROVA NO ATELIÊ</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-center text-slate-400">
                  Converse diretamente com o ateliê no WhatsApp
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (5 Tabs de Alto Valor) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-6 mt-6 border-t border-[#c5a059]/20">
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'planner'
                  ? 'gold-gradient-bg text-slate-950 shadow-md shadow-[#c5a059]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Planner 12 Meses</span>
            </button>

            <button
              onClick={() => setActiveTab('silhuetas')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'silhuetas'
                  ? 'gold-gradient-bg text-slate-950 shadow-md shadow-[#c5a059]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 shrink-0" />
              <span>👗 Silhuetas & Tecidos</span>
            </button>

            <button
              onClick={() => setActiveTab('sos')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sos'
                  ? 'gold-gradient-bg text-slate-950 shadow-md shadow-[#c5a059]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-rose-700" />
              <span>🧰 Kit SOS do Dia da Noiva</span>
            </button>

            <button
              onClick={() => setActiveTab('paletas')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'paletas'
                  ? 'gold-gradient-bg text-slate-950 shadow-md shadow-[#c5a059]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5 shrink-0" />
              <span>🌿 15 Paletas</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('imprimir');
                setTimeout(() => window.print(), 300);
              }}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#8c6732] shrink-0" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ABA 1: PLANNER 12 MESES & CHECKLIST DO VESTIDO */}
        {/* ============================================================== */}
        {activeTab === 'planner' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Strategic Highlight Banner: O Vestido não deve ficar para a última hora */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-[#c5a059]/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

              <div className="relative z-10 space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dica de Ouro de Quem Entende</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F5EE] leading-tight">
                  O Vestido de Noiva não deve ficar para a última hora 👰✨
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  O vestido influencia absolutamente tudo: sapatos, véu, penteado, maquiagem, buquê e até o estilo da decoração e das fotos. 
                  Quanto mais cedo você conhecer os modelos do ateliê e definir sua silhueta, mais calma e segura você viverá todos os outros meses de planejamento.
                </p>

                {/* Checklist Específico do Vestido */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                    Checklist Especial da Escolha do seu Vestido:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DRESS_CHECKLIST.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleTask(item.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          checkedTasks[item.id]
                            ? 'bg-amber-500/15 border-amber-400/40 text-amber-200 line-through'
                            : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            checkedTasks[item.id]
                              ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold'
                              : 'border-slate-600 bg-slate-800'
                          }`}
                        >
                          {checkedTasks[item.id] && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs leading-snug">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Big Direct CTA Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleScheduleFitting()}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl gold-gradient-bg text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-[#c5a059]/30 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>QUERO CONHECER OS VESTIDOS NO ATELIÊ</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] text-slate-400 text-center sm:text-left">
                    Atendimento com hora marcada e assessoria de imagem para sua prova
                  </span>
                </div>
              </div>
            </div>

            {/* 12 Months Timeline Accordion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Cronograma Mês a Mês (12 Meses até o Altar)
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Clique nas caixinhas para marcar suas tarefas
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {PLANNER_PHASES.map((phase) => (
                  <div
                    key={phase.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c5a059]/20 shadow-sm hover:border-[#c5a059]/40 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full gold-gradient-bg text-slate-950 font-bold text-xs">
                          {phase.period}
                        </span>
                        <h4 className="text-base font-serif font-bold text-slate-900">
                          {phase.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500">{phase.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {phase.tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            checkedTasks[task.id]
                              ? 'bg-amber-50/60 border-amber-200 text-slate-400 line-through'
                              : task.important
                              ? 'bg-[#FAF8F5] border-[#c5a059]/30 text-slate-800 hover:border-[#c5a059]'
                              : 'bg-white border-slate-100 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                              checkedTasks[task.id]
                                ? 'bg-[#c5a059] border-[#c5a059] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {checkedTasks[task.id] && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="flex-1">
                            <span className="text-xs leading-snug">{task.text}</span>
                            {task.important && !checkedTasks[task.id] && (
                              <span className="block text-[10px] text-[#8c6732] font-semibold mt-0.5">
                                ★ Prioridade Recomendada
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 2: GUIA DE SILHUETAS & TECIDOS NOBRES */}
        {/* ============================================================== */}
        {activeTab === 'silhuetas' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Introdução Consultoria */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c5a059]/30 silk-shadow space-y-4">
              <div className="flex items-center gap-2 text-[#8c6732] text-xs font-bold uppercase tracking-wider">
                <Scissors className="w-4 h-4 text-[#c5a059]" />
                <span>Consultoria de Alta Costura</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Qual o Vestido Ideal para a sua Silhueta? ✨
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-3xl">
                Cada noiva possui uma beleza singular. Conheça as 5 principais silhuetas da alta costura, entenda como cada uma valoriza o seu corpo e veja quais tecidos nobres trazem o caimento perfeito.
              </p>

              {/* Seletor de Silhuetas */}
              <div className="flex flex-wrap gap-2 pt-2">
                {DRESS_SILHOUETTES.map((sil) => (
                  <button
                    key={sil.id}
                    onClick={() => setSelectedSilhouette(sil)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      selectedSilhouette.id === sil.id
                        ? 'gold-gradient-bg text-slate-950 shadow-md shadow-[#c5a059]/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{sil.icon}</span>
                    <span>{sil.name}</span>
                  </button>
                ))}
              </div>

              {/* Detalhe da Silhueta Selecionada */}
              <div className="mt-6 p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/40 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6732]">
                      {selectedSilhouette.tag}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      {selectedSilhouette.name}
                    </h3>
                    <p className="text-xs text-slate-600 italic">{selectedSilhouette.subtitle}</p>
                  </div>
                  <button
                    onClick={() => handleScheduleFitting(`Olá! Vi no Guia o modelo *${selectedSilhouette.name}* e gostaria de experimentar vestidos com esse corte no Ateliê Pretinha!`)}
                    className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-sm hover:brightness-105 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    Provar esse Modelo no Ateliê
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3">
                    <div>
                      <strong className="block text-slate-800 mb-1">👗 Como se comporta no corpo:</strong>
                      <p className="text-slate-600 leading-relaxed font-light">{selectedSilhouette.description}</p>
                    </div>
                    <div>
                      <strong className="block text-slate-800 mb-1">✨ Por que valoriza você:</strong>
                      <p className="text-slate-600 leading-relaxed font-light">{selectedSilhouette.bestForBody}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <strong className="block text-slate-800 mb-1">📍 Cenários e Locais recomendados:</strong>
                      <p className="text-slate-600 leading-relaxed font-light">{selectedSilhouette.recommendedVenues}</p>
                    </div>
                    <div>
                      <strong className="block text-slate-800 mb-1">🧵 Tecidos Nobres que dão o caimento:</strong>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedSilhouette.recommendedFabrics.map((fab, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-lg bg-white border border-amber-200 text-slate-700 text-[11px]">
                            {fab}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong className="block text-slate-800 mb-1">💎 Decotes que mais combinam:</strong>
                      <p className="text-slate-600 leading-relaxed font-light">{selectedSilhouette.necklineTips}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chamada para Prova no Ateliê */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-[#c5a059]/40 text-center space-y-3">
              <h3 className="text-xl font-serif font-bold text-amber-300">
                Gostaria de experimentar essas silhuetas no seu corpo? ✨
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                No <strong>Atelier Pretinha Costureira</strong>, realizamos uma assessoria personalizada com você para testar tecidos, cortes e decotes no espelho, com calma e privacidade.
              </p>
              <button
                onClick={() => handleScheduleFitting()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl gold-gradient-bg text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:brightness-105 transition-all cursor-pointer"
              >
                <span>Agendar Prova Personalizada</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 3: KIT SOS DO DIA DA NOIVA (NOVO MÓDULO EXCLUSIVO) */}
        {/* ============================================================== */}
        {activeTab === 'sos' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c5a059]/30 silk-shadow space-y-4">
              <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Tranquilidade & Segurança da Noiva</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                🧰 Kit SOS do Dia da Noiva (O que levar para a Suíte)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-3xl">
                O dia do casamento é repleto de emoções. Para garantir que nada tire sua paz, reunimos os 10 itens indispensáveis que toda noiva prevenida deve ter na bolsa durante os preparativos:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {NOIVA_SOS_KIT.map((sos, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 flex items-start gap-3 hover:border-[#c5a059]/50 transition-all">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#8c6732] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <strong className="text-xs text-slate-900 block leading-tight">{sos.item}</strong>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">{sos.reason}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dica da Costureira */}
              <div className="mt-6 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    👰 Dica de Quem Cuida do seu Vestido:
                  </h4>
                  <p className="text-xs text-slate-700 font-light max-w-xl">
                    No Atelier Pretinha, entregamos seu vestido passado, vaporizado e embalado em capa protetora especial para viagem, pronto para o seu momento de brilhar!
                  </p>
                </div>
                <button
                  onClick={() => handleScheduleFitting()}
                  className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shrink-0 shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  Falar com a Costureira
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 4: GUIA COM 15 PALETAS DE CORES */}
        {/* ============================================================== */}
        {activeTab === 'paletas' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Guide Explanatory Card: Como Escolher */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c5a059]/30 silk-shadow space-y-4">
              <div className="flex items-center gap-2 text-[#8c6732] text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Guia Didático do Ateliê</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Como Escolher a Cor das Madrinhas e Padrinhos com Harmonia?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>1. Pense no Horário</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    <strong>Dia / Pôr do Sol:</strong> Tons suaves, pastéis e terrosos claros (Sage, Serenity, Rosé, Amarelo Manteiga, Areia).<br />
                    <strong>Noite / Igreja:</strong> Cores profundas e imponentes (Marsala, Esmeralda, Azul Marinho, Preto Black Tie).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/50 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>2. Pense no Local</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    <strong>Praia:</strong> Azul serenity, areia, rosé, pêssego.<br />
                    <strong>Campo:</strong> Sage, oliva, terracota, lavanda, canela.<br />
                    <strong>Salão / Catedral:</strong> Marsala, esmeralda, marinho, fúcsia.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/50 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-800 font-bold text-sm">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <span>3. Não precisa ser idêntico</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Você pode escolher uma <strong>paleta com variação de tons</strong> (degradê) ou a mesma cor com <strong>modelos e cortes livres</strong> para valorizar cada tipo de corpo.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-700">
                <span className="w-full sm:w-auto mb-1 sm:mb-0">Filtrar por Local:</span>
                {(['todos', 'campo', 'praia', 'salao'] as const).map((venue) => (
                  <button
                    key={venue}
                    onClick={() => setSelectedVenueFilter(venue)}
                    className={`px-3 py-1.5 rounded-xl text-xs capitalize transition-all cursor-pointer ${
                      selectedVenueFilter === venue
                        ? 'gold-gradient-bg text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {venue === 'todos' ? 'Todos os Locais' : venue === 'salao' ? 'Salão / Igreja' : venue}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-400">
                Mostrando {filteredPalettes.length} paletas
              </span>
            </div>

            {/* 15 Palettes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className="rounded-3xl bg-white border border-[#c5a059]/20 shadow-sm hover:shadow-xl hover:border-[#c5a059]/50 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    {/* Palette Title & Style */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6732]">
                          {palette.style}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                          {palette.bestForVenue}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#8c6732] transition-colors">
                        {palette.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        {palette.description}
                      </p>
                    </div>

                    {/* Color Swatches */}
                    <div className="space-y-2 pt-2">
                      <div className="grid grid-cols-4 gap-2">
                        {palette.colors.map((c, i) => (
                          <div key={i} className="space-y-1 text-center">
                            <div
                              className="w-full h-12 rounded-xl shadow-inner border border-black/10 flex items-center justify-center text-xs"
                              style={{ backgroundColor: c.hex }}
                              title={`${c.name} (${c.hex})`}
                            >
                              <span className="drop-shadow-sm">{c.icon}</span>
                            </div>
                            <span className="block text-[10px] font-medium text-slate-700 truncate">
                              {c.name}
                            </span>
                            <span className="block text-[9px] text-slate-400 font-mono">
                              {c.hex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dress Model Suggestion */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-800">Sugestão de Modelo: </span>
                      {palette.dressSuggestion}
                    </div>
                  </div>

                  {/* Card Footer with Direct WhatsApp Bridge */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100">
                    <button
                      onClick={() => handleScheduleFitting(palette.whatsappMessage)}
                      className="w-full py-2.5 px-4 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Ver vestidos nesta cor no Ateliê</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Bridge to Fitting */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-[#c5a059]/30 text-center space-y-3">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Encontrou sua paleta dos sonhos? ✨
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                No <strong>Atelier Pretinha Costureira</strong>, ajudamos suas madrinhas a escolher vestidos impecáveis dentro da paleta que você escolheu, com ajustes sob medida.
              </p>
              <button
                onClick={() => handleScheduleFitting()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl gold-gradient-bg text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:brightness-105 transition-all cursor-pointer"
              >
                <span>Falar com o Ateliê no WhatsApp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 5: VERSÃO PARA IMPRIMIR (FORMATADA A4) */}
        {/* ============================================================== */}
        {activeTab === 'imprimir' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Versão para Impressão em Folha A4
                </h3>
                <p className="text-xs text-slate-500">
                  Imprima o checklist completo para ter sempre à mão ou salvar como PDF no celular.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Agora</span>
              </button>
            </div>

            {/* Printable Content View */}
            <div className="space-y-6 text-slate-900">
              <div className="text-center space-y-1 pb-4 border-b">
                <p className="text-xs uppercase tracking-widest text-[#8c6732] font-bold">
                  Atelier Pretinha Costureira • Alta Costura & Locação
                </p>
                <h1 className="text-2xl font-serif font-bold">
                  Planner da Noiva — 12 Meses até o Altar
                </h1>
                <p className="text-xs text-slate-500">
                  Checklist oficial de casamento para: <strong>{lead.name}</strong> • Casamento: {lead.weddingDatePeriod}
                </p>
              </div>

              {/* Printable Atelier Invitation */}
              <div className="p-4 rounded-xl border-2 border-dashed border-[#c5a059] bg-amber-50/60 text-center space-y-1">
                <span className="text-xs uppercase font-bold text-[#8c6732] tracking-wider">
                  👑 CONVITE ESPECIAL: PROVA PERSONALIZADA NO ATELIÊ
                </span>
                <p className="text-xs text-slate-700">
                  Apresente este planner no Atelier Pretinha Costureira para sua consultoria de silhueta com a estilista.
                </p>
                <p className="text-[10px] text-slate-500">
                  WhatsApp: (83) 99614-6261 • Instagram: @ateliepretinhacostureira_
                </p>
              </div>

              {/* Special Dress Checklist on Print */}
              <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  👰 Checklist Especial do Vestido de Noiva:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {DRESS_CHECKLIST.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-slate-400 rounded inline-block" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12 Months Phases on Print */}
              <div className="space-y-4">
                {PLANNER_PHASES.map((p) => (
                  <div key={p.id} className="p-3 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold border-b pb-1">
                      <span>{p.period} — {p.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {p.tasks.map((t) => (
                        <div key={t.id} className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border border-slate-400 rounded inline-block" />
                          <span>{t.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4 border-t text-[11px] text-slate-500">
                Atelier Pretinha Costureira • WhatsApp: (83) 99614-6261 • Instagram: @ateliepretinhacostureira_
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Button */}
      <aside className="fixed bottom-6 right-6 z-50 no-print" aria-label="Atendimento Atelier Pretinha no WhatsApp">
        <button
          onClick={() => handleScheduleFitting()}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Crown className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">Agendar Prova no Ateliê</span>
          <span className="sm:hidden">Agendar Prova</span>
        </button>
      </aside>
    </div>
  );
};
