

import { combineReducers } from 'redux';
import { userSlice,productSlice,categorySlice, brandSlice, generalSlice, cartSlice } from '../slices';

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
  category: categorySlice,
  cart: cartSlice,
  brand: brandSlice,
  general: generalSlice
});

export default rootReducer;
