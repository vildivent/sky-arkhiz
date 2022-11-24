import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PhotoForm = {
  title: "",
  imgUrl: "",
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
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setTitle, setImgUrl, setCategory, reset } =
  newPhotoFormSlice.actions;
export default newPhotoFormSlice.reducer;

type PhotoForm = {
  title: string;
  imgUrl: string;
  category: string;
};
