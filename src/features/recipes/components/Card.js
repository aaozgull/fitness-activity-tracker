import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";
const { width } = Dimensions.get("window");

const Card = ({ title, style, image, servings, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image style={styles.image} source={{ uri: image }} />
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
    backgroundColor: "rgba(217,217,217,0.5)",
    padding: 10,
    width: width * 0.4,
    marginVertical: 32,
    marginTop: 60,
    marginRight: 16,
  },
  title: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  label: {
    color: colors.lightGrey2,
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  value: {
    color: colors.grey,
    fontSize: 11,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -60,
    alignSelf: "center",
  },
});
