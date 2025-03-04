import React, { useEffect, useState } from "react";

// const studentData = Array.from({ length: 10 * 30 }, (_, index) => {
//   const studentId = `student_${Math.floor(index / 30) + 1}`;
//   return {
//     id: index + 1,
//     enrollment_id: studentId,
//     session_id: `session_${Math.floor(index / 30) + 1}`,
//     question_id: (index % 30) + 1,
//     answer: Math.random() > 0.5 ? `Answer ${index + 1}` : null,
//     type: Math.random() > 0.5 ? "single" : "textarea",
//     textarea: Math.random() > 0.5 ? `Text answer ${index + 1}` : null,
//     student_marks: Math.floor(Math.random() * 6),
//     total_marks: 5,
//     created_at: "2025-03-03 10:34:13",
//     updated_at: "2025-03-03 10:36:00",
//   };
// });

import axios from "axios";

const fetchStudentData = async () => {
  // Dummy API function simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          enrollment_id: "0863cs191075",
          session_id: "fa38a9f0-75b4-48db-be4d-988a03a5e6b1",
          question_id: 3,
          answer: "Recievee",
          type: "single",
          textarea: null,
          student_marks: 2,
          total_marks: 5,
          created_at: "2025-03-03 10:34:13",
          updated_at: "2025-03-03 10:36:00",
        },
        {
          id: 2,
          enrollment_id: "0863cs191075",
          session_id: "fa38a9f0-75b4-48db-be4d-988a03a5e6b1",
          question_id: 9,
          answer: null,
          type: "textarea",
          textarea: "test abc",
          student_marks: null,
          total_marks: 5,
          created_at: "2025-03-03 10:36:29",
          updated_at: "2025-03-03 10:36:29",
        },
        {
          id: 3,
          enrollment_id: "0863cs191075",
          session_id: "fa38a9f0-75b4-48db-be4d-988a03a5e6b1",
          question_id: 4,
          answer: "Beautiful",
          type: "single",
          textarea: null,
          student_marks: 3,
          total_marks: 5,
          created_at: "2025-03-03 10:38:49",
          updated_at: "2025-03-03 10:38:49",
        },
        {
          id: 4,
          enrollment_id: "Ksishalqoshbau",
          session_id: "e8c0a8be-b5c5-46b7-951d-f5a346e24912",
          question_id: 7,
          answer: "GET",
          type: "single",
          textarea: null,
          student_marks: 3,
          total_marks: 5,
          created_at: "2025-03-03 11:03:01",
          updated_at: "2025-03-03 11:03:01",
        },
      ]);
    }, 1000);
  });
};

// const studentData = [
//   {
//     id: 1,
//     enrollment_id: "0863cs191075",
//     session_id: "fa38a9f0-75b4-48db-be4d-988a03a5e6b1",
//     question_id: 3,
//     answer: "Recievee",
//     type: "single",
//     textarea: null,
//     student_marks: 2,
//     total_marks: 5,
//     created_at: "2025-03-03 10:34:13",
//     updated_at: "2025-03-03 10:36:00",
//   },
//   {
//     id: 2,
//     enrollment_id: "0863cs191075",
//     session_id: "fa38a9f0-75b4-48db-be4d-988a03a5e6b1",
//     question_id: 9,
//     answer: null,
//     type: "textarea",
//     textarea: "test abc",
//     student_marks: null,
//     total_marks: 5,
//     created_at: "2025-03-03 10:36:29",
//     updated_at: "2025-03-03 10:36:29",
//   },
//   {
//     id: 3,
//     enrollment_id: "0863cs191075",
//     session_id: "fa38a9f0-75b4-48db-be4d-988a03a5e6b1",
//     question_id: 4,
//     answer: "Beautiful",
//     type: "single",
//     textarea: null,
//     student_marks: 3,
//     total_marks: 5,
//     created_at: "2025-03-03 10:38:49",
//     updated_at: "2025-03-03 10:38:49",
//   },
//   {
//     id: 4,
//     enrollment_id: "Ksishalqoshbau",
//     session_id: "e8c0a8be-b5c5-46b7-951d-f5a346e24912",
//     question_id: 7,
//     answer: "GET",
//     type: "single",
//     textarea: null,
//     student_marks: 3,
//     total_marks: 5,
//     created_at: "2025-03-03 11:03:01",
//     updated_at: "2025-03-03 11:03:01",
//   },
// ];

export default function StudentMarks() {
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://dummyapi.com/studentData");
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
        const fallbackData = await fetchStudentData();
        setStudentData(fallbackData);
      }
    };
    getData();
  }, []);

  const students = [...new Set(studentData.map((data) => data.enrollment_id))];

  const studentSummary = students.map((student) => {
    const studentRecords = studentData.filter(
      (data) => data.enrollment_id === student
    );
    const obtainedMarks = studentRecords.reduce(
      (acc, curr) => acc + (curr.student_marks || 0),
      0
    );
    const totalMarks = studentRecords.reduce(
      (acc, curr) => acc + (curr.total_marks || 0),
      0
    );
    return { student, obtainedMarks, totalMarks };
  });

  const filteredData = studentData.filter(
    (data) => data.enrollment_id === selectedStudent
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Student Marks Summary</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Student</th>
            <th className="border p-2">Obtained Marks</th>
            <th className="border p-2">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {studentSummary.map((student, index) => (
            <tr
              key={index}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedStudent(student.student)}
            >
              <td className="border p-2">{student.student}</td>
              <td className="border p-2">{student.obtainedMarks}</td>
              <td className="border p-2">{student.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto h-screen p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-auto max-h-[80vh]">
            <h3 className="text-xl font-semibold">
              Student: {selectedStudent}
            </h3>
            <div className="overflow-auto max-h-96">
              <table className="w-full mt-4 border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Question ID</th>
                    <th className="border p-2">Answer</th>
                    <th className="border p-2">Marks Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td className="border p-2">{item.question_id}</td>
                      <td className="border p-2">
                        {item.answer || item.textarea || "-"}
                      </td>
                      <td className="border p-2">{item.student_marks || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
