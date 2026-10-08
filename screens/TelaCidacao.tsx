import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const tema = {
  fundo: '#FFFFFF',
  titulo: '#7A7A7A',
  texto: '#1F2933',
  textoSuave: '#7A7A7A',
  verdeAgua: '#3FB0A8',
  caixaFoto: '#D9D9D9',
  borda: '#D9DFE7',
};

// Edite aqui a lista do "Tipo de problema"
const CATEGORIAS = [
  { id: 'vias', nome: 'Vias e pavimento' },
  { id: 'iluminacao', nome: 'Iluminação pública' },
  { id: 'arborizacao', nome: 'Arborização' },
  { id: 'limpeza', nome: 'Limpeza urbana' },
  { id: 'sinalizacao', nome: 'Sinalização' },
  { id: 'pracas', nome: 'Praças e áreas públicas' },
  { id: 'drenagem', nome: 'Drenagem' },
  { id: 'acessibilidade', nome: 'Acessibilidade' },
  { id: 'onibus', nome: 'Pontos de ônibus/ciclovias' },
  { id: 'patrimonio', nome: 'Patrimônio público' },
  { id: 'outros', nome: 'Outros' },
];

type Endereco = {
  cep: string;
  numero: string;
  estado: string;
  cidade: string;
  bairro: string;
};

const ENDERECO_VAZIO: Endereco = {
  cep: '',
  numero: '',
  estado: 'SP',
  cidade: 'Indaiatuba',
  bairro: '',
};

type Props = {
  nomeUsuario?: string;
  avatar?: ImageSourcePropType;
};

