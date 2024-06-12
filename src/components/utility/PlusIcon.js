import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../../features/recipes/constants/colors";

const PlusIcon = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("AddTask");
  };

  return (
    <Pressable style={styles.container} onPress={onPress} hitSlop={8}>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
};

export default React.memo(PlusIcon);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: colors.blue,
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  plus: {
    fontSize: 32,
    marginTop: -2,
    color: colors.white,
    fontWeight: "600",
  },
});
