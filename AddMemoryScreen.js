import { useContext, useState, useEffect } from 'react';

import * as Location from 'expo-location';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Vibration,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MainContext } from './contexto/MainContext';

const KEY_VALUE = '@memorias';

export function AddMemory() {
  const { vetorMemorias, setVetorMemorias } = useContext(MainContext);

  const [memoria, setMemoria] = useState({
    foto: null,
    titulo: null,
    descricao: null,
    local: null,
    ano: null,
  });

  const [localizacao, setLocalizacao] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      if (coords) {
        const { latitude, longitude } = coords;

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        response.forEach((item) => {
          setLocalizacao(item.subregion);
        });
      }
    })();
  }, []);

  const salvarMemorias = async () => {
    await AsyncStorage.setItem(KEY_VALUE, JSON.stringify(vetorMemorias));
  };

  useEffect(() => {
    salvarMemorias();
  });

  const navigation = useNavigation();

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 8],
      quality: 1,
    });

    if (!result.cancelled) {
      setMemoria({ ...memoria, foto: result.uri });
    }
  };

  const novaMemoria = (obj) => setVetorMemorias([...vetorMemorias, obj]);

  addLocalizacao = () => {
    setMemoria({ ...memoria, local: localizacao });
  };

  adicionar = () => {
    novaMemoria(memoria);

    navigation.navigate('Home');

    setMemoria({
      foto: null,
      titulo: null,
      descricao: null,
      local: null,
      ano: null,
    });

    Vibration.vibrate();
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="black"
          onChangeText={(titulo) => setMemoria({ ...memoria, titulo: titulo })}
        />

        <TextInput
          style={styles.input}
          placeholder="Quando aconteceu? (ano)"
          placeholderTextColor="black"
          keyboardType="numeric"
          onChangeText={(ano) => setMemoria({ ...memoria, ano: ano })}
        />

        <View style={styles.viewLocalizacao}>
          <TextInput
            style={styles.inputLocalizacao}
            placeholder="Onde aconteceu? (cidade)"
            placeholderTextColor="black"
            onChange={(local) => setMemoria({ ...memoria, local: local })}
            value={memoria.local}
          />

          <TouchableOpacity
            style={styles.botaoLocalizacao}
            onPress={addLocalizacao}>
            <Text style={styles.txtBotao}>Localização atual</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Conte sobre a sua memória"
          placeholderTextColor="black"
          onChangeText={(descricao) =>
            setMemoria({ ...memoria, descricao: descricao })
          }
        />

        <TouchableOpacity style={styles.botaoFoto} onPress={escolherImagem}>
          <Image
            style={styles.imgBotaoFoto}
            source={{
              uri: 'https://icones.pro/wp-content/uploads/2021/06/icone-d-image-violet.png',
            }}
          />

          <Text style={styles.txtBotaoFoto}>Adicionar foto</Text>
        </TouchableOpacity>

        {memoria.foto && (
          <Image style={styles.fotoEscollhida} source={{ uri: memoria.foto }} />
        )}
      </View>

      <View style={styles.viewBotao}>
        <TouchableOpacity style={styles.botao} onPress={adicionar}>
          <Text style={styles.txtBotao}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
  },

  input: {
    width: '100%',
    padding: 10,
    backgroundColor: 'rgb(210, 210, 210)',
    marginBottom: 25,
  },

  viewLocalizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputLocalizacao: {
    width: '55%',
    padding: 10,
    backgroundColor: 'rgb(210, 210, 210)',
    marginBottom: 25,
  },

  botaoLocalizacao: {
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#9933FF',
    marginBottom: 25,
  },

  botaoFoto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  imgBotaoFoto: {
    width: 30,
    height: 30,
  },

  txtBotaoFoto: {
    fontSize: 15,
    color: '#9933FF',
    marginLeft: 10,
  },

  fotoEscollhida: {
    width: '70%',
    height: '30%',
    borderRadius: 5,
    marginTop: 15,
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

  viewBotao: {
    alignItems: 'center',
  },
});
