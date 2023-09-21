import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart ,fetchItemsByUserId,addQuantity,deleteItemFromCart,resetCart} from './CartApi';



const initialState = {
  status: 'idle',
items:[]
};

//for reset cart
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (item) => {
    const response = await resetCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


//for add quantity 
export const addQuantityAsync = createAsyncThunk(
  'cart/addQuantity',
  async (quantity) => {
    const response = await addQuantity(quantity);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
//for deleting product
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (id) => {
    const response = await deleteItemFromCart(id);
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
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[];
      })
     
      
  },
});

export const { increment } = userSlice.actions;

export const selectCart=(s)=>s.cart.items;


export default userSlice.reducer;
