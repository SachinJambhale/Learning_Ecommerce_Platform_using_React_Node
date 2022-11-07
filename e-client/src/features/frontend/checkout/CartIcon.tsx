import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { selectCart } from "../../../app/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

interface ICartIconProps {}

const CartIcon: React.FunctionComponent<ICartIconProps> = (props) => {
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  return (
    <IconButton aria-label="cart" onClick={() => navigate("/checkout")}>
      <StyledBadge
        badgeContent={Array.isArray(cart.products) ? cart.products.length : 0}
        color="secondary"
      >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default CartIcon;
