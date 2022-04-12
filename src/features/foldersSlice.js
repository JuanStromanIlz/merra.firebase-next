import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFolder as getFolderService } from "../services/firebase";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../services/foldersNames";

export const getFolder = createAsyncThunk(
  "folders/getFolder",
  async (folder, { rejectWithValue }) => {
    try {
      const data = [];
      const res = await getFolderService(folder);
      res.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return { folder, data };
    } catch ({ message }) {
      rejectWithValue({ error: message });
    }
  }
);

const initialState = {
  isLoading: false,
  error: false,
  [EDITORIAL]: [],
  [ARTWORK]: [],
  [COMERCIAL]: [],
  [FILMS]: [],
  [BLOG]: [],
  [PUBLICACIONES]: [],
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  extraReducers: {
    [getFolder.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getFolder.fulfilled]: (state, { payload: { folder, data } = {} }) => {
      if (folder) {
        return {
          ...state,
          [folder]: data,
          isLoading: false,
        };
      }
      return state;
    },
    [getFolder.rejected]: (state, { payload: { error } = {} }) => {
      return {
        ...state,
        isLoading: false,
        error,
      };
    },
  },
});

const { reducer } = foldersSlice;

export default reducer;
