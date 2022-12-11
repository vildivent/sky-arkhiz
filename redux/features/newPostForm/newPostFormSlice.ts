import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PostForm = {
  title: "",
  imgUrl: "",
  aspectRatio: 0,
  srcUrl: "",
  paragraph: "",
  text: [],
};

export const newPostFormSlice = createSlice({
  name: "newPostForm",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setImgUrl: (state, action: PayloadAction<string>) => {
      state.imgUrl = action.payload;
    },
    setAspectRatio: (state, action: PayloadAction<number>) => {
      state.aspectRatio = action.payload;
    },
    setParagraph: (state, action: PayloadAction<string>) => {
      state.paragraph = action.payload;
    },
    setSrcUrl: (state, action: PayloadAction<string>) => {
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
  setAspectRatio,
  setParagraph,
  setSrcUrl,
  pushParagraph,
  reset,
} = newPostFormSlice.actions;
export default newPostFormSlice.reducer;

type PostForm = {
  title: string;
  imgUrl?: string;
  aspectRatio?: number;
  srcUrl?: string;
  paragraph?: string;
  text: string[];
};
