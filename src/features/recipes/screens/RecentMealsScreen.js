import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import Categories from "../components/Categories";
import Input from "../components/Input";
import RecipeCard from "../components/RecipeCard";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";
import { Divider } from "react-native-paper";

// Highlighted: Default image for fallback
const defaultImage = require("../../../../assets/recipe/slider2.jpg");

const RecentMealsScreen = ({ navigation }) => {
  const recipes = useSelector((state) => state.recipes.recipesData) || [];
  const healthyRecipes =
    useSelector((state) => state.recipes.healthyRecipesData) || [];
  const userMeals = useSelector((state) => state.meals.mealsData ?? {});

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("breakfast");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [recentMeals, setRecentMeals] = useState([]);

  useEffect(() => {
    const tagsList = ["breakfast", "Lunch", "Dinner", "Snack"];
    setTags(tagsList);
  }, []);
  useEffect(() => {
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

    /*    healthyRecipes?.forEach((recipe) => {
      Object.values(userMeals).forEach((meal) => {
        if (recipe.id === meal.mealId) {
          console.log("healthy recipe ", recipe.id);
          console.log("meal ", meal.mealId);
          const newMealData = {
            ...recipe,
            ...meal,
            source: "healthyRecipe",
          };
          //  console.log("newMealData", newMealData);
          recentMealsList?.push(newMealData);
        }
      });
    }); */

    setRecentMeals(recentMealsList);
  }, [recipes, userMeals]);

  useEffect(() => {
    if (selectedTag) {
      const filteredMeals = recentMeals?.filter(
        (rec) => rec.mealTime === selectedTag
      );
      //   console.log("filteredMeals", filteredMeals);
      setFilteredMeals(filteredMeals);
    } else {
      setFilteredMeals(recentMeals);
    }
  }, [selectedTag, recentMeals]);

  // Highlighted: Function to get image source
  const getImageSource = (imageUrl) => {
    return imageUrl ? { uri: imageUrl } : defaultImage;
  };

  if (filteredMeals.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MaterialIcons
          name="restaurant"
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
          No Recent Meals Yet!
        </Text>
        <Text style={{ ...styles.noRecipeText, marginTop: 20 }}>
          Each Meal you log will appear here
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("create Meal")}
          style={{ alignSelf: "center", marginTop: 20 }}
        >
          <Text
            style={{
              ...styles.pageTitleStyle,
              color: colors.ui.accent,
            }}
          >
            Create Meal
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Input
        pressable
        placeholder="Search Recent Meals"
        onPress={() =>
          navigation.navigate("SearchRecipe", { isFavourite: false })
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

export default React.memo(RecentMealsScreen);

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
    // marginBottom: 14,
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
