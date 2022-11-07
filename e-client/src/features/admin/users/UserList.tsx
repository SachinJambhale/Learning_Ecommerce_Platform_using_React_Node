import React from "react";
import UserService from "../../../services/UserService";
import User from "../../../shared/models/UserModel";
import { useEffect, useState } from "react";
import MuiDatatable from "mui-datatables";
import IconButton from "@mui/material/Icon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import UserContext from "./UserContext";
import AddEditUser from "./AddEditUser";
import Swal from "sweetalert2";

interface IUserListProps {}

const UserList: React.FunctionComponent<IUserListProps> = (props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [operation, setOperation] = useState<string>("add");
  const [initialUser, setInitialUser] = useState<User>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const loadUsers = async () => {
    const response = await UserService.getAllUser();
    if (response.data) setUsers(response?.data.data);
  };

  const addUser = () => {
    setInitialUser({});
    setOperation("add");
    setOpenDialog(true);
  }; //addUser
  const editUser = (user: User) => {
    setInitialUser(user);
    setOperation("edit");
    setOpenDialog(true);
  }; //editUser
  const deleteUser = (id: any) => {
    if (!id)
      return Swal.fire("Try again!", "The User does not have id.", "error");
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
        UserService.deleteUser(id)
          .then((response) => {
            loadUsers();
            Swal.fire("Deleted!", "The User has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire("Deleted!", "The User has been not deleted.", "error");
          });
      }
    });
  }; //deleteUser

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    {
      name: "userId",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRenderLite: (index: number) => {
          const user = users[index];
          return `${user?.name?.first} ${user?.name?.last}`;
        },
      },
    },
    {
      name: "salary",
      label: "Salary",
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
          const user = users[index];
          return user?.status == 1 ? "Active" : "Inactive";
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (index: number) => {
          const user = users[index];
          return (
            <>
              <IconButton color="primary" onClick={() => editUser(user)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => deleteUser(user?._id)}>
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
      <UserContext.Provider
        value={{
          open: openDialog,
          handleClose: handleDialogClose,
          operation,
          initialUser,
          loadUsers,
        }}
      >
        <AddEditUser />
      </UserContext.Provider>
      <Button color="primary" variant="contained" onClick={addUser}>
        Add +
      </Button>
      <MuiDatatable title="User List" data={users} columns={columns} />
    </>
  );
};

export default UserList;
