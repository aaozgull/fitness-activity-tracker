import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import messagesSlice from "./messagesSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import userInfoSlice from "./userInfoSlice";
import progressSlice from "./progressSlice";
import calendarSlice from "./calendarSlice";
import calendarActivitiesSlice from "./calendarActivitiesSlice";
import recipeSlice from "./recipeSlice";
import tasksSlice from "./tasksSlice";
import mealsSlice from "./mealsSlice";
import favouriteMealsSlice from "./favouriteMealsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    chats: chatSlice,
    messages: messagesSlice,
    cart: cartSlice,
    userInfo: userInfoSlice,
    progress: progressSlice,
    calendar: calendarSlice,
    activities: calendarActivitiesSlice,
    recipes: recipeSlice,
    tasks: tasksSlice,
    meals: mealsSlice,
    favouriteMeals: favouriteMealsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
