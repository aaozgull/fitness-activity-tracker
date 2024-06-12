import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../../features/account/screens/WelcomeScreen";
import AuthScreen from "../../features/account/screens/AuthScreen";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
  </Stack.Navigator>
);
