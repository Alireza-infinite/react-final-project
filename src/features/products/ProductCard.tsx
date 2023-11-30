import { Product } from "./productsSlice";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { _id, name, image, price, rating } = product;

  const star = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );

  return (
    <div className="flex h-80 w-64 flex-col items-center gap-3 overflow-hidden rounded-md border border-neutral-400 bg-neutral-100 dark:bg-gray-900">
      <img
        src={image}
        alt={name}
        className="h-2/3 w-full border-b border-neutral-400 bg-white object-contain p-2"
      />
      <Link
        to={`products/${_id}`}
        className="w-full truncate px-3 text-center text-lg capitalize text-neutral-800 hover:underline dark:text-gray-100"
      >
        {name}
      </Link>
      <div className="flex w-full items-center justify-between px-3">
        <span>${price}</span>
        <div className="flex items-center gap-1 text-neutral-600 dark:text-gray-100">
          <span className="text-yellow-500">{star}</span>
          <span>{rating}</span>
        </div>
      </div>
      <span
        className={`self-end px-3 pb-1 text-sm text-neutral-700 dark:text-gray-100`}
      >
        {product.countInStock
          ? `Stock: ${product.countInStock}`
          : "Out of stock"}
      </span>
    </div>
  );
};

export default ProductCard;
