import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { especies } from '../../data/data';

const Dato = ({ titulo, texto }) => (
  <View style={styles.dato}>
    <Text style={styles.datoTitulo}>{titulo}</Text>
    <Text style={styles.datoTexto}>{texto}</Text>
  </View>
);

export default function Detalles({ route, navigation }) {
  const especie = especies.find((e) => e.id === route.params?.id);

  if (!especie) {
    return (
      <View style={styles.centro}>
        <Text>Especie no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor}>
      <TouchableOpacity style={styles.volver} onPress={() => navigation.goBack()}>
        <Text style={styles.volverTexto}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.cabecera}>
        <Image source={especie.imagen} style={styles.imagenDetalle} resizeMode="contain" />
        <Text style={styles.nombre}>{especie.nombre}</Text>
        <Text style={styles.cientifico}>{especie.cientifico}</Text>
      </View>

      <Dato titulo="Hábitat" texto={especie.habitat} />
      <Dato titulo="Alimentación" texto={especie.alimentacion} />
      <Dato titulo="Distribución geográfica" texto={especie.distribucion} />
      <Dato titulo="Dato curioso" texto={especie.curiosidad} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fcfaf2' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  volver: { padding: 16 },
  volverTexto: { color: '#6698CC', fontSize: 16, fontWeight: '600' },
  cabecera: { alignItems: 'center', paddingBottom: 16 },
  imagenDetalle: { width: 140, height: 140, marginBottom: 12 },
  nombre: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16, color: '#E36888' },
  cientifico: { fontStyle: 'italic', color: '#666' },
  dato: { 
    backgroundColor: '#fff', 
    marginHorizontal: 16, 
    marginBottom: 12, 
    padding: 16, 
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FO8C21',
  },
  datoTitulo: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#B4B534' },
  datoTexto: { color: '#444', lineHeight: 20 },
});