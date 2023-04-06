import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { fetchAll } from "./productsApi";
import type { RootState } from "../../app/store";
import { Product } from "../../types";

export const fetchProducts = createAsyncThunk<{
  products: Product[];
  total: number;
  status?: boolean;
}>("products/fetchAll", async () => {
  try {
    const response = await fetchAll();
    return response;
  } catch (error) {
    return { status: false, products: [], total: 0 };
  }
});

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  filterBy: Filters;
  total: number;
  categories: string[];
  priceRange: number[];
}
interface Filters {
  byRating: number;
  byCategory: Array<string>;
  byPrice: number[];
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  isLoading: true,
  filterBy: {
    byRating: 0,
    byCategory: [],
    byPrice: [],
  },
  total: 0,
  categories: [],
  priceRange: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortProducts: (state, action: PayloadAction<number>) => {
      state.filteredProducts.sort((a, b) => {
        if (action.payload === 1) {
          return a.price - b.price;
        }
        if (action.payload === 2) {
          return b.price - a.price;
        }
        if (action.payload === 3) {
          return a.rating - b.rating;
        }
        if (action.payload === 4) {
          return a.rating - b.rating;
        }
        return 0;
      });
    },

    filterBy: (state, action: PayloadAction<Filters>) => {
      state.filterBy.byRating = action.payload.byRating;
      state.filterBy.byCategory = action.payload.byCategory;

      const categories = action.payload.byCategory.length
        ? action.payload.byCategory
        : state.categories;
      const ratings = action.payload.byRating;
      const range = action.payload.byPrice;
      state.filteredProducts = state.products.filter((el: Product) => {
        return (
          el.rating >= ratings &&
          categories.includes(el.category) &&
          el.price >= range[0] &&
          el.price <= range[1]
        );
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.filteredProducts = action.payload.products;
      const pricesRange = action.payload.products.map((e) => e.price);
      state.filterBy.byPrice = [
        Math.min(...pricesRange),
        Math.max(...pricesRange),
      ];
      state.priceRange = [Math.min(...pricesRange), Math.max(...pricesRange)];
      state.isLoading = false;
      state.total = action.payload.total;
      state.categories = action.payload.products.reduce((current, next) => {
        if (!current.includes(next.category)) {
          return [...current, next.category];
        }
        return current;
      }, [] as string[]);
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setSortProducts, filterBy } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const filteredProducts = (state: RootState) =>
  state.products.filteredProducts;
export const loading = (state: RootState) => state.products.isLoading;
export const filterBySelector = (state: RootState) => state.products.filterBy;
export const categories = (state: RootState) => state.products.categories;
export const range = (state: RootState) => state.products.priceRange;
export default productsSlice.reducer;
