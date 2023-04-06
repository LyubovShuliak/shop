import { useState } from "react";

import { useAppDispatch } from "../../app/hooks";
import { setSortProducts } from "../../redux/shop/shopSlice";

import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./sort.component.scss";

const SortComponent = () => {
  const dispatch = useAppDispatch();
  const [sortCriteria, setSortCriteria] = useState<string>("4");

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortProducts(Number(event.target.value)));
    setSortCriteria(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 0,
        height: 56,
        right: 10,
        position: "fixed",
        width: { sm: "50%", md: "200px", lg: "300px", xl: "300px" },
        top: 80,
      }}
    >
      <Select
        value={sortCriteria}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{ borderRadius: 10, backgroundColor: "rgb(115 214 244 / 33%)" }}
      >
        <MenuItem value={"1"}>Price from high to low</MenuItem>
        <MenuItem value={"2"}>Price from low to high</MenuItem>
        <MenuItem value={"3"}>Ratings </MenuItem>
        <MenuItem value={"4"}>Popularity</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SortComponent;
