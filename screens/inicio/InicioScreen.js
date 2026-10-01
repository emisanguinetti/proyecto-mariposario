import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { especies } from '../../data/data';

const normalizar = (t) =>
  t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function InicioScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const destacada = especies[new Date().getDate() % especies.length];

  // 🦋 Animaciones
  const animFlotado = useRef(new Animated.Value(0)).current;
  const animAleteo = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Flotado vertical
    Animated.loop(
      Animated.sequence([
        Animated.timing(animFlotado, {
          toValue: -10,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animFlotado, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Aleteo de alas
    Animated.loop(
      Animated.sequence([
        Animated.timing(animAleteo, {
          toValue: 0.2,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animAleteo, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animFlotado, animAleteo]);

  const resultados = busqueda.trim()
    ? especies.filter((e) =>
        [e.nombre, e.cientifico, e.color].some((campo) =>
          normalizar(campo).includes(normalizar(busqueda))
        )
      )
    : [];

  const verDetalle = (id) =>
    navigation.navigate('Especies', { screen: 'Detalles', params: { id } });

  return (
    <ScrollView style={styles.contenedor} keyboardShouldPersistTaps="handled">
      {/* Banner con animación */}
      <View style={styles.banner}>
        <Animated.View
          style={{
            transform: [
              { translateY: animFlotado },
              { scaleX: animAleteo },
            ],
          }}
        >
          <Image
            source={require('../../assets/mariposaportada.png')}
            style={styles.imagenMariposaHeader}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.bannerTitulo}>Mariposario</Text>
        <Text style={styles.bannerTexto}>Descubrí especies y su metamorfosis</Text>
      </View>

      {/* Buscador */}
      <TextInput
        style={styles.buscador}
        placeholder="Buscar por nombre o color..."
        placeholderTextColor="#888"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {busqueda.trim() !== '' && (
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Resultados ({resultados.length})</Text>
          {resultados.map((e) => (
            <TouchableOpacity key={e.id} style={styles.fila} onPress={() => verDetalle(e.id)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={e.imagen} style={styles.miniImagen} resizeMode="contain" />
                <Text style={styles.filaTexto}>{e.nombre}</Text>
              </View>
              <Text style={styles.filaColor}>{e.color}</Text>
            </TouchableOpacity>
          ))}
          {resultados.length === 0 && <Text style={styles.vacio}>Sin resultados</Text>}
        </View>
      )}

      {/* Mariposa destacada */}
      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Mariposa destacada</Text>
        <TouchableOpacity style={styles.tarjeta} onPress={() => verDetalle(destacada.id)}>
          <Image source={destacada.imagen} style={styles.tarjetaImagen} resizeMode="contain" />
          <Text style={styles.tarjetaNombre}>{destacada.nombre}</Text>
          <Text style={styles.tarjetaCientifico}>{destacada.cientifico}</Text>
          <Text style={styles.tarjetaTexto}>{destacada.curiosidad}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fcfaf2' },
  banner: { backgroundColor: '#Fo8C21', padding: 28, alignItems: 'center' },
  imagenMariposaHeader: { width: 65, height: 65, marginBottom: 4 },
  bannerTitulo: { fontSize: 28, fontWeight: 'bold', color: '#F08C21' },
  bannerTexto: { color: '#E36888', marginTop: 4, opacity: 0.95 },
  buscador: {
    backgroundColor: '#fff', margin: 16, padding: 12, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#6698CC', color: '#333',
  },
  seccion: { paddingHorizontal: 16, marginBottom: 16 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#B4B534' },
  fila: {
    backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  miniImagen: { width: 32, height: 32, marginRight: 10 },
  filaTexto: { fontSize: 16 },
  filaColor: { color: '#E36888', fontWeight: '600' },
  vacio: { color: '#777' },
  tarjeta: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 16, 
    alignItems: 'center', 
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: '#B4B534',
  },
  tarjetaImagen: { width: 100, height: 100, marginBottom: 8 },
  tarjetaNombre: { fontSize: 20, fontWeight: 'bold', color: '#E36888' },
  tarjetaCientifico: { fontStyle: 'italic', color: '#666', marginBottom: 8 },
  tarjetaTexto: { textAlign: 'center', color: '#444' },
});