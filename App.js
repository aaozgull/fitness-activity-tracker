import React from "react";
import { LogBox, StyleSheet, Text } from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
//import { ClerkProvider } from "@clerk/clerk-expo";
//import Constants from "expo-constants";
import { MenuProvider } from "react-native-popup-menu";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts//Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
          greatVibesRegular: require("./assets/fonts/GreatVibes-Regular.ttf"),
        });
      } catch (error) {
        console.log.error();
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <MenuProvider>
          <Navigation />
        </MenuProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  label: {
    color: "black",
    fontSize: 18,
    fontFamily: "regular",
  },
});
