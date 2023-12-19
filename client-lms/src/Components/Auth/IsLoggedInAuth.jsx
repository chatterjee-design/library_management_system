import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoaderPage2 from "../../Pages/Loader/Loader2";

const IsLoggedInAuth = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) {
      // Show a toast to notify the user
      toast("Please! Login First", {
        icon: "😊",
      });
    }
  }, [isLoggedIn, Navigate]);

  if (!isLoggedIn) {
    // Redirect to login page
    if (loading) {
      return <LoaderPage2 />
    }
    return <Navigate to="/logIn" />;
  }

  return <>{children}</>;
};

export default IsLoggedInAuth;
