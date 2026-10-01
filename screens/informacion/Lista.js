import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { especies } from '../../data/data';

export default function Lista({ navigation }) {
  return (
    <FlatList
      style={styles.contenedor}
      contentContainerStyle={{ padding: 16 }}
      data={especies}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => navigation.navigate('Detalles', { id: item.id })}
        >
          <Image source={item.imagen} style={styles.imagenLista} resizeMode="contain" />
          <View style={{ flex: 1 }}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.cientifico}>{item.cientifico}</Text>
          </View>
          <Text style={styles.flecha}>➔</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fcfaf2' },
  tarjeta: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', elevation: 2,
    borderRightWidth: 4, borderRightColor: '#6698CC',
  },
  imagenLista: { width: 48, height: 48, marginRight: 14 },
  nombre: { fontSize: 17, fontWeight: 'bold', color: '#B4B534' },
  cientifico: { fontStyle: 'italic', color: '#666', marginTop: 2 },
  flecha: { fontSize: 22, color: '#E36888' },
});