import MapPanel from './MapPanel.jsx';

const metrics = [
  { label: 'Abertas', value: '246', icon: 'bi-inbox', tone: 'blue' },
  { label: 'Pendentes', value: '84', icon: 'bi-hourglass-split', tone: 'amber' },
  { label: 'Em atendimento', value: '57', icon: 'bi-tools', tone: 'violet' },
  { label: 'Finalizados', value: '107', icon: 'bi-check2-circle', tone: 'green' },
];
const kpis = [
  { label: 'SLA dentro do prazo', value: '91%', icon: 'bi-stopwatch' },
  { label: 'Tempo médio total', value: '4h 18m', icon: 'bi-clock-history' },
  { label: 'Tempo médio deslocamento', value: '32m', icon: 'bi-truck' },
  { label: 'Ocorrências duplicadas', value: '14%', icon: 'bi-copy' },
  { label: 'KM médio / ocorrência', value: '8,4 km', icon: 'bi-signpost-2' },
];

export default function DashboardGerencial() {
  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div><div className="eyebrow">VISÃO GERAL</div><h1>Dashboard Gerencial</h1><p>Acompanhe os indicadores e a operação em tempo real.</p></div>
        <div className="header-date"><i className="bi bi-calendar3 me-2" />Visão operacional <span className="header-separator">/</span> Indaiatuba</div>
      </header>
      <div className="row g-3 metric-row">
        {metrics.map((metric) => (
          <div className="col-6 col-xl-3" key={metric.label}>
            <article className="metric-card card border-0 shadow-sm h-100">
              <div className="metric-top"><div className={`metric-icon ${metric.tone}`}><i className={`bi ${metric.icon}`} /></div><span className="metric-trend"><i className="bi bi-arrow-up-right" /> Hoje</span></div>
              <div className="metric-value">{metric.value}</div><div className="metric-label">{metric.label}</div>
            </article>
          </div>
        ))}
      </div>
      <section className="dashboard-map-section">
        <div className="section-heading"><div><h2>Mapa de ocorrências</h2><p>Distribuição geográfica dos chamados registrados</p></div><span className="map-status"><span /> Monitoramento ativo</span></div>
        <div className="map-dashboard-layout">
          <MapPanel />
          <aside className="kpi-panel">
            <div className="kpi-panel-heading"><div><h3>Indicadores operacionais</h3><p>Desempenho consolidado</p></div><i className="bi bi-three-dots" /></div>
            {kpis.map((kpi, i) => (
              <div className="kpi-card" key={kpi.label}><div className="kpi-icon"><i className={`bi ${kpi.icon}`} /></div><div className="kpi-copy"><span>{kpi.label}</span><strong>{kpi.value}</strong></div>{i === 0 && <span className="kpi-good"><i className="bi bi-check2" /></span>}</div>
            ))}
            <div className="kpi-footnote"><i className="bi bi-info-circle me-2" />Indicadores ilustrativos para demonstração.</div>
          </aside>
        </div>
      </section>
      <footer className="page-footer">© 2026 Gestão Urbana <span>•</span> Painel gerencial de ocorrências</footer>
    </div>
  );
}