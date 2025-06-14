import { apiRequest } from "./apiController";

class ShipperInfoController {
  static addShipperInfo(data: any) {
    console.log("@@return_address", data);
    return apiRequest("post", "/api/v1/shipper-info", data);
  }
  static removeShipperInfo(shipper_id: any) {
    console.log("@@return_address", shipper_id);
    return apiRequest("delete", `/api/v1/shipper-info/${shipper_id}`);
  }
  static editShipperInfo(payload: any, shipper_id: any) {
    console.log("@@payload", payload, shipper_id);
    return apiRequest("put", `/api/v1/shipper-info/${shipper_id}`, payload);
  }
  static getAllShipperInfo() {
    return apiRequest("get", `/api/v1/shipper-info`);
  }
  static getSingleShipperInfo(shipper_id: any) {
    return apiRequest("get", `/api/v1/shipper-info/${shipper_id}`);
  }
}

export default ShipperInfoController;
