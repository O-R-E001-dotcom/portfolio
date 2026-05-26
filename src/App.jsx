import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PortfolioChatbot from "./components/PortfolioChatbot";
import ProjectDetail from "./pages/ProjectDetail";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <section id="home"><Hero /></section>
              <section id="about"><About /></section>
              <Projects />
              <Skills />
              <section id="contact"><Contact /></section>
              <Footer />
              <ScrollToTopButton />
              <PortfolioChatbot />
            </>
          }
        />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route
          path="/admin"
          element={
            <section className="min-h-screen py-20 px-6 bg-[#0f0b16]">
              <AdminPanel />
            </section>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="scroll-smooth font-sans">
        <Toaster position="top-right" />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
