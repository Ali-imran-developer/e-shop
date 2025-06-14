import "./index.css";
import HydrogenLayout from "@layouts/hydrogen/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./view/404";
import { getRoutes, IRoute } from "./utils/routes";
import { Suspense, useEffect } from "react";
import { PublicRoute, TokenProtectedRoutes } from "./utils/protectedRoutes";
import { Loading } from "./components/shared/loader";
import { useAppDispatch } from "./hooks/store-hook";
import { checkLoginStatus } from "./store/slices/authSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkLoginStatus());

  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<TokenProtectedRoutes />}>
            {mapRoutes(getRoutes("tokenProtected"))}
          </Route>
          <Route element={<PublicRoute />}>
            {mapRoutes(getRoutes("unprotected"))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const mapRoutes = (routes: IRoute[]): JSX.Element[] =>
  routes.map((route, key) => (
    <Route
      key={key}
      path={route.route}
      element={
        route.sidebar ? (
          <HydrogenLayout>
            <route.component />
          </HydrogenLayout>
        ) : (
          <route.component />
        )
      }
    />
  ));

export default App;