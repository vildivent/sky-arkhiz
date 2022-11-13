import { configureStore } from "@reduxjs/toolkit";
import newPostFormSlice from "./newPostForm/newPostFormSlice";
import newReviewFormSlice from "./newReviewForm/newReviewFormSlice";
import postSlice from "./post/postSlice";
import requestSlice from "./request/requestSlice";
import requestFilterByDateSlice from "./requestFilterByDate/requestFilterByDateSlice";
import requestFilterByGroupSlice from "./requestFilterByGroup/requestFilterByGroupSlice";
import reviewSlice from "./review/reviewSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
    newPostForm: newPostFormSlice,
    review: reviewSlice,
    newReviewForm: newReviewFormSlice,
    request: requestSlice,
    requestFilterByDate: requestFilterByDateSlice,
    requestFilterByGroup: requestFilterByGroupSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
