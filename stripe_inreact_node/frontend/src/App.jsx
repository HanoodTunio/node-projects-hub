import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./HomePage";
import Success from "./success";
import Cancel from "./cancel";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
