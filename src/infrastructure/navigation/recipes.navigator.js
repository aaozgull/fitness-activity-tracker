import { Image, StyleSheet, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import RecipeDetails from "../../features/recipes/screens/RecipeDetails";
import RecipeScreen from "../../features/recipes/screens/RecipeScreen";
import Search from "../../features/recipes/screens/Search";

import { getRecipesList } from "../../features/recipes/http/index";
import { setRecipesData, setHealthyRecipesData } from "../../store/recipeSlice";

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
  const dispatch = useDispatch();
  //////get recipes/////
  /*  useEffect(() => {
    (async () => {
      const rec = await handleRecipesFetch(null, "15");
      console.log("rec fetching recipes :>> " + rec);
      dispatch(setRecipesData({ recipesData: rec }));
      const healthyRec = await handleRecipesFetch("healthy", "5");
      console.log("healthyRec fetching recipes :>> " + healthyRec);
      dispatch(setHealthyRecipesData({ healthyRecipesData: healthyRec }));
    })();
  }, []);

  const handleRecipesFetch = async (tags, size) => {
    try {
      const recipes = await getRecipesList(tags, size);
      console.log(`------------------getRecipesList------ ${recipes} `);
      return recipes?.data?.results;
    } catch (e) {
      console.log("error fetching recipes :>> ", e);
    }
  }; */
  //////End get recipes/////
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: "center", headerShadowVisible: false }}
    >
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerLeft: null, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerLeft: (props) => <BackButton {...props} /> }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
          title: "",
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
