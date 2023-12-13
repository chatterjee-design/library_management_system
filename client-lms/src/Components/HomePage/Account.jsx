import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutAccount } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";

const Account = () => {
  return (
    <>
      <div className="card card-compact w-[80%] bg-base-100 shadow-sd2 my-16 flex items-center justify-center mx-auto h-96 opacity-0 animate-fade-in-left">
        <div className="card-body flex flex-col items-center justify-center ">
          <h2 className="card-title tracking-[.24em] text-3xl text-[#269d8b] font-light font-serif">
            Didn't have an account?
          </h2>
          <div className="card-actions flex items-center justify-center gap-5 mt-7">
            <Link
              to="/signUp"
              className="btn bg-[#5c269d]  text-white tracking-[0.3em] btn-primary"
            >
              Sign In
            </Link>
            <p>OR</p>
            <Link
              to="/logIn"
              className="btn border-1 bg-transparent text-black border-[#5c269d] hover:bg-[#5c269d] hover:text-white tracking-[0.3em] btn-primary"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
