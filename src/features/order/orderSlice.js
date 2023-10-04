import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder ,fetchAllOrders,updateOrder} from './orderApi';




const initialState = {
 orders:[],
  status: 'idle',
  currentOrder:null,
  totalOrders:0
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


//for admin -admin can keep a track of all orders and their status
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
   
   
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//admin is now updating order status -like dispatched ,cancel, delivered etc
export const adminUpdateOrderAsync= createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
   
   
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
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        state.orders=action.payload.orders;
     state.totalOrders=action.payload.totalOrders
      })
      .addCase(adminUpdateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminUpdateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      const index=state.orders.findIndex(e=>e.id===action.payload.id);
      state.orders[index]=action.payload;
      })
      
  },
});

export const { resetOrder } = orderSlice.actions;

export const  currentOrder=s=>s.order.currentOrder;
export const selectOrders=s=>s.order.orders;
export const selectAllOrders=s=>s.order.totalOrders;


export default orderSlice.reducer;
