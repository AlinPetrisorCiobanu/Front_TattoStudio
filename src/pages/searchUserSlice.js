import { createSlice } from '@reduxjs/toolkit';

export const searchUserSlice = createSlice({
    name: 'searchUser',
    initialState: {
      credentials: "",
    },
    reducers: {
      searchUser: (action) => {
        return {
          credentials : action.payload
        }
      }
    }
});
export const { searchUser } = searchUserSlice.actions;
export const searchUserDate = (state) => state.searchUser;
export default searchUserSlice.reducer;