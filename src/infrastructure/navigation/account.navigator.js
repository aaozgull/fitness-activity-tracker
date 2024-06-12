import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalScreen from "../../features/account/screens/GoalScreen";
import EquipmentScreen from "../../features/account/screens/EquipmentScreen";
import FitnessLevelScreen from "../../features/account/screens/FitnessLevelScreen";
import ProfilePictureScreen from "../../features/account/screens/ProfilePictureScreen";
import AddProfileInfoScreen from "../../features/account/screens/AddProfileInfoScreen";
import CalendarSetupScreen from "../../features/account/screens/CalendarSetupScreen";

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Goal" component={GoalScreen} />
    <Stack.Screen name="FitnessLevel" component={FitnessLevelScreen} />
    <Stack.Screen name="Equipment" component={EquipmentScreen} />
    <Stack.Screen name="AddUserInfo" component={AddProfileInfoScreen} />
    <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
    <Stack.Screen name="SetupCalendar" component={CalendarSetupScreen} />
  </Stack.Navigator>
);
