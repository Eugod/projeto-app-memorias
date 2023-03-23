import { View, StyleSheet, Text, Image } from 'react-native';

export function ListaMemorias({ foto, titulo, descricao, local, ano }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: foto,
        }}
      />

      <Text style={styles.titulo}>{titulo}</Text>

      <Text style={styles.descricao}>{descricao}</Text>

      <View style={styles.viewLocal}>
        <Image
          style={styles.pin}
          source={{
            uri: 'https://toppng.com/public/uploads/thumbnail/map-clipart-logo-png-google-map-pin-purple-11563050479x7ehes0cog.png',
          }}
        />

        <Text style={styles.local}>
          {local}, em {ano}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: 5,
    borderWidth: 1,
    padding: 25,
    width: '85%',
    marginTop: 30,
    borderColor: 'rgb(196, 196, 196)',
  },

  img: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
  },

  descricao: {
    fontSize: 15,
    textAlign: 'justify',
    marginTop: 20,
  },

  viewLocal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  pin: {
    width: 20,
    height: 31,
  },

  local: {
    color: '#9933FF',
    fontSize: 15,
    marginLeft: 15,
  },
});
