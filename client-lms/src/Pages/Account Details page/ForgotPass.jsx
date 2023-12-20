import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { forgotPassword } from "../../Redux/Slices/authSlice";

const ForgotPass = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state)=> state.auth)

  const [forgotPassData, setForgotPassData] = useState({
    email: "",
  });

  //hndleing the input fields changes
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setForgotPassData({
      ...forgotPassData,
      [name]: value,
    });
  };

  const hndleForgotpass = async (e) => {
    e.preventDefault();

    if (!forgotPassData.email) {
        toast.error('evert field is required');
    }

    try {
        const actionResult = await dispatch(forgotPassword( forgotPassData))
        
        const response = actionResult.payload
        if (response?.success) {
            setForgotPassData({
                email: ""
            })
            toast.success('Please check your email')
          }
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen w-screen justify-center bg-login bg-cover bg-no-repeat">
        <div className=" backdrop-blur-sm h-screen w-screen flex items-center justify-center">
          <div className="flex gap-3 flex-col items-center justify-between py-5 min-h-fit md:h-[60%] bg-white w-[85%] md:w-2/5 animate-slide-in-left">
            <h1 className="uppercase text-center font-light tracking-[.35em] sm:text-3xl font-serif text-[#269d8b]">
              Forgot password
            </h1>
            <form onSubmit={hndleForgotpass} encType="application/json" className=" flex gap-3 flex-col items-center justify-evenly w-[80%] h-[60%] ">
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
                  value={forgotPassData.email}
                  required
                />
              </div>
              <button
                className="btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
                type="submit"
                disabled={loading}
              >
                Save
              </button>
            </form>
            <p className="pt-4">
              Don't have an account?
              <Link
                to="/signUp"
                className=" text-[#5c269d] cursor-pointer hover:text-[#796b87] underline font-sans"
              >
                Sign Up
              </Link>
            </p>
            <div className=" text-[#5c269d] text-xs cursor-pointer active:text-red-500 hover:text-[#796b87]  font-sans flex items-center justify-center">
              <Link to="/login">Back to login?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
