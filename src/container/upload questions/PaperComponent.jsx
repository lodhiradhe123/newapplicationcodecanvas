import React, { useEffect, useState } from "react";
import { Card, Typography, Radio, Spin, Alert, Button, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { EditOutlined } from "@ant-design/icons";
const ViewPaper = import.meta.env.VITE_VIEW_QUESTION_API;

const { Title, Text } = Typography;

const PaperComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(null);
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

  const handleEditQuestion = () => {
    setIsEditQuestionOpen(true);
  };

  //modal open

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <Title level={2} className="mb-4">
          📄 My Papers
        </Title>
        <div className=" bg-gray-200 p-4 rounded-lg flex flex-col justify-center">
          <div className="flex justify-between">
            <div>
              <button
                className=" cursor-pointer text-2xl font-extrabold mr-4"
                onClick={() => navigate("/")}
              >
                ✕
              </button>
              <Title
                level={2}
                className="mb-4 inline  text-center font-extrabold"
              >
                General Test
              </Title>
            </div>
            <Button
              type="primary"
              // icon={<IoAddCircleOutline />}
              onClick={() => navigate("/editquestions")}
            >
              Edit Paper
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl bg-gray-200 p-4 rounded-lg">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="shadow-md bg-white p-4 rounded-lg"
                style={{ position: "relative" }}
              >
                <Title level={4}>
                  {question.title} id-{question.id}
                </Title>
                <Text type="secondary">
                  {question.problem} Difficulty | Score: {question.score}
                </Text>
                <div className="mt-3">
                  <Text strong>{question.question}</Text>
                </div>
                <div className="mt-4">
                  <Radio.Group>
                    {question.options.map((option, index) => (
                      <Radio key={index} value={option} className="block my-1">
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                  <Button
                    type=""
                    onClick={() => handleEditQuestion(question.id)}
                    style={{
                      position: "absolute", // Use 'fixed' to keep it always at the bottom right
                      bottom: "10px",
                      right: "20px",
                      borderRadius: "8px", // Optional for better UI
                    }}
                  >
                    <EditOutlined />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaperComponent;
