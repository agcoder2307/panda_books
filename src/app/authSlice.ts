import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  token: null,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload;
      state.token = payload.token;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = {};
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
