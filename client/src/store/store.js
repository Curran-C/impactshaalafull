import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import chatReducer from "./slices/chat";
import designReducer from "./slices/design";

export const store = configureStore({
  reducer: {
    authUser: userReducer,
    chat: chatReducer,
    design: designReducer,
  },
});
