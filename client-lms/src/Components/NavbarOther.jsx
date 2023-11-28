import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const NavbarOther = () => {
  const { cartItem } = useSelector((state) => state.library);
  const { role, isLoggedIn } = useSelector((state) => state.auth);

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
                <a>Homepage</a>
              </li>
              <li>
                <Link>Books</Link>
              </li>
              <li>
                <a>About</a>
              </li>
              <li >
              {isLoggedIn && role === "ADMIN" && (
                 <details>
                 <summary>
                   Admin Dashboard
                 </summary>
                 <ul className="p-2 bg-base-100 rounded-t-none">
                   <li><Link to='/admin/library'>Create Book Details</Link></li>
                   <li><Link to='/admin/library/update'>Update Books</Link></li>
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
          <div className="form-control hidden sm:inline-flex">
            <input
              type="text"
              placeholder="Search"
              className="input h-8 input-bordered w-24 md:w-auto"
            />
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
      </div>
    </>
  );
};

export default NavbarOther;
