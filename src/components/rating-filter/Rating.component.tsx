import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { filterBy, filterBySelector } from "../../redux/shop/shopSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
export interface Product {
  filteredProducts: any;
  setFilteredProducts: any;
  products: any;
  range: any;
}
const Ratings = () => {
  const filterSelector = useAppSelector(filterBySelector);
  const dispatch = useAppDispatch();

  const handleFilter = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue) {
      dispatch(
        filterBy({
          byPrice: filterSelector.byPrice,
          byRating: newValue,
          byCategory: filterSelector.byCategory,
        })
      );
    }
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 1 },
      }}
    >
      <Typography component="legend" className="filter_name">
        Rating
      </Typography>

      <Rating
        name="simple-controlled"
        value={filterSelector.byRating}
        onChange={handleFilter}
      />
    </Box>
  );
};
export default Ratings;
