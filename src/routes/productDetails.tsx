import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { useState, useEffect } from "react";
import { Product } from "../features/products/productsSlice";
import axios from "axios";
import PageHeader from "../features/layout/PageHeader";

interface IProductDetails extends Product {
  description: string;
  numReviews: string;
}

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector((state) => state.cart);
  const [product, setProduct] = useState<IProductDetails>();

  async function fetchProduct(id: string) {
    const { data } = await axios.get(`product/${id}`);
    setProduct({ ...data });
  }

  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId]);

  if (!product) return <div>Loading</div>;

  return (
    <div className="h-full">
      <PageHeader>
        <h2>{product.name}</h2>
      </PageHeader>
      <div className="md:flex">
        <div className="h-48 w-full md:w-40">
          <img
            src={product.image}
            className="h-full w-full object-contain px-4 py-4"
          />
        </div>
        <div className="flex grow flex-col gap-2 px-2 pt-4">
          <h2 className="text-3xl capitalize">{product.name}</h2>
          <p>{product.description}</p>
          <div className="grid grid-cols-2 capitalize">
            <span>Color</span>
            <span>{product.color}</span>
            <span>Stock</span>
            <span>{product.countInStock}</span>
            <span>Rating</span>
            <span>{product.rating}</span>
            <span>Price</span>
            <span>${product.price}</span>
          </div>
        </div>
      </div>
      <button
        className="mx-2 mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
        onClick={() => {
          dispatch(addToCart({ id: product._id, count: 1 }));
        }}
        disabled={
          product._id in productsInCart || product.countInStock == 0
            ? true
            : false
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
