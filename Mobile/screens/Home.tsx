import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  ImageSourcePropType,
} from 'react-native';

type IconProps = {
  color?: string;
  size?: number;
};

function PlusIcon({ color = tema.verdeAgua, size = 22 }: IconProps) {
  return <Text style={[styles.icone, { color, fontSize: size }]}>＋</Text>;
}

function ListIcon({ color = tema.textoSuave, size = 22 }: IconProps) {
  return <Text style={[styles.icone, { color, fontSize: size }]}>☰</Text>;
}

const tema = {
  fundo: '#FFFFFF',
  titulo: '#7A7A7A',
  textoSuave: '#7A7A7A',
  texto: '#1F2933',
  verdeAgua: '#3FB0A8',
  placeholder: '#E3E6EA',
};

type Servico = {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: ImageSourcePropType; // ex.: require('../assets/agua.png')
};

const SERVICOS: Servico[] = [
  {
    id: 'agua',
    titulo: 'ÁGUA',
    descricao: 'Vazamentos e qualidade',
    // imagem: require('../assets/agua.png'),
  },
  {
    id: 'lixo',
    titulo: 'LIXO E LIMPEZA',
    descricao: 'Varrição, coleta de lixo domiciliar e coleta de lixo reciclável',
    // imagem: require('../assets/lixo.png'),
  },
  {
    id: 'animais',
    titulo: 'ANIMAIS',
    descricao: 'Focos de dengue, pragas, animais silvestres e domésticos',
    // imagem: require('../assets/animais.png'),
  },
];

type HomeProps = {
  nomeUsuario?: string;
  avatar?: ImageSourcePropType;
  onNovaSolicitacao?: (servicoId: string) => void;
  onNovoChamado?: () => void;
  onMeusChamados?: () => void;
};

export default function Home({
  nomeUsuario = 'Fulano',
  avatar,
  onNovaSolicitacao,
  onNovoChamado,
  onMeusChamados,
}: HomeProps) {
  return (
    <View style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor={tema.fundo} />

      <ScrollView contentContainerStyle={styles.conteudo}>
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <Text style={styles.saudacao}>
            Olá,{'\n'}
            {nomeUsuario}
          </Text>
          {avatar ? (
            <Image source={avatar} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarVazio]}>
              <Text style={styles.avatarLetra}>{nomeUsuario.charAt(0)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.subtitulo}>
          Registre solicitações e{'\n'}acompanhe o andamento
        </Text>

        {/* Cards de serviço */}
        {SERVICOS.map((s) => (
          <View key={s.id} style={styles.card}>
            {s.imagem ? (
              <Image source={s.imagem} style={styles.cardImagem} />
            ) : (
              <View style={[styles.cardImagem, styles.cardImagemVazia]} />
            )}

            <View style={styles.cardTexto}>
              <Text style={styles.cardTitulo}>{s.titulo}</Text>
              <Text style={styles.cardDescricao}>{s.descricao}</Text>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => onNovaSolicitacao?.(s.id)}
              >
                <Text style={styles.botaoTexto}>+ Nova Solicitação</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Barra inferior */}
      <View style={styles.barra}>
        <TouchableOpacity style={styles.barraItem} onPress={onNovoChamado}>
          <PlusIcon color={tema.verdeAgua} size={22} />
          <Text style={[styles.barraTexto, { color: tema.verdeAgua }]}>
            Novo Chamado
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.barraItem} onPress={onMeusChamados}>
          <ListIcon color={tema.textoSuave} size={22} />
          <Text style={styles.barraTexto}>Meus Chamados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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