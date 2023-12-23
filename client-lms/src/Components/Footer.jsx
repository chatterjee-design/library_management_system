import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaSlackHash } from "react-icons/fa";
import { Link } from "react-router-dom";
import openBookImg from "../assets/open-book.png";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className="footer items-center px-4 py-4 md:py-0 bg-base-200 text-neutral-content min-h-fit md:h-[10vh]">
        <aside className="items-center grid-flow-col justify-self-center md:justify-self-start ">
          <img src={openBookImg} alt="logo" className="h-10 w-10" />
          <p className="pl-2 font-light text-neutral ">
            Copyright © {year} - All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end justify-self-center ">
          <Link
            to="https://github.com/chatterjee-design"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="font-bold text-2xl text-neutral" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/mousumi-chatterjee-846ab7223"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="font-bold text-2xl text-neutral" />
          </Link>
          <Link
            to="https://www.instagram.com/c_h_a_t_t_e_r_j_e_e_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="font-bold text-2xl text-neutral" />
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
