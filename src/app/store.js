import { configureStore } from "@reduxjs/toolkit";
import foldersSlice from "../features/foldersSlice";
import detailSlice from "../features/detailSlice";

const store = configureStore({
  reducer: {
    folders: foldersSlice,
    detail: detailSlice,
  },
});

export default store;
