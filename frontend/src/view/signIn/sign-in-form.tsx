import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { Checkbox, Password, Button, Input, Text } from "rizzui";
import { routes } from "@config/routes";
import { loginSchema, LoginSchema } from "@utils/validators/login.schema";
import { Form, Formik } from "formik";
import { useAppDispatch } from "@/hooks/store-hook";
import { login } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log(values);
    try{
      setIsLoading(true);
      const response = await dispatch(login(values)).unwrap();
      toast.success(response.message || "Login Successfully!");
    } catch(error: any){
      toast.error(error.message || "Failed to Login!");
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ getFieldProps, errors, touched, setFieldValue }) => (
          <Form>
            <div className="space-y-4">
              <Input
                type="email"
                size="lg"
                label="Email"
                placeholder="Enter your email"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...getFieldProps("email")}
                error={touched.email && (errors.email as any)}
              />
              <Password
                label="Password"
                placeholder="Enter your password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...getFieldProps("password")}
                error={touched.password && (errors.password as any)}
              />
              {/* <div className="flex items-center justify-between pb-2">
                <Checkbox
                  {...getFieldProps("rememberMe")}
                  label="Remember Me"
                  className="[&>label>span]:font-medium"
                  size="sm"
                />
                <Link
                  to={routes.auth.forgotPassword}
                  className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
                >
                  Forget Password?
                </Link>
              </div> */}
              <Button
                className="w-full bg-blue-600"
                type="submit"
                size="lg"
                isLoading={isLoading}
              >
                <span>Sign in</span>{" "}
                <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{" "}
        <Link
          to={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
