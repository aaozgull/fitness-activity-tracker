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

const TAB_ICON = {
  DashBoard: "fitness", //"md-restaurant",
  Chat: "chatbubble-outline",
  Checkout: "md-cart",
  Workout: "dumbbell",
  Calendar: "calendar-outline",
  //Settings: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    headerShown: false,
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};
const MealNavigator = () => (
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
      component={RecipesNavigator}
      options={{ headerShown: false }}
    />

    <Tab.Screen
      name="recent"
      component={RecentMealsScreen}
      options={
        {
          headerLeft: (props) => <BackButton {...props} />,
          headerStyle: { backgroundColor: colors.ui.fiftary },
          headerTintColor: { color: colors.text.grey10 },
        } /* { headerLeft: null, gestureEnabled: false } */
      }
    />

    <Tab.Screen
      name="favorite"
      component={FavouriteMealsScreen}
      options={
        {
          headerLeft: (props) => <BackButton {...props} />,
          headerStyle: { backgroundColor: colors.ui.fiftary },
          headerTintColor: { color: colors.text.grey10 },
        } /* { headerLeft: null, gestureEnabled: false } */
      }
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  back: {
    width: 24,
    height: 24,
    margin: 16,
  },
});

export default MealNavigator;
