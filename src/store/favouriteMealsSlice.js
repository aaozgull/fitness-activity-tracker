import { createSlice } from "@reduxjs/toolkit";

const favouriteMealsSlice = createSlice({
  name: "favouriteMeals",
  initialState: {
    favouriteMealKeys: [],
  },
  reducers: {
    setFavouriteMealsData: (state, action) => {
      state.favouriteMealKeys = action.payload.favouriteMealsKey; // Use an array
      //  console.log("set state.favouriteMealKeys", state.favouriteMealKeys);
    },
    addFavouriteMeal: (state, action) => {
      state.favouriteMealKeys.push(action.payload.mealId);
      // console.log("state.favouriteMealKeys", state.favouriteMealKeys);
    },
    removeFavouriteMeal: (state, action) => {
      const { mealId } = action.payload;
      //  console.log("before state.favouriteMealKeys", state.favouriteMealKeys);
      state.favouriteMealKeys = state.favouriteMealKeys.filter(
        (favourite) => favourite !== mealId
      );
      //  console.log("after state.favouriteMealKeys", state.favouriteMealKeys);
    },
  },
});

export const { setFavouriteMealsData, addFavouriteMeal, removeFavouriteMeal } =
  favouriteMealsSlice.actions;

export default favouriteMealsSlice.reducer;
