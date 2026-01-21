import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { login } from "./authSlice";

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async ({ data, navigate, setLoader }, { dispatch }) => {
    try {
      const res = await authService.login(data).then((res) => {
        console.log(res);
        dispatch(login(res?.data?.access_token));
      });
      setLoader(false);
      navigate("/");
      return res;
    } catch (error) {
      console.log(error);
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/registerThunk",
  async ({ data, navigate, setLoader }, { dispatch }) => {
    try {
      const res = await authService.login(data).then((res) => {
        console.log(res);
        dispatch(login(res?.data.access_token));
      });
      setLoader(false);
      navigate("/");
      return res;
    } catch (error) {
      console.log(error);
    }
  },
);
