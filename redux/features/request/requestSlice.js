import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  requests: [],
  loading: false,
};

export const getAllRequests = createAsyncThunk(
  "request/getAllRequests",
  async () => {
    try {
      const { data } = await axios.get("/api/requests/getAll");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRequestsWithStatus = createAsyncThunk(
  "request/getRequestsWithStatus",
  async (status) => {
    try {
      const { data } = await axios.post("/api/requests/getWithStatus", status);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setRequestStatus = createAsyncThunk(
  "request/setRequestStatus",
  async ({ id, status }) => {
    try {
      const { data } = await axios.post("/api/requests/setStatus", {
        id,
        status,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setRequestDescription = createAsyncThunk(
  "request/setRequestDescription",
  async ({ id, description }) => {
    try {
      const { data } = await axios.post("/api/requests/setDescription", {
        id,
        description,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "request/deleteRequest",
  async (id) => {
    try {
      const { data } = await axios.post("/api/requests/deleteById", id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: {
    //Получение всех заявок
    [getAllRequests.pending]: (state) => {
      state.loading = true;
    },
    [getAllRequests.fulfilled]: (state, action) => {
      state.requests = action.payload.requests;
      state.loading = false;
    },
    [getAllRequests.rejected]: (state) => {
      state.loading = false;
    },
    //Получение заявок по статусу
    [getRequestsWithStatus.pending]: (state) => {
      state.loading = true;
    },
    [getRequestsWithStatus.fulfilled]: (state, action) => {
      state.requests = action.payload.requests;
      state.loading = false;
    },
    [getRequestsWithStatus.rejected]: (state) => {
      state.loading = false;
    },

    //Изменить статус заявки
    [setRequestStatus.pending]: (state) => {
      state.loading = true;
    },
    [setRequestStatus.fulfilled]: (state, action) => {
      state.requests.forEach((request) =>
        request._id === action.payload.request._id
          ? (request.status = action.payload.request.status)
          : undefined
      );
      state.loading = false;
    },
    [setRequestStatus.rejected]: (state) => {
      state.loading = false;
    },

    //Изменить описание заявки
    [setRequestDescription.pending]: (state) => {
      state.loading = true;
    },
    [setRequestDescription.fulfilled]: (state, action) => {
      state.requests.forEach((request) =>
        request._id === action.payload.request._id
          ? (request.description = action.payload.request.description)
          : undefined
      );
      state.loading = false;
    },
    [setRequestDescription.rejected]: (state) => {
      state.loading = false;
    },

    //Удаление заявки
    [deleteRequest.pending]: (state) => {
      state.loading = true;
    },
    [deleteRequest.fulfilled]: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request._id !== action.payload.request._id
      );
      state.loading = false;
    },
    [deleteRequest.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default requestSlice.reducer;
