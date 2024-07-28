import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarScreen from "../../features/Calendar/screen/Calendar-screen";
import WorkoutNavigator from "./Workout.navigator";
//import RecipesNavigator from "./recipes.navigator";
import MealNavigator from "./Meal.navigator";
import TimerScreen from "../../features/Calendar/screen/TimerScreen";
import ReadBooksScreen from "../../features/Calendar/screen/ReadBooksScreen";
import ThumbUpScreen from "../../features/Calendar/screen/ThumbUpScreen";
import TodayWorkoutScreen from "../../features/Calendar/screen/TodayWorkoutScreen";
import RestScreen from "../../features/Calendar/screen/RestScreen";
import BodyStatsNavigator from "./BodyStats.navigator";

const Stack = createNativeStackNavigator();

const CalendarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen
        name="Workout"
        component={WorkoutNavigator}
        options={{
          headerShown: false,
          //headerTitle: "",
        }}
      />

      <Stack.Screen
        name="Recipes"
        component={MealNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BodyStats"
        component={BodyStatsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TimerScreen" component={TimerScreen} />
      <Stack.Screen
        name="ReadBooks"
        component={ReadBooksScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThumbUp"
        component={ThumbUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TodayWorkout"
        component={TodayWorkoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rest"
        component={RestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
