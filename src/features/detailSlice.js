import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDetail = createAsyncThunk(
  "folders/getDetail",
  async (title, { rejectWithValue }) => {
    try {
      let data;
      let docs = await works.getByTitle(title);
      docs.forEach((doc) => {
        data = { id: doc.id, ...doc.data() };
      });
      return data;
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
    [getDetail.fulfilled]: (state, { payload: { data } }) => {
      return {
        isLoading: false,
        error: false,
        data,
      };
    },
    [getDetail.rejected]: (state, { payload: { error } }) => {
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
