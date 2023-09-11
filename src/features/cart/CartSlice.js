import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart ,fetchItemsByUserId,addQuantity} from './CartApi';



const initialState = {
  status: 'idle',
items:[]
};

//for add quantity 
export const addQuantityAsync = createAsyncThunk(
  'cart/addQuantity',
  async (quantity) => {
    const response = await addQuantity(quantity);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (user) => {
    const response = await addToCart(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (item) => {
    const response = await fetchItemsByUserId(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//for login 


export const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(addQuantityAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addQuantityAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
     
      
  },
});

export const { increment } = userSlice.actions;

export const selectCart=(s)=>s.cart.items;


export default userSlice.reducer;
