import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  //* html section
  if (isLoggedIn) {
    return element;
  } else {
    toast.error("You are not logged in");
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
export default ProtectedRoute;
