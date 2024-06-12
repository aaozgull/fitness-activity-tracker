import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import Categories from "../components/Categories";
import Input from "../components/Input";
import RecipeCard from "../components/RecipeCard";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";

const RecipeScreen = ({ navigation }) => {
  // console.log(`------------------RecipeScreen------ `);
  const recipes = useSelector((state) => state.recipes.recipesData) || [];
  // console.log(`------------------RecipeScreen------ ${recipes} `);
  const healthyRecipes = useSelector(
    (state) => state.recipes.healthyRecipesData ?? {}
  );
  /*  console.log(
    `------------------RecipeScreen------ ${Object.keys(healthyRecipes)} `
  ); */

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const tagsList = [];
    // console.log(`------------------recipe?.tags?------ ${recipes.length} `);

    recipes?.forEach((recipe) => {
      //   console.log(`------------------recipe?.tags?------ ${recipe?.tags} `);
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

  return (
    <SafeAreaView style={styles.container}>
      <Input pressable onPress={() => navigation.navigate("Search")} />

      {/*  <Title text="Healthy Recipes" /> */}
      <PageTitle title="Healthy Recipes" />

      <FlatList
        horizontal
        data={healthyRecipes}
        style={{ marginHorizontal: -24 }}
        keyExtractor={(item) => String(item?.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RecipeCard
            style={index === 0 ? { marginLeft: 24 } : {}}
            onPress={() => navigation.navigate("RecipeDetails", { item })}
            title={item?.name}
            time={item?.cook_time_minutes}
            image={item?.thumbnail_url}
            rating={item?.user_ratings?.score}
            author={
              item?.credits?.length
                ? {
                    name: item?.credits[0]?.name,
                    image: item?.credits[0]?.image_url,
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
            onPress={() => navigation.navigate("RecipeDetails", { item })}
            title={item?.name}
            servings={item?.num_servings}
            image={item?.thumbnail_url}
            rating={item?.user_ratings?.score}
            author={
              item?.credits?.length
                ? {
                    name: item?.credits[0]?.name,
                    image: item?.credits[0]?.image_url,
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
    paddingHorizontal: 24,
    backgroundColor: colors.bg.primary,
  },
  list: {
    marginBottom: 24,
  },
});
