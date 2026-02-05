import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { login } from "./authSlice";

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (
    { data, navigate, openNotificationWithIcon, setLoader },
    { dispatch },
  ) => {
    try {
      const res = await authService.login(data).then((res) => {
        dispatch(login(res?.data?.access_token));
      });
      setLoader(false);
      openNotificationWithIcon("success");
      navigate("/");
      return res;
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/registerThunk",
  async (
    { data, registerNotificationWithIcon, setIsRegister, setLoader },
    { dispatch },
  ) => {
    try {
      const res = await authService.register(data).then((res) => {
        dispatch(login(res?.data.access_token));
      });
      registerNotificationWithIcon("success");
      setIsRegister(false);
      setLoader(false);

      return res;
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  },
);
