import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop.jsx";

const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider context={helmetContext}>
    <React.StrictMode>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </HelmetProvider>
);
