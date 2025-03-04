import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function Courses() {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [learningGoal, setLearningGoal] = useState(null);
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Test Series for Product Based Companies",
      startDate: "27 february, 2025",
      endDate: "31 june, 2025",
      description:
        "Comprehensive test series to prepare for top product companies.",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Combo | Basics of C++ with Data Structures",
      startDate: "28 January, 2025",
      endDate: "2 Agust, 2025",
      description: "Learn C++ with Data Structures and Algorithms in-depth.",
      bgColor: "bg-purple-100",
    },
  ];

  const handleExpand = (id) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };
  const handleTest = () => {
    // console.log("Test clicked");
    navigate("/testPaper");
  };
  return (
    <>
      <Navbar />
      <div className="w-full flex bg-transparent min-h-screen ">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 p-6 mt-18">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl text-black font-bold">Enrolled Courses</h1>
            <div className="flex space-x-4 text-gray-600"></div>
          </div>

          {/* Enrolled Courses */}
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`p-4 rounded-lg shadow-md ${course.bgColor}`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <button
                    onClick={() => handleExpand(course.id)}
                    className="text-gray-600"
                  >
                    {expandedCourse === course.id ? (
                      <HiChevronUp size={24} />
                    ) : (
                      <HiChevronDown size={24} />
                    )}
                  </button>
                </div>
                {expandedCourse === course.id && (
                  <div className="mt-3">
                    <p>{course.description}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Start Date:</strong> {course.startDate} |{" "}
                      <strong>End Date:</strong> {course.endDate}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Weekly Learning Goal */}
          <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold">Set your weekly learning goal</h2>
            <p className="text-gray-600 text-sm mb-4">
              Students who set a goal perform better.
            </p>
            <div className="space-y-2">
              {[
                "2 days a week",
                "3 days a week",
                "5 days a week",
                "7 days a week",
              ].map((goal) => (
                <label key={goal} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="learningGoal"
                    value={goal}
                    checked={learningGoal === goal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    className="w-5 h-5 text-yellow-500"
                  />
                  <span className="text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
            <button
              disabled={!learningGoal}
              className={`mt-4 px-4 py-2 rounded-lg font-semibold ${
                learningGoal
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Set Weekly Learning Goal
            </button>
          </div>

          {/* Referral Section */}
          <div className="mt-6 bg-purple-100 shadow-md rounded-lg p-6 text-center">
            <h2 className="text-lg font-bold">
              Bag Exciting Rewards by Inviting Friends
            </h2>
            <p className="text-gray-700 text-sm">Refer your friend now!</p>
            <button className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Refer & Earn ₹1 000
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
