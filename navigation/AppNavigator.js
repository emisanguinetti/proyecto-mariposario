import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MainTab from './MainTab';

const Drawer = createDrawerNavigator();

// Menú lateral: cada opción salta a una pestaña de MainTab.
function ContenidoDrawer({ navigation }) {
  const ir = (pantalla) => {
    navigation.navigate('Explorar', { screen: pantalla });
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Mariposario</Text>
        <Text style={styles.subtitulo}>Explora el mundo de las mariposas</Text>
      </View>
      <DrawerItem
        label="Inicio"
        labelStyle={{ color: '#333' }}
        icon={({ size }) => <Ionicons name="home" color="#E36888" size={size} />}
        onPress={() => ir('Inicio')}
      />
      <DrawerItem
        label="Especies"
        labelStyle={{ color: '#333' }}
        icon={({ size }) => <Ionicons name="leaf" color="#E36888" size={size} />}
        onPress={() => ir('Especies')}
      />
      <DrawerItem
        label="Ciclo de vida"
        labelStyle={{ color: '#333' }}
        icon={({ size }) => <Ionicons name="sync-circle" color="#E36888" size={size} />}
        onPress={() => ir('Metamorfosis')}
      />
      <DrawerItem
        label="Migración"
        labelStyle={{ color: '#333' }}
        icon={({ size }) => <Ionicons name="map" color="#E36888" size={size} />}
        onPress={() => ir('Migracion')}
      />
    </DrawerContentScrollView>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ContenidoDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#6698CC' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Explorar"
        component={MainTab}
        options={({ route, navigation }) => {
          const actual = getFocusedRouteNameFromRoute(route) ?? 'Inicio';
          return {
            title: 'Mariposario',
            headerRight:
              actual !== 'Inicio'
                ? () => (
                    <TouchableOpacity
                      style={styles.botonInicio}
                      onPress={() => navigation.navigate('Explorar', { screen: 'Inicio' })}
                    >
                      <Ionicons name="home" size={24} color="#fff" />
                    </TouchableOpacity>
                  )
                : undefined,
          };
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  botonInicio: { paddingHorizontal: 16 },
  cabecera: { padding: 20, backgroundColor: '#B4B534', marginBottom: 8 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  subtitulo: { fontSize: 13, color: '#fefefe', marginTop: 4 },
});