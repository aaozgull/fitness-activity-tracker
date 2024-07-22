import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//import colors from "../constants/colors";
import { colors } from "../../../infrastructure/theme/colors";
const { width } = Dimensions.get("window");

const Card = ({ title, style, image, servings, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image style={styles.image} source={image} />
      <Text numberOfLines={3} style={styles.title}>
        {title}
      </Text>
      {servings ? (
        <>
          <Text style={styles.label}>Servings</Text>
          <Text style={styles.value}>{servings}</Text>
        </>
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(Card);
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: colors.ui.grey10, //"rgba(217,217,217,0.5)",
    padding: 10,
    width: width * 0.4,
    marginVertical: 32,
    marginTop: 60,
    marginRight: 16,
  },
  title: {
    // fontSize: 14,
    color: colors.text.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    letterSpacing: 0.5,
  },
  label: {
    color: colors.text.gray500,
    //fontSize: 11,
    fontWeight: "regular",
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  value: {
    fontWeight: "bold",
    color: colors.text.gray700,
    // fontSize: 11,
    // fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -60,
    alignSelf: "center",
  },
});
