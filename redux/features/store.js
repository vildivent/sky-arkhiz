import { configureStore } from "@reduxjs/toolkit";
import newPostFormSlice from "./newPostForm/newPostFormSlice";
import postSlice from "./post/postSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
    newPostForm: newPostFormSlice,
  },
});
