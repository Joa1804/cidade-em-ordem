import React, { useState } from 'react';

import Login from './components/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import CentralOcorrencia from './components/CentralOcorrencia.jsx';
import DashboardGerencial from './components/DashboardGerencial.jsx';

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [tela, setTela] = useState('gerencial');

  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />;
  }

  return (
    <div className="app-shell">
      <Sidebar telaAtiva={tela} onNavigate={setTela} />
      <main className="main-content">
        {tela === 'gerencial'
          ? <DashboardGerencial />
          : <CentralOcorrencia />}
      </main>
    </div>
  );
}