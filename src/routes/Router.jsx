import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import RegisterPage from "../pages/RegisterPage";
import FavCardsPage from "../pages/FavCardsPage";
import CreateCardPage from "../pages/CreateCardPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import MyCardsPage from "../pages/MyCardsPage";
import RP1 from "../pages/RP1";
import RP2 from "../pages/RP2";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import NestedRoutePage from "../pages/NestedRoutePage";
import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";
import { formGroupClasses } from "@mui/material";
import SandboxPage from "../pages/SandboxPage";
import MoreInformationPage from "../pages/MoreInformation";
import { useSelector } from "react-redux";
import EditProtectedRoute from "../components/EditProtectedRoute";

const Router = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.FAV}
        element={
          <ProtectedRoute isLoggedIn={true} element={<FavCardsPage />} />
        }
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            isLoggedIn={false}
            element={<CreateCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            isLoggedIn={false}
            element={<MyCardsPage />}
          />
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandboxPage />}
          />
        }
      />
      <Route
        path={ROUTES.MOREINFORMATIOMPAGE}
        element={<MoreInformationPage />}
      />

      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} />}
      />

      <Route
        path="/edit/:id"
        element={
          <EditProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />

      <Route path="/MInfo/:id" element={<MoreInformationPage />} />

      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/sandbox"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandboxPage />}
          />
        }
      >
        <Route path="nestedpage1" element={<NestedPage1 />} />
        <Route path="nestedpage2" element={<NestedPage2 />} />
        <Route path="RP1" element={<RP1 />} />
        <Route path="RP2" element={<RP2 />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
