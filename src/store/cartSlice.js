import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    workout: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, workout } = action.payload;
      if (!state.workout || state.workout.workoutId !== workout.workoutId) {
        state.workout = workout;
        state.cart = [item];
      } else {
        state.cart = [...state.cart, item];
      }
    },
    setCartState: (state, action) => {
      const { cart, workout } = action.payload;
      state.cart = cart;
      state.workout = workout;
    },
    clearCart: (state) => {
      state.cart = [];
      state.workout = null;
    },
  },
});

export const { addToCart, clearCart, setCartState } = cartSlice.actions;
export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
