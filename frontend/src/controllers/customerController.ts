import { apiRequest } from "./apiController";

class CustomerControllers {
  static getCustomers() {
    return apiRequest("get", "/customers?page=1&limit=50&search=&sorting=");
  }
}

export default CustomerControllers;
