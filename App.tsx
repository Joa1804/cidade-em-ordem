import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Hackathon-React/componets/routes.ts';
import Login from './screens/Login';
import Home from './screens/Home';

const Stack = createNativeStackNavigator<typeof RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home">{() => <Home />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}