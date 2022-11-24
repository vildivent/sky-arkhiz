import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import type { IPhoto } from "../../../models/Photo";
import type { PhotoCreateParams } from "../../../pages/api/photos/create";

const initialState: PhotoState = {
  photos: [],
  query: "",
  hasMore: true,
  loading: false,
  error: null,
};

export const createPhoto = createAsyncThunk<
  PhotoCreateResponse,
  PhotoCreateParams,
  RejectValue
>("photo/createPhoto", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<
    PhotoCreateResponse,
    AxiosRequestConfig<PhotoCreateParams>
  > = await axios.post("/api/photos/create", params);

  if (res.status !== 201 || res.data.createdPhoto === undefined) {
    return rejectWithValue(res.data.message);
  }

  console.log(res.data.message);
  return res.data;
});

export const getPhotos = createAsyncThunk<
  GetPhotosResponse & { q: string },
  GetPhotosParams,
  RejectValue
>("photo/getPhotos", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<GetPhotosResponse> = await axios.get(
    "/api/photos/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return { ...res.data, q: params.q || "" };
});

export const addPhotos = createAsyncThunk<
  GetPhotosResponse & { q: string },
  GetPhotosParams,
  RejectValue
>("photo/addPhotos", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<GetPhotosResponse> = await axios.get(
    "/api/photos/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return { ...res.data, q: params.q || "" };
});

export const updateViews = createAsyncThunk<
  UpdateViewsResponse,
  UpdateViewsParams,
  RejectValue
>("photo/updateViews", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<UpdateViewsResponse> = await axios.get(
    "/api/photos/get",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return res.data;
});

export const updatePhoto = createAsyncThunk<
  UpdatePhotoResponse,
  UpdatePhotoParams,
  RejectValue
>("photo/updatePhoto", async (params, { rejectWithValue }) => {
  const res: AxiosResponse<UpdatePhotoResponse> = await axios.post(
    "/api/photos/update",
    { params }
  );

  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  return res.data;
});

export const deletePhoto = createAsyncThunk<
  DeletePhotoResponse,
  DeletePhotoParams,
  RejectValue
>("photo/deletePhoto", async (params, { rejectWithValue, getState }) => {
  const res: AxiosResponse<DeletePhotoResponse> = await axios.delete(
    "/api/photos/delete",
    { params }
  );
  if (res.status !== 200) {
    return rejectWithValue(res.data.message);
  }

  console.log(res.data.message);
  return res.data;
});

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPhoto.fulfilled, (state: PhotoState, action) => {
        state.loading = false;
        state.photos = [action.payload.createdPhoto, ...state.photos];
      })
      .addCase(getPhotos.fulfilled, (state: PhotoState, action) => {
        state.hasMore = false;
        state.loading = false;
        if (action.payload.start > action.payload.numFound) {
          return state;
        }
        if (action.payload.photo) {
          state.photos.push(action.payload.photo);
          return state;
        }
        state.photos = action.payload.photos;
        state.query = action.payload.q;
        state.hasMore = true;
      })
      .addCase(addPhotos.fulfilled, (state: PhotoState, action) => {
        state.loading = false;
        if (action.payload.start > action.payload.numFound) {
          state.hasMore = false;
          return state;
        }
        state.photos = [...state.photos, ...action.payload.photos];
        state.query = action.payload.q;
      })
      .addCase(updateViews.fulfilled, (state: PhotoState, action) => {
        state.loading = false;
        state.photos.forEach((photo, index) => {
          if (photo._id === action.payload.photo._id)
            state.photos[index] = action.payload.photo;
        });
      })
      .addCase(updatePhoto.fulfilled, (state: PhotoState, action) => {
        state.loading = false;
        state.photos.forEach((photo, index) => {
          if (photo._id === action.payload.photo._id)
            state.photos[index] = action.payload.photo;
        });
      })
      .addCase(deletePhoto.fulfilled, (state: PhotoState, action) => {
        state.loading = false;
        state.photos = state.photos.filter(
          (photo) => photo._id !== action.payload.deletedPhoto._id
        );
      })
      .addMatcher(
        (action: AnyAction) => action.type.endsWith("rejected"),
        (state: PhotoState, action: PayloadAction<string>) => {
          state.error = action.payload;
          state.loading = false;
          console.error(state.error);
        }
      )
      .addMatcher(
        (action: AnyAction) => action.type.endsWith("pending"),
        (state: PhotoState) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});
export default photoSlice.reducer;

type PhotoState = {
  photos: IPhoto[];
  query: string;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
};
type RejectValue = { rejectValue: string };

type PhotoCreateResponse = {
  createdPhoto?: IPhoto;
  message: string;
};

type GetPhotosResponse = {
  photo?: IPhoto;
  photos?: IPhoto[];
  start?: number;
  numFound?: number;
  message?: string;
};
type GetPhotosParams = {
  id?: string;
  q?: string;
  limit?: number;
  page?: number;
  category?: string;
};

type UpdateViewsResponse = {
  photo?: IPhoto;
  message?: string;
};
type UpdateViewsParams = {
  id: string;
};

type UpdatePhotoResponse = {
  photo?: IPhoto;
  message?: string;
};
type UpdatePhotoParams = {
  id: string;
  title?: string;
  imgUrl?: string;
  category?: string;
};

type DeletePhotoResponse = {
  deletedPhoto?: IPhoto;
  message?: string;
};
type DeletePhotoParams = {
  id: string;
};
