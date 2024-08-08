import { getAuth } from "firebase/auth";

import { child, getDatabase, push, ref, update } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";
import { useDispatch } from "react-redux";
import { startOfMonth, eachDayOfInterval, addMonths } from "date-fns";

//import { getFormattedDate } from "../date";
import { setCalendarData } from "../../store/calendarSlice";

export const createCalendar = async (loggedInUserId, dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated");
    return;
  }
  //const dispatch = useDispatch();
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));

  const daysInMonth = generateDatesForThreeMonths();
  for (const day of daysInMonth) {
    //const newday = getFormattedDate(day);
    // console.log(`day ${day}`);
    const newCalendarData = {
      date: day.toISOString(),
      createdBy: loggedInUserId,
      createdAt: new Date().toISOString(),
    };

    const newCalendar = await push(child(dbRef, "calendar"), newCalendarData);
    await push(child(dbRef, `userCalendar/${loggedInUserId}`), newCalendar.key);

    dispatch(
      setCalendarData({
        Key: newCalendar.key,
        calendarData: newCalendarData,
      })
    );
  }
};

const generateDatesForThreeMonths = () => {
  const currentDate = new Date();
  currentDate.setHours(0); // Set hours to 0 (midnight)
  currentDate.setMinutes(0); // Set minutes to 0
  currentDate.setSeconds(0); // Set seconds to 0
  currentDate.setMilliseconds(0);
  // console.log(`currentDate ${currentDate}`);
  const dates = [];

  for (let i = 0; i <= 3; i++) {
    const currentMonth = addMonths(currentDate, i);
    // console.log(`currentMonth ${currentMonth}`);
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
    });
    for (const day of daysInMonth) {
      if (i < 3) {
        if (day >= currentDate) {
          //  console.log(`day >= currentDate ${day}`);
          dates.push(day);
        }
      } else {
        if (day.getDate() <= currentDate.getDate()) {
          // console.log(`day.getDate() <= currentDate.getDate() ${day}`);
          dates.push(day);
        }
      }
    }
  }
  return dates;
};

export const addActivitiesData = async (
  CalendarId,
  loggedInUserId,
  calendarItemData
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const app = getFirebaseApp();
  const dbRef = ref(getDatabase());
  const activitiesRef = child(dbRef, `activities/${CalendarId}`);

  const CalendarItemData = {
    setBy: loggedInUserId,
    setAt: new Date().toISOString(),
    ...calendarItemData,
  };

  console.log("Writing data to:", activitiesRef.toString());
  console.log("Data being written:", CalendarItemData);

  const newActivityRef = await push(activitiesRef, CalendarItemData).catch(
    (error) => {
      console.error("Error adding activity:", error);
    }
  );

  if (newActivityRef) {
    const activityId = newActivityRef.key;
    console.log("New activity added with ID:", activityId);
    return activityId;
  }
};

export const updateActivitiesData = async (
  calendarItemId,
  activityId,
  checked,
  description
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const calendarItemRef = child(
    dbRef,
    `activities/${calendarItemId}/${activityId}`
  );

  //console.log("Updating data at:", calendarItemRef.toString());
  //console.log("Updating checked value to:", checked);
  //console.log("Updating description to:", description);

  await update(calendarItemRef, {
    isChecked: checked,
    description: description,
  }).catch((error) => {
    console.error("Error updating activity:", error);
  });
};

export const updateMealActivitiesData = async (
  calendarItemId,
  activityId,
  text,
  checked
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const calendarItemRef = child(
    dbRef,
    `activities/${calendarItemId}/${activityId}`
  );

  console.log("Updating data at:", calendarItemRef.toString());
  console.log("Updating text value to:", text);

  await update(calendarItemRef, {
    isChecked: checked,
    text: text,
  }).catch((error) => {
    console.error("Error updating activity:", error);
  });
};
