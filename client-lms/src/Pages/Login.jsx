import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logInAccount } from "../Redux/Slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const logIn = async (e) => {
    e.preventDefault();

    const loginPayload = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const actionResult = await dispatch(logInAccount(loginPayload));

      const response = actionResult.payload;

      if (response?.success) {
        navigate("/");
        setLoginData({
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
      <div className="flex items-center h-screen w-screen justify-center bg-login bg-cover bg-no-repeat">
        <div className=" backdrop-blur-sm h-screen w-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-between py-5 min-h-fit h-[70%] bg-white w-[80%] md:w-2/5 animate-slide-in-left">
            <h1 className="uppercase font-light tracking-[.35em] sm:text-3xl font-serif text-[#269d8b]">
              LogIn
            </h1>
            <form
              onSubmit={logIn}
              className=" flex flex-col items-center justify-evenly w-[80%] h-[70%] "
            >
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
                  value={loginData.email}
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
                  value={loginData.password}
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
            <div className=" text-[#5c269d] active:text-red-700 text-xs cursor-pointer hover:text-[#796b87] underline font-sans flex items-center justify-center" >
              <Link to='/forgot-password'>Forgot Password?</Link>
              </div>
            <p className="pt-4">
              Don't have an account?
              <Link
                to="/signUp"
                className=" text-[#5c269d] pt-4 cursor-pointer hover:text-[#796b87] underline font-sans"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
