import React from "react";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import transition from "./utils/transition/transition";

export default function App() {
  const location = useLocation();
  const HomeWithTransition = transition(Home);
  const ArticlesWithTransition = transition(Articles);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<HomeWithTransition />} />
          <Route path="/articles" element={<ArticlesWithTransition />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
