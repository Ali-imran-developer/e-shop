import { CreateRoles } from "@/types";
import { apiRequest } from "./apiController";

class RolesController {
  static getRoles() {
    return apiRequest("get", "/api/v1/roles");
  }
  static createRoles(data: CreateRoles) {
    return apiRequest("post", "/api/v1/roles", data);
  }
  static UpdateRoles(id: any) {
    return apiRequest("post", "/api/v1/roles", id);
  }
  static DeleteRoles(id: any) {
    return apiRequest("post", "/api/v1/roles", id);
  }
}

export default RolesController;