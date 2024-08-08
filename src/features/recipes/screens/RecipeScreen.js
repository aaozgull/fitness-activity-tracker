import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Card from "../components/Card";
import Categories from "../components/Categories";
import Input from "../components/Input";
import RecipeCard from "../components/RecipeCard";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";

// Highlighted: Default image for fallback
const defaultImage = require("../../../../assets/recipe/slider2.jpg");

const RecipeScreen = ({ route, navigation }) => {
  const { calendarId, activityId } = Object.values(route.params)[1]; // Destructure params
  /*console.log("RecipeScreen params:", route.params);
  console.log(
    "RecipeScreen Object.values(route.params)",
    Object.values(route.params)[1]
  );
  console.log("RecipeScreen calendarId:", calendarId);
  console.log("RecipeScreen activityId:", activityId);
  //}, [params]);*/
  const recipes = useSelector((state) => state.recipes.recipesData) || [];
  const healthyRecipes = useSelector(
    (state) => state.recipes.healthyRecipesData ?? {}
  );

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const tagsList = [];
    recipes?.forEach((recipe) => {
      recipe?.tags?.forEach((tag) => {
        if (!tagsList?.includes(tag?.name)) {
          tagsList?.push(tag?.name);
        }
      });
    });

    setTags(tagsList);
  }, [recipes]);

  useEffect(() => {
    if (selectedTag) {
      const filteredItems = recipes?.filter((rec) => {
        const tag = rec?.tags?.find((t) => t?.name === selectedTag);
        return !!tag;
      });
      setFilteredRecipes(filteredItems);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedTag, recipes]);

  // Highlighted: Function to get image source
  const getImageSource = (imageUrl) => {
    return imageUrl ? { uri: imageUrl } : defaultImage;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input pressable onPress={() => navigation.navigate("SearchRecipe")} />
      <PageTitle title="Healthy Recipes" textStyle={styles.pageTitleStyle} />

      <FlatList
        horizontal
        data={healthyRecipes}
        style={{ marginHorizontal: -24 }}
        keyExtractor={(item) => String(item?.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RecipeCard
            style={index === 0 ? { marginLeft: 24 } : {}}
            onPress={() =>
              navigation.navigate("RecipeDetails", {
                item,
                calendarId,
                activityId,
              })
            }
            // Highlighted: Use getImageSource for image prop
            mealId={item?.id}
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
      />

      <Categories
        categories={tags}
        selectedCategory={selectedTag}
        onCategoryPress={setSelectedTag}
      />

      <FlatList
        horizontal
        data={filteredRecipes}
        style={{ marginHorizontal: -24 }}
        keyExtractor={(item) => String(item?.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            style={index === 0 ? { marginLeft: 24 } : {}}
            onPress={() =>
              navigation.navigate("RecipeDetails", {
                item,
                calendarId,
                activityId,
              })
            }
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

export default React.memo(RecipeScreen);

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
});
