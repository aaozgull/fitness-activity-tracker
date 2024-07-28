import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Card from "../components/Card";
import Input from "../components/Input";
const defaultImage = require("../../../../assets/recipe/slider2.jpg");

const Search = ({ navigation, route }) => {
  const { isFavouriteScreen = null } = route.params || {};

  const recipes = useSelector((state) => state.recipes.recipesData);
  const userMeals = useSelector((state) => state.meals.mealsData ?? {});
  const favouriteMealskey =
    useSelector((state) => state.favouriteMeals.favouriteMealKeys) || [];
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log("isFavourite:", isFavouriteScreen);
    if (isFavouriteScreen === true) {
      console.log("isFavourite1:", isFavouriteScreen);

      const favMealsList = [];
      const favMeals = [];

      favouriteMealskey.forEach((key) => {
        Object.values(userMeals).forEach((meal) => {
          if (key === meal.key) {
            favMeals.push(meal);
          }
        });
      });

      recipes?.forEach((recipe) => {
        favMeals.forEach((meal) => {
          if (recipe.id === meal.mealId) {
            const newMealData = {
              ...recipe,
              ...meal,
            };
            favMealsList?.push(newMealData);
          }
        });
      });

      setSelectedMeals(favMealsList);
    } else if (isFavouriteScreen === false) {
      console.log("isFavourite2:", isFavouriteScreen);

      const recentMealsList = [];
      recipes?.forEach((recipe) => {
        Object.values(userMeals).forEach((meal) => {
          if (recipe.id === meal.mealId) {
            const newMealData = {
              ...recipe,
              ...meal,
            };
            recentMealsList?.push(newMealData);
          }
        });
      });
      setSelectedMeals(recentMealsList);
    } else {
      console.log("isFavourite3:", isFavouriteScreen);

      setSelectedMeals(recipes);
    }
  }, [recipes, userMeals, keyword, favouriteMealskey]);

  useEffect(() => {
    if (keyword?.length > 2) {
      const filteredItems = selectedMeals?.filter((rec) =>
        rec?.name?.toLowerCase()?.includes(keyword?.toLowerCase())
      );
      setFilteredRecipes(filteredItems);
    } else {
      setFilteredRecipes([]);
    }
  }, [keyword]);
  const getImageSource = (imageUrl) => {
    return imageUrl ? { uri: imageUrl } : defaultImage;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input autoFocus onChangeText={setKeyword} value={keyword} />

      <FlatList
        data={filteredRecipes}
        numColumns={2}
        style={{ flexGrow: 1 }}
        keyExtractor={(item) => String(item?.id)}
        renderItem={({ item, index }) => (
          <Card
            title={item?.name}
            onPress={() => navigation.navigate("RecipeDetails", { item })}
            servings={item?.num_servings}
            image={getImageSource(item?.thumbnail_url)}
            rating={item?.user_ratings?.score}
            author={
              item?.credits?.length
                ? {
                    name: item?.credits[0]?.name,
                    image: getImageSource(item?.credits[0]?.image_url),
                  }
                : null
            }
            isFavourite={item?.isFavourite}
            showFavIcon={isFavouriteScreen}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default React.memo(Search);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    flex: 1,
  },
});
