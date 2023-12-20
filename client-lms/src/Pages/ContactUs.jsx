import React, { useState } from "react";
import LayoutOther from "../Layout/LayoutOther";
import contactImg from "../assets/contactImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fillContactForm } from "../Redux/Slices/contactSlice";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contact);
  console.log(loading);
  const [contactUsData, setContactUsData] = useState({
    name: "",
    email: "",
    message: "",
  });

  //handle input changes
  const handleUserInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setContactUsData({
      ...contactUsData,
      [name]: value,
    });
  };

  //fetch contact us data from contactslice
  const contactUs = async (e) => {
    e.preventDefault();
    if (!contactUsData.name || !contactUsData.email || !contactUsData.message) {
      toast.error("Every field is required 🫥");
    }
    try {
      const actionResult = await dispatch(fillContactForm(contactUsData));
      const response = actionResult.payload;

      if (response?.success) {
        setContactUsData({
          name: "",
          email: "",
          message: "",
        });
        toast.success("Mail send successfully 😊!");
      }
    } catch (error) {
      toast.error("something went wrong 🫥");
    }
  };

  return (
    <LayoutOther>
      <div className="flex min-h-[78.8vh] mb-10 md:mb-1 items-center justify-center">
        <div className="card  w-[85vw] lg:card-side bg-base-200 shadow-sd2 hover:shadow-none ">
          <figure className="lg:w-[58%] w-full md:flex">
            <img src={contactImg} alt="Album" />
          </figure>
          <div className="card-body py-4 flex-col flex items-center justify-center">
            <h1 className="font-mono tracking-[0.15em] text-lg">Contact Us</h1>
            <form
              noValidate
              encType="multipart/form-data"
              action="/submit-form"
              method="POST"
              className=" flex flex-col gap-2 items-center justify-evenly w-[95%] lg:w-[80%] h-[100%]"
              onSubmit={contactUs}
            >
              <div className="flex flex-col w-[100%] justify-center gap-1">
                <label className="font-mono tracking-[0.15em]" htmlFor="name">
                  Name:
                </label>
                <input
                  className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                  type="text"
                  placeholder="Enter Your Fullname"
                  id="name"
                  name="name"
                  onChange={handleUserInputChange}
                  value={contactUsData.name}
                  required
                />
              </div>

              <div className="flex flex-col w-[100%] justify-center gap-1">
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
                  value={contactUsData.email}
                  required
                />
              </div>

              <div className="flex flex-col w-[100%] justify-center gap-1">
                <label
                  className="font-mono tracking-[0.15em]"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  placeholder="Enter Your Message"
                  className="input-bordered input h-24 shadow-sm hover:shadow-none cursor-pointer"
                  id="message"
                  name="message"
                  onChange={handleUserInputChange}
                  value={contactUsData.message}
                  required
                />
              </div>

              <button
                className="text-white w-full mt-2 mb-1 py-1 px-4 uppercase rounded bg-[#5c269d] hover:bg-[#5c269da2] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                type="submit"
                disabled={loading}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </LayoutOther>
  );
};

export default ContactUs;
