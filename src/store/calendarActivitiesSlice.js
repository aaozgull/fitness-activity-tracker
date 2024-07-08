import { createSlice } from "@reduxjs/toolkit";

const calendarActivitiesSlice = createSlice({
  name: "activities",
  initialState: {
    calendarActivitiesData: {},
  },
  reducers: {
    setCalendarActivitiesData: (state, action) => {
      const existingCalendarActivities = state.calendarActivitiesData;
      const { calendarId, calendarActivitiesData } = action.payload;
      existingCalendarActivities[calendarId] = calendarActivitiesData;
      state.calendarActivitiesData = existingCalendarActivities;
    },
    addCalendarActivity: (state, action) => {
      const { calendarId, activity } = action.payload;
      if (!activity.id) {
        activity.id = Date.now().toString();
      }
      /*  */ console.log(
        "Before adding activity1:",
        state.calendarActivitiesData[calendarId]
      );
      /*  if (!Array.isArray(state.calendarActivitiesData[calendarId])) { */
      if (!state.calendarActivitiesData[calendarId]) {
        state.calendarActivitiesData[calendarId] = {};
      }
      console.log(
        "Before adding activity:",
        state.calendarActivitiesData[calendarId]
      );
      state.calendarActivitiesData[calendarId] = {
        ...state.calendarActivitiesData[calendarId],
        [activity.id]: activity,
      };
      /* [
        ...state.calendarActivitiesData[calendarId],
        activity,
      ]; */
      /*  
      const calendarActivities = state.calendarActivitiesData[calendarId] || [];
      const calendarActivityList = [];
      if (!Array.isArray(state.calendarActivitiesData[calendarId])) {
        for (const key in calendarActivities) {
          const activityData = calendarActivities[key];

          calendarActivityList.push({
            key,
            ...activityData,
          });
        }
      }
      calendarActivityList.push({
        key: "-NrpabHVHUGk2RoUK3xe",
        ...activity,
      });
      state.calendarActivitiesData[calendarId] = calendarActivityList;*/

      console.log(
        "After adding activity:",
        state.calendarActivitiesData[calendarId]
      );
    },
    updateCalendarActivity: (state, action) => {
      const { calendarId, activityId, isChecked } = action.payload;
      const calendarActivities = state.calendarActivitiesData;
      let existingCalendarActivities = calendarActivities[calendarId];

      // Check if existing activities array exists and is an array
      /* if (
        !existingCalendarActivity ||
        !Array.isArray(existingCalendarActivity)
      ) {
        // If it doesn't exist or is not an array, initialize it as an empty array
        existingCalendarActivity = [];
      } */

      // Find the index of the activity with the matching activityId
      /*  const activityIndex = calendarActivities.findIndex(
        (activity) => activity.id === activityId
      ); */

      for (const key in existingCalendarActivities) {
        if (existingCalendarActivities[key].id === activityId) {
          existingCalendarActivities[key].isChecked = isChecked;
        }
      }
      // If the activity is found, update its isChecked property
      /*   if (activityIndex !== -1) {
        // Create a copy of the activity object to avoid mutating the original state
        const updatedActivity = { ...calendarActivities[activityIndex] };
        updatedActivity.isChecked = isChecked;

        // Update the activity in the activities array
        calendarActivities[activityIndex] = updatedActivity; */

      // Update the state with the modified activities array
      calendarActivities[calendarId] = existingCalendarActivities;
      state.calendarActivitiesData = calendarActivities;
      //}
    },
  },
});
export const {
  setCalendarActivitiesData,
  addCalendarActivity,
  updateCalendarActivity,
} = calendarActivitiesSlice.actions;

export default calendarActivitiesSlice.reducer;
