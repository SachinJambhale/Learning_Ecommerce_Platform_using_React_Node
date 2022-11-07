import CustomerModel from "../shared/models/CustomerModel";
// import API from "../api/API";
// import endpoints from "../api/config";4
import { API, endpoints } from "../api/index"; //import like this

class CustomerService {
  static createCustomer(customer: CustomerModel) {
    return API.post(endpoints.api.customer.create, customer);
  }
  static updateCustomer(id: string, customer: CustomerModel) {
    return API.put(`${endpoints.api.customer.update}${id}`, customer);
  }
  static deleteCustomer(id: string) {
    return API.delete(`${endpoints.api.customer.delete}${id}`);
  }
  static fetchOneCustomer(id: string) {
    return API.get(`${endpoints.api.customer.fetchOne}${id}`);
  }
  static fetchAllCustomer(query?: string) {
    let url = endpoints.api.customer.fetchAll;
    if (query) url += query;
    return API.get(url);
  }
}

export default CustomerService;
