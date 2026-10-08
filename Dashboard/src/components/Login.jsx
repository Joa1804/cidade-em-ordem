import { useState } from 'react';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // Demonstração: autenticação simulada, sem validação em servidor.
    onLogin();
  }

  return (
    <div className="login-page">
      <div className="login-card card border-0 shadow-lg">
        <div className="login-brand">
          <div className="brand-mark"><i className="bi bi-geo-alt-fill" /></div>
          <span>GESTÃO URBANA</span>
        </div>
        <h1 className="h3 fw-bold mt-4 mb-2">Bem-vindo de volta</h1>
        <p className="text-secondary mb-4">Entre para acessar a central de operações.</p>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="usuario">E-mail ou usuário</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-person" /></span>
            <input id="usuario" className="form-control" type="text" placeholder="seu.usuario" value={usuario} onChange={e => setUsuario(e.target.value)} required autoComplete="username" />
          </div>
          <label className="form-label" htmlFor="senha">Senha</label>
          <div className="input-group mb-4">
            <span className="input-group-text"><i className="bi bi-lock" /></span>
            <input id="senha" className="form-control" type={mostrarSenha ? 'text' : 'password'} placeholder="Digite sua senha" value={senha} onChange={e => setSenha(e.target.value)} required autoComplete="current-password" />
            <button className="btn btn-outline-secondary" type="button" aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setMostrarSenha(!mostrarSenha)}><i className={`bi ${mostrarSenha ? 'bi-eye-slash' : 'bi-eye'}`} /></button>
          </div>
          <button className="btn btn-dark w-100 py-2" type="submit">Entrar <i className="bi bi-arrow-right ms-2" /></button>
        </form>
        <div className="login-footer"><i className="bi bi-shield-check me-1" /> Acesso ao ambiente de gestão</div>
      </div>
      <div className="login-caption">CENTRAL DE OCORRÊNCIAS <span>•</span> INDAIATUBA / SP</div>
    </div>
  );
}