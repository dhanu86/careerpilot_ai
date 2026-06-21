import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#222",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/resume">Resume</Link>
      <Link to="/study">Study</Link>
      <Link to="/career">Career</Link>
      <Link to="/interview">Interview</Link>
    </nav>
  );
}

export default Navbar;