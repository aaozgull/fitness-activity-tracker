import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import colors from "../../features/recipes/constants/colors";

const Header = ({ title }) => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={openDrawer} hitSlop={8}>
        <Image style={styles.icon} source={require("../../assets/menu.png")} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.icon} />
    </View>
  );
};

export default React.memo(Header);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 16,
    color: colors.purple,
    fontWeight: "500",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
