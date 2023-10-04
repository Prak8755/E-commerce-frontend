import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  AdminEditProduct,createProduct,fetchAllProducts,fetchAllFilterProducts,fetchAllCategories,fetchAllBrands,fetchProductById } from './productListApi';


const initialState = {
  products:[],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null
};



export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

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
  async ({filter,sort,pagination}) => {
    const response = await fetchAllFilterProducts(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


//for admin only-when admin wants to add product
export const fetchCreateProductAsync = createAsyncThunk(
  'product/createProduct',
  async (id) => {
    const response = await createProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//when admin wants to edit product
export const AdminEditProductAsync = createAsyncThunk(
  'product/AdminEditProduct',
  async (id) => {
    const response = await AdminEditProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.products =[]
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
        state.products= action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
      .addCase(fetchAllBrandsAsync.pending, (state,action) => {
        state.status = 'loading';
       
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands=action.payload
      })
      .addCase(fetchAllCategoriesAsync.pending, (state,action) => {
        state.status = 'loading';
       
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories=action.payload
      })
      .addCase(fetchProductByIdAsync.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct=action.payload
      })
      .addCase(fetchCreateProductAsync.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)
      })
      .addCase(AdminEditProductAsync.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(AdminEditProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex((item)=>item.id===action.payload.id);
        state.products[index]=action.payload
      })
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems=(state)=>state.product.totalItems;
export const selectBrands=(state)=>state.product.brands;
export const selectCategories=(state)=>state.product.categories;
export const selectProductById=(state)=>state.product.selectedProduct;
export const selectProductLoadingStatus=store=>store.product.status;



export default productSlice.reducer;
