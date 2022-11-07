import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AddEditCustomer from "./AddEditCustomer";
import CustomerList from "./CustomerList";

interface ICustomerProps {}

const Customer: React.FunctionComponent<ICustomerProps> = (props) => {
  return (
    <>
      <Routes>
        <Route path="" element={<CustomerList />} />
        <Route path=":op/:id" element={<AddEditCustomer />} />
      </Routes>
    </>
  );
};

export default Customer;
