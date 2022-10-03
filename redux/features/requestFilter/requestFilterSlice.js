import { createSlice } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";
const initialState = {
  filteredRequests: [],
};

export const requestFilterSlice = createSlice({
  name: "requestFilter",
  initialState,
  reducers: {
    setFilteredRequests: (state, action) => {
      const { requests, filterDate } = action.payload;

      if (filterDate) {
        const filter = new DateObject({
          date: action.payload.filterDate,
          format: "DD/MM/YYYY",
        }).toDate();

        state.filteredRequests = requests.filter((request) => {
          const startDate = new DateObject({
            date: request.dates[0],
            format: "DD/MM/YYYY",
          }).toDate();

          const endDate = new DateObject({
            date: request.dates[1],
            format: "DD/MM/YYYY",
          }).toDate();

          if (startDate > filter) return false;
          if (endDate < filter) return false;

          return true;
        });
      } else {
        state.filteredRequests = requests;
      }
    },
    resetFilterRequests() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setFilteredRequests, resetFilterRequests } =
  requestFilterSlice.actions;
export default requestFilterSlice.reducer;
