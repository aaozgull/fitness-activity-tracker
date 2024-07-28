import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../infrastructure/theme/colors";
import timer from "../../../../assets/recipe/timer.png";
import {
  addFavouriteMeal,
  removeFavouriteMeal,
} from "../../../store/favouriteMealsSlice";
import { updateFavouritesMeal } from "../../../utils/actions/mealActions"; // Make sure the path is correct

const RecipeCard = ({
  mealId,
  title,
  style,
  image,
  author,
  rating,
  time,
  onPress,
  showFavIcone = false,
}) => {
  const dispatch = useDispatch();
  const favouriteMeals =
    useSelector((state) => state.favouriteMeals.favouriteMealKeys) || [];

  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    // Check if the meal is in the list of favourite meals

    showFavIcone ? setIsFavourite(favouriteMeals.includes(mealId)) : null;
  }, [favouriteMeals, mealId]);
  const handleUpdateFavouritesMeal = async () => {
    /* console.log(
      "handleUpdateFavouritesMeal called with mealId:",
      mealId,
      "isFavourite:",
      !isFavourite
    ); */

    if (!mealId) {
      console.error("Invalid mealId");
      return;
    }

    if (isFavourite) {
      dispatch(removeFavouriteMeal({ mealId }));
    } else {
      dispatch(addFavouriteMeal({ mealId }));
    }
    await updateFavouritesMeal(mealId, !isFavourite);
    setIsFavourite(!isFavourite);
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <Rating rating={rating} />
        </View>

        <Image style={styles.image} source={image} />
      </View>

      <View style={styles.footer}>
        {author ? (
          <View style={styles.row}>
            <Image style={styles.authorImage} source={author.image} />
            <Text style={styles.footerText}>By {author?.name}</Text>
          </View>
        ) : (
          <View />
        )}
        {showFavIcone && (
          <View>
            <TouchableOpacity
              onPress={handleUpdateFavouritesMeal}
              style={styles.addMealButton}
            >
              <AntDesign
                name={isFavourite ? "heart" : "hearto"}
                size={24}
                color={isFavourite ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        {time ? (
          <View style={styles.row}>
            <Image style={styles.authorImage} source={timer} />

            <Text style={styles.footerText}>{time} min</Text>
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
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.ui.grey10,
    padding: 10,
    width: width * 0.7,
    height: 120,
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
    flex: 1,
    fontFamily: "bold",
    letterSpacing: 0.5,
    color: colors.text.primary,
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
    fontFamily: "regular",
    letterSpacing: 0.5,
    color: colors.text.gray500,
  },
  authorImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 8,
    //  backgroundColor: colors.text.grey300,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: -40,
  },
  addMealButton: {
    /*   position: "absolute",
    borderRadius: 2,
    top: 15, /// 23 in other simulator
    right: 5, */
  },
});
