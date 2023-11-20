import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedInAuth = ({children}) =>{
    const {isLoggedIn} = useSelector((state)=> state.auth);
    return isLoggedIn ? <>{children}</> : <Navigate to="/logIn" />;
}

export default IsLoggedInAuth