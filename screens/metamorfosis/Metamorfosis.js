import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fases } from '../../data/data';

export default function OtroScreen() {
  const [indice, setIndice] = useState(0);
  const fase = fases[indice];

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Ciclo de vida y metamorfosis</Text>

      {/* Pestañas internas */}
      <View style={styles.pestanas}>
        {fases.map((f, i) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.pestana, i === indice && styles.pestanaActiva]}
            onPress={() => setIndice(i)}
          >
            <Text style={styles.pestanaEmoji}>{f.emoji}</Text>
            <Text style={[styles.pestanaTexto, i === indice && { color: '#fff' }]}>
              {i + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido de la fase */}
      <View style={styles.tarjeta}>
        <Text style={styles.emoji}>{fase.emoji}</Text>
        <Text style={styles.faseTitulo}>{fase.titulo}</Text>
        <Text style={styles.duracion}>⏱ {fase.duracion}</Text>
        <Text style={styles.resumen}>{fase.resumen}</Text>
        {fase.detalles.map((d, i) => (
          <Text key={i} style={styles.detalle}>• {d}</Text>
        ))}
      </View>

      {/* Navegación entre fases */}
      <View style={styles.botones}>
        <TouchableOpacity
          style={[styles.boton, indice === 0 && styles.botonOff]}
          disabled={indice === 0}
          onPress={() => setIndice(indice - 1)}
        >
          <Text style={styles.botonTexto}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.boton, indice === fases.length - 1 && styles.botonOff]}
          disabled={indice === fases.length - 1}
          onPress={() => setIndice(indice + 1)}
        >
          <Text style={styles.botonTexto}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fcfaf2' },
  titulo: { fontSize: 22, fontWeight: 'bold', padding: 16, color: '#B4B534' },
  pestanas: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 },
  pestana: {
    backgroundColor: '#F2D88F', borderRadius: 14, paddingVertical: 10,
    width: 70, alignItems: 'center',
  },
  pestanaActiva: { backgroundColor: '#E36888' },
  pestanaEmoji: { fontSize: 26 },
  pestanaTexto: { fontWeight: 'bold', color: '#B4B534' },
  tarjeta: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 16, alignItems: 'center', elevation: 3 },
  emoji: { fontSize: 64 },
  faseTitulo: { fontSize: 22, fontWeight: 'bold', marginTop: 8, color: '#FO8C21' },
  duracion: { color: '#E36888', marginVertical: 6, fontWeight: '600' },
  resumen: { textAlign: 'center', marginBottom: 12, color: '#333' },
  detalle: { alignSelf: 'stretch', color: '#444', marginBottom: 6, lineHeight: 20 },
  botones: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 24 },
  boton: { backgroundColor: '#6698CC', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  botonOff: { backgroundColor: '#d0dfef' },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
});