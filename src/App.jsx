import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import StudyAssistant from "./pages/StudyAssistant";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CareerMentor from "./pages/CareerMentor";
import InterviewCoach from "./pages/InterviewCoach";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<StudyAssistant />} />
            <Route path="/resume" element={<ResumeAnalyzer />} />
            <Route path="/career" element={<CareerMentor />} />
            <Route path="/interview" element={<InterviewCoach />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;