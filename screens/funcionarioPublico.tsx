import {View,Text,TextInput,TouchableOpacity,ScrollView,Image,Modal,FlatList,StyleSheet,Alert,StatusBar,KeyboardAvoidingView,Platform,ImageSourcePropType,} from 'react-native';

const tema = {
  fundo: '#FFFFFF',
  titulo: '#7A7A7A',
  texto: '#1F2933',
  textoSuave: '#7A7A7A',
  verdeAgua: '#3FB0A8',
  caixaFoto: '#D9D9D9',
  borda: '#D9DFE7',
};


export default function funcionarioPublico() {}


const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: tema.fundo,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 24,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  saudacao: {
    fontSize: 30,
    fontWeight: '700',
    color: tema.titulo,
    lineHeight: 36,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarVazio: {
    backgroundColor: tema.verdeAgua,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetra: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  icone: {
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: tema.textoSuave,
    marginTop: 12,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: tema.verdeAgua,
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  cardImagem: {
    width: 84,
    height: 84,
    borderRadius: 10,
  },
  cardImagemVazia: {
    backgroundColor: tema.placeholder,
  },
  cardTexto: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 12,
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: tema.texto,
  },
  cardDescricao: {
    fontSize: 12,
    color: tema.textoSuave,
    textAlign: 'center',
    marginTop: 4,
  },
  botao: {
    backgroundColor: tema.verdeAgua,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F3',
    backgroundColor: '#fff',
  },
  barraItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barraTexto: {
    marginLeft: 6,
    fontSize: 13,
    color: tema.textoSuave,
  },
});