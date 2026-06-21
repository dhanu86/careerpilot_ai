import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>CareerPilot AI</h2>

      <Link to="/">Home</Link>

      <Link to="/study">
        Study Assistant
      </Link>

      <Link to="/resume">
        Resume Analyzer
      </Link>

      <Link to="/career">
        Career Mentor
      </Link>

      <Link to="/interview">
        Interview Coach
      </Link>
    </div>
  );
}

export default Sidebar;