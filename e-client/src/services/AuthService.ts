import { API, endpoints } from "../api";
import Customer from "../shared/models/CustomerModel";
import User from "../shared/models/UserModel";

class AuthService {
  static adminLogin(user: User) {
    return API.post(endpoints.api.auth.adminLogin, user);
  }

  static custLogin(cust: Customer) {
    return API.post(endpoints.api.auth.custLogin, cust);
  }

  static validateToken(token: string) {
    return API.post(endpoints.api.auth.validateToken, { token });
  }
}

export default AuthService;
