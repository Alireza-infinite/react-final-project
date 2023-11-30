import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Product } from "../features/products/productsSlice";
import axios from "axios";
import { selectToken } from "../features/session/sessionSlice";
import { clearCart } from "../features/cart/cartSlice";
import { clearOrder } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const order = useAppSelector((state) => state.order);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function fetchProducts() {
    for (const item of order.orderItems) {
      const res = await axios.get(`product/${item.product}`);
      setProducts((p) => {
        return { ...p, [res.data._id]: res.data };
      });
    }
  }

  async function submitOrder() {
    await axios.post(
      "order/submit",
      {
        ...order,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch(clearCart());
    dispatch(clearOrder());
    navigate("/");
  }

  useEffect(() => {
    setProducts({});
    fetchProducts();
  }, [order]);

  return (
    <div className="pt-4">
      <div>
        {Object.values(products).map((p) => (
          <div className="flex items-center justify-around gap-2 px-4 odd:bg-gray-100 dark:odd:bg-gray-900">
            <img src={p.image} className="h-10 w-10 object-contain" />
            <p className="grow truncate text-sm">{p.name}</p>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 px-4">
        <div className="grid grid-cols-3">
          <p>Address</p>
          <p>{order.shippingAddress.address}</p>
        </div>
        <div className="grid grid-cols-3">
          <p>City</p>
          <p>{order.shippingAddress.city}</p>
        </div>
        <div className="grid grid-cols-3">
          <p>Postal Code</p>
          <p>{order.shippingAddress.postalCode}</p>
        </div>
        <div className="grid grid-cols-3">
          <p>Phone</p>
          <p>{order.shippingAddress.phone}</p>
        </div>
        <div className="grid grid-cols-3">
          <p>Shipping price</p>
          <p>{order.shippingPrice}</p>
        </div>
        <div className="grid grid-cols-3">
          <p>Total Cost</p>
          <p>{order.totalPrice}</p>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => submitOrder()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Checkout;
