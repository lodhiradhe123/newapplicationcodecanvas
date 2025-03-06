import React, { useState } from "react";
import {
  Card,
  Avatar,
  Input,
  Select,
  Tag,
  Button,
  Divider,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const { Option } = Select;

const StudentProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstName: "Radheshyam",
    lastName: "Lodhi",
    email: "Radhe.Lodhi@gmail.com",
    phone: "+91 9652364852",
    designation: "Full Stack Developer",
    address1: "3801 Chalk Butte Rd, Cut Bank, MT 452001, Madhya Pradesh",
    address2: "301 Chalk Butte Rd, Cut Bank, NY 96572, Indore",
    country: "India",
    state: "MadhyaPradesh",
    skills: [
      "Adobe XD",
      "Angular",
      "Corel Draw",
      "Figma",
      "HTML",
      "Illustrator",
      "Javascript",
      "Logo Design",
      "Material UI",
      "NodeJS",
      "npm",
      "Photoshop",
      "React",
      "Reduxjs & toolkit",
      "SASS",
    ],
  });

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <Card className="w-full max-w-5xl p-6 shadow-lg bg-white rounded-xl">
          {/* Profile Header */}
          <div className=" flex gap-6 items-center border-b pb-4">
            {/* <Avatar size={100} icon={<UserOutlined />} /> */}
            <Avatar
              size={100}
              src="https://images.unsplash.com/photo-1740004731264-3cde5c198cc2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D"
              icon={<UserOutlined />}
              className="cursor-pointer border-4 border-white transition-transform hover:scale-110 "
            />
            <div>
              <Title level={3}>
                {student.firstName} {student.lastName}
              </Title>
              <Text type="secondary">{student.designation}</Text>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-blue-500">
                  Twitter
                </a>
                <a href="#" className="text-blue-700">
                  Facebook
                </a>
                <a href="#" className="text-blue-600">
                  LinkedIn
                </a>
              </div>
            </div>
            <button
              className="absolute top-5 text-xl font-bold right-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              ✕
            </button>
          </div>

          {/* Personal Information */}
          <Title level={4} className="mt-6">
            Personal Information
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  font-bold ">
            <Input
              addonBefore="First Name "
              value={student.firstName}
              disabled
            />
            <Input addonBefore="Last Name" value={student.lastName} disabled />
            <Input
              addonBefore={<MailOutlined />}
              value={student.email}
              disabled
            />
            <Input
              addonBefore={<PhoneOutlined />}
              value={student.phone}
              disabled
            />
            <Input
              addonBefore="Designation"
              value={student.designation}
              disabled
            />
          </div>

          {/* Address Section */}
          <Title level={4} className="mt-6">
            Address
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  font-bold">
            <Input addonBefore="Address 01" value={student.address1} disabled />
            <Input addonBefore="Address 02" value={student.address2} disabled />
            <Select className="w-full font-bold" value={student.country}>
              <Option value="United States">United States</Option>
            </Select>
            <Select className="w-full  font-bold" value={student.state}>
              <Option value="California">California</Option>
            </Select>
          </div>

          {/* Skills Section */}
          <Title level={4} className="mt-6">
            Skills
          </Title>
          <div className="flex flex-wrap gap-2  font-bold">
            {student.skills.map((skill, index) => (
              <Tag key={index} color="blue">
                {skill}
              </Tag>
            ))}
          </div>

          <Divider />
          <Button type="primary" icon={<EditOutlined />}>
            Edit Profile
          </Button>
        </Card>
      </div>
    </>
  );
};

export default StudentProfile;

import React, { useState } from "react";
import { Button, Modal } from "antd";
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default App;
