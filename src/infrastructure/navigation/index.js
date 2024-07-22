import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { AuthNavigator } from "./auth.navigator";
import StartUpScreen from "../../features/account/screens/StartUpScreen";
const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const isAuth = useSelector(
    (state) => state.auth.token !== null && state.auth.token !== ""
  );
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const isNewRegistration = useSelector(
    (state) => state.auth.isNewRegistration
  );
  console.log("isAuth");

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth && !isNewRegistration && (
          <Stack.Screen name="Main" component={AppNavigator} />
        )}
        {isAuth && isNewRegistration && (
          <Stack.Screen name="Account" component={AccountNavigator} />
        )}
        {!isAuth && didTryAutoLogin && (
          <Stack.Screen name="AuthNav" component={AuthNavigator} />
        )}
        {!isAuth && !didTryAutoLogin && (
          <Stack.Screen name="StartUp" component={StartUpScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
