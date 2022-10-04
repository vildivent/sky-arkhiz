import { createSlice } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";
const initialState = {
  filteredRequestsByDate: [],
};

export const requestFilterByDate = createSlice({
  name: "requestFilterByDate",
  initialState,
  reducers: {
    setFilterByDate: (state, action) => {
      const { requests, filterDate } = action.payload;

      if (filterDate) {
        const filter = new DateObject({
          date: action.payload.filterDate,
          format: "DD/MM/YYYY",
        }).toDate();

        state.filteredRequestsByDate = requests.filter((request) => {
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
        state.filteredRequestsByDate = requests;
      }
    },

    resetFilterByDate() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setFilterByDate, resetFilterByDate } =
  requestFilterByDate.actions;
export default requestFilterByDate.reducer;
