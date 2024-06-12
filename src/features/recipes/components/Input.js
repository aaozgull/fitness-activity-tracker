import React from "react";
import { Image, Pressable, TextInput, View, StyleSheet } from "react-native";
//import colors from "../constants/colors";
import { colors } from "../../../infrastructure/theme/colors";

const Input = ({ showSearchIcon, pressable, onPress, style, ...props }) => {
  const renderInput = () => (
    <View style={[styles.container, style]}>
      {showSearchIcon ? (
        <Image
          style={styles.icon}
          source={require("../../../../assets/recipe/search.png")}
        />
      ) : null}
      <TextInput
        {...props}
        editable={!pressable}
        placeholderTextColor={colors.ui.gray500}
        style={styles.input}
      />
    </View>
  );

  if (pressable) {
    return <Pressable onPress={onPress}>{renderInput()}</Pressable>;
  }

  return renderInput();
};

Input.defaultProps = {
  placeholder: "Search recipe",
  showSearchIcon: true,
};

export default React.memo(Input);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.ui.gray500,
    padding: 10,
    marginVertical: 16,
    marginHorizontal: 4,
  },
  input: {
    color: colors.text.primary,
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 16,
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
});
