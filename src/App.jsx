
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from './components/Footer';
import ScrollToTopButton from "./components/ScrollToTopButton";
// import AddCertificate from "./components/AddCertificate";
// import Certificates from "./components/Certificates";
// import UploadImage from "./components/UploadImage";

function App() {
  return (
    <div className="scroll-smooth font-sans">
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="projects"><Projects /></section>
     <Skills />
      <section id="contact"><Contact /></section>
      <Footer/>
      <ScrollToTopButton />
      {/* <AddCertificate />
      <Certificates />
      <UploadImage /> */}

      
    </div>
  );
}

export default App;
