import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { useEffect } from "react";
import { scrollReveal } from "./utils/scrollReveal";
import "./styles/animations.css";

export default function App() {
  useEffect(() => {
    scrollReveal();
  }, []);

  return (
    <Router>
      <div className="app-root">

        {/* CONTENITORE FULL WIDTH */}
        <div className="fullscreen-container">

          {/* CONTENITORE CENTRATO */}
          <div className="site-container">

            <Navbar />

            <main className="app-main">
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