import React, { useEffect } from "react";
import debounce from "lodash/debounce";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logOutAccount } from "../Redux/Slices/authSlice";
import { searchQuery } from "../Redux/Slices/library.slice";
import { getCartItem } from "../Redux/Slices/cartSlice";
import { getAllOrders } from "../Redux/Slices/orderSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);
  const { data, isLoggedIn, role } = useSelector((state) => state.auth);
  const { query } = useSelector((state) => state.library);
  const { orderItems } = useSelector((state) => state.order);

  //is this location is bookPage for searchbox to be visible
  const isBookPage = location.pathname === "/library/books";

  // fetch the cartitem and get profile information
  const fetchData = async () => {
    if (isLoggedIn) {
      await dispatch(getProfile());
      if (orderItems) {
        await dispatch(getAllOrders())
      }
      if (cartItem.length > 0) {
        await dispatch(getCartItem());
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // for searching queries that will be executed in debounce mode
  const debouncedDispatch = debounce((value) => {
    dispatch(searchQuery(value));
  }, 300);

  //search queries
  const hndleSearchInput = async (e) => {
    const value = e.target.value;
    await debouncedDispatch(value);
  };

  // logout functions
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
      <header className="navbar min-h-full bg-base-100  py-1 flex flex-col ">
        <nav className="w-[100%]">
          <div className="navbar-start">
            <div className="dropdown sm:hidden">
              <label
                tabIndex={0}
                className="btn  btn-ghost btn-circle shadow bg-base-100"
              >
                <IoMenu className="h-5 w-5" fill="none" stroke="currentColor" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/about-us">About</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact</Link>
                </li>
                <li>
                  <Link to="/library/books"> Books</Link>
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
          <div className="navbar-center text-center">
            <Link
              to="/"
              className=" font-normal uppercase tracking-[.35em] sm:text-xl font-mono text-[#269d8b]"
            >
              READSPHERE <br />
              <span className="hidden sm:inline-flex font-light text-xs tracking-[.25em] text-[#5c269d]">
                Journey Through Endless Books
              </span>
            </Link>
          </div>
          <div className="navbar-end md:gap-2 flex items-center">
            {isBookPage ? (
              <div className="form-control hidden sm:inline-flex">
                <input
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={hndleSearchInput}
                  className="input h-8 input-bordered w-24 md:w-auto"
                />
              </div>
            ) : null}
            <div className="dropdown dropdown-end">
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

            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <AiOutlineShoppingCart className="h-6 w-6" />
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
                    {cartItem.length} Items
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
        </nav>
        <section className="hidden sm:flex items-center justify-center mt-3">
          <ul
            tabIndex={0}
            className="flex menu menu-horizontal m-0 gap-1 tracking-[.25em] font-serif  "
          >
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/">Homepage</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/contact-us">Contact</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/about-us">About</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <details className="dropdown cursor-pointer">
                  <summary className="">Admin</summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-64">
                    <li>
                      <Link to="/admin/library">Create Book Details</Link>
                    </li>
                    <li>
                      <Link to="/admin">Admin Dashboard</Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/library/books"> Books</Link>
            </li>
          </ul>
        </section>
        {isBookPage ? (
          <div className="form-control md:hidden  w-[80%] my-5 sm:inline-flex">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={hndleSearchInput}
              className="input h-8 input-bordered w-[70%] md:w-auto"
            />
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Navbar;
