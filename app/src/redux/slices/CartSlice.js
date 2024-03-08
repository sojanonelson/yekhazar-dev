import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  count: 0,
  cartID: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.count++; 
    
    },
    incrementCount: state => {
      state.count++;
    },
    decrementCount: state => {
      if (state.count > 0) {
        state.count--;
      }
    },
    removeItem: (state, action) => {
      state.items= state.items.filter(item => item.product._id !== action.payload._id);
      state.count--;
    },
    clearCart: state => {
      state.items = [];
      state.count = 0; 
    },
    setCardId: (state, action) => {
      state.cartID = action.payload;
    },
    
  },
});

export const { addItem, incrementCount, decrementCount, removeItem, clearCart,setCardId } = cartSlice.actions;

export default cartSlice.reducer;
