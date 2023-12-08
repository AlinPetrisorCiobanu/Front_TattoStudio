import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
      data: {} ,
    },
    reducers: {
      data_search: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }    
    }
    
});

export const { data_search } = searchSlice.actions;
export const searchData = (state) => state.search;
export default searchSlice.reducer;