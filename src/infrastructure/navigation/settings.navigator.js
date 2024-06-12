import React from "react";
import SettingsScreen from "../../features/settings/screens/SettingsScreen";
import ProfileInfoScreen from "../../features/settings/screens/ProfileInfoScreen";
//import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
//import { CameraScreen } from "../../features/settings/screens/camera.screen";
/* import ProfileScreen from "../../features/settings/screens/profile.screen"; */
import BMICalculation from "../../features/settings/screens/CalculationScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SettingsStack = createNativeStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingsStack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
      {/*   <SettingsStack.Screen name="Camera" component={CameraScreen} /> */}
      <SettingsStack.Screen name="BMICalculation" component={BMICalculation} />
    </SettingsStack.Navigator>
  );
};
