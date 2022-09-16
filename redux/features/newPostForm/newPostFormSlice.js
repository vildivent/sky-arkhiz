import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  imgUrl: "",
  srcUrl: "",
  paragraph: "",
  text: [],
};

export const newPostFormSlice = createSlice({
  name: "newPostForm",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
    setParagraph: (state, action) => {
      state.paragraph = action.payload;
    },
    setSrcUrl: (state, action) => {
      state.srcUrl = action.payload;
    },
    pushParagraph: (state) => {
      state.text.push(state.paragraph);
      state.paragraph = "";
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const {
  setTitle,
  setImgUrl,
  setParagraph,
  setSrcUrl,
  pushParagraph,
  reset,
} = newPostFormSlice.actions;
export default newPostFormSlice.reducer;
