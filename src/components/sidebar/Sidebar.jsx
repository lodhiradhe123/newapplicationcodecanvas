import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-32 bg-transparent shadow-md flex flex-col items-center py-6 space-y-4 p-1 mt-18">
      {/* <div className="relative">
        <FaUserCircle className="text-3xl text-gray-600" />
      </div> */}
      <div className="w-full text-center text-xs font-bold text-gray-600 px-2 py-3 bg-blue-100 rounded-lg">
        Learning Awards
      </div>
      <div className=" w-full text-center text-xs font-bold text-gray-600 px-2 py-3 bg-blue-100 rounded-lg">
        Batchmates
      </div>
      <div
        // onClick={}
        className=" w-full text-center text-xs font-bold text-gray-600 px-2 py-3 bg-blue-100 rounded-lg cursor-pointer"
      >
        Tests
      </div>
      <div
        onClick={() => navigate("/questionForm")}
        className=" w-full text-center text-xs font-bold text-gray-600 px-2 py-3 bg-blue-100 rounded-lg cursor-pointer"
      >
        Add Questions
      </div>
    </div>
  );
}

export default Sidebar;
