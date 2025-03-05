import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Typography, Spin, message, Input } from "antd";

const { Title, Text } = Typography;

export default function StudentMarks() {
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://api.nuke.co.in/students");
        console.log("API Response:", response.data); // Debugging ✅

        if (Array.isArray(response.data) && response.data.length > 0) {
          setStudentData(response.data);
        } else {
          message.error("No student data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Unique list of students
  const students = [...new Set(studentData.map((data) => data.enrollment_id))];

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate summary data
  const studentSummary = filteredStudents
    .map((student) => {
      const studentRecords = studentData.filter(
        (data) => data.enrollment_id === student
      );

      if (studentRecords.length === 0) return null; // Ensure valid records ✅

      const obtainedMarks = studentRecords.reduce(
        (acc, curr) => acc + (curr.student_marks ?? 0),
        0
      );
      const totalMarks = studentRecords.reduce(
        (acc, curr) => acc + (curr.total_marks ?? 0),
        0
      );

      return {
        key: student,
        student,
        obtainedMarks,
        totalMarks,
      };
    })
    .filter(Boolean); // Remove null values ✅

  console.log("Processed Student Summary:", studentSummary); // Debugging ✅

  const columns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (text) => <Text strong className="text-lg">{text}</Text>, // Bold Enrollment ID ✅
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      key: "obtainedMarks",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      key: "totalMarks",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-md">
      <Title level={2} className="mb-6">Student Marks Summary</Title>

      {/* Search Input */}
      <Input.Search
        placeholder="Search by Enrollment ID"
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full md:w-1/2"
      />

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={studentSummary.length > 0 ? studentSummary : []}
          locale={{ emptyText: "No student data available." }}
          onRow={(record) => ({
            onClick: () => setSelectedStudent(record.student),
          })}
          pagination={{ pageSize: 5 }}
          rowClassName="cursor-pointer hover:bg-gray-100 text-base py-3"
        />
      )}

      <StudentDetailsModal
        student={selectedStudent}
        studentData={studentData}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}

// Modal Component to Display Student Details
function StudentDetailsModal({ student, studentData, onClose }) {
  if (!student) return null;

  const filteredData = studentData.filter(
    (data) => data.enrollment_id === student
  );

  const columns = [
    {
      title: "Question ID",
      dataIndex: "question_id",
      key: "question_id",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (_, record) => record.answer || record.textarea || "-",
    },
    {
      title: "Marks Obtained",
      dataIndex: "student_marks",
      key: "student_marks",
      render: (marks) => marks ?? 0,
    },
  ];

  return (
    <Modal
      title={<Title level={4} className="mb-0">Student Details: <Text strong>{student}</Text></Title>}
      open={!!student}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowClassName="text-base"
      />
    </Modal>
  );
}
