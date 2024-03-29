import React from "react";
// import { LordIcon } from 'lord-icon-element';

function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center p-3 bg-purple-200">
        <div className="flex items-center logo font-bold">
          <lord-icon
            src="https://cdn.lordicon.com/omiqopzf.json"
            trigger="hover"
          ></lord-icon>
          ToDo List
        </div>
        <ul className="flex">
          <li className="px-4 hover:font-extrabold">Home</li>
          <li className="px-4 hover:font-extrabold">About</li>
          <li className="px-4 hover:font-extrabold">Contact</li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
