import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Select,
  Upload,
  Card,
  Typography,
  Space,
  notification,
  Spin,
  Alert,
  Flex,
} from "antd";
import { IoAddCircleOutline, IoTrash } from "react-icons/io5";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "../../components/navbar/Navbar";

const { Title, Text } = Typography;
const { Option } = Select;
const FETCH_QUESTIONS_API = import.meta.env.VITE_VIEW_QUESTION_API;
const UPDATE_QUESTIONS_API = import.meta.env.VITE_UPDATE_QUESTION_API;

export default function EditQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://codecanvasapi.nuke.co.in/api/user/auth/get-questions"
        );
        setQuestions(response.data.data);
      } catch (err) {
        setError("Failed to fetch questions. Please try again.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Filter students based on search term
  //   const filteredStudents = questions.filter((question) =>
  //     question.includes(searchTerm)
  //   );

  const updateQuestion = (id, key, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const updateOption = (id, index, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === index ? value : opt)),
            }
          : q
      )
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (id, index) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const handleSubmit = async () => {
    try {
      await axios.post(UPDATE_QUESTIONS_API, { questions });
      notification.success({ message: "Updated Successfully" });
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: error.message,
      });
    }
  };

  if (loading)
    return (
      <Spin
        size="large"
        className="flex justify-center items-center mt-10"
        style={{ display: "Flex", justifyContent: "center", marginTop: "20px" }}
      />
    );
  if (error)
    return <Alert message={error} type="error" className="mt-10" showIcon />;

  return (
    <>
      <Navbar />

      <div className="p-6 w-full max-w-5xl mx-auto space-y-6 shadow-2xl shadow-blue-100 mt-8 ">
        {/* Search Input */}
        <Input.Search
          placeholder="Search by ID"
          allowClear
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full md:w-1/2"
        />
        <motion.div
          className="p-4 w-full max-w-4xl mx-auto space-y-6 mt-8 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between ">
            <Title level={4}>Edit Questions</Title>
            <button
              className="cursor-pointer text-xl font-bold"
              onClick={() => navigate("/viewpaper")}
            >
              ✕
            </button>
          </div>

          {questions
            .filter((question) => question.id == searchTerm)
            .map((q) => (
              <Card
                key={q.id}
                className="shadow-md "
                style={{ marginBottom: "20px", backgroundColor: "#F1F0E9" }}
              >
                <Space direction="vertical" size="middle" className="w-full">
                  <Title level={5}>
                    Title (Technical, Reasoning, Aptitude)-{q.id}
                  </Title>
                  <Input
                    value={q.title}
                    onChange={(e) =>
                      updateQuestion(q.id, "title", e.target.value)
                    }
                    placeholder="Enter Question Title"
                  />

                  <div className=" w-full flex">
                    <div className="w-full">
                      <Title level={5}>Problem Level</Title>
                      <Select
                        value={q.problem}
                        onChange={(value) =>
                          updateQuestion(q.id, "problem", value)
                        }
                        className=" md:w-1/2"
                      >
                        <Option value="Easy">Easy</Option>
                        <Option value="Normal">Normal</Option>
                        <Option value="Hard">Hard</Option>
                      </Select>
                    </div>

                    <div className="w-full">
                      <Title level={5}>Score</Title>
                      <Input
                        type="number"
                        value={q.score}
                        onChange={(e) =>
                          updateQuestion(q.id, "score", e.target.value)
                        }
                        placeholder="Score"
                        style={{}}
                      />
                    </div>
                  </div>

                  <Title level={5}>Enter Your Question</Title>
                  <Input.TextArea
                    value={q.question}
                    onChange={(e) =>
                      updateQuestion(q.id, "question", e.target.value)
                    }
                    placeholder="Enter Question"
                    rows={4}
                  />

                  <Title level={5}>Upload Image Or Paste Link (Optional)</Title>
                  <div className="flex gap-4">
                    <Upload
                      showUploadList={false}
                      beforeUpload={(file) => {
                        const url = URL.createObjectURL(file);
                        updateQuestion(q.id, "image", url);
                        return false;
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    <Input
                      size=""
                      placeholder="Enter image url"
                      style={{
                        width: 700,
                        display: "inline-block",
                      }}
                      onChange={(e) =>
                        updateQuestion(q.id, "image", e.target.value)
                      }
                    />
                  </div>
                  {q.image && (
                    <img
                      src={q.image}
                      alt="Preview"
                      className="w-48 h-32 rounded-lg"
                    />
                  )}

                  <Title level={5}>Answer Type</Title>
                  <Select
                    value={q.type}
                    onChange={(value) => updateQuestion(q.id, "type", value)}
                    className="w-full"
                  >
                    <Option value="single">Multiple Choice</Option>
                    <Option value="multiple">Checkboxes</Option>
                    <Option value="paragraph">Paragraph</Option>
                  </Select>

                  {q.type !== "paragraph" &&
                    q.options.map((option, index) => (
                      <Space key={index} className="w-full">
                        <Input
                          value={option}
                          onChange={(e) =>
                            updateOption(q.id, index, e.target.value)
                          }
                          placeholder="Enter Option"
                        />
                        <Button
                          danger
                          icon={<AiFillDelete />}
                          onClick={() => removeOption(q.id, index)}
                        />
                      </Space>
                    ))}

                  {q.type !== "paragraph" && (
                    <Button
                      type="dashed"
                      icon={<IoAddCircleOutline />}
                      onClick={() => addOption(q.id)}
                    >
                      Add Option
                    </Button>
                  )}

                  <Title level={5}>Correct Answer(s)</Title>
                  {/* <Input
                              value={q.correct.join(", ")}
                              onChange={(e) => updateCorrectAnswers(q.id, e.target.value)}
                              placeholder="Comma-separated answers"
                            /> */}

                  <Button
                    type="primary"
                    danger
                    icon={<IoTrash />}
                    //   onClick={() => removeQuestion(q.id)}
                    onClick={() =>
                      setQuestions(
                        questions.filter((qItem) => qItem.id !== q.id)
                      )
                    }
                  >
                    Remove Question
                  </Button>
                </Space>
              </Card>
            ))}
          <Button type="primary" className="mt-4" onClick={handleSubmit}>
            Save Changes
          </Button>
        </motion.div>
      </div>
    </>
  );
}
