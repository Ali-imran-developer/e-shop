import { apiRequest } from "./apiController";

class categoriesController {
  static getPublicCategories() {
    return apiRequest("get", `/category?public=true`);
  }
  static getCategories() {
    return apiRequest("get", `/category`);
  }
  static addCategories(data: any) {
    return apiRequest("post", "/category", data);
  }
  static updateCategories(id: string, data: any) {
    return apiRequest("put", `/category/${id}`, data);
  }
  static removeCategories(category_id: any) {
    return apiRequest("delete", `/category/${category_id}`);
  }
  static getSingleCategories(category_id: any) {
    return apiRequest("get", `/category/${category_id}`);
  }
}

export default categoriesController;
