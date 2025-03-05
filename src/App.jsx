import React from "react";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Courses from "./components/corses/Courses";
import Login from "./components/login/LoginPage";
import Signup from "./components/login/SignUp";
import QuestionForm from "./components/upload questions/QuestionForm";
import StudentMarks from "./components/answerSheet/AnswerSheet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/studentMarks" exact element={<StudentMarks />} />
        <Route path="/questionForm" exact element={<QuestionForm />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/" exact element={<Courses />} />
      </Routes>
    </>
  );
}

export default App;
