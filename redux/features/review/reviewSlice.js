import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  loading: false,
};

export const createReview = createAsyncThunk(
  "review/createReview",
  async (params) => {
    try {
      const { data } = await axios.post("/api/reviews/addNew", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async () => {
    try {
      const { data } = await axios.get("/api/reviews/getAll");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCheckedReviews = createAsyncThunk(
  "review/getCheckedReviews",
  async () => {
    try {
      const { data } = await axios.get("/api/reviews/getChecked");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUncheckedReviews = createAsyncThunk(
  "review/getUncheckedReviews",
  async () => {
    try {
      const { data } = await axios.get("/api/reviews/getUnchecked");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setChecked = createAsyncThunk("review/setChecked", async (id) => {
  try {
    const { data } = await axios.post("/api/reviews/setChecked", id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addUsefullRaiting = createAsyncThunk(
  "review/addUsefullRaiting",
  async (id) => {
    try {
      const { data } = await axios.post("/api/reviews/addUsefullRaiting", id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addUselessRaiting = createAsyncThunk(
  "review/addUselessRaiting",
  async (id) => {
    try {
      const { data } = await axios.post("/api/reviews/addUselessRaiting", id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id) => {
    try {
      const { data } = await axios.post("/api/reviews/deleteById", id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    //Создание отзыва
    [createReview.pending]: (state) => {
      state.loading = true;
    },
    [createReview.fulfilled]: (state) => {
      state.loading = false;
    },
    [createReview.rejected]: (state) => {
      state.loading = false;
    },
    //Получение всех отзывов
    [getAllReviews.pending]: (state) => {
      state.loading = true;
    },
    [getAllReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.reviews;
    },
    [getAllReviews.rejected]: (state) => {
      state.loading = false;
    },
    //Получение проверенных отзывов
    [getCheckedReviews.pending]: (state) => {
      state.loading = true;
    },
    [getCheckedReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.reviews;
    },
    [getCheckedReviews.rejected]: (state) => {
      state.loading = false;
    },

    //Получение не проверенных отзывов
    [getUncheckedReviews.pending]: (state) => {
      state.loading = true;
    },
    [getUncheckedReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.reviews;
    },
    [getUncheckedReviews.rejected]: (state) => {
      state.loading = false;
    },
    //Изменить отметку о проверке отзыва по id
    [setChecked.pending]: (state) => {
      state.loading = true;
    },
    [setChecked.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews.forEach((review) =>
        review._id === action.payload.review._id
          ? (review.checked = action.payload.review.checked)
          : undefined
      );
    },
    [setChecked.rejected]: (state) => {
      state.loading = false;
    },

    //Добавить рейтинг "полезный" по id
    [addUsefullRaiting.pending]: (state) => {
      state.loading = true;
    },
    [addUsefullRaiting.fulfilled]: (state, action) => {
      state.reviews.forEach((review) =>
        review._id === action.payload.review._id
          ? (review.usefullRaiting = action.payload.review.usefullRaiting)
          : undefined
      );
      state.loading = false;
    },
    [addUsefullRaiting.rejected]: (state) => {
      state.loading = false;
    },
    //Добавить рейтинг "бесполезный" по id
    [addUselessRaiting.pending]: (state) => {
      state.loading = true;
    },
    [addUselessRaiting.fulfilled]: (state, action) => {
      state.reviews.forEach((review) =>
        review._id === action.payload.review._id
          ? (review.uselessRaiting = action.payload.review.uselessRaiting)
          : undefined
      );
      state.loading = false;
    },
    [addUselessRaiting.rejected]: (state) => {
      state.loading = false;
    },
    //Удаление отзыва
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
