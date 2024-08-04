import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import {
  startOfMonth,
  eachDayOfInterval,
  endOfMonth,
  addMonths,
  format,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import { CalendarItem } from "../../Calendar/component/calendar-Item.component";
import { theme } from "../../../infrastructure/theme";
import PageTitle from "../../../components/utility/PageTitle";
import { getFormattedDate } from "../../../utils/date";
import TransparentMenu from "./TransparentMenu";
import PageContainer from "../../../components/utility/PageContainer";
import HeaderLogo from "../../../components/utility/HeaderLogo";
import {
  // createCalendar,
  // updateActivitiesData,
  addActivitiesData,
} from "../../../utils/actions/calendarActions";
import {
  addCalendarActivity,
  // updateCalendarActivity,
} from "../../../store/calendarActivitiesSlice";
import SubMenuItems from "../component/sub-menu-items.component";

const CalendarScreen = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSubmenuVisible, setSubmenuVisible] = useState(false); // New state for submenu visibility

  const [selectedItem, setSelectedItem] = useState({});
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const calendarData = useSelector((state) => state.calendar.calendarData);
  //console.log(`------------ Calendar Screen`, calendarData);

  /* const calendarActivitiesData = useSelector(
    (state) => state.activities.calendarActivitiesData
  ); */

  /* console.log(`--------------- create Calendar`);
  createCalendar(`QgPXoTfEpzS3URF4nzUO8aEO8xi1`, dispatch);
  console.log(`-------------end-- create Calendar`); */

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  // Handle closing submenu modal
  const handleCloseSubmenu = () => {
    setSubmenuVisible(false);
  };
  // Display calendarData values
  // console.log("CalendarData:", calendarData);

  /* Object.entries(calendarData).map(([key, value]) =>
    console.log(`CalendarData ${key}:  ${value.date}`)
  ); */

  // const dates = [];

  let startIndex = 0;
  const currentDate = new Date();
  /* console.log(
    `CalendarData  ${currentDate.toISOString()} ${getFormattedDate(currentDate)}`
  ); */
  useEffect(() => {
    let indexFound = 0;
    const currentDate = new Date();
    const formattedCurrentDate = getFormattedDate(currentDate);
    Object.entries(calendarData).map(([key, value]) => {
      // console.log(`CalendarData ${key}:  ${value}`);
      const day = new Date(value.date);
      if (day instanceof Date && !isNaN(day)) {
        const formattedDate = getFormattedDate(day);
        if (formattedDate === formattedCurrentDate) {
          indexFound = 1;
        } else if (indexFound === 0) {
          startIndex++;
        }
      }
    });
  }, [calendarData]);

  const handleSelectSubmenuItem = async (subMenuItem) => {
    //console.log(`Pressed ${subMenuItem.text}`); // Access the text property of the selected item
    setSubmenuVisible(false);
    handleSelectMenuItem(subMenuItem);
  };

  const handleSelectMenuItem = async (menuItem) => {
    console.log(`Pressed ${menuItem.text}`); // Access the text property of the selected item

    setMenuVisible(false);
    if (menuItem.text === "Activity") {
      setSubmenuVisible(true); // Open submenu modal
    }
    if (menuItem.text !== "Activity") {
      addActivitiesData(selectedItem.calendarId, userData.userId, menuItem)
        .then((activityId) => {
          console.log("New activity added with ID:", activityId);
          // Now you can dispatch your action with the new activity
          dispatch(
            addCalendarActivity({
              calendarId: selectedItem.calendarId,
              activity: { ...menuItem, id: activityId },
            })
          );
        })
        .catch((error) => {
          console.error("Error adding activity:", error);
        });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderLogo />,
    });
  }, []);

  const itemHeight =
    2 * theme.spaceInNumber[1] + // Vertical margin
    theme.spaceInNumber[3] + // Padding for dateContainer
    2 * theme.fontSizesInNumber.body + // Height of two Text components
    3 * theme.spaceInNumber[3] + // Padding for ToDoItem
    2 * theme.fontSizesInNumber.body; // Height of two Text components in ToDoItem

  return (
    <PageContainer style={styles.container}>
      {/*  <View style={styles.calendarContainer}> */}
      <PageTitle
        title="Calendar"
        style={styles.pageTitle}
        textStyle={styles.pageTitleColor}
      />
      <View style={styles.divider}></View>
      <FlatList
        data={Object.entries(calendarData).map(
          ([calendarId, calendarData]) => ({
            calendarId,
            date: new Date(calendarData.date),
          })
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <CalendarItem
                date={item.date}
                selectedDate={selectedItem}
                calendarId={item.calendarId} // Pass the calendar ID here
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.calendarId}
        initialScrollIndex={startIndex > 10 ? startIndex - 10 : startIndex}
        getItemLayout={(data, index) => ({
          length: theme.spaceInNumber[3] + theme.spaceInNumber[1] + 50, // Adjust this based on your item height
          offset:
            (theme.spaceInNumber[3] + theme.spaceInNumber[1] + 50) * index,
          index,
        })}
      />
      <TransparentMenu
        isVisible={isMenuVisible}
        onClose={handleCloseMenu}
        selectedItem={selectedItem.date}
        onSelectedMenuItem={handleSelectMenuItem}
      />
      <SubMenuItems
        isVisible={isSubmenuVisible}
        selectedDate={selectedItem}
        onClose={handleCloseSubmenu}
        onSelectedMenuItem={handleSelectSubmenuItem}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 10,
    backgroundColor: theme.colors.ui.primary,
  },

  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pageTitle: {
    backgroundColor: theme.colors.ui.quaternary,
  },
  pageTitleColor: {
    color: theme.colors.text.fiftary,
    fontSize: 28,
  },
  divider: {
    backgroundColor: theme.colors.ui.accent2,
    padding: 8,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    elevation: 3,
    shadowColor: theme.colors.ui.quaternary, // "#39324a", // GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
});

export default CalendarScreen;
