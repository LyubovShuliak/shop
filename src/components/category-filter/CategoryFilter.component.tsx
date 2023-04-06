import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  categories,
  filterBy,
  filterBySelector,
} from "../../redux/shop/shopSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Paper, Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CategoryFilter = () => {
  const theme = useTheme();

  const filteredByCategories = useSelector(filterBySelector);
  const names = useAppSelector(categories);

  const dispatch = useAppDispatch();
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let selectedCategories =
      typeof value === "string" ? value.split(",") : value;

    dispatch(
      filterBy({
        ...filteredByCategories,
        byCategory: selectedCategories,
      })
    );
  };
  function getStyles(name: string, filter: readonly string[], theme: Theme) {
    return {
      fontWeight:
        filter.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  useEffect(() => {}, [filteredByCategories]);

  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {filteredByCategories.byCategory.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={(e) => console.log(e)}
            onClick={(e) => console.log(e)}
          />
        ))}
      </Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={filteredByCategories.byCategory}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Category"
              placeholder="Select categories..."
            />
          }
          renderValue={() => {
            return null;
          }}
          MenuProps={MenuProps}
        >
          {names.length
            ? names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(
                    name,
                    filteredByCategories.byCategory,
                    theme
                  )}
                  sx={[
                    {
                      "&.Mui-selected": {
                        backgroundColor: "#8d91ff42",
                      },
                    },
                  ]}
                >
                  {name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </div>
  );
};
export default CategoryFilter;
