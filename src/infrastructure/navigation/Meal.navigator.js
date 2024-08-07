import React from "react";
import { Image, StyleSheet, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import RecipesNavigator from "./recipes.navigator";
import { colors } from "../theme/colors";
import ReviewMealScreen from "../../features/recipes/screens/ReviewMealScreen";
import RecentMealsScreen from "../../features/recipes/screens/RecentMealsScreen";
import FavouriteMealsScreen from "../../features/recipes/screens/FavouriteMealsScreen";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

const BackButton = ({ onPress }) => (
  <Pressable onPress={onPress} style={{ marginLeft: 16 }}>
    <Image
      style={styles.back}
      source={require("../../../assets/recipe/back.png")}
    />
  </Pressable>
);

const TAB_ICON = {
  "create Meal": "nutrition-outline",
  recent: "time-outline",
  favorite: "heart-outline",
};

const MealNavigator = ({ route }) => {
  const { params } = route; // Destructure params
  //console.log("================Navigating to  { params }:", params);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.ui.tertiary,
        tabBarInactiveTintColor: colors.ui.gray500,
        // headerTitle: "",
        //headerShown: false,
        headerShadowVisible: false,
        tabBarHideOnKeyboard: true,

        tabBarLabelStyle: {
          fontFamily: "mediumItalic",
          letterSpacing: 0.3,
          fontSize: 16,
          paddingBottom: 10,
        },
        //headerShown: false,

        tabBarStyle: {
          height: 70,
        },
        tabBarIcon: ({ size, color }) => {
          const iconName = TAB_ICON[route.name];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="create Meal"
        options={{ headerShown: false }}
        children={() => <RecipesNavigator params={params} />} // Pass params as props
        //component={RecipesNavigator}
        //initialParams={{ params }} // Pass params to RecipesNavigator
      />

      <Tab.Screen
        name="recent"
        component={RecentMealsScreen}
        options={
          ({ navigation }) => ({
            headerLeft: () => (
              <BackButton onPress={() => navigation.goBack()} />
            ),
            headerStyle: { backgroundColor: colors.ui.fiftary },
            headerTintColor: { color: colors.text.grey10 },
          }) /* { headerLeft: null, gestureEnabled: false } */
        }
      />

      <Tab.Screen
        name="favorite"
        component={FavouriteMealsScreen}
        options={
          ({ navigation }) => ({
            headerLeft: () => (
              <BackButton onPress={() => navigation.goBack()} />
            ),
            headerStyle: { backgroundColor: colors.ui.fiftary },
            headerTintColor: { color: colors.text.grey10 },
          }) /* { headerLeft: null, gestureEnabled: false } */
        }
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  back: {
    width: 24,
    height: 24,
    margin: 16,
  },
});

export default MealNavigator;
