import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Categories from "../components/Categories";
import Input from "../components/Input";
import RecipeCard from "../components/RecipeCard";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";
import { Divider } from "react-native-paper";

// Highlighted: Default image for fallback
const defaultImage = require("../../../../assets/recipe/slider2.jpg");

const FavouriteMealsScreen = ({ navigation }) => {
  const recipes = useSelector((state) => state.recipes.recipesData) || [];

  const userMeals = useSelector((state) => state.meals.mealsData ?? {});
  const favouriteMealskey =
    useSelector((state) => state.favouriteMeals.favouriteMealKeys) || [];

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("breakfast");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [favouriteMeals, setFavouriteMeals] = useState([]);

  useEffect(() => {
    const tagsList = ["breakfast", "Lunch", "Dinner", "Snack"];
    setTags(tagsList);
  }, []);
  useEffect(() => {
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

    setFavouriteMeals(favMealsList);
  }, [recipes, userMeals, favouriteMealskey]);

  useEffect(() => {
    if (selectedTag) {
      const filteredMeals = favouriteMeals?.filter(
        (rec) => rec.mealTime === selectedTag
      );
      setFilteredMeals(filteredMeals);
    } else {
      setFilteredMeals(favouriteMeals);
    }
  }, [selectedTag, favouriteMeals]);

  // Highlighted: Function to get image source
  const getImageSource = (imageUrl) => {
    return imageUrl ? { uri: imageUrl } : defaultImage;
  };

  if (filteredMeals.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AntDesign
          name="hearto"
          size={100}
          color={colors.text.tertiary}
          style={{ alignSelf: "center", marginTop: 250 }}
        />
        <Text
          style={{
            ...styles.pageTitleStyle,
            marginTop: 20,
            textAlign: "center",
            color: colors.text.tertiary,
          }}
        >
          No Favourite Meals Yet!
        </Text>
        <Text style={{ ...styles.noRecipeText, marginTop: 20 }}>
          Mark meals you frequently eat as your favourites, So you can have
          quick access to them. You can mark meals you create or discover.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Input
        pressable
        placeholder="Search Favourite Meals"
        onPress={() =>
          navigation.navigate("SearchRecipe", { isFavourite: true })
        }
      />
      <PageTitle title="Recent Meals" textStyle={styles.pageTitleStyle} />
      <View>
        <Categories
          categories={tags}
          selectedCategory={selectedTag}
          onCategoryPress={setSelectedTag}
        />
        <Divider style={styles.divider} />
      </View>

      <FlatList
        data={filteredMeals}
        contentContainerStyle={styles.flatListContainer}
        // style={{ marginHorizontal: -24 }}
        keyExtractor={(item) => String(`${item.key}`)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RecipeCard
            style={{ marginLeft: 24 }}
            onPress={() => navigation.navigate("RecipeDetails", { item })}
            mealId={item?.key}
            image={getImageSource(item?.thumbnail_url)}
            title={item?.name}
            time={item?.cook_time_minutes}
            rating={item?.user_ratings?.score}
            author={
              item?.credits?.length
                ? {
                    name: item?.credits[0]?.name,
                    image: getImageSource(item?.credits[0]?.image_url),
                  }
                : null
            }
            showFavIcone={true}
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
  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: colors.text.secondary,
  },
  flatListContainer: {
    // paddingBottom: 24,
  },

  pageTitleStyle: {
    fontFamily: "black",
    letterSpacing: 0.5,
    fontSize: 22,
  },
  noRecipeText: {
    color: colors.text.tertiary,
    fontFamily: "regular",
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
