import SignInForm from "./sign-in-form";
import AuthWrapperOne from "@shared/auth-layout/auth-wrapper-one";
import UnderlineShape from "../../components/shape/underline";

import { metaObject } from "@config/site.config";

export const metadata = {
  ...metaObject("Sign In"),
};

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          Welcome to Shopcart{" "}
          <span className="relative inline-block">
            Sign in to
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{" "}
          continue.
        </>
      }
      description="Your E-commerce Sales and Management Partner"
      bannerTitle=""
      bannerDescription=""
      isSocialLoginActive={false}
      pageImage={
        <div className="relative mx-auto w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <img
            src={
              "https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp"
            }
            alt="Sign Up Thumbnail"
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
