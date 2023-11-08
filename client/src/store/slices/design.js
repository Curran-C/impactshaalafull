import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setMobileView: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setMobileView } = designSlice.actions;

export default designSlice.reducer;
