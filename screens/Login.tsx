import {View, Text, TouchableOpacity, Image, StyleSheet, Alert, StatusBar,} from 'react-native';
import React from 'react';

const tema = {
  fundo: '#FFFFFF',
  titulo: '#7A7A7A',
  textoSuave: '#7A7A7A',
  texto: '#1F2933',
  verdeAgua: '#3FB0A8',
};

export default function Login() {
  function entrarGovBr(): void {
    Alert.alert('gov.br', 'Login com gov.br ainda não integrado.');
  }

  function abrirPoliticaPrivacidade(): void {
    Alert.alert('Política de Privacidade', 'Página ainda não definida.');
  }

  return (
    <View style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor={tema.fundo} />

      <View style={styles.topo}>
        <Text style={styles.titulo}>INDAIATUBA EM ORDEM</Text>
        <Text style={styles.subtitulo}>
          Plataforma Inteligente de Zeladoria Urbana
        </Text>
      </View>

      <View style={styles.areaLogo}>
        <Image
          source={require('../assets/logo-minha-indaiatuba.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.rodape}>
        <TouchableOpacity style={styles.botaoGov} onPress={entrarGovBr}>
          <Text style={styles.botaoGovTexto}>
            Entrar com <Text style={styles.govBold}>gov.br</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.politica}>
          Acessar{' '}
          <Text style={styles.politicaLink} onPress={abrirPoliticaPrivacidade}>
            Política de Privacidade
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: tema.fundo,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  topo: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: tema.titulo,
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitulo: {
    fontSize: 16,
    color: tema.textoSuave,
    textAlign: 'center',
    marginTop: 28,
    paddingHorizontal: 24,
  },
  areaLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 260,
  },
  rodape: {
    alignItems: 'center',
  },
  botaoGov: {
    width: '100%',
    borderWidth: 2,
    borderColor: tema.verdeAgua,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  botaoGovTexto: {
    fontSize: 16,
    fontWeight: '500',
    color: tema.textoSuave,
  },
  govBold: {
    fontWeight: '800',
  },
  politica: {
    marginTop: 20,
    fontSize: 14,
    color: tema.texto,
  },
  politicaLink: {
    color: tema.verdeAgua,
  },
});