import { apiRequest } from "./apiController";

class WebhookController {
  static getWebhooks(data: { storeId: string }) {
    return apiRequest("get", `/webhooks/fetchWebhooks?storeId=${data.storeId}`);
  }

  static createWebhooks(data: any) {
    return apiRequest("post", "/webhooks/createWebhooks", data);
  }

  static deleteWebhooks(data: any) {
    return apiRequest("delete", "/webhooks/deletehWebhooks", data);
  }
}

export default WebhookController;