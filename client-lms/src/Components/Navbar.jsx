import React, { useEffect} from "react";
import debounce from 'lodash/debounce';
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Redux/Slices/authSlice";
import {  searchQuery } from "../Redux/Slices/library.slice";
import { getCartItem } from "../Redux/Slices/cartSlice";

const Navbar = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { data, isLoggedIn } = useSelector((state) => state.auth);
  const {  query } = useSelector((state) => state.library);

  const getUserData = async () => {
    await dispatch(getProfile());
  };
  const getCartItemDetails = async () => {
    await dispatch(getCartItem());
  };
  
  useEffect(() => {
    getUserData();
    getCartItemDetails()
  }, []);

  const debouncedDispatch = debounce((value) => {
    dispatch(searchQuery(value));
  }, 300); 

  const hndleSearchInput = async (e) => {
    const value = e.target.value;
    await debouncedDispatch(value);
  };

  return (
    <>
      <header className="navbar top-0 min-h-fit left-0 bg-base-100 sm:h-[22vh] py-1 flex flex-col ">
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
                  <a>About Us</a>
                </li>
                <li>
                  <a>Contact Us</a>
                </li>
                <li>
                  <a>Get Books</a>
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
          <div className="navbar-end  flex items-center">
            <div className="form-control hidden sm:inline-flex">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={hndleSearchInput}
                className="input h-8 input-bordered w-24 md:w-auto"
              />
            </div>
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
                  <Link to='/my-orders'>My Orders</Link>
                </li>
                <li>
                  <a>Logout</a>
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
        <section className="hidden sm:flex items-center justify-center mt-7  ">
          <ul className="flex gap-8 tracking-[.25em] font-serif  ">
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/">Homepage</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/signUp">Sign Up</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/logIn">Login</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/library/">Admin</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to="/library/books"> Books</Link>
            </li>
          </ul>
        </section>
        <div className="form-control md:hidden w-[80%] my-5 sm:inline-flex">
          <input
            type="text"
            placeholder="Search"
            className="input h-8 input-bordered w-[70%] md:w-auto"
          />
        </div>
      </header>
    </>
  );
};

export default Navbar;
