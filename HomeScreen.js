import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

import { useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MainContext } from './contexto/MainContext';

import { ListaMemorias } from './componentes/ListaMemorias';

const KEY_VALUE = '@memorias';

export function Home({ navigation }) {
  useEffect(() => {
    buscarMemorias();
  }, []);

  const { vetorMemorias, setVetorMemorias } = useContext(MainContext);

  const buscarMemorias = async () => {
    let resultado = await AsyncStorage.getItem(KEY_VALUE);
    resultado && setVetorMemorias(JSON.parse(resultado));
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.lista}
        data={vetorMemorias}
        renderItem={({ item }) => (
          <ListaMemorias
            foto={item.foto}
            titulo={item.titulo}
            descricao={item.descricao}
            local={item.local}
            ano={item.ano}
          />
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('AddMemory')}>
        <Text style={styles.txtBotao}>ADICIONAR NOVA MEMÓRIA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  botao: {
    width: '85%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#9933FF',
    marginTop: 10,
  },

  txtBotao: {
    color: 'white',
  },

  lista: {
    width: '100%',
    marginLeft: 60,
  },
});
