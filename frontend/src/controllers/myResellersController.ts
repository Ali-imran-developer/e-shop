import { apiRequest } from "./apiController";

class ResellingController {
  static getAllResellers() {
    return apiRequest("get", "/api/reselling/fetchResellers");
  }

  static sendInviteForReselling(data: any) {
    return apiRequest("post", "/api/reselling/requestForReselling", data);
  }

  static confirmInviteForReselling(data: any) {
    return apiRequest("post", "/api/reselling/handleResellingInvite", data);
  }

  static removeFromReselling(data: any) {
    return apiRequest("post", "/api/reselling/handleRemoveFromReselling", data);
  }

  static getResellingVariants({
    searchSKU,
    page,
    limit,
    accountId,
  }: {
    searchSKU: string;
    page: string;
    limit: string;
    accountId: string;
  }) {
    return apiRequest(
      "get",
      `/api/reselling/fetchResellingVariants?searchSKU=${searchSKU}&page=${page}&limit=${limit}&resellerAccountId=${accountId}`
    );
  }
}

export default ResellingController;