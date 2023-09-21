import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderApi';




const initialState = {
 orders:[],
  status: 'idle',
  currentOrder:null
};

//for sign up
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
   
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   resetOrder:(state,action)=>{
    state.currentOrder=null;
   }
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentOrder=action.payload;
        state.orders.push(action.payload)
      })
      
  },
});

export const { resetOrder } = orderSlice.actions;

export const  currentOrder=s=>s.order.currentOrder;

export default orderSlice.reducer;
