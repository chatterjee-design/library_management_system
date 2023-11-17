import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="flex items-center h-screen w-screen justify-center bg-login bg-cover bg-no-repeat ">
        <div className=" backdrop-blur-sm h-screen w-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-between py-5 min-h-fit h-[80%] bg-white w-[80%] md:w-2/5">
            <h1 className="uppercase font-light tracking-[.35em] sm:text-3xl font-serif text-[#269d8b]" >Sign Up</h1>
            <form className=" flex flex-col items-center justify-evenly w-[80%] h-[100%] ">
              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label className="font-mono tracking-[0.15em]" htmlFor="name">Name:</label>
                <input 
                className="border-b"
                type="text" placeholder="Enter Your Fullname" id="name" name="name" required />
              </div>

              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label className="font-mono tracking-[0.15em]" htmlFor="email">Email:</label>
                <input placeholder="Enter Your email" className="border-b" type="email" id="email" name="email" required />
              </div>

              <div className="flex flex-col w-[100%] justify-center gap-3">
                <label className="font-mono tracking-[0.15em]" htmlFor="password">Password:</label>
                <input placeholder="Enter Your Password" className="border-b" type="password" id="password" name="password" required />
              </div>

              <button className="btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary" type="submit">Submit</button>
            </form>
            <p>Already have an account? <span className=" text-[#5c269d] pt-4 cursor-pointer hover:text-[#796b87] underline font-sans">Login</span> </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
