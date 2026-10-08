import React from 'react';

import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';

const ocorrencias = [
  { pos: [-23.087, -47.218], tipo: 'Árvore caída', status: 'Em atendimento', cor: '#ef6461' },
  { pos: [-23.094, -47.205], tipo: 'Buraco na via', status: 'Pendente', cor: '#f3b61f' },
  { pos: [-23.101, -47.224], tipo: 'Iluminação pública', status: 'Aberta', cor: '#f3b61f' },
  { pos: [-23.078, -47.196], tipo: 'Sinalização danificada', status: 'Aberta', cor: '#f3b61f' },
  { pos: [-23.112, -47.208], tipo: 'Descarte irregular', status: 'Em atendimento', cor: '#ef6461' },
  { pos: [-23.084, -47.238], tipo: 'Manutenção viária', status: 'Pendente', cor: '#f3b61f' },
  { pos: [-23.118, -47.232], tipo: 'Iluminação pública', status: 'Aberta', cor: '#f3b61f' },
  { pos: [-23.069, -47.226], tipo: 'Árvore caída', status: 'Aberta', cor: '#ef6461' },
  { pos: [-23.105, -47.188], tipo: 'Buraco na via', status: 'Pendente', cor: '#f3b61f' },
];

export default function MapPanel({ compact = false }) {
  return (
    <section className={`map-panel ${compact ? 'map-panel-compact' : ''}`} aria-label="Mapa de ocorrências em Indaiatuba">
      <div className="map-floating-label"><i className="bi bi-geo-alt-fill me-2" />Indaiatuba, SP <span className="map-live"><span /> AO VIVO</span></div>
      <MapContainer center={[-23.088, -47.215]} zoom={compact ? 12 : 12} scrollWheelZoom={true} zoomControl={false} className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {ocorrencias.map((item, index) => (
          <CircleMarker key={index} center={item.pos} radius={7} pathOptions={{ color: '#ffffff', weight: 2, fillColor: item.cor, fillOpacity: 1 }}>
            <Popup><strong>{item.tipo}</strong><br />Status: {item.status}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="map-legend">
        <span><i className="legend-dot red" />Em atendimento</span>
        <span><i className="legend-dot yellow" />Aberta / pendente</span>
      </div>
    </section>
  );
}