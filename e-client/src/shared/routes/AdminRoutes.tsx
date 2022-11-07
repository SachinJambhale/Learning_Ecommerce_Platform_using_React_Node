import { lazy } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import UserIcon from "@mui/icons-material/People";
import CustomerIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/List";
import ProductIcon from "@mui/icons-material/Launch";
import OrdersIcon from "@mui/icons-material/Book";

const Dashboard = lazy(
  () => import("../../features/admin/dashboard/Dashboard")
);

const Category = lazy(() => import("../../features/admin/category/Category"));

const Users = lazy(() => import("../../features/admin/users/Users"));

const Order = lazy(() => import("../../features/admin/order/Order"));

const Customer = lazy(() => import("../../features/admin/customer/Customer"));

const Product = lazy(() => import("../../features/admin/product/Product"));

export default [
  {
    label: "Dashboard",
    path: "",
    component: <Dashboard />,
    showInMenu: true,
    icon: <DashboardIcon />,
    role: ["superadmin", "admin"],
    hasNested: false,
  },
  {
    label: "Category",
    path: "category",
    component: <Category />,
    showInMenu: true,
    icon: <CategoryIcon />,
    role: ["superadmin", "admin"],
    hasNested: false,
  },
  {
    label: "Customers",
    path: "customer",
    component: <Customer />,
    showInMenu: true,
    icon: <CustomerIcon />,
    role: ["superadmin", "admin"],
    hasNested: true,
  },
  {
    label: "Orders",
    path: "orders",
    component: <Order />,
    showInMenu: true,
    icon: <OrdersIcon />,
    role: ["superadmin", "admin"],
    hasNested: false,
  },
  {
    label: "Products",
    path: "products",
    component: <Product />,
    showInMenu: true,
    icon: <ProductIcon />,
    role: ["superadmin", "admin"],
    hasNested: true,
  },
  {
    label: "Users",
    path: "user",
    component: <Users />,
    showInMenu: true,
    icon: <UserIcon />,
    role: ["superadmin"],
    hasNested: false,
  },
];
