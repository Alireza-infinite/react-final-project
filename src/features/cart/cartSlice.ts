import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface cartState {
  [key: string]: number;
}

// cart state is a list of product ids
const initialState: cartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state[action.payload.id] = action.payload.count;
    },
    removeFromCart: (state, action) => {
      delete state[action.payload];
    },
    setCartItemQuantity: (state, action) => {
      state[action.payload.productId] = action.payload.qty;
    },
    clearCart: () => {
      return initialState;
    },
  },
});

// Selectors
export const selectCartItemsCount = (state: RootState) =>
  Object.keys(state.cart).length;

// Export Actions
export const { addToCart, removeFromCart, setCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
