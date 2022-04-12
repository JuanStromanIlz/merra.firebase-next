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
      return data;
    } catch ({ message }) {
      rejectWithValue({ error: message });
    }
  }
);

const initialState = {
  folders: {
    isLoading: false,
    error: false,
    [EDITORIAL]: [],
    [ARTWORK]: [],
    [COMERCIAL]: [],
    [FILMS]: [],
    [BLOG]: [],
    [PUBLICACIONES]: [],
  },
};

const worksSlice = createSlice({
  name: "works",
  initialState,
  extraReducers: {
    [getFolder.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getFolder.fulfilled]: (state, { payload: { folder, data } }) => {
      return {
        ...state,
        [folder]: data,
        isLoading: false,
      };
    },
    [getFolder.rejected]: (state, { payload: { error } }) => {
      return {
        ...state,
        isLoading: false,
        error,
      };
    },
  },
});

const { reducer } = worksSlice;

export default reducer;
