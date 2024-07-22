import { createSlice } from "@reduxjs/toolkit";

const favouriteMealsSlice = createSlice({
  name: "favouriteMeals",
  initialState: {
    favouriteMealIds: [],
  },
  reducers: {
    setFavouriteMealIds: (state, action) => {
      state.favouriteMealIds = { ...action.payload.favouriteMealids };
    },
    addfavouriteMeal: (state, action) => {
      state.favouriteMealIds.push(action.payload.mealId);
    },
    removeFavouritesMeal: (state, action) => {
      const { mealId } = action.payload;
      const newFavouriteIds = state.favouriteMealIds.filter(
        (id) => id !== mealId
      );
      state.favouriteMealIds = newFavouriteIds;
    },
  },
});
export const { setFavouriteMealIds, addfavouriteMeal, removeFavouritesMeal } =
  favouriteMealsSlice.actions;

export default favouriteMealsSlice.reducer;
