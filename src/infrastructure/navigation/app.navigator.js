import React, { useState, useCallback, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from "@react-navigation/native";

import { navigationRef } from "./navigationRef";
import DashBoardNavigator from "./DashBoard.navigator";
import ChatNavigator from "./Chat.navigator";
import CalendarNavigator from "./Calendar.navigator";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  DashBoard: "fitness",
  Chat: "chatbubble-outline",
  Calendar: "calendar-outline",
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

const getNestedRouteName = (route) => {
  //console.log(
  // "Entering getNestedRouteName with route: ",
  // JSON.stringify(route, null, 2)
  //);

  if (!route?.state) {
    return route.name; // If there's no state, return the route's name
  }

  const currentRoute = route.state.routes[route.state.index];
  //console.log("Current Route in getNestedRouteName: ", currentRoute);

  if (currentRoute.state) {
    return getNestedRouteName(currentRoute); // Recursively call for nested state
  }

  const nestedFocusedRouteName = getFocusedRouteNameFromRoute(currentRoute);
  //console.log("Nested Focused Route Name: ", nestedFocusedRouteName);

  return nestedFocusedRouteName || currentRoute.name;
};

export const AppNavigator = ({ navigation, route }) => {
  const [tabBarVisible, setTabBarVisible] = useState(true);

  const handleRouteChange = () => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    //console.log("Current Route from navigationRef:", currentRoute);

    if (currentRoute) {
      const nestedRouteName = getNestedRouteName(currentRoute);

      //console.log("RouteName", currentRoute.name);
      //console.log("NestedRouteName", nestedRouteName);

      if (nestedRouteName === "Recipe") {
        setTabBarVisible(false);
      } else {
        setTabBarVisible(true);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", handleRouteChange);

    return () => {
      unsubscribe();
    };
  }, [navigation, route]);

  useFocusEffect(
    useCallback(() => {
      const currentRoute = navigationRef.current?.getCurrentRoute();
      //console.log("useFocusEffect triggered with route: ", currentRoute);

      if (currentRoute) {
        const nestedRouteName = getNestedRouteName(currentRoute);

        //console.log("RouteName in useFocusEffect: ", currentRoute.name);
        //console.log("NestedRouteName in useFocusEffect: ", nestedRouteName);

        if (nestedRouteName === "Recipe") {
          setTabBarVisible(false);
        } else {
          setTabBarVisible(true);
        }
      }
    }, [route])
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "DashBoard";
        //  //console.log("route  ", route);
        //  //console.log("routeName  ", routeName);
        return {
          tabBarActiveTintColor: colors.ui.tertiary,
          tabBarInactiveTintColor: colors.ui.gray500,
          headerShown: false,
          headerShadowVisible: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontFamily: "mediumItalic",
            letterSpacing: 0.3,
            fontSize: 16,
            paddingBottom: 10,
          },
          /*  tabBarStyle:
            routeName === "Calendar" ? { display: "none" } : { height: 70 }, */
          tabBarStyle: {
            height: 70,
            display: tabBarVisible ? "flex" : "none",
          },
          tabBarIcon: ({ size, color }) => {
            const iconName = TAB_ICON[route.name];
            let iconValue = (
              <Ionicons name={iconName} size={size} color={color} />
            );
            if (iconName === "dumbbell")
              iconValue = (
                <FontAwesome5 name="dumbbell" size={size} color={color} />
              );
            return iconValue;
          },
        };
      }}
    >
      <Tab.Screen name="Calendar" component={CalendarNavigator} />
      <Tab.Screen name="DashBoard" component={DashBoardNavigator} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
    </Tab.Navigator>
  );
};
