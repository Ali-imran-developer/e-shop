import { apiClient } from "../config/api.config";

class InvoiceDetailController {
  static getInvoiceDetail<T = any>(): Promise<T> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`https://fakestoreapi.com/products`)
        .then((res) => {
          if (res?.status === 200) {
            resolve(res?.data);
          } else {
            reject(res?.data);
          }
        })
        .catch(({ response }) => {
          reject(response?.data);
        });
    });
  }
}

export default InvoiceDetailController;