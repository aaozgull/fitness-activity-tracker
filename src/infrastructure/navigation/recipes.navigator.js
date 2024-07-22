import { Image, StyleSheet, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import RecipeDetails from "../../features/recipes/screens/RecipeDetails";
import RecipeScreen from "../../features/recipes/screens/RecipeScreen";
import Search from "../../features/recipes/screens/Search";
import CreateRecipeScreen from "../../features/recipes/screens/CreateRecipeScreen";
import ReviewMealScreen from "../../features/recipes/screens/ReviewMealScreen";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();

const BackButton = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Image
        style={styles.back}
        source={require("../../../assets/recipe/back.png")}
      />
    </Pressable>
  );
};
const RecipesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: "center", headerShadowVisible: false }}
    >
      {/*    <Stack.Screen
        name="CreateRecipe"
        component={CreateRecipeScreen}
        options={{ headerLeft: null, gestureEnabled: false }}
      /> */}
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={
          {
            headerLeft: (props) => <BackButton {...props} />,
            headerStyle: { backgroundColor: colors.ui.fiftary },
            headerTintColor: { color: colors.text.grey10 },
          } /* { headerLeft: null, gestureEnabled: false } */
        }
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
          headerStyle: { backgroundColor: colors.ui.fiftary },
          headerTintColor: { color: colors.text.grey10 },
        }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
          title: "Recipe Details",
          headerStyle: { backgroundColor: colors.ui.fiftary },
          headerTintColor: { color: colors.text.grey10 },
        }}
      />
      <Stack.Screen
        name="ReviewMealScreen"
        component={ReviewMealScreen}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
          title: "Review Meal",
          headerStyle: { backgroundColor: colors.ui.fiftary },
          headerTintColor: { color: colors.text.grey10 },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  back: {
    width: 24,
    height: 24,
    margin: 16,
  },
});

export default RecipesNavigator;
