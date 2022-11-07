import * as React from "react";
import Tabs from "@mui/material/Tabs";
import { useParams, useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import Customer from "../../../shared/models/CustomerModel";
import CustomerDetails from "./CustomerDetails";
import CustomerOrders from "./CustomerOrders";

interface ITabPanelProps {
  value: number;
  index: number;
  children: any;
}

const TabPanel: React.FunctionComponent<ITabPanelProps> = ({
  value,
  index,
  children,
}) => {
  return value == index ? children : null;
};
interface ISnackbar {
  open: boolean;
  message: string;
  type: AlertColor;
}

interface IAddEditCustomerProps {}

const AddEditCustomer: React.FunctionComponent<IAddEditCustomerProps> = (
  props
) => {
  const [value, setValue] = React.useState(0);
  const [customer, setCustomer] = React.useState<Customer>({
    orders: [],
    rating: [],
  });
  const [openSnack, setOpenSnack] = React.useState<ISnackbar>({
    open: false,
    message: "",
    type: "success",
  });

  const handleSnackbarClose = () => {
    setOpenSnack({
      ...openSnack,
      open: false,
    });
  };

  const next = () => {
    if (value < 1) setValue(value + 1);
  };

  const previous = () => {
    if (value > 0) setValue(value - 1);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnack.open}
        onClose={handleSnackbarClose}
        message={openSnack.message}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={openSnack.type}
          sx={{ width: "100%" }}
        >
          {openSnack.message}
        </Alert>
      </Snackbar>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value={0} label="Customer Details" />
          <Tab value={1} label="Orders" />
        </Tabs>
      </Box>

      <Box component="section">
        <TabPanel value={value} index={0}>
          <CustomerDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomerOrders />
        </TabPanel>
      </Box>
    </>
  );
};

export default AddEditCustomer;
