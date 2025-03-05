import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dropdown, Avatar, Badge, Tooltip, Menu, Divider } from "antd";
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MessageOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

function Navbar() {
  // State for dynamic notification count
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);

  // Simulate real-time notifications/messages
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => (prev < 99 ? prev + 1 : prev)); // Limit max to 99
      setMessages((prev) => (prev < 50 ? prev + 1 : prev));
    }, 10000); // Adds new notifications/messages every 10s (simulated)

    return () => clearInterval(interval);
  }, []);

  // Profile dropdown menu
  const profileMenu = (
    <Menu className="shadow-lg rounded-xl border border-gray-300/30 bg-white w-52">
      <Menu.Item key="1" icon={<ProfileOutlined className="text-blue-500" />}>
        <a href="/studentProfile">Profile</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined className="text-green-500" />}>
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Divider className="my-2" />
      <Menu.Item
        key="3"
        icon={<LogoutOutlined className="text-red-500" />}
        danger
      >
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  // Notifications dropdown menu
  const notificationsMenu = (
    <Menu className="shadow-lg rounded-xl border border-gray-300/30 bg-white w-60">
      <Menu.Item key="1">
        <a href="/notifications">
          🔔 You have {notifications} new notifications
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/alerts">⚠️ Check security alerts</a>
      </Menu.Item>
      <Divider className="my-2" />
      <Menu.Item key="3">
        <a href="/all-notifications">📜 View all notifications</a>
      </Menu.Item>
    </Menu>
  );

  // Messages dropdown menu
  const messagesMenu = (
    <Menu className="shadow-lg rounded-xl border border-gray-300/30 bg-white w-60">
      <Menu.Item key="1">
        <a href="/messages">📩 {messages} new messages</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/chats">💬 Open chat</a>
      </Menu.Item>
      <Divider className="my-2" />
      <Menu.Item key="3">
        <a href="/all-messages">📨 View all messages</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Navbar Content */}
      <ul className="flex justify-between items-center py-4">
        {/* Logo */}
        <motion.h1
          className="text-md font-extrabold md:text-4xl flex items-center font-serif drop-shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎓 CodeCanvas
        </motion.h1>

        {/* Right Side: Notifications, Messages & Profile */}
        <motion.div className="flex gap-6 items-center mx-2">
          {/* Tooltip for Notifications */}
          <Dropdown
            overlay={notificationsMenu}
            trigger={["click"]}
            placement="bottom"
          >
            <Tooltip title="Notifications" placement="bottom">
              <motion.div
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Badge count={notifications} size="small" offset={[5, -5]}>
                  <BellOutlined className="text-xl" />
                </Badge>
              </motion.div>
            </Tooltip>
          </Dropdown>

          {/* Tooltip for Messages */}
          <Dropdown
            overlay={messagesMenu}
            trigger={["click"]}
            placement="bottom"
          >
            <Tooltip title="Messages" placement="bottom">
              <motion.div
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer transition flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Badge count={messages} size="small" offset={[5, -5]}>
                  <MessageOutlined className="text-xl" />
                </Badge>
              </motion.div>
            </Tooltip>
          </Dropdown>

          {/* User Avatar with Dropdown */}
          <Dropdown
            overlay={profileMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar
              size={40}
              src="https://images.unsplash.com/photo-1740004731264-3cde5c198cc2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D"
              icon={<UserOutlined />}
              className="cursor-pointer border-4 border-white transition-transform hover:scale-110 "
            />
          </Dropdown>
        </motion.div>
      </ul>
    </motion.div>
  );
}

export default Navbar;
