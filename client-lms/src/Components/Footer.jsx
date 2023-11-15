import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaSlackHash } from "react-icons/fa";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className="footer items-center p-4 bg-base-200 absolute bottom-0 left-0 text-neutral-content h-[10vh]">
        <aside className="items-center grid-flow-col">
          <FaSlackHash className=" font-bold text-4xl text-neutral " />
          <p className=" font-light text-neutral ">
            Copyright © {year} - All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end ">
          <FaGithub className=" font-bold text-2xl text-neutral " />
          <FaLinkedin className=" font-bold text-2xl text-neutral " />
          <FaInstagram className=" font-bold text-2xl text-neutral " />
        </nav>
      </footer>
    </>
  );
};

export default Footer;
