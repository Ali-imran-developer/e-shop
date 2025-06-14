import { apiRequest } from "./apiController";

class ProductController {
  static getAllProducts() {
    return apiRequest(
      "get",
      "/api/v1/products?limit=50&page=1&tabStatus=all&prodStatus=all&vendor=&search="
    );
  }
  static createProduct(data: any) {
    console.log("Product data", data);
    return apiRequest("post", "/api/v1/products", data);
  }
  static updateProduct(data: any, product_id: any) {
    return apiRequest("put", `/api/v1/products/${product_id}`, data);
  }
  static deleteProduct(product_id: string) {
    return apiRequest("delete", `/api/v1/products/${product_id}`);
  }
  static getProductsForReselling({
    limit,
    page,
    title,
    vendor,
  }: {
    limit: number;
    page: number;
    title: string;
    vendor: string;
  }) {
    const query = `limit=${limit}&page=${page}&vendor=${vendor}&title=${title.trim()}`;
    return apiRequest(
      "get",
      `/api/sellingProducts/getProductsForReselling?${query}`
    );
  }
}

export default ProductController;
