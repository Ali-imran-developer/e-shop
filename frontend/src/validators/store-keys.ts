import * as Yup from "yup";

export const keysSchema = Yup.object().shape({
  domainName: Yup.string().required("Domain Name is required"),
  // Uncomment the below line if you want to validate the URL format
  // .url("Invalid Domain Name format"),

  accessToken: Yup.string()
    .required("Access Token is required")
    .matches(/^[A-Za-z0-9\-_]+$/, "Access Token contains invalid characters"),

  apiKey: Yup.string()
    .required("API Key is required")
    .matches(/^[A-Za-z0-9\-_]+$/, "API Key contains invalid characters"),

  sharedSecretKey: Yup.string()
    .required("Shared Secret Key is required")
    .matches(
      /^[A-Za-z0-9\-_]+$/,
      "Shared Secret Key contains invalid characters"
    ),
});
