'use client';

import React, { useState, useEffect } from 'react';
import { Users, Phone, Calendar, Heart, Download, RefreshCw, ArrowLeft, MessageCircle, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  phone: string;
  weddingDatePeriod: string;
  dressStatus: string;
  materialChoice: string;
  createdAt: string;
}

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lead');
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error('Error fetching leads:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  );

  const getDressStatusBadge = (status: string) => {
    switch (status) {
      case 'escolhido':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">Já escolheu</span>;
      case 'pesquisando':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">Pesquisando</span>;
      case 'nao_comecei':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800">Não começou</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  const getWeddingPeriodText = (p: string) => {
    switch (p) {
      case '3m': return 'Próximos 3 meses (Urgente)';
      case '6m': return 'De 3 a 6 meses';
      case '9m': return 'De 6 a 9 meses';
      case '12m': return 'De 9 a 12 meses';
      case '+12m': return 'Mais de 12 meses';
      case 'definindo': return 'Ainda definindo';
      default: return p;
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const BOM = '\uFEFF';
    const header = ['Nome', 'WhatsApp', 'Data Casamento', 'Status Vestido', 'Material', 'Data Cadastro'].join(';');
    const rows = leads.map((l) => [
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${getWeddingPeriodText(l.weddingDatePeriod)}"`,
      `"${l.dressStatus}"`,
      `"${l.materialChoice}"`,
      `"${new Date(l.createdAt).toLocaleDateString('pt-BR')} ${new Date(l.createdAt).toLocaleTimeString('pt-BR')}"`
    ].join(';'));
    const content = BOM + [header, ...rows].join('\r\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads_noivas_pretinha_${Date.now()}.csv`;
    link.click();
  };

  const handleOpenWhatsApp = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const phoneWithDDI = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const msg = `Olá, ${lead.name}! Tudo bem? ✨ Aqui é do Ateliê Pretinha Costureira! Vi que você baixou o nosso Kit da Noiva para organizar seu casamento. Gostaria de saber se você já conheceu os vestidos da nossa coleção para o seu grande dia? 💕`;
    window.open(`https://wa.me/${phoneWithDDI}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#c5a059]/20">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#8c6732] hover:underline font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para o Kit da Noiva</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Painel de Leads • Noivas Cadastradas 💍
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Contatos gerados pelos anúncios do Kit da Noiva para você atender e agendar provas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>
            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Excel / CSV</span>
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#c5a059]/20 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total de Noivas Cadastradas</span>
            <p className="text-2xl font-serif font-bold text-slate-900">{leads.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#c5a059]/20 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-medium">Em Busca de Vestido</span>
            <p className="text-2xl font-serif font-bold text-[#8c6732]">
              {leads.filter((l) => l.dressStatus === 'pesquisando' || l.dressStatus === 'nao_comecei').length}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#c5a059]/20 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-medium">Casamento Próximo (até 6m)</span>
            <p className="text-2xl font-serif font-bold text-emerald-700">
              {leads.filter((l) => l.weddingDatePeriod === '3m' || l.weddingDatePeriod === '6m').length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar noiva por nome ou WhatsApp..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400">
              Carregando contatos...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Users className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Nenhum cadastro encontrado</p>
              <p className="text-xs text-slate-400">
                Assim que as primeiras noivas preencherem o formulário nos anúncios, elas aparecerão aqui!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-3.5">Noiva</th>
                    <th className="px-6 py-3.5">WhatsApp</th>
                    <th className="px-6 py-3.5">Casamento</th>
                    <th className="px-6 py-3.5">Status Vestido</th>
                    <th className="px-6 py-3.5">Data Cadastro</th>
                    <th className="px-6 py-3.5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((l) => (
                    <tr key={l.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {l.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-mono">
                        {l.phone}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {getWeddingPeriodText(l.weddingDatePeriod)}
                      </td>
                      <td className="px-6 py-4">
                        {getDressStatusBadge(l.dressStatus)}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-[11px]">
                        {new Date(l.createdAt).toLocaleDateString('pt-BR')} às {new Date(l.createdAt).toLocaleTimeString('pt-BR').slice(0, 5)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenWhatsApp(l)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chamar no WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
