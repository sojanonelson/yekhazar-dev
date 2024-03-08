// brandSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brands: [],
  isLoading: false,
  error: null
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    getBrandsStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    getBrandsSuccess: (state, action) => {
      return {
        ...state,
        brands: action.payload,
        isLoading: false
      };
    },
    getBrandsFailure: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
  }
});

export const { getBrandsStart, getBrandsSuccess, getBrandsFailure } =
  brandSlice.actions;

export default brandSlice.reducer;
