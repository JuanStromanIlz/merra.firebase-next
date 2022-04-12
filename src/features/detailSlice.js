import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItemByTitle } from "../services/firebase";

export const getDetail = createAsyncThunk(
  "detail/getDetail",
  async ({ title, folder }, { rejectWithValue }) => {
    try {
      let data;
      let docs = await getItemByTitle(title, folder);
      docs.forEach((doc) => {
        data = { id: doc.id, ...doc.data() };
      });
      return { data };
    } catch ({ message }) {
      rejectWithValue({ error: message });
    }
  }
);

const initialState = {
  isLoading: false,
  error: false,
  data: {},
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  extraReducers: {
    [getDetail.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getDetail.fulfilled]: (_, { payload: { data } = {} }) => {
      return {
        isLoading: false,
        error: false,
        data,
      };
    },
    [getDetail.rejected]: (state, { payload: { error } = {} }) => {
      return {
        ...state,
        isLoading: false,
        data: {},
        error,
      };
    },
  },
});

const { reducer } = detailSlice;

export default reducer;
