import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    stripe: null,
  },
  reducers: {
    cardToken: (state, action) => {},
  },
});

export const cardToken = checkoutSlice.actions.cardToken;
