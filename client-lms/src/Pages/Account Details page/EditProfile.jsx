import React, { useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../Redux/Slices/authSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const _id = useParams();
  const { loading } = useSelector((state)=> state.auth)

  const [selectedFileName, setSelectedFileName] = useState("");

  const [editProfileDetails, setEditProfileDetails] = useState({
    fullname: "",
    avatar: "",
  });

  function handleInputFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setEditProfileDetails({
        ...editProfileDetails,
        avatar: file,
      });

      //filereader will read the file and show it
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", function () {
        setSelectedFileName(this.result);
      });
    }
    setSelectedFileName(file ? file.name : "");
    toast.success(file ? file.name : "");
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditProfileDetails({
      ...editProfileDetails,
      [name]: value,
    });
  };

  const hndleEditProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", editProfileDetails.fullname);
    formData.append("avatar", editProfileDetails.avatar);

    try {
      const actionResult = await dispatch(
        editProfile({
          _id,
          data: formData,
        })
      );
      const response = actionResult?.payload;
      if (response?.success) {
        navigate('/profile')
        setEditProfileDetails({
          fullname: "",
          avatar: "",
        });
        toast.success("profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <LayoutOther>
      <div className=" w-[100%] flex bg-login bg-cover bg-no-repeat flex-col md:h-[78.8vh] justify-center items-center opacity-0 animate-fade-in-left ">
        <div className="flex w-[100%] backdrop-blur-sm backdrop-brightness-50 flex-col md:h-[78.8vh] justify-center items-center">
          <div className="px-16 pb-10 flex items-center justify-center w-[45%]">
            <div className="p-8 bg-white shadow md:mt-15 mt-20 w-[100%]">
              <div className="grid grid-cols-1">
                <div className="relative">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    {selectedFileName ? (
                      <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        <img
                          className="w-48 h-48 rounded-full m-auto"
                          src={selectedFileName}
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-24 w-24"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                  <input
                    className=" hidden"
                    aria-describedby="file_input_help"
                    id="fileInput"
                    type="file"
                    name="fileInput"
                    onChange={handleInputFile}
                  />
                </div>
              </div>
              <form onSubmit={hndleEditProfile} className=" mt-24 pb-5 flex items-center justify-center gap-5 flex-col ">
                <div className="flex flex-col w-[100%] justify-center gap-3">
                  <label
                    className="font-mono tracking-[0.15em]"
                    htmlFor="fullname"
                  >
                    Name:
                  </label>
                  <input
                    placeholder="Enter Your fullName"
                    className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                    type="text"
                    id="fullname"
                    name="fullname"
                    onChange={handleInputChange}
                    value={editProfileDetails?.fullname}
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
            </div>
          </div>
        </div>
      </div>
    </LayoutOther>
  );
};

export default EditProfile;
