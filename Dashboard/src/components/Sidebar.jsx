
import React from 'react';

const links = [
  { id: 'gerencial', label: 'Dashboard Gerencial', icon: 'bi-speedometer2' },
  { id: 'central', label: 'Central de Ocorrência', icon: 'bi-geo' },
];

export default function Sidebar({ telaAtiva, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo"><i className="bi bi-broadcast-pin" /></div>
        <div><div className="sidebar-title">URB<span>AN</span></div><div className="sidebar-subtitle">GESTÃO DE OCORRÊNCIAS</div></div>
      </div>
      <div className="sidebar-section-label">MENU PRINCIPAL</div>
      <nav className="nav flex-column sidebar-nav" aria-label="Navegação principal">
        {links.map(link => (
          <button key={link.id} type="button" onClick={() => onNavigate(link.id)} className={`nav-link text-start ${telaAtiva === link.id ? 'active' : ''}`}>
            <i className={`bi ${link.icon}`} /><span>{link.label}</span>
            {telaAtiva === link.id && <i className="bi bi-chevron-right nav-chevron" />}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="online-dot" />
        <div><div className="small fw-semibold">Sistema operacional</div><div className="sidebar-muted">Todos os serviços ativos</div></div>
      </div>
    </aside>
  );
}