import { createSlice } from "@reduxjs/toolkit";

export interface orderState {
  orderItems: {
    product: string;
    qty: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  shippingPrice: number;
  totalPrice: number;
}

const initialState: orderState = {
  orderItems: [],
  shippingAddress: {
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  },
  paymentMethod: "cash",
  shippingPrice: 5,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderItems: (state, action) => {
      state.orderItems = action.payload.cart;
      state.totalPrice = action.payload.total + state.shippingPrice;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearOrder: () => {
      return initialState;
    },
  },
});

export const { updateOrderItems, updateShippingAddress, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
