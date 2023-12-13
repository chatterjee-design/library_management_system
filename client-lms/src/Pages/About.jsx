import React from "react";
import contactImg from "../assets/contactImg.jpg";
import LayoutOther from "../Layout/LayoutOther";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <LayoutOther>
      <div className="flex min-h-[78.8vh] my-10 flex-col items-center justify-center">
        <div className="card  w-[85vw] lg:card-side bg-base-200 shadow-sd2 hover:shadow-none ">
          <figure className="lg:w-[58%] w-full md:flex">
            <img src={contactImg} alt="Album" />
          </figure>
          <div className="card-body py-4 lg:w-[42%] flex-col flex items-center justify-center">
            <h2 className="card-title tracking-[.24em] text-3xl text-[#269d8b] font-light font-serif">
              About Us
            </h2>
            <div>
              <p className="font-serif text-justify tracking-[.05em] leading-loose">
                Welcome to{" "}
                <Link
                  to="/"
                  className="tracking-[.15em] sm:text-sm cursor-pointer text-[#5c269d]"
                >
                  Readsphere
                </Link>
                , where we believe in the transformative power of knowledge and
                the joy of reading. Our system is designed with a passion for
                providing an enriching library experience that goes beyond the
                traditional boundaries.
              </p>
            </div>
          </div>
        </div>
        <div className="card card-compact w-[80%] bg-base-100 p-10 shadow-sd2 min-h-[24rem] my-16 flex items-center justify-center mx-auto  opacity-0 animate-fade-in-left">
          <div className="card-body flex flex-col gap-10 items-center justify-center ">
            <h2 className="card-title text-center tracking-[.24em] text-3xl text-[#269d8b] font-light font-serif">
              What Sets Us Apart?
            </h2>
            <div className="w-[90%] leading-loose  gap-3 flex flex-col font-serif  flex-wrap justify-center items-start">
              <div className="flex">
                <p>
                  <li className="md:text-lg font-bold tracking-widest">
                    Diverse Collection:
                  </li>
                  {"  "}
                  Explore a curated selection of books spanning various genres
                  and topics, ensuring there's something for everyone.
                </p>
              </div>

              <div className="flex">
                <p>
                  <li className="md:text-lg font-bold tracking-widest">
                    Effortless Navigation:
                  </li>
                  {"  "}
                  Our user-friendly interface makes it easy for you to browse,
                  search, and discover new titles seamlessly.
                </p>
              </div>
              <div className="flex">
                <p>
                  <li className="md:text-lg font-bold tracking-widest">
                    Convenient Cart Management:
                  </li>{" "}
                  Build your reading list with our intuitive cart system, making
                  it simple to organize and order the books you desire.
                </p>
              </div>
              <div className="flex">
                <p>
                  <li className="md:text-lg font-bold tracking-widest">
                    Late Fine Management:
                  </li>{" "}
                  We understand life can get busy. Our system offers a
                  transparent and fair late fine management process, ensuring a
                  stress-free library experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-compact w-[80%] bg-base-100 p-10 shadow-sd2 min-h-[24rem] my-16 flex items-center justify-center mx-auto  opacity-0 animate-fade-in-left">
          <div className="card-body flex flex-col gap-10 items-center justify-center ">
            <h2 className="card-title text-center tracking-[.24em] text-3xl text-[#269d8b] font-light font-serif">
              Our Commitment to You
            </h2>
            <div className="w-[90%] leading-loose flex flex-col font-serif  flex-wrap justify-center items-start">
              <p className="font-serif text-justify tracking-[.05em] leading-loose">
                As avid supporters of literacy and education, we are committed
                to fostering a community that values the power of knowledge.
                Whether you're a casual reader, a student, or a lifelong
                learner,{" "}
                <Link
                  to="/"
                  className="tracking-[.15em] sm:text-sm cursor-pointer text-[#5c269d]"
                >
                  Readsphere
                </Link>{" "}
                is here to enhance your reading journey. <br />
                Thank you for choosing [Your Library Management System Name].
                Join us in the adventure of exploration, learning, and the joy
                of reading!
                </p>
                <br /><h2>Happy Reading!</h2> <br/>
                <Link
                  to="/"
                  className="tracking-[.15em] sm:text-sm cursor-pointer text-[#5c269d]"
                >
                  Readsphere
                </Link>
              
            </div>
          </div>
        </div>
      </div>
    </LayoutOther>
  );
};

export default About;
