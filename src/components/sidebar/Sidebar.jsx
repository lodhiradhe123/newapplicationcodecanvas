import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrophyOutlined, TeamOutlined, FileTextOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Sidebar() {
  const navigate = useNavigate();

  // Sidebar Animation Variants
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Button Animation Variants
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="w-50 bg-white shadow-lg flex flex-col items-center py-6 space-y-4 p-2 mt-18 rounded-lg"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Sidebar Items */}
      <motion.div
        className="w-full flex items-center gap-2 text-sm font-bold text-gray-700 px-4 py-3 bg-blue-100 rounded-lg cursor-pointer"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <TrophyOutlined className="text-lg text-blue-600" />
        Learning Awards
      </motion.div>

      <motion.div
        className="w-full flex items-center  gap-2 text-sm font-bold text-gray-700 px-4 py-3 bg-blue-100 rounded-lg cursor-pointer"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <TeamOutlined className="text-lg text-blue-600" />
        Batchmates
      </motion.div>

      <motion.div
        className="w-full flex items-center gap-2 text-sm font-bold text-gray-700 px-4 py-3 bg-blue-100 rounded-lg cursor-pointer"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <FileTextOutlined className="text-lg text-blue-600" />
        Tests
      </motion.div>

      <motion.div
        className="w-full flex items-center gap-2 text-sm font-bold text-gray-700 px-4 py-3 bg-blue-100 rounded-lg cursor-pointer"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => navigate("/questionForm")}
      >
        <PlusCircleOutlined className="text-lg text-blue-600" />
        Add Questions
      </motion.div>

      {/* Animated CTA Button */}
      {/* <motion.div className="w-full px-4">
        <Button
          type="primary"
          block
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          onClick={() => navigate("/newFeature")}
        >
          Explore More
        </Button>
      </motion.div> */}
    </motion.div>
  );
}

export default Sidebar;
