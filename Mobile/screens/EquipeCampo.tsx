import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,Image,StyleSheet,Alert,StatusBar,KeyboardAvoidingView,Platform,ImageSourcePropType,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
 
const tema = {
  fundo: '#FFFFFF',
  titulo: '#7A7A7A',
  texto: '#1F2933',
  textoSuave: '#7A7A7A',
  verdeAgua: '#3FB0A8',
  caixaFoto: '#D9D9D9',
  borda: '#D9DFE7',
  sucesso: '#2E9E5B',
};
 
type Ordem = {
  id: string;
  equipe: string;
  veiculo: string;
  endereco: string;
};
 
// TODO: trocar pela ordem recebida da API
const ORDEM_EXEMPLO: Ordem = {
  id: '154',
  equipe: 'ARB-03',
  veiculo: 'V-125',
  endereco: 'Rua Exemplo, 100 — Indaiatuba',
};
 
type Etapa = 'aguardando' | 'aceita' | 'no_local' | 'executando' | 'encerrada';
 
type Props = {
  ordem?: Ordem;
  nomeUsuario?: string;
  avatar?: ImageSourcePropType;
  onEncerrar?: (registro: Record<string, unknown>) => void;
};
 
function agora(): string {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
 
function paraNumero(texto: string): number {
  return Number(texto.replace(/\./g, '').replace(',', '.'));
}
 
export default function EquipCampo({
  ordem = ORDEM_EXEMPLO,
  nomeUsuario = 'Equipe',
  avatar,
  onEncerrar,
}: Props) {
  const [etapa, setEtapa] = useState<Etapa>('aguardando');
  const [kmInicial, setKmInicial] = useState('');
  const [horaChegada, setHoraChegada] = useState('');
  const [kmChegada, setKmChegada] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [servico, setServico] = useState('');
  const [fotoAntes, setFotoAntes] = useState<string | null>(null);
  const [fotoDepois, setFotoDepois] = useState<string | null>(null);
  const [kmFinal, setKmFinal] = useState('');
 
  async function tirarFoto(definir: (uri: string) => void) {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Câmera desativada', 'Permita o acesso à câmera para registrar a foto.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!res.canceled) definir(res.assets[0].uri);
  }
 
  function aceitarOrdem() {
    setEtapa('aceita');
  }
 
  function registrarChegada() {
    if (!kmInicial.trim() || isNaN(paraNumero(kmInicial))) {
      return Alert.alert('Falta o KM inicial', 'Informe o KM inicial do veículo.');
    }
    setHoraChegada(agora());
    setEtapa('no_local');
  }
 
  function iniciarExecucao() {
    const kmC = paraNumero(kmChegada);
    if (!kmChegada.trim() || isNaN(kmC)) {
      return Alert.alert('Falta o KM de chegada', 'Informe o KM do veículo ao chegar no local.');
    }
    if (kmC < paraNumero(kmInicial)) {
      return Alert.alert('KM inválido', 'O KM de chegada não pode ser menor que o KM inicial.');
    }
    setHoraInicio(agora());
    setEtapa('executando');
  }
 
  function encerrar() {
    const kmF = paraNumero(kmFinal);
    if (!servico.trim()) return Alert.alert('Falta a descrição', 'Descreva o serviço executado.');
    if (!fotoAntes) return Alert.alert('Falta a foto', 'Tire a foto do "antes".');
    if (!fotoDepois) return Alert.alert('Falta a foto', 'Tire a foto do "depois".');
    if (!kmFinal.trim() || isNaN(kmF)) return Alert.alert('Falta o KM final', 'Informe o KM final.');
    if (kmF < paraNumero(kmChegada)) {
      return Alert.alert('KM inválido', 'O KM final não pode ser menor que o KM de chegada.');
    }
 
    const registro = {
      ordem: ordem.id,
      equipe: ordem.equipe,
      veiculo: ordem.veiculo,
      kmInicial: paraNumero(kmInicial),
      horaChegada,
      kmChegada: paraNumero(kmChegada),
      horaInicio,
      servico,
      fotoAntes,
      fotoDepois,
      kmFinal: kmF,
      kmPercorridos: kmF - paraNumero(kmInicial),
      encerradoEm: new Date().toISOString(),
      status: 'Finalizado',
    };
 
    // TODO: enviar para a API/banco
    console.log('Ordem encerrada:', registro);
    onEncerrar?.(registro);
    setEtapa('encerrada');
  }
 
  const passou = (e: Etapa) => {
    const ordemEtapas: Etapa[] = ['aguardando', 'aceita', 'no_local', 'executando', 'encerrada'];
    return ordemEtapas.indexOf(etapa) >= ordemEtapas.indexOf(e);
  };
 
  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={tema.fundo} />
 
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <Text style={styles.saudacao}>
            Equipe{'\n'}de Campo
          </Text>
          {avatar ? (
            <Image source={avatar} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarVazio]}>
              <Text style={styles.avatarLetra}>{nomeUsuario.charAt(0)}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitulo}>Ordem de serviço #{ordem.id}</Text>
 
        {/* Equipe e local */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Equipe: {ordem.equipe}</Text>
          <Text style={styles.cardDescricao}>Veículo: {ordem.veiculo}</Text>
        </View>
 
        <Text style={styles.rotulo}>Local da ocorrência</Text>
        <Text style={styles.valor}>{ordem.endereco}</Text>
 
        {/* Etapa 1: aceitar */}
        {etapa === 'aguardando' && (
          <TouchableOpacity style={styles.botaoPrincipal} onPress={aceitarOrdem}>
            <Text style={styles.botaoPrincipalTexto}>Aceitar Ordem</Text>
          </TouchableOpacity>
        )}
 
        {/* Etapa 2: KM inicial + registrar chegada */}
        {passou('aceita') && (
          <>
            <Text style={styles.rotulo}>KM inicial</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 32.540"
              placeholderTextColor="#B5BAC1"
              keyboardType="numeric"
              value={kmInicial}
              onChangeText={setKmInicial}
              editable={etapa === 'aceita'}
            />
            {etapa === 'aceita' && (
              <TouchableOpacity style={styles.botaoPrincipal} onPress={registrarChegada}>
                <Text style={styles.botaoPrincipalTexto}>Registrar Chegada</Text>
              </TouchableOpacity>
            )}
          </>
        )}
 
        {/* Etapa 3: chegada + KM de chegada */}
        {passou('no_local') && (
          <>
            <Text style={styles.info}>Horário de chegada: {horaChegada}</Text>
            <Text style={styles.rotulo}>KM chegada</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 32.548"
              placeholderTextColor="#B5BAC1"
              keyboardType="numeric"
              value={kmChegada}
              onChangeText={setKmChegada}
              editable={etapa === 'no_local'}
            />
            {etapa === 'no_local' && (
              <TouchableOpacity style={styles.botaoPrincipal} onPress={iniciarExecucao}>
                <Text style={styles.botaoPrincipalTexto}>Iniciar Execução</Text>
              </TouchableOpacity>
            )}
          </>
        )}
 
        {/* Etapa 4: execução */}
        {passou('executando') && etapa !== 'encerrada' && (
          <>
            <Text style={styles.info}>Execução iniciada às {horaInicio}</Text>
 
            <Text style={styles.rotulo}>Serviço executado</Text>
            <TextInput
              style={styles.descricao}
              placeholder="Ex.: Buraco sinalizado e reparado."
              placeholderTextColor="#B5BAC1"
              multiline
              value={servico}
              onChangeText={setServico}
            />
 
            <Text style={styles.rotulo}>Fotos do serviço</Text>
            <View style={styles.linhaFotos}>
              <CaixaFoto
                titulo="Antes"
                uri={fotoAntes}
                onPress={() => tirarFoto(setFotoAntes)}
              />
              <View style={{ width: 12 }} />
              <CaixaFoto
                titulo="Depois"
                uri={fotoDepois}
                onPress={() => tirarFoto(setFotoDepois)}
              />
            </View>
 
            <Text style={styles.rotulo}>KM final</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 32.560"
              placeholderTextColor="#B5BAC1"
              keyboardType="numeric"
              value={kmFinal}
              onChangeText={setKmFinal}
            />
 
            <TouchableOpacity
              style={[styles.botaoPrincipal, { backgroundColor: tema.sucesso }]}
              onPress={encerrar}
            >
              <Text style={styles.botaoPrincipalTexto}>Encerrar Ocorrência</Text>
            </TouchableOpacity>
          </>
        )}
 
        {/* Etapa 5: encerrada */}
        {etapa === 'encerrada' && (
          <View style={styles.cartaoSucesso}>
            <Text style={styles.sucessoTitulo}>Ocorrência encerrada</Text>
            <Text style={styles.sucessoTexto}>
              Ordem #{ordem.id} finalizada. KM percorridos:{' '}
              {paraNumero(kmFinal) - paraNumero(kmInicial)}
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
function CaixaFoto({
  titulo,
  uri,
  onPress,
}: {
  titulo: string;
  uri: string | null;
  onPress: () => void;
}) {
  return (
    <View style={styles.caixaFoto}>
      {uri ? <Image source={{ uri }} style={styles.fotoImagem} /> : null}
      <TouchableOpacity
        style={[styles.pilula, uri ? styles.pilulaSobreFoto : null]}
        onPress={onPress}
      >
        <Text style={styles.pilulaTexto}>{uri ? `Refazer ${titulo}` : `Foto ${titulo}`}</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: tema.fundo },
  conteudo: { paddingHorizontal: 20, paddingTop: 64, paddingBottom: 40 },
 
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  saudacao: { fontSize: 30, fontWeight: '700', color: tema.titulo, lineHeight: 36 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  avatarVazio: {
    backgroundColor: tema.verdeAgua,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetra: { color: '#fff', fontSize: 20, fontWeight: '700' },
  subtitulo: { fontSize: 14, color: tema.textoSuave, marginTop: 12, marginBottom: 20 },
 
  card: {
    borderWidth: 1.5,
    borderColor: tema.verdeAgua,
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#fff',
  },
  cardTitulo: { fontSize: 15, fontWeight: '800', color: tema.texto },
  cardDescricao: { fontSize: 13, color: tema.textoSuave, marginTop: 4 },
 
  rotulo: { fontSize: 13, color: tema.textoSuave, marginTop: 22, marginBottom: 8 },
  valor: { fontSize: 14, color: tema.texto },
  info: { fontSize: 13, color: tema.texto, marginTop: 14 },
 
  input: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 12,
    fontSize: 14,
    color: tema.texto,
    backgroundColor: '#fff',
  },
  descricao: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 8,
    minHeight: 90,
    padding: 12,
    textAlignVertical: 'top',
    color: tema.texto,
    backgroundColor: '#fff',
  },
 
  linhaFotos: { flexDirection: 'row' },
  caixaFoto: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    backgroundColor: tema.caixaFoto,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fotoImagem: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  pilula: {
    backgroundColor: tema.verdeAgua,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  pilulaSobreFoto: { position: 'absolute', bottom: 8 },
  pilulaTexto: { color: '#fff', fontSize: 12, fontWeight: '600' },
 
  botaoPrincipal: {
    backgroundColor: tema.verdeAgua,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 20,
  },
  botaoPrincipalTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
 
  cartaoSucesso: {
    marginTop: 28,
    borderWidth: 1.5,
    borderColor: tema.sucesso,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  sucessoTitulo: { fontSize: 16, fontWeight: '800', color: tema.sucesso },
  sucessoTexto: { fontSize: 13, color: tema.texto, marginTop: 6, textAlign: 'center' },
});
