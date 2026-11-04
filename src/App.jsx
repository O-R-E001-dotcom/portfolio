import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Credentials from "./components/Credentials";
import Approach from "./components/Approach";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PortfolioChatbot from "./components/PortfolioChatbot";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const ROUTE_TITLES = {
  "/": "Abolore Sanni | AI/Agent Engineer & Full-Stack Developer",
  "/admin": "Admin | Abolore Sanni",
};

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (target) {
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    // ProjectDetail sets its own title once the project has loaded.
    if (location.pathname.startsWith("/project/")) return;
    document.title =
      ROUTE_TITLES[location.pathname] || "Page not found | Abolore Sanni";
  }, [location.pathname]);

  return null;
}

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
              <main id="main-content" tabIndex={-1}>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Credentials />
                <Approach />
                <Contact />
              </main>
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
            <main id="main-content" tabIndex={-1} className="min-h-screen bg-background px-6 py-20">
              <AdminPanel />
            </main>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main id="main-content" tabIndex={-1}>
                <NotFound />
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background font-sans text-foreground">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "!bg-card !text-foreground !border !border-border !rounded-xl !shadow-lg",
          }}
        />
        <RouteEffects />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
