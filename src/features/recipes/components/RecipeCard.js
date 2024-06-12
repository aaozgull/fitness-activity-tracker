import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import Rating from "./Rating";
import colors from "../constants/colors";

const RecipeCard = ({ title, style, image, author, rating, time, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <Rating rating={rating} />
        </View>

        <Image style={styles.image} source={{ uri: image }} />
      </View>

      <View style={styles.footer}>
        {author ? (
          <View style={styles.row}>
            <Image style={styles.authorImage} source={{ uri: author?.image }} />
            <Text style={styles.footerText}>By {author?.name}</Text>
          </View>
        ) : (
          <View />
        )}

        {time ? (
          <View style={styles.row}>
            {/*  <Image
              style={styles.timerIcon}
              source={require("../../../assets/recipe/timer.png")}
            /> */}
            <Text style={styles.footerText}>{time}</Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RecipeCard);

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 10,
    width: width * 0.7,
    marginBottom: 32,
    marginTop: 46,
    marginRight: 16,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    // Android
    elevation: 9,
  },
  title: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: "bold",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  footerText: {
    color: colors.lightGrey2,
    fontSize: 11,
  },
  authorImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.lightGrey,
  },
  timerIcon: {
    width: 17,
    height: 17,
    marginRight: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: -40,
  },
});
