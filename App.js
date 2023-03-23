import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { MainContextProvider } from './contexto/MainContext';

const Stack = createStackNavigator();

import { Home } from './HomeScreen';

import { AddMemory } from './AddMemoryScreen';

export default function App() {
  return (
    <NavigationContainer>
      <MainContextProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Memórias',
              headerStyle: { backgroundColor: '#9933FF' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />

          <Stack.Screen
            name="AddMemory"
            component={AddMemory}
            options={{
              title: 'Adicionar nova memória',
              headerStyle: { backgroundColor: '#9933FF' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack.Navigator>
      </MainContextProvider>
    </NavigationContainer>
  );
}
