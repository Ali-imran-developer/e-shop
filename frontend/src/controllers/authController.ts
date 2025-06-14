import { apiClient } from "../config/api.config";
import { Login, UserLogin } from "../types";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "../utils/auth";
// import { clearAuthSlice, setSession, setUser } from "../store/slices/authSlice";
import { APP_KEY, COOKIE_SECRET } from "../config/constants";
import store from "../store";
import { apiRequest } from "./apiController";
import { SignUpSchema } from "@/validators/signup.schema";
import { EditProfileValidation } from "@/utils/validators/login.schema";

class AuthController {
  static userLogin(data: Login) {
    return apiRequest("post", "/api/v1/auth/signin", data);
    // return apiRequest("post", "/api/auth/signin", data);
  }
  static userSignUp(data: SignUpSchema) {
    return apiRequest("post", "/api/v1/auth/signup", data);
  }
  static updateProfile(data: EditProfileValidation) {
    return apiRequest("put", "/api/v1/auth/users", data);
  }
  static shopilamSurvey(data: any) {
    return apiRequest("post", "/api/v1/survey", data);
  }
  static getAllStores() {
    return apiRequest("get", "/api/v1/stores");
  }

  static getSession = () => {
    const session = Cookies.get(APP_KEY);
    let decrypted = null;
    if (session) {
      decrypted = decryptData(session, COOKIE_SECRET);
    }
    return decrypted;
  };
  // static setSession(payload: any) {
  //   console.log("@payloadpayload", payload);
  //   const session = this.getSession();
  //   const newSession = { ...session, ...payload };
  //   store.dispatch(setSession(newSession));
  //   console.log("newSession", newSession);
  //   const encryptedData = encryptData(newSession, COOKIE_SECRET);
  //   Cookies.set(APP_KEY, encryptedData, {
  //     expires: 7,
  //   });
  // }
  // static restoreSession() {
  //   const session = AuthController.getSession();
  //   if (session) {
  //     store.dispatch(setSession(session));
  //     this.setSession(session);
  //   }
  // }
  // static removeSession() {
  //   Cookies.remove(APP_KEY);
  // }
  // static logout() {
  //   const credentials = AuthController.getSession();
  //   store.dispatch(clearAuthSlice());
  //   AuthController.removeSession();
  // }
}

export default AuthController;
