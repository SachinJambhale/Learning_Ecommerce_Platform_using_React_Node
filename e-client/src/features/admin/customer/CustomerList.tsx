import React, { useState, useEffect } from "react";
import CustomerService from "../../../services/CustomerService";
import MuiDatatable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Customer from "../../../shared/models/CustomerModel";
interface ICustomerListProps {}

const CustomerList: React.FunctionComponent<ICustomerListProps> = (props) => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [operation, setOperation] = useState<string>("add");

  const loadCustomers = async () => {
    const response = await CustomerService.fetchAllCustomer();
    if (response?.data) setCustomer(response?.data?.data);
  };

  const addCustomer = () => {
    // setOperation("add");
    navigate("/secured/customer/add/0");
  }; //addCustomer

  const editCustomer = (customer: Customer) => {
    setOperation("edit");
  }; //editCustomer

  const deleteCustomer = (id: any) => {
    if (!id)
      return Swal.fire("Try again!", "The customer does not have id.", "error");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        CustomerService.deleteCustomer(id)
          .then((response) => {
            loadCustomers();
            Swal.fire("Deleted!", "The customer has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire(
              "Not Deleted!",
              "The customer has not been deleted.",
              "error"
            );
          });
      }
    });
  }; //deleteCustomer

  useEffect(() => {
    loadCustomers();
  }, []);

  const columns = [
    {
      name: "customerId",
      label: "ID",
    },

    {
      name: "name",
      label: "Name",
      options: {
        customBodyRenderLite: (index: number) => {
          const cust = customer[index];
          return `${cust?.name?.first} ${cust?.name?.last}`;
        },
      },
    },

    {
      name: "mobile",
      label: "Mobile",
    },
    {
      name: "gender",
      label: "Gender",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRenderLite: (index: number) => {
          const cust = customer[index];
          return cust?.status == 1 ? "Active" : "Inactive";
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (index: number) => {
          const cust = customer[index];
          return (
            <>
              <IconButton
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => editCustomer(cust._id)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => deleteCustomer(cust._id)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <Button variant="contained" color="primary" onClick={addCustomer}>
        Add New Customer
      </Button>
      <MuiDatatable title="Customer List" data={customer} columns={columns} />
    </>
  );
};

export default CustomerList;
