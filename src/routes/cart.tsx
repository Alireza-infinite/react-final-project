import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { Product } from "../features/products/productsSlice";
import PageHeader from "../features/layout/PageHeader";
import { ExclamationIcon, XIcon } from "../app/icons";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { updateOrderItems } from "../features/order/orderSlice";

const Cart = () => {
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const items = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  async function fetchProducts() {
    for (const item in items) {
      const res = await axios.get(`product/${item}`);
      setProducts((p) => {
        return { ...p, [res.data._id]: res.data };
      });
    }
  }

  useEffect(() => {
    setProducts({});
    fetchProducts();
  }, [items]);

  return (
    <div>
      <PageHeader>
        <h2>Cart</h2>
      </PageHeader>

      {Object.values(products).map((p) => (
        <div className="flex items-center justify-around gap-2 px-4 odd:bg-gray-100 dark:odd:bg-gray-900">
          <img src={p.image} className="h-10 w-10 object-contain" />
          <Link
            to={`/products/${p._id}`}
            className="grow truncate text-sm hover:underline"
          >
            {p.name}
          </Link>
          <p>${p.price}</p>
          <input
            type="number"
            name="count"
            id="count"
            min={1}
            max={p.countInStock}
            defaultValue={items[p._id]}
            className="w-12 rounded border border-gray-800 pl-1 text-sm dark:bg-gray-800"
            onChange={(e) =>
              dispatch(addToCart({ id: p._id, count: e.target.value }))
            }
          />
          <button
            onClick={() => {
              dispatch(removeFromCart(p._id));
              // fetchProducts();
            }}
          >
            <XIcon className="x-5 w-5" />
          </button>
        </div>
      ))}

      {Object.keys(items).length ? (
        <div className="mt-8 flex flex-col items-center gap-4 px-4">
          <p>
            Overall Price: $
            {Object.values(products).reduce(
              (sum, product) => sum + product.price * items[product._id],
              0,
            )}
          </p>
          <Link
            to="/address"
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => {
              const orderItems: { product: string; qty: number }[] = [];
              const total: number = Object.values(products).reduce(
                (sum, product) => sum + product.price * items[product._id],
                0,
              );
              for (const product in items) {
                orderItems.push({ product, qty: items[product] });
              }
              dispatch(updateOrderItems({ cart: orderItems, total }));
            }}
          >
            Next
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-300">
          <ExclamationIcon className="w-1/3" />
          <p>Cart is Empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
