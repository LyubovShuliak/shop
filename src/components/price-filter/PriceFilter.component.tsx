import React, { ChangeEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import "./price-filter.component.scss";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { filterBy, filterBySelector, range } from "../../redux/shop/shopSlice";
import { TextField } from "@mui/material";

export default function PriceFilter() {
  const selectValue = useAppSelector(filterBySelector);
  const priceRange = useAppSelector(range);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number[]>([0, 1000]);

  useEffect(() => {
    if (priceRange) {
      setValue([0, priceRange[1]]);
    }
  }, [priceRange]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (value[0] < value[1]) {
      dispatch(
        filterBy({
          byPrice: value,
          byRating: selectValue.byRating,
          byCategory: selectValue.byCategory,
        })
      );
    }
  };

  const handleChangeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < value[0]) {
      e.target.classList.add("not_valid");
    } else {
      e.target.classList.remove("not_valid");
      dispatch(
        filterBy({
          byPrice: [selectValue.byPrice[0], +e.target.value],
          byRating: selectValue.byRating,
          byCategory: selectValue.byCategory,
        })
      );
    }
    setValue([value[0], +e.target.value]);
  };
  const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > value[1]) {
      e.target.classList.add("not_valid");
    } else {
      e.target.classList.remove("not_valid");
      dispatch(
        filterBy({
          byPrice: [+e.target.value, selectValue.byPrice[1]],
          byRating: selectValue.byRating,
          byCategory: selectValue.byCategory,
        })
      );
    }
    setValue([+e.target.value, value[1]]);
  };
  return (
    <div className="price_filter">
      <p className="filter_name">Price</p>
      <div className="price_inputs">
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={String(value[0])}
          onChange={handleChangeMinPrice}
          sx={{
            ".MuiOutlinedInput-input": {
              padding: 0,
              width: `${String(priceRange[1]).length + 1}ch`,
              textAlign: "center",
            },
          }}
        />

        <TextField
          id="outlined-basic"
          variant="outlined"
          value={String(value[1])}
          onChange={handleChangeMaxPrice}
          sx={{
            ".MuiOutlinedInput-input": {
              padding: "2px",
              width: `${String(priceRange[1]).length + 1}ch`,
              textAlign: "center",
            },
          }}
        />
      </div>
      <Box sx={{ width: 170, margin: "auto" }}>
        <Slider
          getAriaLabel={() => "Price-range"}
          value={value}
          onChange={handleChange}
          min={0}
          max={priceRange[1]}
        />
      </Box>
    </div>
  );
}
