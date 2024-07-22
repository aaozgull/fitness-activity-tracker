import { createSlice } from "@reduxjs/toolkit";

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    mealsData: {},
  },
  reducers: {
    setMealData: (state, action) => {
      state.mealsData = { ...action.payload.mealsData };
    },
    addMealData: (state, action) => {
      const { mealId, mealData } = action.payload;

      state.mealsData = {
        ...state.mealsData,
        [mealId]: mealData,
      };
    },
    updateFavouritesMeal: (state, action) => {
      const { mealId, isFavourite } = action.payload;

      let existingMealsData = state.mealsData;
      for (const key in existingMealsData) {
        //existingMealsData.
        //// some issue here. fix later after understand the structure
        if (existingMealsData.mealId === mealId) {
          existingMealsData.isFavourite = isFavourite;
        }
      }
      state.calendarActivitiesData = existingMealsData;
    },
  },
});
export const { setMealData, addMealData, updateFavouritesMeal } =
  mealsSlice.actions;

export default mealsSlice.reducer;
