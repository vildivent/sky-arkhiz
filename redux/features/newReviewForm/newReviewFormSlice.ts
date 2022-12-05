import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ReviewForm = {
  name: "",
  text: [],
  stars: 0,
  paragraph: "",
  avatarUrl: "",
  avatarAspectRatio: 0,
  photoUrl: "",
  photoAspectRatio: 0,
};

export const newReviewFormSlice = createSlice({
  name: "newReviewForm",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAvatar: (
      state,
      action: PayloadAction<{ imgUrl: string; imgAspectRatio: number }>
    ) => {
      state.avatarUrl = action.payload.imgUrl;
      state.avatarAspectRatio = action.payload.imgAspectRatio;
    },
    setPhoto: (
      state,
      action: PayloadAction<{ imgUrl: string; imgAspectRatio: number }>
    ) => {
      state.photoUrl = action.payload.imgUrl;
      state.photoAspectRatio = action.payload.imgAspectRatio;
    },
    setParagraph: (state, action: PayloadAction<string>) => {
      state.paragraph = action.payload;
    },
    pushParagraph: (state) => {
      state.text.push(state.paragraph);
      state.paragraph = "";
    },
    setStars: (state, action: PayloadAction<number>) => {
      state.stars = action.payload;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const {
  setName,
  setAvatar,
  setPhoto,
  setParagraph,
  pushParagraph,
  setStars,
  reset,
} = newReviewFormSlice.actions;
export default newReviewFormSlice.reducer;

type ReviewForm = {
  name: string;
  text: string[];
  stars: number;
  paragraph?: string;
  avatarUrl?: string;
  avatarAspectRatio?: number;
  photoUrl?: string;
  photoAspectRatio?: number;
};
