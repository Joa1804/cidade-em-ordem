import React, { useMemo, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,Alert,StatusBar,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
const tema = {
  fundo: '#FFFFFF',
  fundoSuave: '#F8F9FA',
  navbar: '#212529',
  titulo: '#7A7A7A',
  texto: '#1F2933',
  textoSuave: '#7A7A7A',
  verdeAgua: '#3FB0A8',
  borda: '#DEE2E6',
  placeholder: '#E3E6EA',
};
 
// Cores das prioridades e dos status (iguais ao PDF do projeto)
const COR_PRIORIDADE: Record<string, string> = {
  P1: '#D63B3B',
  P2: '#E8902B',
  P3: '#C9A227',
  P4: '#2E9E5B',
};
const COR_STATUS: Record<string, string> = {
  Aberta: '#155A96',
  Pendente: '#E8902B',
  'Em atendimento': '#D63B3B',
  Finalizada: '#2E9E5B',
};
 
const MENU = ['Dashboard', 'Ocorrências', 'Equipes', 'Relatórios'];
const PERIODOS = ['Hoje', 'Esta semana', 'Este mês'] as const;
type Periodo = (typeof PERIODOS)[number];
 
// TODO: trocar estes dados de exemplo pelos dados da API
const DADOS: Record<
  Periodo,
  {
    abertas: number;
    pendentes: number;
    atendimento: number;
    finalizadas: number;
    sla: string;
    tempo: string;
    grafico: { label: string; valor: number }[];
  }
> = {
  Hoje: {
    abertas: 24,
    pendentes: 9,
    atendimento: 6,
    finalizadas: 9,
    sla: '93%',
    tempo: '3h 40m',
    grafico: [
      { label: '6h', valor: 2 },
      { label: '9h', valor: 7 },
      { label: '12h', valor: 5 },
      { label: '15h', valor: 6 },
      { label: '18h', valor: 3 },
      { label: '21h', valor: 1 },
    ],
  },
  'Esta semana': {
    abertas: 246,
    pendentes: 84,
    atendimento: 57,
    finalizadas: 105,
    sla: '91%',
    tempo: '4h 18m',
    grafico: [
      { label: 'Seg', valor: 42 },
      { label: 'Ter', valor: 38 },
      { label: 'Qua', valor: 51 },
      { label: 'Qui', valor: 47 },
      { label: 'Sex', valor: 44 },
      { label: 'Sáb', valor: 18 },
      { label: 'Dom', valor: 6 },
    ],
  },
  'Este mês': {
    abertas: 982,
    pendentes: 301,
    atendimento: 214,
    finalizadas: 467,
    sla: '89%',
    tempo: '4h 52m',
    grafico: [
      { label: 'Sem 1', valor: 240 },
      { label: 'Sem 2', valor: 262 },
      { label: 'Sem 3', valor: 251 },
      { label: 'Sem 4', valor: 229 },
    ],
  },
};
 
const OCORRENCIAS = [
  { id: '154', categoria: 'Arborização', prioridade: 'P1', status: 'Em atendimento', sla: '00:18' },
  { id: '155', categoria: 'Vias e pavimento', prioridade: 'P2', status: 'Pendente', sla: '01:42' },
  { id: '156', categoria: 'Iluminação pública', prioridade: 'P3', status: 'Aberta', sla: '06:20' },
  { id: '157', categoria: 'Limpeza urbana', prioridade: 'P4', status: 'Aberta', sla: '48:00' },
  { id: '158', categoria: 'Drenagem', prioridade: 'P2', status: 'Pendente', sla: '02:15' },
  { id: '159', categoria: 'Sinalização', prioridade: 'P3', status: 'Finalizada', sla: '—' },
];
 
type Props = {
  onSair?: () => void;
};
 
export default function FuncionarioPublico({ onSair }: Props) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [secao, setSecao] = useState('Dashboard');
  const [periodo, setPeriodo] = useState<Periodo>('Esta semana');
  const [busca, setBusca] = useState('');
 
  const dados = DADOS[periodo];
  const maxGrafico = Math.max(...dados.grafico.map((g) => g.valor));
 
  const linhas = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return OCORRENCIAS;
    return OCORRENCIAS.filter(
      (o) =>
        o.id.includes(q) ||
        o.categoria.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q) ||
        o.prioridade.toLowerCase().includes(q)
    );
  }, [busca]);
 
  function trocarPeriodo() {
    const i = PERIODOS.indexOf(periodo);
    setPeriodo(PERIODOS[(i + 1) % PERIODOS.length]);
  }
 
  function aviso(acao: string) {
    // TODO: implementar compartilhar / exportar
    Alert.alert(acao, 'Ainda não implementado.');
  }
 
  return (
    <View style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor={tema.navbar} />
 
      {/* Navbar escura (como no exemplo do Bootstrap) */}
      <View style={styles.navbar}>
        <Text style={styles.marca}>Indaiatuba em Ordem</Text>
        <TouchableOpacity onPress={() => setMenuAberto((v) => !v)} hitSlop={10}>
          <Ionicons name={menuAberto ? 'close' : 'menu'} size={26} color="#fff" />
        </TouchableOpacity>
      </View>
 
      {/* Menu lateral (no celular vira um painel que abre pelo botão) */}
      {menuAberto ? (
        <View style={styles.menu}>
          {MENU.map((item) => {
            const ativo = item === secao;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.menuItem, ativo && styles.menuItemAtivo]}
                onPress={() => {
                  setSecao(item);
                  setMenuAberto(false);
                }}
              >
                <Text style={[styles.menuTexto, ativo && styles.menuTextoAtivo]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.menuItem} onPress={onSair}>
            <Text style={styles.menuTexto}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : null}
 
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        {/* Busca */}
        <TextInput
          style={styles.busca}
          placeholder="Buscar ocorrência"
          placeholderTextColor={tema.textoSuave}
          value={busca}
          onChangeText={setBusca}
        />
 
        {secao !== 'Dashboard' ? (
          <Text style={styles.emConstrucao}>{secao}: em construção.</Text>
        ) : (
          <>
            {/* Título + barra de ações */}
            <View style={styles.tituloLinha}>
              <Text style={styles.titulo}>Dashboard</Text>
            </View>
            <View style={styles.acoes}>
              <TouchableOpacity style={styles.botaoContorno} onPress={() => aviso('Compartilhar')}>
                <Text style={styles.botaoContornoTexto}>Compartilhar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoContorno} onPress={() => aviso('Exportar')}>
                <Text style={styles.botaoContornoTexto}>Exportar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoContorno} onPress={trocarPeriodo}>
                <Text style={styles.botaoContornoTexto}>{periodo} ▾</Text>
              </TouchableOpacity>
            </View>
 
            {/* Indicadores */}
            <View style={styles.grade}>
              <Kpi valor={dados.abertas} rotulo="Abertas" cor="#155A96" />
              <Kpi valor={dados.pendentes} rotulo="Pendentes" cor="#E8902B" />
              <Kpi valor={dados.atendimento} rotulo="Em atendimento" cor="#D63B3B" />
              <Kpi valor={dados.finalizadas} rotulo="Finalizadas" cor="#2E9E5B" />
              <Kpi valor={dados.sla} rotulo="SLA dentro do prazo" cor={tema.verdeAgua} />
              <Kpi valor={dados.tempo} rotulo="Tempo médio total" cor={tema.texto} />
            </View>
 
            {/* Gráfico de barras */}
            <Text style={styles.subtitulo}>Ocorrências registradas</Text>
            <View style={styles.grafico}>
              {dados.grafico.map((g) => (
                <View key={g.label} style={styles.barraColuna}>
                  <Text style={styles.barraValor}>{g.valor}</Text>
                  <View
                    style={[
                      styles.barra,
                      { height: Math.max(6, (g.valor / maxGrafico) * 120) },
                    ]}
                  />
                  <Text style={styles.barraRotulo}>{g.label}</Text>
                </View>
              ))}
            </View>
 
            {/* Tabela */}
            <Text style={styles.subtitulo}>Ocorrências</Text>
            <View style={styles.tabela}>
              <View style={[styles.linhaTabela, styles.cabecalhoTabela]}>
                <Text style={[styles.celula, styles.colId, styles.celulaCab]}>#</Text>
                <Text style={[styles.celula, styles.colCategoria, styles.celulaCab]}>Categoria</Text>
                <Text style={[styles.celula, styles.colPrior, styles.celulaCab]}>Prior.</Text>
                <Text style={[styles.celula, styles.colStatus, styles.celulaCab]}>Status</Text>
                <Text style={[styles.celula, styles.colSla, styles.celulaCab]}>SLA</Text>
              </View>
 
              {linhas.length === 0 ? (
                <Text style={styles.vazio}>Nenhuma ocorrência encontrada.</Text>
              ) : (
                linhas.map((o, i) => (
                  <View
                    key={o.id}
                    style={[styles.linhaTabela, i % 2 === 0 && { backgroundColor: tema.fundoSuave }]}
                  >
                    <Text style={[styles.celula, styles.colId]}>{o.id}</Text>
                    <Text style={[styles.celula, styles.colCategoria]}>{o.categoria}</Text>
                    <Text
                      style={[
                        styles.celula,
                        styles.colPrior,
                        { color: COR_PRIORIDADE[o.prioridade], fontWeight: '800' },
                      ]}
                    >
                      {o.prioridade}
                    </Text>
                    <Text
                      style={[
                        styles.celula,
                        styles.colStatus,
                        { color: COR_STATUS[o.status], fontWeight: '600' },
                      ]}
                    >
                      {o.status}
                    </Text>
                    <Text style={[styles.celula, styles.colSla]}>{o.sla}</Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
 
function Kpi({ valor, rotulo, cor }: { valor: number | string; rotulo: string; cor: string }) {
  return (
    <View style={styles.kpi}>
      <Text style={[styles.kpiValor, { color: cor }]}>{valor}</Text>
      <Text style={styles.kpiRotulo}>{rotulo}</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: tema.fundo },
 
  // Navbar e menu
  navbar: {
    backgroundColor: tema.navbar,
    paddingTop: 48,
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marca: { color: '#fff', fontSize: 16, fontWeight: '700' },
  menu: {
    backgroundColor: tema.fundoSuave,
    borderBottomWidth: 1,
    borderBottomColor: tema.borda,
    paddingVertical: 6,
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 20 },
  menuItemAtivo: { borderLeftWidth: 3, borderLeftColor: tema.verdeAgua, backgroundColor: '#fff' },
  menuTexto: { fontSize: 15, color: tema.texto },
  menuTextoAtivo: { color: tema.verdeAgua, fontWeight: '700' },
 
  conteudo: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  busca: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: tema.texto,
    backgroundColor: '#fff',
  },
  emConstrucao: { marginTop: 24, color: tema.textoSuave, fontSize: 14 },
 
  // Título e ações
  tituloLinha: {
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: tema.borda,
  },
  titulo: { fontSize: 28, fontWeight: '700', color: tema.titulo },
  acoes: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  botaoContorno: {
    borderWidth: 1,
    borderColor: '#ADB5BD',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  botaoContornoTexto: { fontSize: 13, color: '#495057' },
 
  // Indicadores
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8 },
  kpi: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  kpiValor: { fontSize: 24, fontWeight: '800' },
  kpiRotulo: { fontSize: 12, color: tema.textoSuave, marginTop: 2 },
 
  // Gráfico
  subtitulo: { fontSize: 20, fontWeight: '600', color: tema.titulo, marginTop: 20, marginBottom: 12 },
  grafico: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
  },
  barraColuna: { alignItems: 'center', flex: 1 },
  barra: { width: '55%', backgroundColor: tema.verdeAgua, borderRadius: 4 },
  barraValor: { fontSize: 11, color: tema.textoSuave, marginBottom: 4 },
  barraRotulo: { fontSize: 11, color: tema.textoSuave, marginTop: 6 },
 
  // Tabela
  tabela: { borderWidth: 1, borderColor: tema.borda, borderRadius: 8, overflow: 'hidden' },
  linhaTabela: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: tema.borda,
  },
  cabecalhoTabela: { backgroundColor: tema.fundoSuave },
  celula: { fontSize: 12, color: tema.texto },
  celulaCab: { fontWeight: '700' },
  colId: { width: 34 },
  colCategoria: { flex: 1.4 },
  colPrior: { width: 44 },
  colStatus: { flex: 1.2 },
  colSla: { width: 46, textAlign: 'right' },
  vazio: { padding: 16, color: tema.textoSuave, fontSize: 13 },
});
