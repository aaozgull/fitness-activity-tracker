import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import RecipesNavigator from "./recipes.navigator";
import { colors } from "../theme/colors";
import ReviewMealScreen from "../../features/recipes/screens/ReviewMealScreen";

const Tab = createBottomTabNavigator();

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
      headerShown: false,
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
    <Tab.Screen name="create Meal" component={RecipesNavigator} />

    <Tab.Screen name="recent" component={RecipesNavigator} />

    <Tab.Screen name="favorite" component={ReviewMealScreen} />
  </Tab.Navigator>
);

export default MealNavigator;
