import React from "react";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./container/home/Home";
import AdminDashboard from "./container/dashboard/AdminDashboard";
import Login from "./components/login/LoginPage";
import Signup from "./components/login/SignUp";
import QuestionForm from "./container/upload questions/QuestionForm";
import StudentMarks from "./container/answerSheet/AnswerSheet";
import StudentProfile from "./components/profile/StudentProfile";
import PaperComponent from "./container/upload questions/PaperComponent";
import EditQuestions from "./container/upload questions/EditQuestions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/questionForm" exact element={<QuestionForm />} />
        <Route path="/studentMarks" exact element={<StudentMarks />} />
        <Route path="/viewpaper" exact element={<PaperComponent />} />
        <Route path="/editquestions" exact element={<EditQuestions />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/studentProfile" exact element={<StudentProfile />} />
        <Route path="/" exact element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
