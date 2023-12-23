import React, { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { getProfile, logOutAccount } from "../Redux/Slices/authSlice";
import { getCartItem } from "../Redux/Slices/cartSlice";
import { getAllOrders } from "../Redux/Slices/orderSlice";
import toast from "react-hot-toast";

const NavbarOther = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItem } = useSelector((state) => state.cart);
  const { role, data, isLoggedIn } = useSelector((state) => state.auth);
  const { orderItems } = useSelector((state) => state.order);

  //for cartitem and profile pic on navbar
  const fetchData = async () => {
    if (isLoggedIn) {
      await dispatch(getProfile());
      if (orderItems) {
         dispatch(getAllOrders())
      }
      if ( cartItem) {
        await dispatch(getCartItem());
      }
    }
  };

  //fetch the data on 1st rendering
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //logout function
  const logOut = async (e) => {
    e.preventDefault();
    const response = await dispatch(logOutAccount());
    if (response?.payload?.success) {
      navigate("/signup");
      toast.success("Successfully logged out");
    }
  };
  return (
    <>
      <div className="navbar h-[10vh] bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle shadow-sm hover:shadow-none"
            >
              <HiMenuAlt2 className="h-5 w-5 " />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/library/books">Books</Link>
              </li>
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact</Link>
              </li>
              <li>
                {isLoggedIn && role === "ADMIN" && (
                  <details>
                    <summary>Admin Pannel</summary>
                    <ul className="p-2 bg-base-100 rounded-t-none">
                      <li>
                        <Link to="/admin/library">Create Book Details</Link>
                      </li>
                      <li>
                        <Link to="/admin">Admin Dashboard</Link>
                      </li>
                    </ul>
                  </details>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link
            to="/"
            className=" font-normal uppercase tracking-[.35em] sm:text-xl font-mono text-[#269d8b]"
          >
            READSPHERE
          </Link>
        </div>
        <div className="navbar-end  flex items-center">
          <div className="md:dropdown md:dropdown-end hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle ">
              <div className="w-10 rounded-full justify-center flex items-center">
                {isLoggedIn ? (
                  <img
                    src={data?.avatar?.secure_url}
                    alt="user"
                    className=" rounded-full h-8 w-8"
                  />
                ) : (
                  <FaRegUser className="h-5 w-5" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                    {orderItems.length === 0 ? <a className="hidden">My Orders</a>: <Link to="/my-orders">My Orders</Link>}
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
            </ul>
          </div>

          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <Link
              to="/favourite"
              className="w-10 rounded-full justify-center flex items-center"
            >
              <FontAwesomeIcon className="w-5 h-5" icon={regularHeart} />
            </Link>
          </label>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <AiOutlineShoppingCart className="h-5 w-5" />
                <span className="badge badge-sm indicator-item">
                  {cartItem.length}
                </span>
              </div>
            </label>
            <div
              tabIndex="0"
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cartItem.length}Items
                </span>
                <span className="text-info">Subtotal: $0</span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn bg-[#5c269d] text-white hover:text-black btn-block"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarOther;
