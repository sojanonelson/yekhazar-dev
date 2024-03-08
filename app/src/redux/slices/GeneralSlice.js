import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appLoading: false,
  token: "",
  isFirstTimeUse: true,
  selectedProduct: {},
  selectedAddress: {},
  showcaseProduct: {},
  showcaseProductName: "",
  cartId: "",
  orderId: "",
  paymentKey: "",
  paymentAmount: "",
  userProfile: {},
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFirstTimeUse: (state, action) => {
      state.isFirstTimeUse = action.payload;
    },
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
    },
    setShowcaseProduct: (state, action) => {
      state.showcaseProduct = action.payload;
    },
    setShowcaseProductname: (state, action) => {
      state.showcaseProductName = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setPaymentKey: (state, action) => {
      state.paymentKey = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setPaymentAmount: (state, action) => {
      state.paymentAmount = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    clearShowcaseData: (state) => {
      state.showcaseProduct = initialState.showcaseProduct;
      state.showcaseProductName = initialState.showcaseProductName;
    },
  },
});

export const {
  setSelectedProduct,
  setFirstTimeUse,
  setAppLoading,
  setShowcaseProduct,
  setShowcaseProductname,
  setCartId,
  setPaymentKey,
  setOrderId,
  setPaymentAmount,
  setSelectedAddress,
  setUserProfile,
  clearShowcaseData
} = generalSlice.actions;

export default generalSlice.reducer;
