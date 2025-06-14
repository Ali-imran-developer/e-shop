import { apiRequest } from "./apiController"; 

class InvoiceController {
  static getInvoice() {
    return apiRequest("get", "/api/v1/invoices");
  }
}

export default InvoiceController; 