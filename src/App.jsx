import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <div className="scroll-smooth font-sans">
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <section id="home"><Hero /></section>
                <section id="about"><About /></section>
                <section id="projects"><Projects /></section>
                <Skills />
                <section id="contact"><Contact /></section>
                <Footer />
                <ScrollToTopButton />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <section className="min-h-screen py-20 px-6 bg-[#0f0b16]">
                <AdminPanel />
              </section>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
