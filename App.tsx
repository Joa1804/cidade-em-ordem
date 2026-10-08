import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './routes';
import Login from './screens/Login';
import Home from './screens/Home';
import ListChamado from './screens/ListChamado';
import TelaCidadao from './screens/TelaCidacao'; // tela "Meus Chamados"

const Stack = createNativeStackNavigator<RootStackParamList>();

// Cabeçalho só com a seta de voltar (verde-água)
const opcoesVoltar = {
  headerShown: true,
  headerTitle: '',
  headerShadowVisible: false,
  headerTintColor: '#3FB0A8',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />

        {/* Home: botões levam para Novo Chamado e Meus Chamados */}
        <Stack.Screen name="Home">
          {({ navigation }) => (
            <Home
              onNovaSolicitacao={() => navigation.navigate('NovoChamado')}
              onNovoChamado={() => navigation.navigate('NovoChamado')}
              onMeusChamados={() => navigation.navigate('MeusChamados')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="NovoChamado" options={opcoesVoltar}>
          {() => <TelaCidadao />}
        </Stack.Screen>

        <Stack.Screen name="MeusChamados" options={opcoesVoltar}>
          {() => <listChamado />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}