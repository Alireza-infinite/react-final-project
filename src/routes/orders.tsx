import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/session/sessionSlice";
import axios from "axios";
import { orderState } from "../features/order/orderSlice";
import { Product } from "../features/products/productsSlice";
import { Link } from "react-router-dom";
import PageHeader from "../features/layout/PageHeader";

interface IOrders extends Omit<orderState, "orderItems"> {
  _id: string;
  orderItems: {
    _id: string;
    product: Product;
    qty: number;
  }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const token = useAppSelector(selectToken);

  async function getOrders() {
    const { data } = await axios.get("order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(data);
  }

  useEffect(() => {
    getOrders();
  }, [token]);

  return (
    <>
      <PageHeader>
        <h2>Orders</h2>
      </PageHeader>
      <div className="flex flex-col gap-8 px-4 py-2">
        {orders.map((order) => (
          <div>
            <Link
              to={`/orders/${order._id}`}
              className="mb-2 text-sm text-blue-800 hover:underline"
            >
              Order Id: {order._id}
            </Link>
            {order.orderItems.map((item) => (
              <div className="flex gap-4 odd:bg-gray-100 dark:odd:bg-gray-900">
                <p className="grow truncate">{item.product.name}</p>
                <p>{item.product.price}</p>
                <p>{item.qty}</p>
              </div>
            ))}
            <p className="mt-1">
              Cost: ${order.totalPrice + Number(order.shippingPrice)}{" "}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
