import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
  isLoading: false,
  error: null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategoryStart: state => {
      state.isLoading = true;
    },
    getCategorySuccess: (state, action) => {
      return {
        ...state,
        category: action.payload,
        isLoading: false
      };
    },
    getCategoryFail: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
  }
});
export const { getCategoryStart, getCategorySuccess, getCategoryFail } =
  categorySlice.actions;

export default categorySlice.reducer;
