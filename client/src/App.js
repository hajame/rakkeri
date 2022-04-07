import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignUpForm } from "./components/SignUpForm";
import { Home } from "./components/Home";

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign up</Link>
      </div>

      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
