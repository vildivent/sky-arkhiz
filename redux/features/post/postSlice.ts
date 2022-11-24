import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import type { IPost } from "../../../models/Post";
import type { PostCreateParams } from "../../../pages/api/posts/create";

const initialState: PostState = {
  posts: [],
  query: "",
  hasMore: true,
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk<
  PostCreateResponse,
  PostCreateParams,
  RejectValue
>("post/createPost", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<
    PostCreateResponse,
    AxiosRequestConfig<PostCreateParams>
  > = await axios.post("/api/posts/create", params);

  if (res.status !== 201 || res.data.createdPost === undefined) {
    return rejectWithValue(res.data.message);
  }

  console.log(res.data.message);
  return res.data;
});

export const getPosts = createAsyncThunk<
  GetPostsResponse & { q: string },
  GetPostsParams,
  RejectValue
>("post/getPosts", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<GetPostsResponse> = await axios.get(
    "/api/posts/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return { ...res.data, q: params.q || "" };
});

export const addPosts = createAsyncThunk<
  GetPostsResponse & { q: string },
  GetPostsParams,
  RejectValue
>("post/addPosts", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<GetPostsResponse> = await axios.get(
    "/api/posts/get",
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
>("post/updateViews", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<UpdateViewsResponse> = await axios.get(
    "/api/posts/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return res.data;
});

export const deletePost = createAsyncThunk<
  DeletePostResponse,
  DeletePostParams,
  RejectValue
>("post/deletePost", async (params, { rejectWithValue, getState }) => {
  const res: AxiosResponse<DeletePostResponse> = await axios.delete(
    "/api/posts/delete",
    { params }
  );
  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  console.log(res.data.message);
  return res.data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state: PostState, action) => {
        state.loading = false;
        state.posts = [action.payload.createdPost];
      })
      .addCase(getPosts.fulfilled, (state: PostState, action) => {
        state.hasMore = false;
        state.loading = false;
        if (action.payload.start > action.payload.numFound) {
          return state;
        }
        if (action.payload.post) {
          state.posts.push(action.payload.post);
          return state;
        }
        state.posts = action.payload.posts;
        state.query = action.payload.q;
        state.hasMore = true;
      })
      .addCase(addPosts.fulfilled, (state: PostState, action) => {
        state.loading = false;
        if (action.payload.start > action.payload.numFound) {
          state.hasMore = false;
          return state;
        }
        state.posts = [...state.posts, ...action.payload.posts];
        state.query = action.payload.q;
      })
      .addCase(updateViews.fulfilled, (state: PostState, action) => {
        state.loading = false;
        state.posts.forEach((post, index) => {
          if (post._id === action.payload.post._id)
            state.posts[index].views = action.payload.post.views;
        });
      })
      .addCase(deletePost.fulfilled, (state: PostState, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.deletedPost._id
        );
      })
      .addMatcher(
        (action: AnyAction) => action.type.endsWith("rejected"),
        (state: PostState, action: PayloadAction<string>) => {
          state.error = action.payload;
          state.loading = false;
          console.error(state.error);
        }
      )
      .addMatcher(
        (action: AnyAction) => action.type.endsWith("pending"),
        (state: PostState) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});
export default postSlice.reducer;

type PostState = {
  posts: IPost[];
  query: string;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
};
type RejectValue = { rejectValue: string };

type PostCreateResponse = {
  createdPost?: IPost;
  message: string;
};

type GetPostsResponse = {
  post?: IPost;
  posts?: IPost[];
  start?: number;
  numFound?: number;
  message?: string;
};
type GetPostsParams = {
  id?: string;
  q?: string;
  limit?: number;
  page?: number;
};

type UpdateViewsResponse = {
  post?: IPost;
  message?: string;
};
type UpdateViewsParams = {
  id: string;
};

type DeletePostResponse = {
  deletedPost?: IPost;
  message?: string;
};
type DeletePostParams = {
  id: string;
};
