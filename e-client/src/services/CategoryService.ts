import CategoryModel from "../shared/models/CategoryModel";
// import API from "../api/API";
// import endpoints from "../api/config";4
import { API, endpoints } from "../api/index"; //import like this

class CategoryService {
  static createCategory(cat: CategoryModel) {
    return API.post(endpoints.api.category.create, cat);
  }
  static updateCategory(id: string, cat: CategoryModel) {
    return API.put(`${endpoints.api.category.update}${id}`, cat);
  }
  static deleteCategory(id: string) {
    return API.delete(`${endpoints.api.category.delete}${id}`);
  }
  static fetchOneCategory(id: string) {
    return API.get(`${endpoints.api.category.fetchOne}${id}`);
  }
  static fetchAllCategory(query?: string) {
    let url = endpoints.api.category.fetchAll;
    if (query) url += query;
    return API.get(url);
  }
}

export default CategoryService;
