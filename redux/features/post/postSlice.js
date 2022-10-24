import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  loading: false,
  query: "",
  hasMore: true,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/api/posts/create", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPosts = createAsyncThunk("post/getPosts", async (params) => {
  try {
    const { data } = await axios.get("/api/posts/get", { params });
    return { ...data, q: params.q || "" };
  } catch (error) {
    console.log(error);
  }
});

export const addPosts = createAsyncThunk("post/addPosts", async (params) => {
  try {
    const { data } = await axios.get("/api/posts/get", { params });
    return { ...data, q: params.q || "" };
  } catch (error) {
    console.log(error);
  }
});

export const updateViews = createAsyncThunk(
  "post/updateViews",
  async ({ id }) => {
    try {
      const { data } = await axios.get("/api/posts/get", { params: { id } });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const { data } = await axios.delete("/api/posts/delete", {
      params: { id },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    //Создание новости
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
    //Получение новостей с заменой массива
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      if (action.payload.start > action.payload.numFound) {
        state.hasMore = false;
        state.loading = false;
        return state;
      }
      if (action.payload.post) {
        state.posts = [action.payload.post];
        state.hasMore = false;
        state.loading = false;
        return state;
      }
      state.posts = action.payload.posts;
      state.query = action.payload.q;
      state.hasMore = true;
      state.loading = false;
    },
    [getPosts.rejected]: (state) => {
      state.loading = false;
    },
    //Добавление новостей в массив
    [addPosts.pending]: (state) => {
      state.loading = true;
    },
    [addPosts.fulfilled]: (state, action) => {
      if (action.payload.start > action.payload.numFound) {
        state.hasMore = false;
        state.loading = false;
        return state;
      }
      state.posts = [...state.posts, ...action.payload.posts];
      state.query = action.payload.q;
      state.loading = false;
    },
    [addPosts.rejected]: (state) => {
      state.loading = false;
    },
    //Обновление просмотров у новости
    [updateViews.pending]: (state) => {
      state.loading = true;
    },
    [updateViews.fulfilled]: (state, action) => {
      state.posts.forEach((post, index) => {
        if (post._id === action.payload.post._id)
          state.posts[index].views = action.payload.post.views;
      });
      state.loading = false;
    },
    [updateViews.rejected]: (state) => {
      state.loading = false;
    },
    //Удаление новости
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.post._id
      );
      state.loading = false;
    },
    [deletePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default postSlice.reducer;
