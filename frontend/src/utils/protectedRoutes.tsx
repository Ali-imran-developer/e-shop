import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Loading } from "@/components/shared/loader";
import { useAppSelector } from "@/hooks/store-hook";
export const TokenProtectedRoutes = () => {
  const { isLoggedIn, isAuthChecked } = useAppSelector((state) => state.Auth);

  if (!isAuthChecked) {
    return <Loading />;
  }

  return isLoggedIn ? (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
};

export const PublicRoute = () => {
  const { isLoggedIn } = useAppSelector((state) => state.Auth);
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};
