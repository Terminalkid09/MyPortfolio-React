import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { scrollReveal } from "./utils/scrollReveal";
import "./styles/animations.css";

export default function App() {
  useEffect(() => {
    scrollReveal();
  }, []);

  return (
    <Router>
      <div className="app-root">
        {/* First tab stop on the page: the background canvas and the fixed
         * navbar come before the content for a keyboard visitor otherwise. */}
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <div className="fullscreen-container">
          <div className="site-container">
            <Navbar />

            <main className="app-main" id="main">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}
