import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

import {
  IoAddCircleOutline,
  IoTrash,
  IoImage,
  IoOptions,
} from "react-icons/io5";
import Navbar from "../navbar/Navbar";

export default function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
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

  const updateCorrectAnswers = (id, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, correct: value.split(",").map((ans) => ans.trim()) }
          : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = async () => {
    console.log(questions);
    const payload = {
      title,
      questions,
    };

    try {
      const response = await axios.post(
        "http://localhost:5173/submit",
        questions,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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

  return (
    <>
      <Navbar />
      <div className="p-6 w-full max-w-5xl mx-auto space-y-6 bg-gray-100">
        <div className="p-4 w-full max-w-4xl mx-auto space-y-6 mt-8">
          {/* <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Form Title"
            className="w-full p-2 border rounded-md"
          /> */}

          {questions.map((q) => (
            <div key={q.id} className="p-9  rounded-lg shadow-lg bg-white  ">
              <h2 className="mt-2 font-bold mb-4">
                Title (Technical, Reasoning, Aptitute)
              </h2>
              <input
                type="text"
                value={q.title}
                onChange={(e) => updateQuestion(q.id, "title", e.target.value)}
                placeholder="Enter Question Title"
                className="w-full p-2 border rounded-lg bg-white"
              />
              <h2 className="mt-4 font-bold mb-4 ">
                Problem Level (Easy, Hard and Normal)
              </h2>
              <select
                value={q.problem}
                onChange={(e) =>
                  updateQuestion(q.id, "problem", e.target.value)
                }
                className="w-full md:w-6/12 p-2 border rounded-md bg-white"
              >
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
              </select>
              score:
              <input
                type="number"
                value={q.score}
                onChange={(e) => updateQuestion(q.id, "score", e.target.value)}
                placeholder="Score"
                className="w-full md:w-1/3 md:ml-22  p-2 border rounded-md bg-white"
              />
              <h2 className="mt-4 font-bold mb-4 ">Enter your question</h2>
              <textarea
                value={q.question}
                onChange={(e) =>
                  updateQuestion(q.id, "question", e.target.value)
                }
                placeholder="Enter Question"
                className="w-full h-40 mt-4 p-2 border rounded-md bg-white"
              />
              <div className="flex flex-col md:flex-row justify-start items-center gap-6">
                <input
                  type="file"
                  onChange={(e) =>
                    updateQuestion(
                      q.id,
                      "image",
                      URL.createObjectURL(e.target.files[0])
                    )
                  }
                  className="mt-4 w-7/12 p-4 rounded-lg bg-blue-300 cursor-pointer"
                />
                <img
                  src={
                    q.image ||
                    "https://plus.unsplash.com/premium_photo-1741005641996-f0e15c7c276b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
                  }
                  alt="Uploaded Preview"
                  className="mt-2  md:ml-0 w-48 h-32 object-cover  rounded-lg overflow-hidden"
                />
              </div>
              <h2 className="mt-4 font-bold mb-4 ">
                {" "}
                Answer type (Multiple choice, checkboxes, Paragraph)
              </h2>
              <select
                value={q.type}
                onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
                className="w-full
                 p-2 border rounded-md bg-white"
              >
                <option value="single">Multiple Choice</option>
                <option value="multiple">Checkboxes</option>
                <option value="paragraph">Paragraph</option>
              </select>
              {q.type === "paragraph" && (
                <textarea
                  value={q.paragraphAnswer}
                  onChange={(e) =>
                    updateQuestion(q.id, "paragraphAnswer", e.target.value)
                  }
                  placeholder="Enter Paragraph Answer"
                  className="w-full p-2 border rounded-md mt-2 bg-white"
                />
              )}
              {q.type !== "paragraph" &&
                q.options.map((option, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        updateOption(q.id, index, e.target.value)
                      }
                      placeholder="Enter Option"
                      className="w-full p-2 border rounded-md bg-white"
                    />
                    <button
                      onClick={() => removeOption(q.id, index)}
                      className="ml-2 text-red-500"
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                ))}
              {q.type !== "paragraph" && (
                <button
                  onClick={() => addOption(q.id)}
                  className="text-blue-500 mt-2 flex items-center cursor-pointer"
                >
                  <IoAddCircleOutline className="mr-1 cursor-pointer" /> Add
                  Option
                </button>
              )}
              <h2 className="mt-4 font-bold mb-4 ">
                {" "}
                Add Your Answer (comma separated for multiple answers)
              </h2>
              <input
                type="text"
                value={q.correct.join(", ")}
                onChange={(e) => updateCorrectAnswers(q.id, e.target.value)}
                placeholder="Enter Correct Answer(s)"
                className="w-full p-2 border rounded-md bg-white"
              />
              <button
                onClick={() => removeQuestion(q.id)}
                className="text-red-500 mt-2 flex items-center cursor-pointer"
              >
                <IoTrash className="mr-1 cursor-pointer" /> Remove Question
              </button>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="bg-green-500 text-white p-2 rounded-md flex items-center w-full md:w-auto"
          >
            <IoAddCircleOutline className="mr-1" /> Add New Question
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded-md flex items-center w-full md:w-auto mt-4"
          >
            Submit Form
          </button>
        </div>
      </div>
    </>
  );
}
