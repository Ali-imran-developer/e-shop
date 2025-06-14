import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { PiArrowRightBold } from "react-icons/pi";
import { Password, Button, Input, Text } from "rizzui";
import { routes } from "../../config/routes";
import { signUpSchema, SignUpSchema } from "../../validators/signup.schema";
import { useAuth } from "@hooks/auth-hooks";
import { CALLBACK_STATUS } from "@config/enums";
import toast from "react-hot-toast";
import { trimObjectValues } from "@/utils/helperFunctions/formater-helper";
import { Form, Formik } from "formik";
import {
  phoneNumberValidator,
  usePhoneNumberMask,
} from "@/utils/helperFunctions/phone-number";
import { useAppDispatch } from "@/hooks/store-hook";
import { signUp } from "@/store/slices/authSlice";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    console.log("values", values);
    try {
      setIsLoading(true);
      const response = await dispatch(signUp(values)).unwrap();
      toast.success(response.success || "Sign up successfully!");
      navigate("/")
    } catch (error: any) {
      toast.error(error.message || "Failed sign up!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ getFieldProps, errors, touched }) => (
          <Form className="space-y-4">
            <Input
              type="text"
              size="md"
              label="User Name"
              placeholder="Enter user name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...getFieldProps("userName")}
            />
            <Input
              size="md"
              label="email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...getFieldProps("email")}
            />

            <Input
              type="text"
              size="md"
              label="Password"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Enter your password"
              {...getFieldProps("password")}
            />

            <Button
              type="submit"
              className="w-full my-4"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <Text className="mt-2 text-center leading-loose text-gray-500 lg:mt-2 lg:text-start">
        Don’t have an account?{" "}
        <Link
          to={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
