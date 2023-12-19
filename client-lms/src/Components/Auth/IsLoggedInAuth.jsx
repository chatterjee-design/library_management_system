import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedInAuth = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) {
      // Show a toast to notify the user
      toast("Please! Login First", {
        icon: "😊",
      });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    // Redirect to login page
    return <Navigate to="/logIn" />;
  }

  return <>{children}</>;
};

export default IsLoggedInAuth;
