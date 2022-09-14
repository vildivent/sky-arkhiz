import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/api/posts/addPost", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/api/posts/getAll");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (params) => {
    try {
      const { data } = await axios.post("/api/posts/deletePost", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    //Создание поста
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },
    //Получение всех постов
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    },
    //Удаление поста
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [deletePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default postSlice.reducer;
