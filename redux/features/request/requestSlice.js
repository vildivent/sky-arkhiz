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

export const setRequestData = createAsyncThunk(
  "request/setRequestData",
  async (newData) => {
    try {
      const { data } = await axios.post("/api/requests/setData", newData);
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

    //Изменить поля заявки
    [setRequestData.pending]: (state) => {
      state.loading = true;
    },
    [setRequestData.fulfilled]: (state, action) => {
      const newStatus = false;
      state.requests.forEach((request, index) => {
        if (request._id === action.payload.request._id) {
          state.requests[index] = action.payload.request;
        }
        if (request.status !== action.payload.status) {
          newStatus = true;
        }
      });
      // Заявка удаляется из списка при переключении её состояния
      if (false && newStatus) {
        state.requests = state.requests.filter((request) => {
          if (request._id === action.payload.request._id) return false;
          return true;
        });
      }
      state.loading = false;
    },
    [setRequestData.rejected]: (state) => {
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
