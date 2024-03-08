
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  newArrivals: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.newArrivals = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;