export default function NovoChamado({ nomeUsuario = 'Fulano', avatar }: Props) {
  const [foto, setFoto] = useState<string | null>(null);
  const [coord, setCoord] = useState<{ latitude: number; longitude: number } | null>(null);
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [descricao, setDescricao] = useState('');

  const [modalEndereco, setModalEndereco] = useState(false);
  const [rascunho, setRascunho] = useState<Endereco>(ENDERECO_VAZIO);
  const [modalTipo, setModalTipo] = useState(false);

  // Captura a localização (GPS) em segundo plano para enviar junto com o chamado
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const pos = await Location.getCurrentPositionAsync({});
      setCoord({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    })();
  }, []);

  async function tirarFoto() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Câmera desativada', 'Permita o acesso à câmera para anexar a foto.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!res.canceled) setFoto(res.assets[0].uri);
  }

  function abrirEndereco() {
    setRascunho(endereco ?? ENDERECO_VAZIO);
    setModalEndereco(true);
  }

  function confirmarEndereco() {
    if (!rascunho.cep.trim() || !rascunho.numero.trim() || !rascunho.bairro.trim()) {
      Alert.alert('Endereço incompleto', 'Preencha CEP, número e bairro.');
      return;
    }
    setEndereco(rascunho);
    setModalEndereco(false);
  }

  function enviar() {
    if (!foto) return Alert.alert('Falta a foto', 'Tire uma foto do problema.');
    if (!endereco) return Alert.alert('Falta o endereço', 'Toque em "Adicionar" e informe o local.');
    if (!categoria) return Alert.alert('Falta o tipo', 'Escolha o tipo de problema.');

    const protocolo = 'IND-' + new Date().getFullYear() + '-' + String(Date.now()).slice(-6);
    const ocorrencia = {
      protocolo,
      foto,
      categoria,
      descricao,
      endereco,
      latitude: coord?.latitude ?? null,
      longitude: coord?.longitude ?? null,
      status: 'Aberto',
      criadoEm: new Date().toISOString(),
    };

    // TODO: enviar para a API/banco
    console.log('Ocorrência criada:', ocorrencia);
    Alert.alert('Ocorrência enviada', 'Seu protocolo: ' + protocolo);
  }

  const nomeCategoria = CATEGORIAS.find((c) => c.id === categoria)?.nome;
  const resumoEndereco = endereco
    ? `${endereco.bairro}, nº ${endereco.numero} — ${endereco.cidade}/${endereco.estado}`
    : null;

  return (
    <View style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor={tema.fundo} />

      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>
            Novo{'\n'}Chamado
          </Text>
          {avatar ? (
            <Image source={avatar} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarVazio]}>
              <Text style={styles.avatarLetra}>{nomeUsuario.charAt(0)}</Text>
            </View>
          )}
        </View>

        {/* Foto */}
        <View style={styles.caixaFoto}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.fotoImagem} />
          ) : null}
          <TouchableOpacity
            style={[styles.pilula, foto ? styles.pilulaSobreFoto : null]}
            onPress={tirarFoto}
          >
            <Text style={styles.pilulaTexto}>{foto ? 'Tirar outra foto' : 'Tirar foto'}</Text>
          </TouchableOpacity>
        </View>

        {/* Endereço */}
        <Text style={styles.rotulo}>Endereço de Ocorrência</Text>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={abrirEndereco}>
          <Text style={styles.botaoAdicionarTexto}>
            {resumoEndereco ?? '+ Adicionar'}
          </Text>
        </TouchableOpacity>
        {endereco ? (
          <TouchableOpacity onPress={abrirEndereco}>
            <Text style={styles.linkEditar}>Editar endereço</Text>
          </TouchableOpacity>
        ) : null}

        {/* Tipo de problema */}
        <Text style={styles.rotulo}>Tipo de problema</Text>
        <TouchableOpacity style={styles.campoLista} onPress={() => setModalTipo(true)}>
          <Text style={nomeCategoria ? styles.campoListaTexto : styles.campoListaPlaceholder}>
            {nomeCategoria ?? 'Selecione o tipo de problema'}
          </Text>
          <Ionicons name="chevron-down" size={18} color={tema.textoSuave} />
        </TouchableOpacity>

        {/* Descrição */}
        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={styles.descricao}
          placeholder="Descreva o problema"
          placeholderTextColor={tema.textoSuave}
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity style={styles.botaoEnviar} onPress={enviar}>
          <Text style={styles.botaoEnviarTexto}>Enviar Ocorrência</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal: Endereço */}
      <Modal visible={modalEndereco} transparent animationType="fade">
        <KeyboardAvoidingView
          style={styles.fundoModal}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.cartaoModal}>
            <Campo
              rotulo="Cep"
              placeholder="13380-270"
              valor={rascunho.cep}
              keyboardType="numeric"
              onChange={(v) => setRascunho({ ...rascunho, cep: v })}
            />
            <Campo
              rotulo="Numero"
              placeholder="10000"
              valor={rascunho.numero}
              keyboardType="numeric"
              onChange={(v) => setRascunho({ ...rascunho, numero: v })}
            />
            <Campo
              rotulo="Estado"
              placeholder="SP"
              valor={rascunho.estado}
              onChange={(v) => setRascunho({ ...rascunho, estado: v })}
            />
            <Campo
              rotulo="Cidade"
              placeholder="Indaiatuba"
              valor={rascunho.cidade}
              onChange={(v) => setRascunho({ ...rascunho, cidade: v })}
            />
            <Campo
              rotulo="Bairro"
              placeholder="Jardim Morada do Sol"
              valor={rascunho.bairro}
              onChange={(v) => setRascunho({ ...rascunho, bairro: v })}
            />

            <TouchableOpacity style={styles.botaoConfirmar} onPress={confirmarEndereco}>
              <Text style={styles.botaoConfirmarTexto}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalEndereco(false)}>
              <Text style={styles.linkCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal: Tipo de problema */}
      <Modal visible={modalTipo} transparent animationType="fade">
        <View style={styles.fundoModal}>
          <View style={[styles.cartaoModal, { maxHeight: '70%' }]}>
            <Text style={styles.tituloModal}>Tipo de problema</Text>
            <FlatList
              data={CATEGORIAS}
              keyExtractor={(c) => c.id}
              renderItem={({ item }) => {
                const ativo = item.id === categoria;
                return (
                  <TouchableOpacity
                    style={styles.itemLista}
                    onPress={() => {
                      setCategoria(item.id);
                      setModalTipo(false);
                    }}
                  >
                    <Text style={[styles.itemListaTexto, ativo && { color: tema.verdeAgua, fontWeight: '700' }]}>
                      {item.nome}
                    </Text>
                    {ativo ? <Ionicons name="checkmark" size={18} color={tema.verdeAgua} /> : null}
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity onPress={() => setModalTipo(false)}>
              <Text style={styles.linkCancelar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

type CampoProps = {
  rotulo: string;
  placeholder: string;
  valor: string;
  onChange: (v: string) => void;
  keyboardType?: 'default' | 'numeric';
};

function Campo({ rotulo, placeholder, valor, onChange, keyboardType = 'default' }: CampoProps) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.rotuloModal}>{rotulo}</Text>
      <TextInput
        style={styles.inputModal}
        placeholder={placeholder}
        placeholderTextColor="#B5BAC1"
        value={valor}
        keyboardType={keyboardType}
        onChangeText={onChange}
      />
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
  titulo: { fontSize: 30, fontWeight: '700', color: tema.titulo, lineHeight: 36 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  avatarVazio: {
    backgroundColor: tema.verdeAgua,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetra: { color: '#fff', fontSize: 20, fontWeight: '700' },

  caixaFoto: {
    height: 150,
    borderRadius: 10,
    backgroundColor: tema.caixaFoto,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fotoImagem: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  pilula: {
    backgroundColor: tema.verdeAgua,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 22,
  },
  pilulaSobreFoto: { position: 'absolute', bottom: 10 },
  pilulaTexto: { color: '#fff', fontSize: 13, fontWeight: '600' },

  rotulo: { fontSize: 13, color: tema.textoSuave, marginTop: 22, marginBottom: 8 },

  botaoAdicionar: {
    backgroundColor: tema.verdeAgua,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 12,
  },
  botaoAdicionarTexto: { color: '#fff', fontSize: 13, fontWeight: '600' },
  linkEditar: { color: tema.verdeAgua, fontSize: 12, marginTop: 6 },

  campoLista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  campoListaTexto: { fontSize: 13, color: tema.texto },
  campoListaPlaceholder: { fontSize: 13, color: '#B5BAC1' },

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

  botaoEnviar: {
    backgroundColor: tema.verdeAgua,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
    marginHorizontal: 20,
  },
  botaoEnviarTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Modais
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cartaoModal: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
  },
  tituloModal: { fontSize: 16, fontWeight: '700', color: tema.texto, marginBottom: 8 },
  rotuloModal: { fontSize: 12, fontWeight: '600', color: tema.texto, marginBottom: 4 },
  inputModal: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    color: tema.texto,
  },
  botaoConfirmar: {
    backgroundColor: tema.verdeAgua,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoConfirmarTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
  linkCancelar: {
    color: tema.textoSuave,
    textAlign: 'center',
    marginTop: 12,
    fontSize: 13,
  },
  itemLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
  },
  itemListaTexto: { fontSize: 14, color: tema.texto },
});