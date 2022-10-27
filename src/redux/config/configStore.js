import melon from "../modules/melonSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { melon: melon },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

  //배포모드에서 리덕스 데브툴 사용 안함
  devtools: process.env.REACT_APP_MOD !== "production",
});

export default store;
