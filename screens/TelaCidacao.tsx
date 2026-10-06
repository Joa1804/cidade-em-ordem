import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Alert,ActivityIndicator, StatusBar,} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const tema = {
  primaria: '#0B4F8A', 
  primariaEscura: '#083A66',
  destaque: '#2E9E5B', 
  fundo: '#F3F5F8',
  card: '#FFFFFF',
  texto: '#1F2933',
  textoSuave: '#5F6B7A',
  borda: '#D9DFE7',
};

const REGIAO_PADRAO = {
  latitude: -23.0816,
  longitude: -47.2108,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const CATEGORIAS = [
  { id: 'buraco', nome: 'Buraco na via' },
  { id: 'iluminacao', nome: 'Iluminação' },
  { id: 'limpeza', nome: 'Limpeza' },
  { id: 'sinalizacao', nome: 'Sinalização' },
  { id: 'poda', nome: 'Poda' },
];

export default function TelaCidacao() {
    const [foto, setFoto] = useState<string | null>(null);
    const [coord, setCoord] = useState<{ latitude: number; longitude: number } | null>(null);
    const [categoria, setCategoria] = useState<string | null>(null);
    const [descricao, setDescricao] = useState('');
    const [carregandoLocal, setCarregandoLocal] = useState(true);

    useEffect(() => { obterLocalizacao(); }, []);

    async function obterLocalizacao() {
    setCarregandoLocal(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Localização desativada',
        'Permita o acesso à localização ou arraste o pino no mapa para marcar o local.'
      );
      setCoord({
        latitude: REGIAO_PADRAO.latitude,
        longitude: REGIAO_PADRAO.longitude,
      });
      setCarregandoLocal(false);
      return;
    }
    const pos = await Location.getCurrentPositionAsync({});
    setCoord({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
    setCarregandoLocal(false);
  }
 
  async function tirarFoto() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Câmera desativada', 'Permita o acesso à câmera para anexar a foto.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!res.canceled) setFoto(res.assets[0].uri);
  }
 
  async function escolherDaGaleria() {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
    });
    if (!res.canceled) setFoto(res.assets[0].uri);
  }
 
  function enviar() {
    if (!foto) return Alert.alert('Falta a foto', 'Tire uma foto do problema.');
    if (!categoria) return Alert.alert('Falta a categoria', 'Escolha o tipo de problema.');
    if (!coord) return Alert.alert('Falta o local', 'Aguarde a localização ou marque no mapa.');
 
    const chamado = {
      foto,
      categoria,
      descricao,
      latitude: coord.latitude,
      longitude: coord.longitude,
      status: 'Aberto',
      criadoEm: new Date().toISOString(),
    };
 
    console.log('Chamado criado:', chamado);
    Alert.alert('Chamado enviado', 'Você poderá acompanhar o andamento em "Meus chamados".');
  }

    return (
         <View style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor={tema.primariaEscura} />
 
      <View style={styles.cabecalho}>
        <Text style={styles.cabecalhoTitulo}>Minha Comunidade</Text>
        <Text style={styles.cabecalhoSub}>Zeladoria · Prefeitura de Indaiatuba</Text>
      </View>
 
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Novo chamado</Text>
        <Text style={styles.ajuda}>Informe o problema encontrado no espaço público.</Text>
 
        {/* FOTO */}
        <View style={styles.card}>
          <Text style={styles.rotulo}>Foto do problema</Text>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoVazia}>
              <Text style={styles.fotoVaziaTexto}>Nenhuma foto adicionada</Text>
            </View>
          )}
          <View style={styles.linha}>
            <TouchableOpacity style={[styles.botaoContorno, { flex: 1 }]} onPress={tirarFoto}>
              <Text style={styles.botaoContornoTexto}>Tirar foto</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity style={[styles.botaoContorno, { flex: 1 }]} onPress={escolherDaGaleria}>
              <Text style={styles.botaoContornoTexto}>Galeria</Text>
            </TouchableOpacity>
          </View>
        </View>
 
        {/* MAPA */}
        <View style={styles.card}>
          <Text style={styles.rotulo}>Localização</Text>
          {carregandoLocal || !coord ? (
            <View style={styles.mapaCarregando}>
              <ActivityIndicator color={tema.primaria} />
              <Text style={styles.fotoVaziaTexto}>Buscando sua localização…</Text>
            </View>
          ) : (
            <MapView
              style={styles.mapa}
              region={{
                latitude: coord.latitude,
                longitude: coord.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }}
              onPress={(e) => setCoord(e.nativeEvent.coordinate)}
            >
              <Marker
                coordinate={coord}
                draggable
                pinColor={tema.primaria}
                onDragEnd={(e) => setCoord(e.nativeEvent.coordinate)}
              />
            </MapView>
          )}
          <Text style={styles.ajuda}>Arraste o pino ou toque no mapa para ajustar o local.</Text>
          <TouchableOpacity onPress={obterLocalizacao}>
            <Text style={styles.link}>Usar minha localização atual</Text>
          </TouchableOpacity>
        </View>
 
        {/* CATEGORIA */}
        <View style={styles.card}>
          <Text style={styles.rotulo}>Tipo de problema</Text>
          <View style={styles.chips}>
            {CATEGORIAS.map((c) => {
              const ativa = categoria === c.id;
              return (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => setCategoria(c.id)}
                  style={[styles.chip, ativa && styles.chipAtivo]}
                >
                  <Text style={[styles.chipTexto, ativa && styles.chipTextoAtivo]}>{c.nome}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
 
        {/* DESCRIÇÃO */}
        <View style={styles.card}>
          <Text style={styles.rotulo}>Descrição (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: buraco grande em frente ao número 120"
            placeholderTextColor={tema.textoSuave}
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>
 
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviar}>
          <Text style={styles.botaoEnviarTexto}>Enviar chamado</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    );
}


const styles = StyleSheet.create({
    tela: { 
        flex: 1,
         backgroundColor: tema.fundo 
    },
  cabecalho: {
    backgroundColor: tema.primaria,
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  cabecalhoTitulo: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '700' 
    },
  cabecalhoSub: { 
    color: '#D6E4F2', 
    fontSize: 13, 
    marginTop: 2 
    },
  conteudo: { 
    padding: 16, 
    paddingBottom: 40
    },
  titulo: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: tema.texto
    },
  ajuda: { 
    fontSize: 13, 
    color: tema.textoSuave, 
    marginTop: 4, 
    marginBottom: 8 
     },
  card: {
    backgroundColor: tema.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: tema.borda,
    padding: 14,
    marginTop: 12,
  },
  rotulo: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: tema.texto, 
    marginBottom: 10 
    },
  linha: { 
    flexDirection: 'row', 
    marginTop: 10 
    },
  foto: { width: '100%', 
    height: 200, 
    borderRadius: 6
    },
  fotoVazia: {
    height: 140,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: tema.borda,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoVaziaTexto: { 
    color: tema.textoSuave, 
    fontSize: 13 
    },
  botaoContorno: {
    borderWidth: 1.5,
    borderColor: tema.primaria,
    borderRadius: 6,
    paddingVertical: 11,
    alignItems: 'center',
  },
  botaoContornoTexto: { 
    color: tema.primaria, 
    fontWeight: '600' 
    },
  mapa: { 
    width: '100%', 
    height: 220, 
    borderRadius: 6
  },
  mapaCarregando: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tema.fundo,
    borderRadius: 6,
  },
  link: { 
    color: tema.primaria, 
    fontWeight: '600', 
    fontSize: 14 
  },
  chips: { flexDirection: 'row', 
    flexWrap: 'wrap'
    },
  chip: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  chipAtivo: { 
    backgroundColor: tema.primaria, 
    borderColor: tema.primaria 
    },
  chipTexto: { 
    color: tema.texto,
     fontSize: 14 
    },
  chipTextoAtivo: { 
    color: '#fff',
     fontWeight: '600' 
    },
  input: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 6,
    minHeight: 90,
    padding: 10,
    textAlignVertical: 'top',
    color: tema.texto,
  },
  botaoEnviar: {
    backgroundColor: tema.destaque,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoEnviarTexto: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '700' 
    },
});


