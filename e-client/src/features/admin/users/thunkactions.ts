// thunk action creator

import { addLoggedUser } from "../../../app/slices/authSlice";
import UserService from "../../../services/UserService";
import CustomerService from "../../../services/CustomerService";

export const loadSingleUser = (id: string) => {
  // thunk function
  return (dispatch: any) => {
    UserService.getOneUser(id)
      .then((response) => {
        dispatch(addLoggedUser(response.data.data));
      })
      .catch((err) => {
        console.log("Could not loaded the user ", err);
      });
  };
};
export const loadSingleCustomer = (id: string) => {
  // thunk function
  return (dispatch: any) => {
    CustomerService.fetchOneCustomer(id)
      .then((response) => {
        dispatch(addLoggedUser(response.data.data));
      })
      .catch((err) => {
        console.log("Could not loaded the customer ", err);
      });
  };
};
