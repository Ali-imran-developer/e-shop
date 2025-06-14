import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(1, "Password is required")
    .required("Password is required"),
  rememberMe: Yup.boolean().optional(),
});

export const editProfileValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().optional(),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .max(11, "Phone number must be 11 digits or less")
    .optional(),
});
export type LoginSchema = Yup.InferType<typeof loginSchema>;
export type EditProfileValidation = Yup.InferType<typeof editProfileValidation>;
