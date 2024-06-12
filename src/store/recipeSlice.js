import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipesData: [],
    healthyRecipesData: [],
  },
  reducers: {
    setRecipesData: (state, action) => {
      state.recipesData = action.payload.recipesData;
    },
    setHealthyRecipesData: (state, action) => {
      state.healthyRecipesData = action.payload.healthyRecipesData;
    },
  },
});
export const setRecipesData = recipesSlice.actions.setRecipesData;
export const setHealthyRecipesData = recipesSlice.actions.setHealthyRecipesData;
export default recipesSlice.reducer;
