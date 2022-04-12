import { configureStore } from "@reduxjs/toolkit";
import foldersSlice from "../features/foldersSlice";
import detailSlice from "../features/detailSlice";

const store = configureStore({
  reducer: {
    folders: foldersSlice,
    detail: detailSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
