import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GetAllBooks from "./Pages/Library/GetAllBooks";
import CreateBookDetails from "./Pages/Admin Page/CreateBookDetails";
import IsLoggedInAuth from "./Components/Auth/IsLoggedInAuth";
import Profile from "./Pages/Account Details page/Profile";
import BookDescription from "./Pages/Library/BookDescription";
import CartPage from "./Pages/Order Page/CartPage";
import LikeBooks from "./Pages/Library/LikeBooks";
import ChangePass from "./Pages/Account Details page/ChangePass";
import ForgotPass from "./Pages/Account Details page/ForgotPass";
import ResetPass from "./Pages/Account Details page/ResetPass";
import Loader1 from "./Pages/Loader/Loader1";
import EditProfile from "./Pages/Account Details page/EditProfile";
import UpdateBook from "./Pages/Admin Page/UpdateBook";
import CheckOut from "./Pages/Order Page/CheckOut";
import MyOrders from "./Pages/Order Page/MyOrders";
import OrderDetails from "./Pages/Order Page/OrderDetails";
import SignUp from "./Pages/Account Details page/SignUp";
import Login from "./Pages/Account Details page/Login";
import NotFoundPage from "./Pages/Error page/NotFoundPage";
import AdminDashboard from "./Pages/Admin Page/AdminDashboard";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import BooksByCategory from "./Pages/Library/BooksByCategory";

function App() {
  return (
    <>
      <Routes>
        {/* the routes that are not required login  */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password/:resetToken" element={<ResetPass />} />
        <Route path="/loader" element={<Loader1 />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* routes that required login */}
        <Route
          path="/library/books"
          element={<IsLoggedInAuth>{<GetAllBooks />}</IsLoggedInAuth>}
        />
        <Route
          path="/category/:category"
          element={<IsLoggedInAuth>{<BooksByCategory />}</IsLoggedInAuth>}
        />
        <Route
          path="/library/books/:_id"
          element={<IsLoggedInAuth>{<BookDescription />}</IsLoggedInAuth>}
        />
        <Route
          path="/admin/library/"
          element={<IsLoggedInAuth>{<CreateBookDetails />}</IsLoggedInAuth>}
        />
        <Route
          path="/admin/library/update/:_id"
          element={<IsLoggedInAuth>{<UpdateBook />}</IsLoggedInAuth>}
        />
        <Route
          path="/order/checkout"
          element={<IsLoggedInAuth>{<CheckOut />}</IsLoggedInAuth>}
        />
        <Route
          path="/order/details/:_id"
          element={<IsLoggedInAuth>{<OrderDetails />}</IsLoggedInAuth>}
        />
        <Route
          path="/my-orders"
          element={<IsLoggedInAuth>{<MyOrders />}</IsLoggedInAuth>}
        />
        <Route
          path="/profile"
          element={<IsLoggedInAuth>{<Profile />}</IsLoggedInAuth>}
        />
        <Route
          path="/cart"
          element={<IsLoggedInAuth>{<CartPage />}</IsLoggedInAuth>}
        />
        <Route
          path="/favourite"
          element={<IsLoggedInAuth>{<LikeBooks />}</IsLoggedInAuth>}
        />
        <Route
          path="/change-password/:_id"
          element={<IsLoggedInAuth>{<ChangePass />}</IsLoggedInAuth>}
        />
        <Route
          path="/edit-profile/:_id"
          element={<IsLoggedInAuth>{<EditProfile />}</IsLoggedInAuth>}
        />

        {/* routes for error page; */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
