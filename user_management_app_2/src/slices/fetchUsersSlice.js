/**Created by Parta Cana */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//An async thunk to fetch users from the given API

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  return response.data;
});

//Initial state for the slice
const initialState = {
  users: [],
  loading: false,
  error: null,
};

//Creating the slice
const fetchUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{
    addUser(state, action) {
      state.users = [...state.users, {
        ...action.payload, id: state.users.length + 1}];    
      },
  },
  extraReducers: (builder) => {
    builder 
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});


export const {addUser} = fetchUsersSlice.actions;
export default fetchUsersSlice.reducer;