import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Alert,ActivityIndicator, StatusBar,} from 'react-native';



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



export default function Login() {
    return (
        <View style={styles.tela}>
            <Text style={styles.titulo}>Indaiatuba em ordem</Text>
            <Text style={styles.subtitulo}>Plataforma inteligente de Zeldaria Urbana</Text>
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
  link: { 
    color: tema.primaria, 
    fontWeight: '600', 
    fontSize: 14 
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
    subtitulo: {
        fontSize: 16,
        color: tema.textoSuave,}
});