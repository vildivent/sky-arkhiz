import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PhotoForm = {
  title: "",
  imgUrl: "",
  aspectRatio: 0,
  category: "",
};

export const newPhotoFormSlice = createSlice({
  name: "newPhotoForm",
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
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setTitle, setImgUrl, setAspectRatio, setCategory, reset } =
  newPhotoFormSlice.actions;
export default newPhotoFormSlice.reducer;

type PhotoForm = {
  title: string;
  imgUrl: string;
  aspectRatio: number;
  category: string;
};
