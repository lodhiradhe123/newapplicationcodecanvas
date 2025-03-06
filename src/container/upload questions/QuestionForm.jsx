import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
const QUESTION_UPLOAD_API = import.meta.env.QUESTION_UPLOAD_API;
import {
  Button,
  Input,
  Select,
  Upload,
  Card,
  Typography,
  Space,
  notification,
} from "antd";
import { IoAddCircleOutline, IoTrash } from "react-icons/io5";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "../../components/navbar/Navbar";

const { Title, Text } = Typography;
const { Option } = Select;

export default function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Adds a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        title: "New Question",
        problem: "Easy",
        score: 1,
        question: "",
        image: "",
        type: "single",
        options: [""],
        correct: [],
      },
    ]);
  };

  // Updates a question field
  const updateQuestion = (id, key, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  // Updates an option field
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

  // Adds an option to a question
  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  // Removes an option
  const removeOption = (id, index) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  // Updates the correct answer
  const updateCorrectAnswers = (id, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, correct: value.split(",").map((ans) => ans.trim()) }
          : q
      )
    );
  };

  // Removes a question
  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Handles form submission
  const handleSubmit = async () => {
    console.log(questions);
    const payload = {
      questions,
    };

    try {
      const response = await axios.post(QUESTION_UPLOAD_API, payload, {
        headers: { "Content-Type": "application/json" },
      });

      notification.success({
        message: "Form Submitted",
        description: "Form submitted successfully!",
      });
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      notification.error({
        message: "Submission Failed",
        description: "Error submitting form.",
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 w-full max-w-5xl mx-auto space-y-6 shadow-2xl shadow-blue-100 mt-8">
        <motion.div
          className="p-4 w-full max-w-4xl mx-auto space-y-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between">
            <Title level={6}>Create Your Question Form</Title>{" "}
            <button
              className=" cursor-pointer text-xl font-bold"
              onClick={() => navigate("/")}
            >
              ✕
            </button>
          </div>

          {questions.map((q) => (
            <Card
              key={q.id}
              className="shadow-md"
              style={{ marginBottom: "20px", backgroundColor: "#F1F0E9" }}
            >
              <Space direction="vertical" size="middle" className="w-full">
                <Title level={5}>Title (Technical, Reasoning, Aptitude)</Title>
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
                <Input
                  value={q.correct.join(", ")}
                  onChange={(e) => updateCorrectAnswers(q.id, e.target.value)}
                  placeholder="Comma-separated answers"
                />

                <Button
                  type="primary"
                  danger
                  icon={<IoTrash />}
                  onClick={() => removeQuestion(q.id)}
                >
                  Remove Question
                </Button>
              </Space>
            </Card>
          ))}

          <Button
            type="primary"
            icon={<IoAddCircleOutline />}
            onClick={addQuestion}
            className="mt-8"
          >
            Add New Question
          </Button>

          <Button type="primary" className="mt-4 ml-4" onClick={handleSubmit}>
            Submit Form
          </Button>
        </motion.div>
      </div>
    </>
  );
}
