import { useEffect, useState } from "react";
import {
  fetchProducts,
  selectCurrentBrand,
  selectCurrentCategory,
} from "./productsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProductCard from "./ProductCard";
import { arrowCircleIcon } from "../../app/icons";

const Products = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const products = useAppSelector((state) => state.products.entities);
  const productsStatus = useAppSelector((state) => state.products.status);
  const currentCategory = useAppSelector(selectCurrentCategory);
  const currentBrand = useAppSelector(selectCurrentBrand);
  const currentSort = useAppSelector((state) => state.products.filters.sortBy);
  const search = useAppSelector((state) => state.products.filters.search);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {productsStatus === "pending" && (
          <div className="flex items-end gap-3">
            <span className="mt-8 animate-bounce">{arrowCircleIcon}</span>
            <span className="text-xl">Loading...</span>
          </div>
        )}
        {Object.values(products)
          .sort((a, b) => {
            switch (currentSort) {
              case "name": {
                if (a.name.trim().toLowerCase() > b.name.trim().toLowerCase())
                  return 1;
                if (a.name.trim().toLowerCase() < b.name.trim().toLowerCase())
                  return -1;
              }

              case "rating": {
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
              }
              default:
                return 0;
            }
          })
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map(
            (product) =>
              (currentCategory === product.category.toLowerCase().trim() ||
                currentCategory === "all") &&
              (currentBrand === product.brand.toLowerCase().trim() ||
                currentBrand === "all") && <ProductCard product={product} />,
          )}
      </div>
      <div className="flex justify-center gap-4 py-4">
        {Array(
          Math.floor(Object.values(products).length / 10) +
            (Object.values(products).length % 10 == 0 ? 0 : 1),
        )
          .fill(0)
          .map((_, index) => (
            <button
              className="text-lg dark:disabled:text-gray-700"
              disabled={currentPage == index + 1 ? true : false}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};

export default Products;
