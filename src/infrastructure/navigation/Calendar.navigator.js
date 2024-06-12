import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarScreen from "../../features/Calendar/screen/Calendar-screen";
import WorkoutNavigator from "./Workout.navigator";
import RecipesNavigator from "./recipes.navigator";
import TimerScreen from "../../features/Calendar/screen/TimerScreen";
import ReadBooksScreen from "../../features/Calendar/screen/ReadBooksScreen";
import ThumbUpScreen from "../../features/Calendar/screen/ThumbUpScreen";
import TodayWorkoutScreen from "../../features/Calendar/screen/TodayWorkoutScreen";
import RestScreen from "../../features/Calendar/screen/RestScreen";

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

      <Stack.Screen name="Recipes" component={RecipesNavigator} />
      <Stack.Screen name="TimerScreen" component={TimerScreen} />
      <Stack.Screen name="ReadBooks" component={ReadBooksScreen} />
      <Stack.Screen name="ThumbUp" component={ThumbUpScreen} />
      <Stack.Screen name="TodayWorkout" component={TodayWorkoutScreen} />
      <Stack.Screen
        name="Rest"
        component={RestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
