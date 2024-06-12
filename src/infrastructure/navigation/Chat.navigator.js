import React from "react";
import ChatListScreen from "../../features/Chat/screen/ChatListScreen";
import ChatSettingsScreen from "../../features/Chat/screen/ChatSettingsScreen";
import ChatScreen from "../../features/Chat/screen/ChatScreen";
//import ChatListScreen from "../../features/Chat/screen/ChatListScreen";
import NewChatScreen from "../../features/Chat/screen/NewChatScreen";
import ContactScreen from "../../features/Chat/screen/ContactScreen";
import DataListScreen from "../../features/Chat/screen/DataListScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="ChatList"
          component={ChatListScreen}
          options={{
            tabBarLabel: "Chats",
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerTitle: "",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="ChatSettings"
          component={ChatSettingsScreen}
          options={{
            headerTitle: "Settings",
            headerBackTitle: "Back",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            headerTitle: "Contact info",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="DataList"
          component={DataListScreen}
          options={{
            headerTitle: "",
            headerBackTitle: "Back",
          }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "containedModal" }}>
        <Stack.Screen name="NewChat" component={NewChatScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ChatNavigator;
