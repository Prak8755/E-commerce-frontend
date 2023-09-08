import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchAllFilterProducts } from './productListApi';


const initialState = {
  products:[],
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllFilterProductsAsync = createAsyncThunk(
  'product/fetchAllFilterProducts',
  async (filter) => {
    const response = await fetchAllFilterProducts(filter);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.products += 1;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products= action.payload;
      })
      .addCase(fetchAllFilterProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllFilterProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products= action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;



export default productSlice.reducer;
