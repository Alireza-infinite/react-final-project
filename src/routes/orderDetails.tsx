import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/session/sessionSlice";
import axios from "axios";
import { orderState } from "../features/order/orderSlice";
import { Product } from "../features/products/productsSlice";
import { useParams } from "react-router-dom";
import PageHeader from "../features/layout/PageHeader";

interface IOrder extends Omit<orderState, "orderItems"> {
  _id: string;
  orderItems: {
    _id: string;
    product: Product;
    qty: number;
  }[];
}

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrder>();
  const token = useAppSelector(selectToken);

  async function getOrder() {
    const { data } = await axios.get(`order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setOrder(data);
  }

  useEffect(() => {
    getOrder();
  }, [token, orderId]);

  return (
    <>
      <PageHeader>
        <h2>Order: {orderId}</h2>
      </PageHeader>
      {order && (
        <div className="px-4">
          <h3 className="mb-2 text-sm text-gray-800">Order Id: {order._id}</h3>
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
      )}
    </>
  );
};

export default OrderDetails;
