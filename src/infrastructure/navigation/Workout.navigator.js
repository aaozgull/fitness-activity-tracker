import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerciseDetailScreen from "../../features/Workout/screens/ExerciseDetailScreen";
import NoExerciseScreen from "../../features/Workout/screens/NoExerciseScreen";
import ExerciseCommentScreen from "../../features/Workout/screens/ExerciseCommentScreen";

import WorkoutScreen from "../../features/Workout/screens/WorkoutScreen";
import ExercisesScreen from "../../features/Workout/screens/ExercisesScreen";
import AddTask from "../../features/Workout/screens/AddTask";

//import TimerScreen from "../../../";

const WorkoutStack = createNativeStackNavigator();

const WorkoutNavigator = () => {
  return (
    <WorkoutStack.Navigator /*  headerMode="none" */>
      <WorkoutStack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />
      <WorkoutStack.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={{ headerShown: false }}
      />

      <WorkoutStack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{ headerShown: false }}
      />
      <WorkoutStack.Screen name="NoExercise" component={NoExerciseScreen} />
      <WorkoutStack.Screen
        name="ExerciseComment"
        component={ExerciseCommentScreen}
      />
      <WorkoutStack.Screen
        name="AddTask"
        component={AddTask}
        options={{ headerShown: false }}
      />
    </WorkoutStack.Navigator>
  );
};

export default WorkoutNavigator;
