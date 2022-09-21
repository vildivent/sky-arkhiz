import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatarUrl: "",
  photoUrl: "",
  paragraph: "",
  text: [],
  stars: 0,
};

export const newReviewFormSlice = createSlice({
  name: "newReviewForm",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatarUrl: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
    setParagraph: (state, action) => {
      state.paragraph = action.payload;
    },
    pushParagraph: (state) => {
      state.text.push(state.paragraph);
      state.paragraph = "";
    },
    setStars: (state, action) => {
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
  setAvatarUrl,
  setPhotoUrl,
  setParagraph,
  pushParagraph,
  setStars,
  reset,
} = newReviewFormSlice.actions;
export default newReviewFormSlice.reducer;
