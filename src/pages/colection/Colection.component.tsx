import { useEffect } from "react";
import MediaCard from "../../components/card/Card.component";
import CategoryFilter from "../../components/category-filter/CategoryFilter.component";
import SortComponent from "../../components/sorting/Sort.component";
import Ratings from "../../components/rating-filter/Rating.component";
import Spinner from "../../components/with-spinner/with-spinner.component";
import PriceFilter from "../../components/price-filter/PriceFilter.component";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchProducts,
  loading,
  filteredProducts,
} from "../../redux/shop/shopSlice";

import "./collection.component.scss";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import ResponsiveDrawer from "../../components/filtersDrawer/FiltersDrawer.component";

export const Collection = () => {
  const isLoading = useAppSelector(loading);
  const products = useAppSelector(filteredProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Stack direction={"row"}>
      <ResponsiveDrawer />

      {isLoading ? (
        <Spinner />
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Grid xs={8} md={2} item>
                  <MediaCard {...product} />
                </Grid>
              </div>
            );
          })}
        </Grid>
      )}
    </Stack>
  );
};

// export default Collection;
