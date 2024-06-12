import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
//import AuthScreen from "../../features/account/screens/AuthScreen";
import { AuthNavigator } from "./auth.navigator";
import StartUpScreen from "../../features/account/screens/StartUpScreen";
/*import { RecipesNavigator } from "./recipes.navigator";
import WorkoutNavigator from "./Workout.navigator";
import { getRecipesList } from "../../features/recipes/http";
import { setRecipesData, setHealthyRecipesData } from "../../store/recipeSlice";
import NoExerciseScreen from "../../features/Workout/screens/NoExerciseScreen";
import ExerciseCommentScreen from "../../features/Workout/screens/ExerciseCommentScreen";
import RestScreen from "../../features/Calendar/screen/RestScreen";
import EmailNotificationScreen from "../../features/account/screens/EmailNotificationScreen";
 import TodayWorkoutScreen from "../../features/Calendar/screen/TodayWorkoutScreen";
import TimerScreen from "../../features/Calendar/screen/TimerScreen";
import CalendarNavigator from "./Calendar.navigator";
import { child, get, getDatabase, off, onValue, ref } from "firebase/database";
import { getFirebaseApp } from "../../utils/firebaseHelper";
import { setCalendarData } from "../../store/calendarSlice";
import { setCalendarActivitiesData } from "../../store/calendarActivitiesSlice";
import { colors } from "../theme/colors";
import commonStyles from "../../constants/commonStyles"; */
//import CalendarSetupScreen from "../../features/account/screens/CalendarSetupScreen";

export const Navigation = () => {
  //const dispatch = useDispatch();

  //const [isLoading, setIsLoading] = useState(true);

  //const userData = useSelector((state) => state.auth.userData);
  //const storedUsers = useSelector((state) => state.users.storedUsers);
  /*
  useEffect(() => {
    console.log("Subscribing to firebase listeners");

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    /////////////Get user Calendar/////////////////////
  /*  const userCalendarRef = child(
      dbRef,
      `userCalendar/QgPXoTfEpzS3URF4nzUO8aEO8xi1`
    );
    const refs = [userCalendarRef];

    onValue(userCalendarRef, (querySnapshot) => {
      const calendarIdsData = querySnapshot.val() || {};
      const calendarIds = Object.values(calendarIdsData);
      //console.log(`calendarIds ${calendarIds}`);
      const calendarData = {};
      let calendarFoundCount = 0;

      for (let i = 0; i < calendarIds.length; i++) {
        const calendarId = calendarIds[i];
        const calendarRef = child(dbRef, `calendar/${calendarId}`);
        refs.push(calendarRef);

        onValue(calendarRef, (calendarSnapshot) => {
          calendarFoundCount++;

          const caldata = calendarSnapshot.val();

          if (caldata) {
            caldata.key = calendarSnapshot.key;
            calendarData[calendarSnapshot.key] = caldata;
          }

          if (calendarFoundCount >= calendarIds.length) {
            dispatch(setCalendarData({ calendarData: calendarData }));
            // console.log(`dispatch(setCalendarData) ${calendarData}`);
            setIsLoading(false);
          }
        });

        const activitiesRef = child(dbRef, `activities/${calendarId}`);
        refs.push(activitiesRef);

        onValue(activitiesRef, (activitiesSnapshot) => {
          const calendarActivitiesData = activitiesSnapshot.val();
         
          dispatch(
            setCalendarActivitiesData({
              calendarId,
              calendarActivitiesData: calendarActivitiesData,
            })
          );
        });
      }
    });
    return () => {
      console.log("Unsubscribing firebase listeners");
      refs.forEach((ref) => off(ref));
    };
  }, []);
  if (isLoading) {
    <View style={commonStyles.center}>
      <ActivityIndicator size={"large"} color={colors.ui.tertiary} />
    </View>;
  }*/
  ///////////////end User Calendar ///////////////////
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  const isAuth = useSelector(
    (state) => state.auth.token !== null && state.auth.token !== ""
  );
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const isNewRegistration = useSelector(
    (state) => state.auth.isNewRegistration
  );
  console.log("isAuth");
  console.log(isAuth);
  console.log("didTryAutoLogin");
  console.log(didTryAutoLogin);

  /*
  useEffect(() => {
    (async () => {
      try {
        // console.log(`================================================ `);
        const rec = await handleRecipesFetch(null, "15");
        dispatch(setRecipesData({ recipesData: rec }));
        const healthyRec = await handleRecipesFetch("healthy", "5");
        dispatch(setHealthyRecipesData({ healthyRecipesData: healthyRec }));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false); // Set loading state to false when done
      }
    })();
  }, []);

  const handleRecipesFetch = async (tags, size) => {
    try {
      const recipes = await getRecipesList(tags, size);
      return recipes?.data?.results || [];
    } catch (e) {
      console.log("error fetching recipes :>> ", e);
      return [];
    }
  }; */

  /* if (loading) {
    return <ActivityIndicator size="small" color="blue" />;
  } */

  // Uncomment and modify this block based on your Redux state and navigation logic

  return (
    <NavigationContainer>
      {/*   <EmailNotificationScreen />*/}
      {isAuth && !isNewRegistration && <AppNavigator />}
      {isAuth && isNewRegistration && <AccountNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};
