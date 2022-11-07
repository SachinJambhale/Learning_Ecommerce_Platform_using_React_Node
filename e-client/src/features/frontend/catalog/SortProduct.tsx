import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { useSearchParams } from "react-router-dom";

interface ISortProductProps {}

const SortProduct: React.FunctionComponent<ISortProductProps> = (props) => {
  const [value, setValue] = React.useState<string>("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setValue(value);
  };

  React.useEffect(() => {
    if (value && value != "all") {
      const obj: any = {};
      for (const [prop, value] of searchParams) obj[prop] = value;
      setSearchParams({ ...obj, sortBy: value });
    } else {
      searchParams.delete("sortBy");
      setSearchParams(searchParams);
    }
  }, [value]);
  return (
    <>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="sortBy">Sort By</InputLabel>
          <Select
            labelId="sortBy"
            id="demo-simple-select"
            value={value}
            label="Sort By"
            onChange={handleChange}
          >
            <MenuItem selected value="all">
              Random
            </MenuItem>
            <MenuItem selected value="priceAsc">
              Price low to high
            </MenuItem>
            <MenuItem selected value="priceDec">
              price high to low
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default SortProduct;
