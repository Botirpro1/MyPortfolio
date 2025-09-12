import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "@/widgets/NavBar/NavBar";
import Home from "@/pages/Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;