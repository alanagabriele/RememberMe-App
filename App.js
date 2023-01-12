import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/views/Login';
import Cadastro from './src/views/Cadastro';
import MainPrincipal from './src/views/MainPrincipal';
import MainPrioridadeBaixa from './src/views/MainPrioridadeBaixa';
import MainPrioridadeMedia from './src/views/MainPrioridadeMedia';
import MainPrioridadeAlta from './src/views/MainPrioridadeAlta';
import UserProvider from './src/context/provider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="MainPrincipal" component={MainPrincipal} />
          <Stack.Screen name="MainPrioridadeBaixa" component={MainPrioridadeBaixa} />
          <Stack.Screen name="MainPrioridadeMedia" component={MainPrioridadeMedia} />
          <Stack.Screen name="MainPrioridadeAlta" component={MainPrioridadeAlta} />
        </Stack.Navigator>
      </UserProvider>
      
    </NavigationContainer>
  );
}
