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
      const { mealKey, mealData } = action.payload;

      state.mealsData = {
        ...state.mealsData,
        [mealKey]: mealData,
      };
    },
  },
});
export const { setMealData, addMealData } = mealsSlice.actions;
export default mealsSlice.reducer;
