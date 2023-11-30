import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import sessionReducer from "../features/session/sessionSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
