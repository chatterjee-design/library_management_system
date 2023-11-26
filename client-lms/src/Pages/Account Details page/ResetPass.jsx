import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../Redux/Slices/authSlice';
import toast from 'react-hot-toast';

const ResetPass = () => {
    const {resetToken} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [resetPassData, setResetPassData] = useState({
        password : ""
    }) 

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setResetPassData({
          ...resetPassData,
          [name]: value,
        });
      };
    
    const handleResetPass = async (e) => {
        e.preventDefault();
        if (!resetPassData.password) {
            toast.error('evert field is required');
        }
        try {
            const actionResult = await dispatch(resetPassword({
                data: resetPassData,
                resetToken
            }))
            const response = actionResult.payload

            if (response?.success) {
                navigate("/login");
                setResetPassData({
                    password : ""
                })
                toast.success("Password updated successfully!")
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    
  return (
    <>
      <div className="flex items-center h-screen w-screen justify-center bg-login bg-cover bg-no-repeat">
        <div className=" backdrop-blur-sm h-screen w-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-between py-5 min-h-fit h-[60%] bg-white w-[85%] md:w-2/5 animate-slide-in-left">
            <h1 className=" font-light tracking-[.35em] sm:text-3xl font-serif text-[#269d8b]">
              Reset password
            </h1>
            <form action="/submit-form" onSubmit={handleResetPass} encType="application/json" className=" flex flex-col items-center justify-evenly w-[80%] h-[60%] ">
              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label className="font-mono tracking-[0.15em]" htmlFor="password">
                  Password:
                </label>
                <input
                  placeholder="Enter Your password"
                  className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleUserInputChange}
                  value={resetPassData.password}
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
        
            <div className=" text-[#5c269d]  cursor-pointer active:text-red-500 hover:text-[#796b87]  font-sans flex items-center justify-center">
              <Link to="/login">Back to login?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPass
