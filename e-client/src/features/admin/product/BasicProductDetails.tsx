import {
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Product from "../../../shared/models/ProductModel";

interface Size {
  key: number;
  label: string;
}
interface Color {
  key: number;
  label: string;
}
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
interface IBasicProductDetailsProps {
  next: (e: React.SyntheticEvent) => void;
  product: Product;
  onChange: (e: any) => void;
  setProduct: (state: Product) => void;
}

const BasicProductDetails: React.FunctionComponent<
  IBasicProductDetailsProps
> = ({ next, product, onChange, setProduct }) => {
  const [sizes, setSizes] = React.useState<readonly Size[]>([]);
  const [colors, setColors] = React.useState<readonly Color[]>([]);

  const handleSizeChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //check whether the enter key pressed
    if (e.code == "Enter") {
      //acess the value from the target
      const { name, value } = e.target;
      //reset the textfield value
      e.target.value = "";
      // check whether the size is already added
      const existingSize = sizes.find((size) => size.label == value);
      if (existingSize) return;

      // find the maxid of existing sizes
      const maxKey =
        sizes &&
        (sizes as any[]).reduce(
          (prev: number, size: Size) => (prev > size.key ? prev : size.key),
          0
        );

      // set the new size in the sizes state
      // ask why  callback is passed from setSizes()
      setSizes((sizes) => [...sizes, { key: maxKey + 1, label: value }]);
    }
  };

  const handleColorChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //check whether the enter key pressed
    if (e.code == "Enter") {
      //acess the value from the target
      const { name, value } = e.target;
      //reset the textfield value
      e.target.value = "";
      // check whether the color is already added
      const existingColor = colors.find((color) => color.label == value);
      if (existingColor) return;

      // find the maxid of existing colors
      const maxKey =
        colors &&
        (colors as any[]).reduce(
          (prev: number, color: Color) => (prev > color.key ? prev : color.key),
          0
        );

      // set the new size in the colors state
      setColors((colors) => [...colors, { key: maxKey + 1, label: value }]);
    }
  };

  const handleSizeDelete = (chipToDelete: Size) => () => {
    // remove the current select size
    setSizes((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  const handleColorDelete = (chipToDelete: Color) => () => {
    // remove the current select color
    setColors((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleNext = (e: React.SyntheticEvent) => {
    const sizeArr = sizes.map((size) => size.label?.toLowerCase());
    const colorArr = colors.map((color) => color.label?.toLowerCase());
    setProduct({ ...product, sizes: sizeArr, colors: colorArr });
    next(e);
  };
  return (
    <>
      <Paper sx={{ padding: 4 }}>
        <h2>Basic Product Details</h2>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                name="title"
                value={product?.title}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Brand"
                name="brand"
                value={product?.brand}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Quantity"
                name="quantity"
                value={product?.quantity}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Warranty"
                name="warranty"
                value={product?.warranty}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Country"
                name="country"
                value={product?.country}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  fullWidth
                  labelId="status"
                  value={product.status}
                  label="Status"
                  name="status"
                  onChange={onChange}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {sizes.map((data) => {
                  return (
                    <ListItem key={data.key}>
                      <Chip
                        label={data.label}
                        onDelete={handleSizeDelete(data)}
                      />
                    </ListItem>
                  );
                })}
              </Paper>
              <TextField
                fullWidth
                variant="outlined"
                label="Sizes"
                name="sizes"
                onKeyDownCapture={handleSizeChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {colors.map((data) => {
                  return (
                    <ListItem key={data.key}>
                      <Chip
                        label={data.label}
                        onDelete={handleColorDelete(data)}
                      />
                    </ListItem>
                  );
                })}
              </Paper>
              <TextField
                fullWidth
                variant="outlined"
                label="Colors"
                name="colors"
                onKeyDownCapture={handleColorChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                placeholder="Product description here.."
                value={product.description}
                onChange={onChange}
              />
            </Grid>
            <Grid container marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: "auto" }}
                onClick={handleNext}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default BasicProductDetails;
