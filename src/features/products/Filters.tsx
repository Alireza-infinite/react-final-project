import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  filterByBrand,
  filterByCategory,
  searchBy,
  selectBrands,
  selectCategories,
  selectCurrentBrand,
  selectCurrentCategory,
  sortBy,
} from "./productsSlice";
import Sidebar from "../layout/Sidebar";

type Props = {
  isShown: boolean;
  toggleSidebar: () => void;
};

const Filters = ({ isShown, toggleSidebar }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const brands = useAppSelector(selectBrands);
  const currentCategory = useAppSelector(selectCurrentCategory);
  const currentBrand = useAppSelector(selectCurrentBrand);
  const currentSort = useAppSelector((state) => state.products.filters.sortBy);

  const changeFilter =
    (filterby: ActionCreatorWithPayload<any>) => (val: string) => {
      dispatch(filterby(val));
    };

  return (
    <Sidebar isShown={isShown} toggleSidebar={toggleSidebar}>
      <h2 className="w-full border-b border-neutral-500 text-2xl">Filters</h2>
      <FiltersSection title="Search">
        <input
          type="search"
          name="search"
          id="search"
          className="rounded border border-gray-300 px-2 py-2 dark:bg-gray-800"
          onChange={(e) => dispatch(searchBy(e.target.value))}
        />
      </FiltersSection>
      <FiltersSection title="Sort By">
        <Button crntSelected={currentSort} clickHandler={changeFilter(sortBy)}>
          none
        </Button>
        <Button crntSelected={currentSort} clickHandler={changeFilter(sortBy)}>
          name
        </Button>
        <Button crntSelected={currentSort} clickHandler={changeFilter(sortBy)}>
          rating
        </Button>
      </FiltersSection>
      <FiltersSection title="Categories">
        <Button
          crntSelected={currentCategory}
          clickHandler={changeFilter(filterByCategory)}
        >
          all
        </Button>
        {categories.map((category) => (
          <Button
            crntSelected={currentCategory}
            clickHandler={changeFilter(filterByCategory)}
          >
            {category}
          </Button>
        ))}
      </FiltersSection>

      <FiltersSection title="Brands">
        <Button
          crntSelected={currentBrand}
          clickHandler={changeFilter(filterByBrand)}
        >
          all
        </Button>
        {brands.map((brand) => (
          <Button
            crntSelected={currentBrand}
            clickHandler={changeFilter(filterByBrand)}
          >
            {brand}
          </Button>
        ))}
      </FiltersSection>
    </Sidebar>
  );
};

type FiltersSectionProps = {
  title: string;
  children: React.ReactNode;
};

const FiltersSection = ({ children, title }: FiltersSectionProps) => {
  return (
    <>
      <h3 className="text-xl">{title}</h3>
      <div className="flex flex-wrap justify-center gap-2">{children}</div>
    </>
  );
};

type ButtonProps = {
  children: string;
  crntSelected: string;
  clickHandler: (val: string) => void;
};

const Button = ({ children, crntSelected, clickHandler }: ButtonProps) => {
  return (
    <button
      className={`w-24 rounded border border-neutral-600 py-2 text-sm capitalize ${
        crntSelected === children ? "bg-neutral-600 text-white" : ""
      }`}
      onClick={() => clickHandler(children)}
    >
      {children}
    </button>
  );
};

export default Filters;
