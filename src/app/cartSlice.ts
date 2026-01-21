import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: 0,
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCount: (state, { payload }) => {
      state.items = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCount } = cartSlice.actions;

export default cartSlice.reducer;
