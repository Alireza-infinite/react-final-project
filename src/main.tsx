import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import Root from "./routes/root.tsx";
import ProductsList from "./routes/productsList.tsx";
import ProductDetails from "./routes/productDetails.tsx";
import Login from "./routes/login.tsx";
import Signup from "./routes/signup.tsx";
import Profile from "./routes/profile.tsx";
import Cart from "./routes/cart.tsx";
import Address from "./routes/address.tsx";
import Checkout from "./routes/chekout.tsx";
import ErrorElement from "./features/error/ErrorElement.tsx";
import Orders from "./routes/orders.tsx";
import { fetchUserInfo } from "./features/session/sessionSlice.ts";
import OrderDetails from "./routes/orderDetails.tsx";
import ChangePassword from "./routes/changePassword.tsx";
import ChangeProfile from "./routes/changeProfile.tsx";

axios.defaults.baseURL = "https://kzico.runflare.run/";

const redirectIfUnathorized = async () => {
  if (!localStorage.getItem("token")) return redirect("/login");
  return null;
};

const redirectIfAddressEmpty = async () => {
  const s = store.getState();
  const cartItems = s.order.shippingAddress;
  for (const value of Object.values(cartItems))
    if (!value) return redirect("/cart");
  return null;
};

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorElement />,
    loader: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await store.dispatch(fetchUserInfo(token));
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <ProductsList />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
        errorElement: <ErrorElement />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: redirectIfUnathorized,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
        loader: redirectIfUnathorized,
      },
      {
        path: "change-profile",
        element: <ChangeProfile />,
        loader: redirectIfUnathorized,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "address",
        element: <Address />,
        loader: async () => {
          const s = store.getState();
          const cartItems = s.order.orderItems;
          if (!cartItems.length) return redirect("/cart");
          if (s.session.status != "loggedIn") return redirect("/login");
          return null;
        },
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: redirectIfAddressEmpty,
      },
      {
        path: "orders",
        element: <Orders />,
        loader: redirectIfUnathorized,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
        loader: redirectIfUnathorized,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
