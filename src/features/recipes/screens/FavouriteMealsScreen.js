import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

import Card from "../components/Card";
import Categories from "../components/Categories";
import Input from "../components/Input";
import RecipeCard from "../components/RecipeCard";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";
//import { updateFavouritesMeal } from "../../../store/mealsSlice";

// Highlighted: Default image for fallback
const defaultImage = require("../../../../assets/recipe/slider2.jpg");

const FavouriteMealsScreen = ({ navigation }) => {
  const recipes = useSelector((state) => state.recipes.recipesData) || [];
  const healthyRecipes = useSelector(
    (state) => state.recipes.healthyRecipesData ?? {}
  );
  const favouriteMealIds =
    useSelector((state) => state.favouriteMeals.favouriteMealIds) || [];

  // const [isFavourite, setIsFavourite] = useState([]);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  useEffect(() => {
    const favouriteList = [];
    recipes?.forEach((recipe) => {
      favouriteMealIds.forEach((Id) => {
        if (Id === recipe.id) {
          favouriteList.push(recipe);
        }
      });
    });

    healthyRecipes?.forEach((healthyRecipe) => {
      favouriteMealIds.forEach((Id) => {
        if (Id === healthyRecipe.id) {
          favouriteList.push(healthyRecipe);
        }
      });
    });

    setFavouriteRecipes(favouriteList);
  }, [favouriteMealIds]);

  // Highlighted: Function to get image source
  const getImageSource = (imageUrl) => {
    return imageUrl ? { uri: imageUrl } : defaultImage;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input pressable onPress={() => navigation.navigate("Search")} />
      <PageTitle title="Favourite Meals" textStyle={styles.pageTitleStyle} />

      {/* <TouchableOpacity
        onPress={() => updateFavouritesMeal()}
        style={styles.addMealButton}
      >
        <AntDesign
          name={isFavourite ? "heart" : "hearto"}
          size={hp(4.5)}
          color={isFavourite ? "red" : "white"}
        />
      </TouchableOpacity> */}

      {/*  <FlatList
        horizontal
        data={healthyRecipes}
        style={{ marginHorizontal: -24 }}
        keyExtractor={(item) => String(item?.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RecipeCard
            style={index === 0 ? { marginLeft: 24 } : {}}
            onPress={() => navigation.navigate("RecipeDetails", { item })}
            // Highlighted: Use getImageSource for image prop
            image={getImageSource(item?.thumbnail_url)}
            title={item?.name}
            time={item?.cook_time_minutes}
            rating={item?.user_ratings?.score}
            author={
              item?.credits?.length
                ? {
                    name: item?.credits[0]?.name,
                    // Highlighted: Use getImageSource for author image
                    image: getImageSource(item?.credits[0]?.image_url),
                  }
                : null
            }
          />
        )}
      /> */}

      <FlatList
        horizontal
        data={favouriteRecipes}
        style={{ marginHorizontal: -24 }}
        keyExtractor={(item) => String(item?.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            style={index === 0 ? { marginLeft: 24 } : {}}
            onPress={() => navigation.navigate("RecipeDetails", { item })}
            // Highlighted: Use getImageSource for image prop
            image={getImageSource(item?.thumbnail_url)}
            title={item?.name}
            servings={item?.num_servings}
            rating={item?.user_ratings?.score}
            author={
              item?.credits?.length
                ? {
                    name: item?.credits[0]?.name,
                    // Highlighted: Use getImageSource for author image
                    image: getImageSource(item?.credits[0]?.image_url),
                  }
                : null
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default React.memo(FavouriteMealsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.bg.primary,
  },
  list: {
    marginBottom: 24,
  },
  pageTitleStyle: {
    fontFamily: "black",
    letterSpacing: 0.5,
    fontSize: 22,
  },
  addMealButton: {
    position: "absolute",
    borderRadius: hp(2),
    top: hp(15), /// 23 in other simulator
    right: wp(5),
  },
});
