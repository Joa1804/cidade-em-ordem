import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,Image,Modal,FlatList,StyleSheet,Alert,StatusBar,KeyboardAvoidingView,Platform,ImageSourcePropType,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

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

export default function ListChamado() {}

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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fotoImagem: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
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