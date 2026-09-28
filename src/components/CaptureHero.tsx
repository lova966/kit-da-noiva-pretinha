'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Heart, Palette, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Gift, Scissors, Calculator } from 'lucide-react';
import { LeadFormData } from '@/types';

interface CaptureHeroProps {
  onLeadCaptured: (data: LeadFormData) => void;
}

export const CaptureHero: React.FC<CaptureHeroProps> = ({ onLeadCaptured }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDatePeriod, setWeddingDatePeriod] = useState('6m');
  const [dressStatus, setDressStatus] = useState('pesquisando');
  const [materialChoice, setMaterialChoice] = useState('ambos');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Formata o WhatsApp automaticamente enquanto digita
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) {
      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
      v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else if (v.length > 0) {
      v = `(${v}`;
    }
    setPhone(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Por favor, digite seu nome.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Por favor, informe um WhatsApp válido com DDD.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload: LeadFormData = {
      name: name.trim(),
      phone: cleanPhone,
      weddingDatePeriod,
      dressStatus,
      materialChoice,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('API lead save warning (fallback to local):', err);
    }

    // Save lead in localStorage for immediate session persistence
    try {
      localStorage.setItem('pretinha_kit_noiva_lead', JSON.stringify(payload));
    } catch {}

    setIsSubmitting(false);
    onLeadCaptured(payload);
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background Decor Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#c5a059]/10 via-[#FAF8F5]/50 to-transparent pointer-events-none -z-10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto">
        {/* Top Header Badge */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#8c6732] text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Presente Exclusivo • Ateliê Pretinha Costureira</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
            Está planejando o seu casamento?{' '}
            <span className="block gold-gradient-text mt-1">
              Receba o Kit Completo da Noiva 2026/2027
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
            O checklist definitivo de <strong>12 meses até o altar</strong>, o <strong>Guia Visual com 15 Paletas de Cores</strong>, a <strong>Consultoria de Silhuetas & Tecidos</strong> e um <strong>Voucher de Cortesia Exclusivo</strong>.
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-sm">
              <Gift className="w-3.5 h-3.5 text-emerald-700" />
              <span>Valor Real Estimado: R$ 497,00 • Disponível 100% Gratuito</span>
            </span>
          </div>
        </div>

        {/* 4 Guides & Bonuses Highlight Card Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-8 max-w-5xl mx-auto">
          {/* Card 1: Planner */}
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#c5a059]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-[#c5a059]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6732]">Guia 01</span>
                <h3 className="text-sm font-serif font-bold text-slate-900">
                  Planner 12 Meses
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Cronograma mês a mês do que contratar e prazos para não estourar o orçamento.
              </p>
            </div>
          </div>

          {/* Card 2: Palettes */}
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#c5a059]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Guia 02</span>
                <h3 className="text-sm font-serif font-bold text-slate-900">
                  15 Paletas de Cores
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Combinações para madrinhas e padrinhos por horário e local (praia, campo ou igreja).
              </p>
            </div>
          </div>

          {/* Card 3: Silhouettes */}
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#c5a059]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center shrink-0 text-purple-600">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">Guia 03</span>
                <h3 className="text-sm font-serif font-bold text-slate-900">
                  Silhuetas & Tecidos
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Descubra qual corte e decote valorizam mais o seu corpo e veja o Kit SOS da Noiva.
              </p>
            </div>
          </div>

          {/* Card 4: VIP Voucher */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50 border-2 border-[#d4af37] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-900">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b02a37]">Bônus Especial</span>
                <h3 className="text-sm font-serif font-bold text-slate-900">
                  Voucher VIP R$ 300
                </h3>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Cortesia para usar no primeiro aluguel ou confecção sob medida no Atelier Pretinha!
              </p>
            </div>
          </div>
        </div>

        {/* Lead Capture Form Card */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#c5a059]/30 silk-shadow relative">
          <div className="text-center space-y-1.5 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-[#8c6732] text-[11px] font-bold">
              <span>🎁 Liberado Gratuitamente para Noivas de 2026 e 2027</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Acesse o Kit Completo em Segundos ✨
            </h2>
            <p className="text-xs text-slate-500">
              Acesse o hub interativo online e baixe a versão em PDF para imprimir
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Nome */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Seu Nome Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Beatriz Albuquerque"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Seu WhatsApp (com DDD)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(83) 99999-9999"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all"
              />
            </div>

            {/* Qualificação 1: Data do Casamento */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quando será seu casamento?
              </label>
              <select
                value={weddingDatePeriod}
                onChange={(e) => setWeddingDatePeriod(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all"
              >
                <option value="3m">💍 Próximos 3 meses (Reta Final!)</option>
                <option value="6m">✨ De 3 a 6 meses</option>
                <option value="9m">🌸 De 6 a 9 meses</option>
                <option value="12m">📅 De 9 a 12 meses</option>
                <option value="+12m">🕊️ Mais de 12 meses</option>
                <option value="definindo">🔍 Ainda definindo a data</option>
              </select>
            </div>

            {/* Qualificação 2: Status do Vestido */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Você já escolheu seu Vestido de Noiva?
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { id: 'escolhido', label: 'Já escolhi' },
                  { id: 'pesquisando', label: 'Pesquisando' },
                  { id: 'nao_comecei', label: 'Não comecei' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDressStatus(item.id)}
                    className={`py-2.5 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-medium border text-center transition-all cursor-pointer ${
                      dressStatus === item.id
                        ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#8c6732] font-bold shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Qualificação 3: Qual material quer */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Qual material você deseja receber?
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { id: 'ambos', label: '🎁 Kit Completo' },
                  { id: 'planner', label: '💍 Só Planner' },
                  { id: 'paletas', label: '🌿 Só Paletas' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMaterialChoice(item.id)}
                    className={`py-2.5 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs leading-tight font-medium border text-center transition-all cursor-pointer ${
                      materialChoice === item.id
                        ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#8c6732] font-bold shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl gold-gradient-bg text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-[#c5a059]/30 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Liberando seu Kit...</span>
                </>
              ) : (
                <>
                  <span>QUERO RECEBER MEU KIT GRATUITO</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Guarantee notice */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Gratuito e sem spam • Acesso imediato no celular</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
