import React from "react";
import { Image, StyleSheet, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeDetails from "../../features/recipes/screens/RecipeDetails";
import RecipeScreen from "../../features/recipes/screens/RecipeScreen";
import Search from "../../features/recipes/screens/Search";
import CreateRecipeScreen from "../../features/recipes/screens/CreateRecipeScreen";
import ReviewMealScreen from "../../features/recipes/screens/ReviewMealScreen";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();

const BackButton = ({ onPress }) => (
  <Pressable onPress={onPress} style={{ marginLeft: 16 }}>
    <Image
      style={styles.back}
      source={require("../../../assets/recipe/back.png")}
    />
  </Pressable>
);

const RecipesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.ui.fiftary },
        headerTintColor: colors.text.grey10,
      }}
    >
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="SearchRecipe"
        component={Search}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          title: "Recipe Details",
        })}
      />
      <Stack.Screen
        name="ReviewMealScreen"
        component={ReviewMealScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          title: "Review Meal",
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  back: {
    width: 24,
    height: 24,
    // margin: 16,
  },
});

export default RecipesNavigator;
