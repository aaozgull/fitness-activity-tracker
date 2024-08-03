import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BodyWeightDetail from "../../features/dashBoard/component/linear-chart/bodyWeightDetail";
import { SettingsNavigator } from "./settings.navigator";
import { DashBoardScreen } from "../../features/dashBoard/screens/dashBoard-screen";
import TasksStatus from "../../features/dashBoard/screens/TasksStatus";
import { GalleryScreen } from "../../features/photoGallery/screen/gallery-screen";
import LogProgressScreen from "../../features/photoGallery/screen/LogProgressScreen";

const DashBoardStack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <DashBoardStack.Navigator>
      <DashBoardStack.Group>
        <DashBoardStack.Screen
          name="DashBoardScreen"
          component={DashBoardScreen}
        />
        <DashBoardStack.Screen
          name="LogProgressScreen"
          component={LogProgressScreen}
        />
        <DashBoardStack.Screen name="TasksStatus" component={TasksStatus} />
        <DashBoardStack.Screen name="Settings" component={SettingsNavigator} />
      </DashBoardStack.Group>

      <DashBoardStack.Group screenOptions={{ presentation: "containedModal" }}>
        <DashBoardStack.Screen
          name="bodyWeightDetail"
          component={BodyWeightDetail}
        />
        <DashBoardStack.Screen name="GalleryScreen" component={GalleryScreen} />
      </DashBoardStack.Group>
    </DashBoardStack.Navigator>
  );
};

const DashBoardNavigator = (props) => {
  /*  */

  return <StackNavigator />;
};

export default DashBoardNavigator;
