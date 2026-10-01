import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Lista from '../../screens/informacion/Lista';
import Detalles from '../../screens/informacion/Detalles';

const Stack = createNativeStackNavigator();

// Lista general -> Detalle de una mariposa.
// Los headers están ocultos porque el Drawer ya muestra el suyo.
export default function StackEspecies() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lista" component={Lista} />
      <Stack.Screen name="Detalles" component={Detalles} />
    </Stack.Navigator>
  );
}
