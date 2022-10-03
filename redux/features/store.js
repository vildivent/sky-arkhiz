import { configureStore } from "@reduxjs/toolkit";
import newPostFormSlice from "./newPostForm/newPostFormSlice";
import newReviewFormSlice from "./newReviewForm/newReviewFormSlice";
import postSlice from "./post/postSlice";
import requestSlice from "./request/requestSlice";
import requestFilterSlice from "./requestFilter/requestFilterSlice";
import reviewSlice from "./review/reviewSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
    newPostForm: newPostFormSlice,
    review: reviewSlice,
    newReviewForm: newReviewFormSlice,
    request: requestSlice,
    requestFilter: requestFilterSlice,
  },
});
