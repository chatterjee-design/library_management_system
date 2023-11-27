import React from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { FaRegEdit,  FaCameraRetro } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <LayoutOther>
      <div className="px-16 pb-10">
        <div className="p-8 bg-white shadow md:mt-12 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Edit Profile
              </button>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Change Password
              </button>
            </div>
          </div>
          <div className="mt-20 text-center pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              Mousumi Chatterjee
            </h1>
            <p className="font-light text-gray-600 mt-3">mousumi50@gmail.com</p>
            <p className="mt-8 text-gray-500">
              Role - Admin
            </p>
          </div>
        </div>
      </div>
    </LayoutOther>
  );
};

export default ProfileCard;
