import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/product/productSlice';
import authSlice from '../features/auth/authSlice';
import CartSlice from '../features/cart/CartSlice';
import orderSlice from '../features/order/orderSlice';
import userSlice from '../features/user/userSlice';


export const store = configureStore({
  reducer: {
    product: productSlice,
    user:authSlice,
    cart:CartSlice,
    order:orderSlice,
    userInfo:userSlice
  },
});
