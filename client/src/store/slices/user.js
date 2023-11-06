import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("IsUser", JSON.stringify(action.payload.user));
      if (action.payload?.token) {
        state.token = action.payload.token;
        Cookies.set("accessToken", action.payload.token, {
          domain: `.${import.meta.env.VITE_CLIENT_URL}`,
          expires: 7000,
          sameSite: "Lax",
        });
        localStorage.setItem("accessToken", action.payload.token);
      }
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("IsUser");
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

export const { setUserAuth, logoutUser } = userSlice.actions;

export default userSlice.reducer;
