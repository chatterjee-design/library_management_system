import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Slices/authSlice";
import { Link } from "react-router-dom";
import LoaderPage2 from "../Loader/Loader2";

const Profile = () => {
  const dispatch = useDispatch();
  const { role, data, loading } = useSelector((state) => state.auth);
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
      <div className=" w-[100%] flex bg-login bg-cover bg-no-repeat flex-col md:h-[78.8vh] justify-center items-center opacity-0 animate-fade-in-left ">
        {loading ? (
          <LoaderPage2 />
        ) : (
          <div className="flex w-[100%] backdrop-blur-sm backdrop-brightness-50 flex-col md:h-[78.8vh] justify-center items-center">
            <div className="px-16 pb-10">
              <div className="p-8 bg-white shadow md:mt-13 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <div className="w-48 bg-white h-48  mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                      <img
                        src={data?.avatar?.secure_url}
                        alt="user"
                        className=" rounded-full "
                      />
                    </div>
                  </div>
                  <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                    <Link
                      to={`/edit-profile/${_id}`}
                      className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to={`/change-password/${_id}`}
                      className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
                <div className="mt-20 text-center pb-12">
                  <h1 className="font font-sans  tracking-[0.3em] text-2xl font-extralight">
                    {data?.fullname}
                  </h1>
                  <p className="font-sans tracking-widest text-sm font-extralight">
                    {data?.email}
                  </p>
                  <h1 className="font mt-4 font-serif text-[#269d8b] tracking-[0.3em] text-xl font-extralight">
                    You are an {role}.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutOther>
  );
};

export default Profile;
