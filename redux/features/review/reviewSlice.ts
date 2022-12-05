import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import type { IReview } from "../../../models/Review";
import type { ReviewCreateParams } from "../../../pages/api/reviews/create";

const initialState: ReviewState = {
  reviews: [],
  query: "",
  hasMore: true,
  loading: false,
  error: null,
};

export const createReview = createAsyncThunk<
  ReviewCreateResponse,
  ReviewCreateParams,
  RejectValue
>("review/createReview", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<
    ReviewCreateResponse,
    AxiosRequestConfig<ReviewCreateParams>
  > = await axios.post("/api/reviews/create", params);

  if (res.status !== 201 || res.data.createdReview === undefined) {
    return rejectWithValue(res.data.message);
  }

  console.log(res.data.message);
  return res.data;
});

export const getReviews = createAsyncThunk<
  GetReviewsResponse & { q: string },
  GetReviewsParams,
  RejectValue
>("review/getReviews", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<GetReviewsResponse> = await axios.get(
    "/api/reviews/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return { ...res.data, q: params.q || "" };
});

export const addReviews = createAsyncThunk<
  GetReviewsResponse & { q: string },
  GetReviewsParams,
  RejectValue
>("review/addReviews", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<GetReviewsResponse> = await axios.get(
    "/api/reviews/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return { ...res.data, q: params.q || "" };
});

export const updateViews = createAsyncThunk<
  UpdateViewsResponse,
  UpdateViewsParams,
  RejectValue
>("review/updateViews", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<UpdateViewsResponse> = await axios.get(
    "/api/reviews/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return res.data;
});

export const updateReview = createAsyncThunk<
  UpdateReviewResponse,
  UpdateReviewParams,
  RejectValue
>("review/updateReview", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<UpdateReviewResponse> = await axios.post(
    "/api/reviews/update",
    params
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return res.data;
});

export const deleteReview = createAsyncThunk<
  DeleteReviewResponse,
  DeleteReviewParams,
  RejectValue
>("review/deleteReview", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<DeleteReviewResponse> = await axios.delete(
    "/api/reviews/delete",
    { params }
  );
  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  console.log(res.data.message);
  return res.data;
});

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.fulfilled, (state: ReviewState, action) => {
        state.loading = false;
        state.reviews = [action.payload.createdReview, ...state.reviews];
      })
      .addCase(getReviews.fulfilled, (state: ReviewState, action) => {
        state.hasMore = false;
        state.loading = false;
        if (action.payload.start > action.payload.numFound) {
          return state;
        }
        if (action.payload.review) {
          state.reviews.push(action.payload.review);
          return state;
        }
        state.reviews = action.payload.reviews;
        state.query = action.payload.q;
        state.hasMore = true;
      })
      .addCase(addReviews.fulfilled, (state: ReviewState, action) => {
        state.loading = false;
        if (action.payload.start > action.payload.numFound) {
          state.hasMore = false;
          return state;
        }
        state.reviews = [...state.reviews, ...action.payload.reviews];
        state.query = action.payload.q;
      })
      .addCase(updateViews.fulfilled, (state: ReviewState, action) => {
        state.loading = false;
        state.reviews.forEach((review, index) => {
          if (review._id === action.payload.review._id)
            state.reviews[index] = action.payload.review;
        });
      })
      .addCase(updateReview.fulfilled, (state: ReviewState, action) => {
        state.loading = false;
        state.reviews.forEach((review, index) => {
          if (review._id === action.payload.review._id)
            state.reviews[index] = action.payload.review;
        });
      })
      .addCase(deleteReview.fulfilled, (state: ReviewState, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.deletedReview._id
        );
      })
      .addMatcher(
        (action: AnyAction) => action.type.endsWith("rejected"),
        (state: ReviewState, action: PayloadAction<string>) => {
          state.error = action.payload || "error";
          state.loading = false;
          console.error(state.error);
        }
      )
      .addMatcher(
        (action: AnyAction) => action.type.endsWith("pending"),
        (state: ReviewState) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});
export default reviewSlice.reducer;

type ReviewState = {
  reviews: IReview[];
  query: string;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
};
type RejectValue = { rejectValue: string };

type ReviewCreateResponse = {
  createdReview?: IReview;
  message: string;
};

type GetReviewsResponse = {
  review?: IReview;
  reviews?: IReview[];
  start?: number;
  numFound?: number;
  message?: string;
};
type GetReviewsParams = {
  id?: string;
  q?: string;
  limit?: number;
  page?: number;
  checked?: boolean;
};

type UpdateViewsResponse = {
  review?: IReview;
  message?: string;
};
type UpdateViewsParams = {
  id: string;
};

type UpdateReviewResponse = {
  review?: IReview;
  message?: string;
};
export type UpdateReviewParams = {
  id: string;
  checked?: string;
  upvotes?: number;
  downvotes?: number;
  views?: number;
};

type DeleteReviewResponse = {
  deletedReview?: IReview;
  message?: string;
};
type DeleteReviewParams = {
  id: string;
};
