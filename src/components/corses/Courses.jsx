import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Collapse, Radio, Typography } from "antd";
import { DownOutlined, UpOutlined, GiftOutlined, CalendarOutlined, FlagOutlined } from "@ant-design/icons";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const { Title, Text } = Typography;
const { Panel } = Collapse;

function Courses() {
  const [learningGoal, setLearningGoal] = useState(null);
  const navigate = useNavigate();

  // Course Data
  const courses = [
    {
      id: 1,
      title: "Test Series for Product Based Companies",
      startDate: "27 February, 2025",
      endDate: "31 June, 2025",
      description: "Comprehensive test series to prepare for top product companies.",
    },
    {
      id: 2,
      title: "Combo | Basics of C++ with Data Structures",
      startDate: "28 January, 2025",
      endDate: "2 August, 2025",
      description: "Learn C++ with Data Structures and Algorithms in-depth.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="w-full flex bg-transparent min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 mt-18">
          {/* Title */}
          <Title level={2}>Enrolled Courses</Title>

          {/* Course List */}
          <Collapse accordion expandIcon={({ isActive }) => isActive ? <UpOutlined /> : <DownOutlined />}>
            {courses.map((course) => (
              <Panel
                key={course.id}
                header={
                  <div className="flex items-center space-x-2">
                    <CalendarOutlined />
                    <span>{course.title}</span>
                  </div>
                }
              >
                <Text>{course.description}</Text>
                <p className="text-gray-600 mt-2">
                  <strong>Start Date:</strong> {course.startDate} | <strong>End Date:</strong> {course.endDate}
                </p>
              </Panel>
            ))}
          </Collapse>

          {/* Weekly Learning Goal */}
          <Card className="mt-6">
            <Title level={4}>
              <FlagOutlined className="mr-2" /> Set Your Weekly Learning Goal
            </Title>
            <Text type="secondary">Students who set a goal perform better.</Text>
            <Radio.Group onChange={(e) => setLearningGoal(e.target.value)} className="mt-4 block">
              <Radio value="2 days a week">2 days a week</Radio>
              <Radio value="3 days a week">3 days a week</Radio>
              <Radio value="5 days a week">5 days a week</Radio>
              <Radio value="7 days a week">7 days a week</Radio>
            </Radio.Group>
            <Button
              type="primary"
              className="mt-4"
              disabled={!learningGoal}
              onClick={() => alert(`Goal set to: ${learningGoal}`)}
            >
              Set Weekly Learning Goal
            </Button>
          </Card>

          {/* Referral Section */}
          <Card className="mt-6 text-center bg-purple-100">
            <Title level={4}>
              <GiftOutlined className="mr-2 text-purple-500" /> Bag Exciting Rewards by Inviting Friends
            </Title>
            <Text>Refer your friend now!</Text>
            <Button type="primary" className="mt-3 bg-purple-500">
              Refer & Earn ₹1,000
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Courses;
