import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: false,
  phoneNumber: false,
  groupSize: false,
  dates: false,
  comment: false,
  description: false,
  status: false,
  excursionDate: false,
  groupNumber: false,
};

export const requestEditSlice = createSlice({
  name: "requestEdit",
  initialState,
  reducers: {
    setRequestsEdit: (state, action) => {
      if (action.payload) {
        action.payload.forEach((param) => (state[param] = !state[param]));
      }
    },

    resetRequestsEdit() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setRequestsEdit, resetRequestsEdit } = requestEditSlice.actions;
export default requestEditSlice.reducer;
