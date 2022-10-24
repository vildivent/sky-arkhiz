import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  loading: false,
  hasMore: true,
};

export const createReview = createAsyncThunk(
  "review/createReview",
  async (params) => {
    try {
      const { data } = await axios.post("/api/reviews/create", params);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (params) => {
    try {
      const { data } = await axios.get("/api/reviews/get", { params });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addReviews = createAsyncThunk(
  "review/addReviews",
  async (params) => {
    try {
      const { data } = await axios.get("/api/reviews/get", { params });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (params) => {
    try {
      const { data } = await axios.post("/api/reviews/update", params);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id) => {
    try {
      const { data } = await axios.delete("/api/reviews/delete", {
        params: { id },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    //создание
    [createReview.pending]: (state) => {
      state.loading = true;
    },
    [createReview.fulfilled]: (state, action) => {
      state.reviews.push(action.payload);
      state.loading = false;
    },
    [createReview.rejected]: (state) => {
      state.loading = false;
    },
    //получение с заменой массива
    [getReviews.pending]: (state) => {
      state.loading = true;
    },
    [getReviews.fulfilled]: (state, action) => {
      if (action.payload.start > action.payload.numFound) {
        state.hasMore = false;
        state.loading = false;
        return state;
      }
      if (action.payload.review) {
        state.reviews = [action.payload.review];
        state.hasMore = false;
        state.loading = false;
        return state;
      }
      state.reviews = action.payload.reviews;
      state.hasMore = true;
      state.loading = false;
    },
    [getReviews.rejected]: (state) => {
      state.loading = false;
    },
    //добавление в массив
    [addReviews.pending]: (state) => {
      state.loading = true;
    },
    [addReviews.fulfilled]: (state, action) => {
      if (action.payload.start > action.payload.numFound) {
        state.hasMore = false;
        state.loading = false;
        return state;
      }
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.loading = false;
    },
    [addReviews.rejected]: (state) => {
      state.loading = false;
    },
    //обновление
    [updateReview.pending]: (state) => {
      state.loading = true;
    },
    [updateReview.fulfilled]: (state, action) => {
      state.reviews.forEach((review, index) => {
        if (review._id === action.payload.review._id)
          state.reviews[index] = action.payload.review;
      });
      state.loading = false;
    },
    [updateReview.rejected]: (state) => {
      state.loading = false;
    },
    //удаление
    [deleteReview.pending]: (state) => {
      state.loading = true;
    },
    [deleteReview.fulfilled]: (state, action) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload.review._id
      );
      state.loading = false;
    },
    [deleteReview.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default reviewSlice.reducer;
