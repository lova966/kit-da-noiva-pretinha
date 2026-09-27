'use client';

import React, { useState, useEffect } from 'react';
import { CaptureHero } from '@/components/CaptureHero';
import { InteractiveHub } from '@/components/InteractiveHub';
import { LeadFormData } from '@/types';
import { Sparkles, Heart, Crown, Shield, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const [lead, setLead] = useState<LeadFormData | null>(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
    try {
      const savedLead = localStorage.getItem('pretinha_kit_noiva_lead');
      if (savedLead) {
        setLead(JSON.parse(savedLead));
      }
    } catch {}
  }, []);

  const handleLeadCaptured = (newLead: LeadFormData) => {
    setLead(newLead);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('pretinha_kit_noiva_lead');
    } catch {}
    setLead(null);
  };

  if (!isClientLoaded) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#c5a059] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col justify-between selection:bg-[#c5a059]/20 selection:text-[#8c6732]">
      {/* If lead is filled, show Interactive Hub; else show Capture Page */}
      {lead ? (
        <InteractiveHub lead={lead} onReset={handleReset} />
      ) : (
        <div>
          {/* Top Navbar */}
          <header className="border-b border-[#c5a059]/20 bg-white/80 backdrop-blur-md sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9A7A4A] via-[#E8D4A8] to-[#9A7A4A] p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
                    AP
                  </div>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8c6732]">
                    Ateliê
                  </span>
                  <h2 className="text-xs sm:text-sm font-serif font-bold text-slate-900 leading-tight">
                    Pretinha Costureira
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <a
                  href="https://www.instagram.com/ateliepretinhacostureira_/"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-[#8c6732] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#c5a059]" />
                  <span>@ateliepretinhacostureira_</span>
                </a>
              </div>
            </div>
          </header>

          {/* Hero & Lead Capture Form */}
          <CaptureHero onLeadCaptured={handleLeadCaptured} />

          {/* Authority & Trust Section */}
          <section className="py-12 bg-white border-y border-[#c5a059]/20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#8c6732] text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Por que criamos esse Kit Gratuito?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Mais de 10 anos vestindo momentos inesquecíveis ✨
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
                No Ateliê Pretinha Costureira, sabemos que o vestido de noiva é a peça mais emocionante da sua vida. 
                Criamos este planner e guia de paletas para ajudar cada noiva a viver o processo com leveza, sem correrias e com a certeza de que tudo sairá perfeito.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#c5a059]/20 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-[#8c6732] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Cronograma Realista</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sem excesso de regras desnecessárias. Apenas as etapas essenciais que realmente importam.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#c5a059]/20 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-[#8c6732] flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Paletas Comprovadas</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Cores testadas que ficam deslumbrantes tanto na luz do dia quanto em fotos sob iluminação de festa.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#c5a059]/20 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-[#8c6732] flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Apoio com Especialistas</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Você pode tirar dúvidas e agendar uma consultoria de vestidos com a nossa equipe a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Perguntas Frequentes
              </h2>
              <p className="text-xs text-slate-500">
                Tudo o que você precisa saber sobre o Kit Gratuito
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'O Kit é realmente 100% gratuito?',
                  a: 'Sim! Você não paga nada para acessar o planner interativo, navegar pelas 15 paletas de cores e nem para baixar a versão em PDF para imprimir.',
                },
                {
                  q: 'Como vou receber o material?',
                  a: 'Assim que você preencher seu nome e WhatsApp, a tela do Kit se abre imediatamente no seu celular ou computador, com as tarefas interativas e o gerador de PDF.',
                },
                {
                  q: 'Posso compartilhar as paletas com minhas madrinhas?',
                  a: 'Com certeza! Você pode tirar print, enviar os nomes e referências das cores direto no grupo das suas madrinhas no WhatsApp.',
                },
                {
                  q: 'Como funciona para provar os vestidos no ateliê?',
                  a: 'Dentro do Kit você encontra um botão direto para o nosso WhatsApp. Basta escolher o melhor dia e horário para vir ao ateliê com suas acompanhantes.',
                },
              ].map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-800">{faq.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 border-t border-[#c5a059]/20 text-center text-xs space-y-2 no-print">
        <p className="text-slate-300 font-serif font-bold text-sm">
          Ateliê Pretinha Costureira • Alta Costura & Locação de Vestidos
        </p>
        <p className="text-slate-500">
          CNPJ: 69.075.467/0001-05 • Todos os direitos reservados.
        </p>
        <div className="pt-2">
          <a
            href="/leads"
            className="text-[11px] text-slate-600 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
          >
            <span>Área Administrativa • Ver Leads</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
