import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchedLoggedInUser, fetchedLoggedInUserOrders, updateUser } from './userApi';


const initialState = {
userOrders:[],
  status: 'idle',
  userInformation:{},
value:0,
};

//for sign up
export const fetchedLoggedInUserOrdersAsync = createAsyncThunk(
  'userInfo/fetchedLoggedInUserOrders',
  async (userId) => {
    const response = await fetchedLoggedInUserOrders(userId);
   
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//for deleting address from profile section
export const fetchUpdateUserAsync = createAsyncThunk(
  'userInfo/updateUser',
  async (userId) => {
    const response = await updateUser(userId);
   
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchedLoggedInUserAsync = createAsyncThunk(
  'userInfo/fetchedLoggedInUser',
  async (userId) => {
    const response = await fetchedLoggedInUser(userId);
   
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
   resetOrder:(state,action)=>{
   state.value=1
   }
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchedLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchedLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       state.userOrders=action.payload; 
      })
      .addCase(fetchUpdateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpdateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       state.userOrders=action.payload; 
      })
      .addCase(fetchedLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchedLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       state.userInformation=action.payload; 
      })
      
  },
});

// export const selectUserOrders = (s)=>s.userInfo.userOrders;
export const selectUserInfo=(s)=>s.userInfo.userInformation;


export default userInfoSlice.reducer;
