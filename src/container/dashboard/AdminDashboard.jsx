import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button, Table } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  TrophyOutlined,
  TeamOutlined,
  PlusCircleOutlined,
  BarChartOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Students", count: 200, icon: <UserOutlined /> },
    { title: "Total Tests", count: 50, icon: <TrophyOutlined /> },
    { title: "Answer Sheets", count: 1200, icon: <FileTextOutlined /> },
    { title: "Batchmates", count: 15, icon: <TeamOutlined /> },
  ];

  const studentData = [
    { key: 1, name: "John Doe", tests: 10, avgScore: "85%" },
    { key: 2, name: "Jane Smith", tests: 8, avgScore: "78%" },
    { key: 3, name: "Samuel Green", tests: 12, avgScore: "90%" },
  ];

  const columns = [
    { title: "Student Name", dataIndex: "name", key: "name" },
    { title: "Tests Taken", dataIndex: "tests", key: "tests" },
    { title: "Average Score", dataIndex: "avgScore", key: "avgScore" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <Navbar />
      {/* Dashboard Title */}
      <Title level={2} className="text-center">
        Admin Dashboard
      </Title>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-4 my-4 bg-white rounded-lg shadow-md flex items-center gap-4 "
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl text-blue-600">{stat.icon}</div>
            <div>
              <Text className="text-lg font-semibold">{stat.title}</Text>
              <Title level={3} className="mt-1">
                {stat.count}
              </Title>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Student Data Table */}
      <Card className="mt-6">
        <Title level={4}>Student Details</Title>
        <Table dataSource={studentData} columns={columns} pagination={false} />
      </Card>

      {/* Extra Utilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div
          className="p-4 bg-blue-100 rounded-lg flex items-center gap-4 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/questionForm")}
        >
          <PlusCircleOutlined className="text-3xl text-blue-600" />
          <Text className="text-lg font-semibold">Add Questions</Text>
        </motion.div>

        <motion.div
          className="p-4 bg-purple-100 rounded-lg flex items-center gap-4 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/studentMarks")}
        >
          <FileTextOutlined className="text-3xl text-purple-600" />
          <Text className="text-lg font-semibold">Answer Sheets</Text>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
