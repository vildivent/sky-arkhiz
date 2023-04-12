import { createSlice } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";
const initialState = {
  outdatedFilteredRequests: [],
};

export const requestOutdatedFilter = createSlice({
  name: "requestOutdatedFilter",
  initialState,
  reducers: {
    setOutdatedFilter: (state, action) => {
      const { requests, status } = action.payload;

      if (status !== "outdated") {
        state.outdatedFilteredRequests = requests;
        return;
      }

      state.outdatedFilteredRequests = requests.filter((request) => {
        const maxDate = new DateObject({
          date: request.dates[1],
          format: "DD/MM/YYYY",
        }).toDate();
        const currentDate = new DateObject().toDate();
        return maxDate < currentDate;
      });
      console.log(state.outdatedFilteredRequests);
    },

    resetOutdatedFilter() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setOutdatedFilter, resetOutdatedFilter } =
  requestOutdatedFilter.actions;
export default requestOutdatedFilter.reducer;
