import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser,signOut} from './authApi';
import { updateUser } from '../user/userApi';


const initialState = {
  loggedInUser:null,
  status: 'idle',
  error:null
};

//for sign up
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//for login 
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData) => {
    const response = await checkUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


//when user sign out

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (userData) => {
    const response = await signOut(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
)

//for saving information of user details
export const  updateUserAsync = createAsyncThunk(
  'user/ updateUser',
  async (userData) => {
    const response = await  updateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});

export const { increment } = userSlice.actions;


export const selectLoggedInUser=(s)=>s.user.loggedInUser;

export const selectError=(s)=>s.user.error;





export default userSlice.reducer;
