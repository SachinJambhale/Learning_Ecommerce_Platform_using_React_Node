import ProductModel from "../shared/models/ProductModel";
// import API from "../api/API";
// import endpoints from "../api/config";4
import { API, endpoints } from "../api/index"; //import like this

class ProductService {
  static createProduct(cat: ProductModel) {
    return API.post(endpoints.api.product.create, cat);
  }
  static updateProduct(id: string, cat: ProductModel) {
    return API.put(`${endpoints.api.product.update}${id}`, cat);
  }
  static deleteProduct(id: string) {
    return API.delete(`${endpoints.api.product.delete}${id}`);
  }
  static fetchOneProduct(id?: string) {
    if (!id) return Promise.reject("invalid id");
    return API.get(`${endpoints.api.product.fetchOne}${id}`);
  }
  static fetchAllProduct(query?: string) {
    let url = endpoints.api.product.fetchAll;
    if (query) url += query;
    return API.get(url);
  }
}

export default ProductService;
