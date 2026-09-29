'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Phone, 
  Calendar, 
  Heart, 
  Download, 
  RefreshCw, 
  ArrowLeft, 
  MessageCircle, 
  Search, 
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Sparkles,
  X
} from 'lucide-react';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [dataSource, setDataSource] = useState<string>('carregando...');

  // Form para cadastro manual
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newWeddingDate, setNewWeddingDate] = useState('6m');
  const [newDressStatus, setNewDressStatus] = useState('pesquisando');
  const [isAdding, setIsAdding] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lead', { cache: 'no-store' });
      const data = await res.json();
      
      let fetchedLeads: Lead[] = [];
      if (data.success && Array.isArray(data.leads)) {
        fetchedLeads = data.leads;
        setDataSource(data.source === 'cloud_database' ? 'Banco em Nuvem Conectado ☁️' : 'Armazenamento Local');
      }

      // Sincroniza com histórico local do navegador se houver algum lead offline
      try {
        const localHistoryRaw = localStorage.getItem('pretinha_all_leads_history');
        if (localHistoryRaw) {
          const localHistory: Lead[] = JSON.parse(localHistoryRaw);
          const map = new Map<string, Lead>();
          [...fetchedLeads, ...localHistory].forEach((l) => {
            const cleanPhone = (l.phone || '').replace(/\D/g, '');
            if (cleanPhone) map.set(cleanPhone, l);
          });
          fetchedLeads = Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          );
        }
      } catch {}

      setLeads(fetchedLeads);
    } catch (e) {
      console.error('Error fetching leads:', e);
      // Fallback para localStorage
      try {
        const saved = localStorage.getItem('pretinha_all_leads_history');
        if (saved) setLeads(JSON.parse(saved));
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    setIsAdding(true);
    const cleanPhone = newPhone.replace(/\D/g, '');
    const payload = {
      name: newName.trim(),
      phone: cleanPhone,
      weddingDatePeriod: newWeddingDate,
      dressStatus: newDressStatus,
      materialChoice: 'ambos',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      // Salva no localStorage também
      try {
        const historyRaw = localStorage.getItem('pretinha_all_leads_history');
        const history = historyRaw ? JSON.parse(historyRaw) : [];
        history.unshift(payload);
        localStorage.setItem('pretinha_all_leads_history', JSON.stringify(history));
      } catch {}

      setShowAddModal(false);
      setNewName('');
      setNewPhone('');
      await fetchLeads();
    } catch (err) {
      console.error('Erro ao adicionar lead:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  );

  const getDressStatusBadge = (status: string) => {
    switch (status) {
      case 'escolhido':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Já escolheu</span>;
      case 'pesquisando':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Pesquisando Vestido</span>;
      case 'nao_comecei':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">Não começou ainda</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{status}</span>;
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
    const msg = `Olá, ${lead.name}! Tudo bem? ✨ Aqui é do Atelier Pretinha Costureira! Vi que você acessou o nosso Kit da Noiva para organizar seu casamento. Gostaria de saber se você já conheceu os vestidos da nossa coleção para o seu grande dia? 💕`;
    window.open(`https://wa.me/${phoneWithDDI}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Métricas rápidas
  const totalLeads = leads.length;
  const urgentCount = leads.filter(l => l.weddingDatePeriod === '3m' || l.weddingDatePeriod === '6m').length;
  const researchingDress = leads.filter(l => l.dressStatus === 'pesquisando' || l.dressStatus === 'nao_comecei').length;

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
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Painel de Leads • Noivas Cadastradas 💍
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {dataSource}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Contatos das noivas que preencheram o Kit da Noiva para você atender e agendar provas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:brightness-105 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>+ Cadastrar Noiva</span>
            </button>
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
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#8c6732]" />
              <span>Exportar Excel</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#c5a059]/20 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#c5a059]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Total de Noivas</span>
              <h3 className="text-xl font-bold text-slate-900">{totalLeads}</h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#c5a059]/20 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Reta Final (&lt; 6 meses)</span>
              <h3 className="text-xl font-bold text-slate-900">{urgentCount}</h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#c5a059]/20 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Procurando Vestido</span>
              <h3 className="text-xl font-bold text-slate-900">{researchingDress}</h3>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome da noiva ou WhatsApp..."
            className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-xs text-slate-400 hover:text-slate-600">
              Limpar
            </button>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-[#c5a059]/20 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#c5a059] mx-auto" />
              <p className="text-xs text-slate-500">Conectando ao banco de dados em nuvem...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#c5a059] flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                {search ? 'Nenhuma noiva encontrada com este termo' : 'Nenhuma noiva cadastrada ainda'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {search 
                  ? 'Tente buscar com outro nome ou número de telefone.' 
                  : 'Assim que as noivas preencherem o formulário nos anúncios, elas aparecerão aqui automaticamente. Você também pode cadastrar manualmente acima!'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-slate-200 text-slate-600 text-[11px] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Noiva</th>
                    <th className="py-3.5 px-4">WhatsApp</th>
                    <th className="py-3.5 px-4">Casamento</th>
                    <th className="py-3.5 px-4">Status do Vestido</th>
                    <th className="py-3.5 px-4">Data do Cadastro</th>
                    <th className="py-3.5 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((l) => (
                    <tr key={l.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">
                        {l.name}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-700">
                        {l.phone}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-600">
                        {getWeddingPeriodText(l.weddingDatePeriod)}
                      </td>
                      <td className="py-4 px-4">
                        {getDressStatusBadge(l.dressStatus)}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-500">
                        {new Date(l.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleOpenWhatsApp(l)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chamar no Whats</span>
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

      {/* Modal de Cadastro Manual */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#c5a059]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Cadastrar Noiva Manualmente 👰
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome da Noiva
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Beatriz Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp (com DDD)
                </label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Ex: (83) 99999-9999"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Previsão do Casamento
                </label>
                <select
                  value={newWeddingDate}
                  onChange={(e) => setNewWeddingDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#c5a059]"
                >
                  <option value="3m">Próximos 3 meses (Urgente)</option>
                  <option value="6m">De 3 a 6 meses</option>
                  <option value="9m">De 6 a 9 meses</option>
                  <option value="12m">De 9 a 12 meses</option>
                  <option value="+12m">Mais de 12 meses</option>
                  <option value="definindo">Ainda definindo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status do Vestido
                </label>
                <select
                  value={newDressStatus}
                  onChange={(e) => setNewDressStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#c5a059]"
                >
                  <option value="pesquisando">Pesquisando Vestido</option>
                  <option value="nao_comecei">Não começou ainda</option>
                  <option value="escolhido">Já escolheu</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-5 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md hover:brightness-105 disabled:opacity-50"
                >
                  {isAdding ? 'Salvando...' : 'Salvar no Banco de Dados'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
