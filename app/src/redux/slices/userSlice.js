
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: '',
  isLoading: false,
  error: null,
  address:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      // Clear user data on logout
      state.user = null;
      state.token = null,
      state.isLoading = false;
      state.error = null;
    },
    setAddress:(state,action)=>{
      state.address = action.payload
    }
   
  },
});

export const { loginStart, loginSuccess,logout, loginFailure,setAddress } = userSlice.actions;

export default userSlice.reducer;
