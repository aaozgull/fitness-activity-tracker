import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { child, get, getDatabase, off, onValue, ref } from "firebase/database";

import { getFirebaseApp } from "../../utils/firebaseHelper";
import { setChatsData } from "../../store/chatSlice";
import { setProgressData } from "../../store/progressSlice";
import { colors } from "../theme/colors";
import commonStyles from "../../constants/commonStyles";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BodyWeightDetail from "../../features/dashBoard/component/linear-chart/bodyWeightDetail";
import { SettingsNavigator } from "./settings.navigator";
import { DashBoardScreen } from "../../features/dashBoard/screens/dashBoard-screen";
import TasksStatus from "../../features/dashBoard/screens/TasksStatus";
import { GalleryScreen } from "../../features/photoGallery/screen/gallery-screen";
import LogProgressScreen from "../../features/photoGallery/screen/LogProgressScreen";
import { setChatMessages, setStarredMessages } from "../../store/messagesSlice";

import { setStoredUsers } from "../../store/userSlice";
import { setCalendarData } from "../../store/calendarSlice";
import { setCalendarActivitiesData } from "../../store/calendarActivitiesSlice";
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
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);

  useEffect(() => {
    console.log("Subscribing to firebase listeners");

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    /////////////Get user Calendar/////////////////////
    const userCalendarRef = child(dbRef, `userCalendar/${userData.userId}`);
    const refs = [userCalendarRef];

    onValue(userCalendarRef, (querySnapshot) => {
      const calendarIdsData = querySnapshot.val() || {};
      const calendarIds = Object.values(calendarIdsData);
      console.log(`calendarIds ${calendarIds}`);
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
            console.log(`dispatch(setCalendarData) ${calendarData}`);
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
    ///////////////end User Calendar ///////////////////

    //////get User ProgressLog //////

    const userProgressRef = child(dbRef, `userProgress/${userData.userId}`);
    refs.push(userProgressRef);

    onValue(userProgressRef, (querySnapshot) => {
      const progressIdsData = querySnapshot.val() || {};
      const progressIds = Object.values(progressIdsData);
      console.log(`progressIds ${progressIds}`);
      const progressData = {};
      let progressFoundCount = 0;

      for (let i = 0; i < progressIds.length; i++) {
        const progressId = progressIds[i];
        const progressRef = child(dbRef, `progress/${progressId}`);
        refs.push(progressRef);

        onValue(progressRef, (progressSnapshot) => {
          progressFoundCount++;

          const pdata = progressSnapshot.val();

          if (pdata) {
            /* if (!data.users.includes(userData.userId)) {
              return;
            } */
            pdata.key = progressSnapshot.key;

            progressData[progressSnapshot.key] = pdata;
          }

          if (progressFoundCount >= progressIds.length) {
            dispatch(setProgressData({ progressData }));
            console.log(`dispatch(setProgressData) ${progressData}`);
            //setIsLoading(false);
          }
        });
      }
    });

    //////end get User ProgressLog //////

    const userChatsRef = child(dbRef, `userChats/${userData.userId}`);
    refs.push(userChatsRef);

    onValue(userChatsRef, (querySnapshot) => {
      const chatIdsData = querySnapshot.val() || {};
      const chatIds = Object.values(chatIdsData);
      console.log(`chatIds ${chatIds}`);
      const chatsData = {};
      let chatsFoundCount = 0;

      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i];
        const chatRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatRef);

        onValue(chatRef, (chatSnapshot) => {
          chatsFoundCount++;

          const data = chatSnapshot.val();

          if (data) {
            if (!data.users.includes(userData.userId)) {
              return;
            }
            data.key = chatSnapshot.key;

            data.users.forEach((userId) => {
              if (storedUsers[userId]) return;

              const userRef = child(dbRef, `users/${userId}`);

              get(userRef).then((userSnapshot) => {
                const userSnapshotData = userSnapshot.val();
                dispatch(setStoredUsers({ newUsers: { userSnapshotData } }));
              });

              refs.push(userRef);
            });

            chatsData[chatSnapshot.key] = data;
          }

          if (chatsFoundCount >= chatIds.length) {
            dispatch(setChatsData({ chatsData }));
            console.log(`dispatch(setChatsData) ${chatsData}`);
            setIsLoading(false);
          }
        });

        const messagesRef = child(dbRef, `messages/${chatId}`);
        refs.push(messagesRef);

        onValue(messagesRef, (messagesSnapshot) => {
          const messagesData = messagesSnapshot.val();
          dispatch(setChatMessages({ chatId, messagesData }));
        });

        if (
          calendarFoundCount == 0 ||
          progressFoundCount == 0 ||
          calendarFoundCount == 0
        ) {
          setIsLoading(false);
        }
      }
    });

    const userStarredMessagesRef = child(
      dbRef,
      `userStarredMessages/${userData.userId}`
    );
    refs.push(userStarredMessagesRef);
    onValue(userStarredMessagesRef, (querySnapshot) => {
      const starredMessages = querySnapshot.val() ?? {};
      dispatch(setStarredMessages({ starredMessages }));
    });
    return () => {
      console.log("Unsubscribing firebase listeners");
      refs.forEach((ref) => off(ref));
    };
  }, []);

  if (isLoading) {
    <View style={commonStyles.center}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>;
  }

  return <StackNavigator />;
};

export default DashBoardNavigator;
