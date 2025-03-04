import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

function Home() {
  const overviewData = [
    { title: "25k+", description: "Student Taught" },
    { title: "10+", description: "Instructors" },
    { title: "25+", description: "Employees" },
  ];
  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0nNDMwJyBoZWlnaHQ9JzQwNDcnIHZpZXdCb3g9JzAgMCA0MzAgNDA0NycgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZyBjbGlwLXBhdGg9J3VybCgjY2xpcDBfMjUwXzQ3NiknPjxyZWN0IHdpZHRoPSc0MzAnIGhlaWdodD0nNDA0NycgZmlsbD0nIzBDMEMwQycvPjxnIG9wYWNpdHk9JzAuNyc+PGcgb3BhY2l0eT0nMC40JyBmaWx0ZXI9J3VybCgjZmlsdGVyMF9mXzI1MF80NzYpJz48cGF0aCBkPSdNMTQxLjczMSAyNDkuMjAxQzk3LjU5NDcgMTc4LjM5IDEwOS4yNzMgNzUuMTk3IDE3OC4zNDkgMzIuMTQzNUMyNDcuNDI0IC0xMC45MTAxIDI5OS4xNjggMjUuMzI0MSAzNDMuMzAzIDk2LjEzNTdDMzg3LjQzOSAxNjYuOTQ3IDMwMy4zMjcgMTExLjA2OCAyNDYuNjU5IDE0Ni4zODhDMTc3LjU4NCAxODkuNDQyIDE4NS44NjcgMzIwLjAxMyAxNDEuNzMxIDI0OS4yMDFaJyBmaWxsPScjMjRDRkE2Jy8+PC9nPjxnIGZpbHRlcj0ndXJsKCNmaWx0ZXIxX2ZfMjUwXzQ3NiknPjxjaXJjbGUgY3g9JzM5NycgY3k9JzgxNS45NDEnIHI9JzU5JyBmaWxsPScjMjRDRkE2Jy8+PC9nPjxnIGZpbHRlcj0ndXJsKCNmaWx0ZXIyX2ZfMjUwXzQ3NiknPjxjaXJjbGUgY3g9JzQyJyBjeT0nMjY2OS45Nicgcj0nMTAzJyBmaWxsPScjMjRDRkE2Jy8+PC9nPjwvZz48L2c+PGRlZnM+PGZpbHRlciBpZD0nZmlsdGVyMF9mXzI1MF80NzYnIHg9Jy0yOC4zNDc3JyB5PSctMTMwLjQwNycgd2lkdGg9JzUyNy45OTUnIGhlaWdodD0nNTQ0LjI1OCcgZmlsdGVyVW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9JzAnIHJlc3VsdD0nQmFja2dyb3VuZEltYWdlRml4Jy8+PGZlQmxlbmQgbW9kZT0nbm9ybWFsJyBpbj0nU291cmNlR3JhcGhpYycgaW4yPSdCYWNrZ3JvdW5kSW1hZ2VGaXgnIHJlc3VsdD0nc2hhcGUnLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSc3MicgcmVzdWx0PSdlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzI1MF80NzYnLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSdmaWx0ZXIxX2ZfMjUwXzQ3NicgeD0nOTQnIHk9JzUxMi45NDEnIHdpZHRoPSc2MDYnIGhlaWdodD0nNjA2JyBmaWx0ZXJVbml0cz0ndXNlclNwYWNlT25Vc2UnIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0nc1JHQic+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0nMCcgcmVzdWx0PSdCYWNrZ3JvdW5kSW1hZ2VGaXgnLz48ZmVCbGVuZCBtb2RlPSdub3JtYWwnIGluPSdTb3VyY2VHcmFwaGljJyBpbjI9J0JhY2tncm91bmRJbWFnZUZpeCcgcmVzdWx0PSdzaGFwZScvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEyMicgcmVzdWx0PSdlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzI1MF80NzYnLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSdmaWx0ZXIyX2ZfMjUwXzQ3NicgeD0nLTQ2MScgeT0nMjE2Ni45Nicgd2lkdGg9JzEwMDYnIGhlaWdodD0nMTAwNicgZmlsdGVyVW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9JzAnIHJlc3VsdD0nQmFja2dyb3VuZEltYWdlRml4Jy8+PGZlQmxlbmQgbW9kZT0nbm9ybWFsJyBpbj0nU291cmNlR3JhcGhpYycgaW4yPSdCYWNrZ3JvdW5kSW1hZ2VGaXgnIHJlc3VsdD0nc2hhcGUnLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScyMDAnIHJlc3VsdD0nZWZmZWN0MV9mb3JlZ3JvdW5kQmx1cl8yNTBfNDc2Jy8+PC9maWx0ZXI+PGNsaXBQYXRoIGlkPSdjbGlwMF8yNTBfNDc2Jz48cmVjdCB3aWR0aD0nNDMwJyBoZWlnaHQ9JzQwNDcnIGZpbGw9J3doaXRlJy8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+Cg==")`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          //   width: "100%",
          //   height: "1000px",
        }}
        className="w-full flex flex-col items-center min-h-screen"
      >
        <div className="w-1/2 mt-32 text-center">
          <h1 className="text-white text-6xl">
            We only teach <br /> What we are really <br /> really{" "}
            <span className="text-green-300 font-normal">good</span> at
          </h1>
          <button className="px-8 py-4 bg-[#27E0B3] mt-6 rounded-lg font-semibold">
            Check courses-make an impact
          </button>
          <div className="flex gap-10 justify-between px-8 mt-24 text-white ">
            {overviewData.map((data, i) => {
              return (
                <div key={i}>
                  <h2 className="text-4xl font-bold">{data.title}</h2>
                  <p className="mt-2 text-xl font-normal">{data.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* //second page */}
        <div className="w-full flex flex-col items-center mt-24">
          <h1 className="text-white text-5xl text-center">
            We do whatever it takes to help you <br /> Understand the concepts
          </h1>
          <div className="w-[70%] h-96 bg-gray-200 mt-12 rounded-lg">
            {" "}
            <video src="../../assets/video/video.webm"></video>
          </div>
          <button className="px-5 py-3 bg-red-300 mt-10 rounded-lg">
            Explore Learning
          </button>
          <div className="w-[70%]  bg-white mt-12 rounded-lg"></div>
        </div>
      </div>
    </>
  );
}

export default Home;
