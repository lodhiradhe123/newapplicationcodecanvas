import React from "react";
import { IoIosNotifications } from "react-icons/io";

function Navbar() {
  return (
    <div className="w-full px-18 bg-black/20 backdrop-blur-md absolute text-white rounded-b-md fixed">
      <ul className=" flex gap-10 justify-between p-6 font-semibold">
        <h1>Code Canvas</h1>
        <li className=" flex gap-10">
          {/* <a href="/">Home</a>
          <a href="/courses">Courses</a> */}
        </li>
        <div className="flex gap-4 justify-center  items-center">
          <IoIosNotifications className="text-xl" />
          <img
            src="https://images.unsplash.com/photo-1740004731264-3cde5c198cc2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className=" w-6 h-6 rounded-full contain "
          />
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
