import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredRequestsByGroup: [],
};

export const requestFilterByGroup = createSlice({
  name: "requestFilterByGroup",
  initialState,
  reducers: {
    setFilterByGroup: (state, action) => {
      const { requests, filterGroup } = action.payload;

      if (filterGroup) {
        state.filteredRequestsByGroup = requests.filter((request) => {
          if (request.groupNumber === filterGroup) return true;
          return false;
        });
      } else {
        state.filteredRequestsByGroup = requests;
      }
    },

    resetFilterByGroup() {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setFilterByGroup, resetFilterByGroup } =
  requestFilterByGroup.actions;
export default requestFilterByGroup.reducer;
