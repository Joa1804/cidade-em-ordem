import React from 'react';

import MapPanel from './MapPanel.jsx';

const priorities = [
  { label: 'P1', count: '8', text: 'Crítica', tone: 'priority-p1' },
  { label: 'P2', count: '21', text: 'Alta', tone: 'priority-p2' },
  { label: 'P3', count: '64', text: 'Média', tone: 'priority-p3' },
  { label: 'P4', count: '103', text: 'Baixa', tone: 'priority-p4' },
];
const calls = [
  { priority: 'P1', title: 'Árvore caída', sla: '00:18', area: 'Jardim Morada do Sol', tone: 'p1', icon: 'bi-tree-fill' },
  { priority: 'P2', title: 'Buraco na via', sla: '01:42', area: 'Cidade Nova', tone: 'p2', icon: 'bi-cone-striped' },
  { priority: 'P3', title: 'Iluminação', sla: '06:20', area: 'Vila Todos os Santos', tone: 'p3', icon: 'bi-lightbulb-fill' },
];

export default function CentralOcorrencia() {
  return (
    <div className="central-page">
      <header className="page-header">
        <div><div className="eyebrow">OPERAÇÃO DE CAMPO</div><h1>Central de Ocorrências</h1><p>Priorize chamados e acompanhe sua localização no município.</p></div>
        <button className="btn btn-dark add-occurrence" type="button" onClick={() => alert('Demonstração: conecte este botão ao formulário de abertura de ocorrência.')}><i className="bi bi-plus-lg me-2" />Nova ocorrência</button>
      </header>
      <div className="row g-3 priority-row">
        {priorities.map(p => (
          <div className="col-6 col-xl-3" key={p.label}>
            <article className="priority-card card border-0 shadow-sm">
              <div className={`priority-bar ${p.tone}`} />
              <div className="priority-card-content"><div className="d-flex justify-content-between align-items-start"><span className={`priority-pill ${p.tone}`}>{p.label}</span><i className="bi bi-arrow-up-right priority-arrow" /></div><div className="priority-count">{p.count}</div><div className="priority-description">Ocorrências <span>• {p.text}</span></div></div>
            </article>
          </div>
        ))}
      </div>
      <section className="central-map-section">
        <div className="section-heading"><div><h2>Mapa de ocorrências</h2><p>Localização dos chamados ativos em Indaiatuba / SP</p></div><div className="map-filter"><i className="bi bi-funnel me-2" />Todas as prioridades <i className="bi bi-chevron-down ms-2" /></div></div>
        <MapPanel compact />
      </section>
      <section className="active-calls-section">
        <div className="section-heading"><div><h2>Ocorrências prioritárias</h2><p>Chamados que exigem acompanhamento</p></div><button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => alert('Demonstração: lista completa de ocorrências.')}>Ver todas <i className="bi bi-arrow-right ms-1" /></button></div>
        <div className="row g-3">
          {calls.map(call => (
            <div className="col-12 col-lg-4" key={call.title}>
              <article className="call-card card border-0 shadow-sm h-100">
                <div className="call-card-top"><div className={`call-icon ${call.tone}`}><i className={`bi ${call.icon}`} /></div><span className={`priority-pill ${call.tone}`}>{call.priority}</span><button className="btn btn-sm call-more" aria-label={`Mais opções para ${call.title}`}><i className="bi bi-three-dots-vertical" /></button></div>
                <h3>{call.title}</h3><div className="call-area"><i className="bi bi-geo-alt me-1" />{call.area}</div>
                <div className="call-card-bottom"><div><span className="call-sla-label">SLA decorrido</span><strong><i className="bi bi-clock me-1" />{call.sla}</strong></div><span className={`call-status ${call.tone}`}>Em aberto</span></div>
              </article>
            </div>
          ))}
        </div>
      </section>
      <footer className="page-footer">© 2026 Gestão Urbana <span>•</span> Central de operações</footer>
    </div>
  );
}