import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../Redux/Slices/authSlice";
import toast from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const createNewAccount = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form fields to FormData object
    formData.append("fullname", signUpData.fullname);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);

    try {
      const actionResult = await dispatch(createAccount(formData));

      const response = actionResult.payload;

      if (response?.success) {
        navigate("/");
        setSignUpData({
          fullName: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen w-screen justify-center bg-login bg-cover bg-no-repeat ">
        <div className=" backdrop-blur-sm h-screen w-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-between py-5 min-h-fit h-[80%] bg-white w-[80%] md:w-2/5">
            <h1 className="uppercase font-light tracking-[.35em] sm:text-3xl font-serif text-[#269d8b]">
              Sign Up
            </h1>
            <form
              noValidate
              encType="multipart/form-data"
              action="/submit-form"
              method="POST"
              className=" flex flex-col items-center justify-evenly w-[80%] h-[100%]"
              onSubmit={createNewAccount}
            >
              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label
                  className="font-mono tracking-[0.15em]"
                  htmlFor="fullname"
                >
                  Name:
                </label>
                <input
                  className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                  type="text"
                  placeholder="Enter Your Fullname"
                  id="fullname"
                  name="fullname"
                  onChange={handleUserInputChange}
                  value={signUpData.fullname}
                  required
                />
              </div>

              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label className="font-mono tracking-[0.15em]" htmlFor="email">
                  Email:
                </label>
                <input
                  placeholder="Enter Your email"
                  className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleUserInputChange}
                  value={signUpData.email}
                  required
                />
              </div>

              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label
                  className="font-mono tracking-[0.15em]"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  placeholder="Enter Your Password"
                  className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleUserInputChange}
                  value={signUpData.password}
                  required
                />
              </div>

              <button
                className="btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
                type="submit"
              >
                Submit
              </button>
            </form>
            <p>
              Already have an account?
              <Link
                to="/logIn"
                className=" text-[#5c269d] pt-4 cursor-pointer hover:text-[#796b87] underline font-sans"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
