import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../../Redux/Slices/authSlice";

const ChangePass = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector ((state)=> state.auth)
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData({
      ...changePasswordData,
      [name]: value,
    });
  };

  const hndleChangePass = async (e) => {
    e.preventDefault();
    if (!changePasswordData.oldPassword || !changePasswordData.newPassword) {
        toast.error("Every fields are required")
    }
    
    try {
      const actionResult = await dispatch(changePassword({
        data: changePasswordData,  // Sending data as JSON
        _id,
      }));
      const response = actionResult.payload;

      if (response?.success) {
        navigate("/login");
        setChangePasswordData({
          oldPassword: "",
          newPassword: "",
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
          <div className="flex flex-col items-center justify-between py-5 min-h-fit h-[67%] bg-white w-[82%] md:w-2/5 animate-slide-in-left">
            <h1 className="uppercase font-light tracking-[.35em] sm:text-3xl font-serif text-[#269d8b]">
              Change Password
            </h1>
            <form encType="application/json" action="/submit-form" onSubmit={hndleChangePass} className=" flex flex-col items-center justify-evenly w-[80%] h-[100%] ">
              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label
                  className="font-mono tracking-[0.15em]"
                  htmlFor="oldPassword"
                >
                  Old Password
                </label>
                <input
                  placeholder="Enter Your email"
                  className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  required
                  onChange={handleUserInputChange}
                  value={changePasswordData.oldPassword}
                />
              </div>

              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label
                  className="font-mono tracking-[0.15em]"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  placeholder="Enter Your Password"
                  className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  onChange={handleUserInputChange}
                  value={changePasswordData.newPassword}
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
            <p>
              Forgot password?
              <Link
                to='/forgot-password'
                className=" text-[#5c269d] pt-4 cursor-pointer hover:text-[#796b87] underline font-sans"
              >
                Click Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
