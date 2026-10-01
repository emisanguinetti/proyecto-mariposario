import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function MigracionScreen() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.center}>
        <Text style={styles.texto}>
          El mapa no está disponible en la versión Web.
        </Text>
      </View>
    );
  }

  const MapView = require('react-native-maps').default;
  const { Marker, Polyline } = require('react-native-maps');

  // Especies con sus puntos de Origen (inicio) y Destino (migración/desplazamiento)
  const especies = [
    {
      id: 'monarca',
      nombre: 'Mariposa Monarca',
      color: '#e65100', // Naranja
      ruta: [
        { latitude: 45.4215, longitude: -75.6972 }, // Canadá (Origen)
        { latitude: 41.8781, longitude: -87.6298 }, // EE.UU. (Tránsito)
        { latitude: 19.6146, longitude: -100.2785 }, // Michoacán, México (Destino)
      ],
      puntos: [
        { latitude: 45.4215, longitude: -75.6972, titulo: 'Monarca: Origen', desc: 'Canadá / Norte de EE.UU. (Inicio en Otoño)' },
        { latitude: 19.6146, longitude: -100.2785, titulo: 'Monarca: Destino', desc: 'Santuarios en Michoacán, México (Invernada)' },
      ],
    },
    {
      id: 'golondrina',
      nombre: 'Cola de Golondrina',
      color: '#fbc02d', // Amarillo
      ruta: [
        { latitude: 51.5074, longitude: -0.1278 }, // Reino Unido / Europa Norte
        { latitude: 36.7201, longitude: -4.4203 }, // Sur de España / Norte de África
      ],
      puntos: [
        { latitude: 51.5074, longitude: -0.1278, titulo: 'Golondrina: Origen', desc: 'Zonas templadas de Europa en verano' },
        { latitude: 36.7201, longitude: -4.4203, titulo: 'Golondrina: Destino', desc: 'Migración estacional hacia el Sur de Europa y África' },
      ],
    },
    {
      id: 'morpho',
      nombre: 'Morpho Azul',
      color: '#0288d1', // Azul
      ruta: [
        { latitude: 9.9281, longitude: -84.0907 }, // Costa Rica
        { latitude: -3.4653, longitude: -62.2159 }, // Selva Amazónica (Brasil)
      ],
      puntos: [
        { latitude: 9.9281, longitude: -84.0907, titulo: 'Morpho Azul: Limite Norte', desc: 'Bosques de América Central' },
        { latitude: -3.4653, longitude: -62.2159, titulo: 'Morpho Azul: Corredor Amazónico', desc: 'Desplazamiento por el dosel del Amazonas' },
      ],
    },
    {
      id: 'buho',
      nombre: 'Mariposa Búho',
      color: '#795548', // Marrón
      ruta: [
        { latitude: 16.8638, longitude: -99.8816 }, // México (Sur)
        { latitude: -9.1900, longitude: -75.0152 }, // Perú
      ],
      puntos: [
        { latitude: 16.8638, longitude: -99.8816, titulo: 'Búho: Zona Norte', desc: 'Bosques tropicales del sur de México' },
        { latitude: -9.1900, longitude: -75.0152, titulo: 'Búho: Zona Sur', desc: 'Cuenca Amazónica y Andes Orientales' },
      ],
    },
    {
      id: 'cristal',
      nombre: 'Mariposa Cristal',
      color: '#00bcd4', // Turquesa
      ruta: [
        { latitude: 19.4326, longitude: -99.1332 }, // México
        { latitude: -1.8312, longitude: -78.1834 }, // Ecuador
      ],
      puntos: [
        { latitude: 19.4326, longitude: -99.1332, titulo: 'Cristal: Limite Septentrional', desc: 'Matorrales húmedos en México' },
        { latitude: -1.8312, longitude: -78.1834, titulo: 'Cristal: Corredor Andino', desc: 'Bosques de niebla en Sudamérica' },
      ],
    },
    {
      id: 'alexandra',
      nombre: 'Alas de Pájaro de la Reina Alexandra',
      color: '#4caf50', // Verde
      ruta: [
        { latitude: -8.8742, longitude: 147.7421 }, // Popondetta, Papúa Nueva Guinea
        { latitude: -9.4438, longitude: 147.1803 }, // Cordillera de Owen Stanley
      ],
      puntos: [
        { latitude: -8.8742, longitude: 147.7421, titulo: 'Alexandra: Llanuras de Popondetta', desc: 'Hábitat de reproducción principal' },
        { latitude: -9.4438, longitude: 147.1803, titulo: 'Alexandra: Zonas Altas', desc: 'Desplazamiento local protegido en mesetas' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: 15.0,
          longitude: -60.0,
          latitudeDelta: 90.0,
          longitudeDelta: 90.0,
        }}
      >
        {especies.map((especie) => (
          <React.Fragment key={especie.id}>
            {/* Trazado de la línea de migración/desplazamiento */}
            <Polyline
              coordinates={especie.ruta}
              strokeColor={especie.color}
              strokeWidth={3}
              lineDashPattern={[6, 6]}
            />

            {/* Marcadores de Origen y Destino */}
            {especie.puntos.map((punto, index) => (
              <Marker
                key={`${especie.id}-${index}`}
                coordinate={{ latitude: punto.latitude, longitude: punto.longitude }}
                title={punto.titulo}
                description={punto.desc}
                pinColor={especie.color}
              />
            ))}
          </React.Fragment>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});