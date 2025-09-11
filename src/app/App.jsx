import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "@/Widgets/Navbar/NavBar";
import AboutPage from "@/Pages/About/AboutPage";
import ProjectsPage from "@/Pages/Projects/ProjectsPage";
import FallingCodeBackground from "@/widgets/Background/FallingCodeBackground";

export default function App() {
  return (
    <>
      <FallingCodeBackground />
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Страница не найдена</div>} />
      </Routes>
    </>
  );
}