import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import logo from "../../../assets/images/logo.png";

const HeaderLogo = ({ style }) => {
  const insets = useSafeAreaInsets();
  return (
    /*  <View style={[styles.header, { paddingTop: insets.top }]}> */
    <View style={[styles.header, style]}>
      <Image
        source={logo} // Make sure 'logo' is properly imported or provided
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //backgroundColor: "yellow",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default HeaderLogo;
