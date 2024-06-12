import React from "react";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../../features/recipes/constants/colors";

const Checkbox = ({ checked, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, checked ? styles.checkedBox : {}]}
    >
      {checked ? <View style={styles.innerSquare} /> : null}
    </Pressable>
  );
};

export default React.memo(Checkbox);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 3,
    height: 18,
    width: 18,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  innerSquare: {
    width: 10,
    height: 10,
    backgroundColor: colors.purple,
  },
  checkedBox: { borderWidth: 2 },
});
