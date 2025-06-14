import { apiRequest } from "./apiController";

class CourierControllers {
  static getCouriersname() {
    return apiRequest("get", "/api/v1/courier?manual=false");
  }
  static getManualCourier() {
    return apiRequest("get", "/api/v1/courier?manual=true");
  }
  static updateCourier(data: any) {
    return apiRequest("post", "/api/v1/courier/creds", data);
  }
  static removeCourier(courier_id: any) {
    return apiRequest("delete", `/api/v1/courier/${courier_id}`);
  }
  static getAllSelectedCourier() {
    return apiRequest("get", "/api/v1/courier/selected");
  }
  static defaultCityCourier(data: any) {
    return apiRequest("put", "/api/couriers/defaultCityCourier", data);
  }
  static getCourierSlip(data: any) {
    return apiRequest("post", "/api/pdf/courierSlip", data);
  }
  static addKeys(data: any) {
    return apiRequest("post", "/api/v1/courier/creds", data);
  }
  static getAllCities() {
    return apiRequest("get", "/api/cities/allCities");
  }
  static generateLoadSheet(payload: any) {
    return apiRequest("post", "/api/v1/load-sheets", payload);
  }
  static getLoadSheet() {
    return apiRequest("get", "/api/v1/load-sheets");
  }
  static addCourier(data: { name: string; logo: string }) {
    return apiRequest("post", "/api/v1/courier?manual=true", data);
  }
}

export default CourierControllers;
