import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";


//footer component for the landing page
export default function Footer({overflow}) {
  return (
    <div className="overflow-hidden">
      <div className=" h-15 w-screen bg-gray-800 p-6  text-white flex items-center gap-2 justify-center">
        <h1 className="font-Poppins">Developed by Rajikshan K</h1>
        <a href="https://www.linkedin.com/in/krishnakumar-rajikshan-4853861a5/">
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Rajikshank"
          className="hover:shadow-white  hover:drop-shadow-xl"
        >
          <FaSquareGithub />
        </a>
      </div>
    </div>
  );
}
