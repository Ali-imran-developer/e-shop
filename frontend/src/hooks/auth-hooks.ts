import { useCallback } from "react";
import { CALLBACK_STATUS } from "../config/enums";
import AuthController from "../controllers/authController";
import StoreController from "@/controllers/storeController";
import { useHandleRequest } from "./api-hook";
import { SignUpSchema } from "@/validators/signup.schema";

export const useAuth = () => {
  const session = AuthController.getSession();
  const { handleRequest } = useHandleRequest();

  const handlePrimaryLogin = useCallback(
    async (
      payload = { email: "", password: "" },
      callback: (status: any, value: any) => void
    ) => {
      try {
        callback && callback(CALLBACK_STATUS.LOADING, true);
        const response: any = await AuthController.userLogin(payload);

        const { user, token, stores, survey } = response;
        // AuthController.setSession({
        //   survey,
        //   user,
        //   stores,
        //   isAuthenticated: true,
        //   accessToken: token,
        // });
        callback &&
          callback(CALLBACK_STATUS.SUCCESS, { user, token, stores, survey });
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  const handlePrimarySignUp = useCallback(
    async (
      payload: SignUpSchema,
      callback: (status: any, value: any) => void
    ) => {
      try {
        callback && callback(CALLBACK_STATUS.LOADING, true);
        const response: any = await AuthController.userSignUp(payload);
        const { user, token } = response;
        // AuthController.setSession({
        //   user,
        //   isAuthenticated: true,
        //   accessToken: token,
        // });
        callback && callback(CALLBACK_STATUS.SUCCESS, user);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  const handleLogout = useCallback(
    async (callback: (status: CALLBACK_STATUS, value: any) => void) => {
      try {
        callback && callback(CALLBACK_STATUS.LOADING, true);
        // const res = await AuthController.logout();
        // callback && callback(CALLBACK_STATUS.SUCCESS, res);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  const handleQuestionnaire = useCallback(
    async (callback: (status: CALLBACK_STATUS, value: any) => void) => {
      try {
        // callback && callback(CALLBACK_STATUS.LOADING, true);
        // AuthController.setSession({
        //   isAuthenticated: true,
        // });
        // callback && callback(CALLBACK_STATUS.SUCCESS, res);
      } catch (error) {
        console.log(error);
        // callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        // callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  return {
    handlePrimaryLogin,
    handleLogout,
    handlePrimarySignUp,
    handleQuestionnaire,
    user: session?.user,
    isAuthenticated: session?.isAuthenticated,
    accessToken: session?.accessToken,
    session
  };
};
