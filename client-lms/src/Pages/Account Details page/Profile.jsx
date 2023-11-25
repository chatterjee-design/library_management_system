import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Slices/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { role, data } = useSelector((state) => state.auth);
  const _id = data._id;

  const getUserData = async () => {
    try {
      await dispatch(getProfile());
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, [dispatch]);

  return (
    <LayoutOther userData={data}>
      <div className=" w-[100%] flex bg-login bg-cover bg-no-repeat flex-col h-[78.8vh] justify-center items-center opacity-0 animate-fade-in-left ">
        <div className="flex w-[100%] backdrop-blur-sm backdrop-brightness-50 flex-col h-[78.8vh] justify-center items-center">
          <div className="flex gap-10  w-[70%] h-[50%] shadow-sd bg-white items-center relative justify-center">
            <figure className="w-[20%] relative bottom-24">
              <img
                src={data?.avatar?.secure_url}
                alt="user"
                className=" rounded-full "
              />
            </figure>
            <div className="flex flex-col items-center gap-1 justify-center">
              <h1 className="font font-sans  tracking-[0.3em] text-2xl font-extralight">
                {data?.fullname}
              </h1>
              <p className="font-sans tracking-widest text-sm font-extralight">
                {data?.email}
              </p>
              <h1 className="font mt-4 font-serif text-[#269d8b] tracking-[0.3em] text-xl font-extralight">
                You are an {role}.
              </h1>
            <Link to={`/change-password/${_id}`} className=" bg-[#5c269d] text-white tracking-[0.3em] px-3 py-2 mt-3">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LayoutOther>
  );
};

export default Profile;
