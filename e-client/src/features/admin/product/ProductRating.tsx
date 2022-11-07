import { Button } from "@mui/material";
import * as React from "react";

interface IProductRatingProps {
  next: (e: React.SyntheticEvent) => void;
  previous: (e: React.SyntheticEvent) => void;
}

const ProductRating: React.FunctionComponent<IProductRatingProps> = ({
  next,
  previous,
}) => {
  return (
    <>
      <h2>Product Rating</h2>
      <Button variant="contained" color="primary" onClick={next}>
        Next
      </Button>
      <Button variant="contained" color="primary" onClick={previous}>
        Previous
      </Button>
    </>
  );
};

export default ProductRating;
