import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
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
            <a className=" font-normal tracking-[.35em] sm:text-xl font-mono text-[#269d8b]">
              READSPHERE <br />
              <span className="hidden sm:inline-flex font-light text-xs tracking-[.25em] text-[#5c269d]">
                Journey Through Endless Books
              </span>{" "}
            </a>
          </div>
          <div className="navbar-end gap-2 flex items-center">
            <div className="form-control hidden sm:inline-flex">
              <input
                type="text"
                placeholder="Search"
                className="input h-8 input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <AiOutlineShoppingCart className="h-5 w-5" />
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </label>
              <div
                tabIndex="0"
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">0 Items</span>
                  <span className="text-info">Subtotal: $0</span>
                  <div className="card-actions">
                    <button className="btn bg-[#5c269d] text-white hover:text-black btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="hidden sm:flex items-center justify-center mt-7  ">
          <ul className="flex gap-8 tracking-[.25em] font-serif  ">
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to='/'>Homepage</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to='/signUp'>Sign Up</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to='/logIn'>Login</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to='/library/'>Profile</Link>
            </li>
            <li className="cursor-pointer hover:text-[#5c269d]">
              <Link to='/library/books'> Books</Link>
            </li>
          </ul>
        </section>
      </header>
    </>
  );
};

export default Navbar;
