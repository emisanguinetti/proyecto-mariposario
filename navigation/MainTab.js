import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import InicioScreen from '../screens/inicio/InicioScreen';
import StackEspecies from './stack/Stack';
import OtroScreen from '../screens/metamorfosis/Metamorfosis';
import MigracionScreen from '../screens/migracion/MigracionScreen';

const Tab = createBottomTabNavigator();

const iconos = {
  Inicio: 'home',
  Especies: 'leaf',
  Metamorfosis: 'sync-circle',
  Migracion: 'map',
};

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E36888',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#F2D88F' },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconos[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen
        name="Especies"
        component={StackEspecies}
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Metamorfosis"
        component={OtroScreen}
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Migracion"
        component={MigracionScreen}
        options={{ tabBarLabel: 'Migración', tabBarStyle: { display: 'none' } }}
      />
    </Tab.Navigator>
  );
}