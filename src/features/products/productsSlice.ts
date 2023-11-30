import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../app/store";

export interface Product {
  _id: string;
  name: string;
  color: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  countInStock: number;
  image: string;
}

interface ProductsState {
  status: "idle" | "pending" | "loaded" | "error";
  entities: {
    [key: string]: Product;
  };
  filters: {
    category: string;
    brand: string;
    search: string;
    sortBy: "name" | "rating" | "none";
  };
}

const initialState: ProductsState = {
  status: "idle",
  entities: {},
  filters: { category: "all", brand: "all", search: "", sortBy: "none" },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    filterByBrand: (state, action) => {
      state.filters.brand = action.payload;
    },
    searchBy: (state, action) => {
      state.filters.search = action.payload;
    },
    sortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const newEntities: ProductsState["entities"] = {};
      const retrievedProducts: Product[] = action.payload;
      retrievedProducts.forEach((product) => {
        newEntities[product._id] = product;
      });
      state.entities = newEntities;
      state.status = "loaded";
    });
  },
});

// Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("product");
    return response.data;
  },
);

// Selectors
export const selectCategories = (state: RootState) => {
  const products = state.products.entities;
  const categories: string[] = [];
  Object.values(products).forEach((p) => {
    categories.push(p.category.toLowerCase().trim());
  });
  return categories.filter(
    (value, index, array) =>
      array.indexOf(value.toLowerCase().trim()) === index,
  );
};

export const selectBrands = (state: RootState) => {
  const products = state.products.entities;
  const brands: string[] = [];
  Object.values(products).forEach((p) => {
    brands.push(p.brand.toLowerCase().trim());
  });
  return brands.filter(
    (value, index, array) =>
      array.indexOf(value.toLowerCase().trim()) === index,
  );
};

export const selectCurrentCategory = (state: RootState) =>
  state.products.filters.category;

export const selectCurrentBrand = (state: RootState) =>
  state.products.filters.brand;

export const { filterByCategory, filterByBrand, searchBy, sortBy } =
  productsSlice.actions;

export default productsSlice.reducer;
