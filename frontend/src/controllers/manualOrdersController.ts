import { apiClient } from "../config/api.config";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

class ManualOrderController {
  static getManualOrder(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`https://fakestoreapi.com/products`)
        .then((res) => {
          if (res?.status === 200 && Array.isArray(res?.data)) {
            resolve(res.data);
          } else {
            reject(new Error('Invalid response format'));
          }
        })
        .catch((error) => {
          reject(error?.response?.data || error.message);
        });
    });
  }
}

export default ManualOrderController;