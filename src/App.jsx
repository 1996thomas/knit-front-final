import React from "react";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import transition from "./utils/transition/transition";
import Footer from "./components/Footer";
import Article from "./pages/article/Article";
import Category from "./pages/categories/Category";
import { useRef } from "react";
export default function App() {
  const location = useLocation();
  const HomeWithTransition = transition(Home);
  const ArticlesWithTransition = transition(Articles);
  const ArticleWithTransition = transition(Article);
  const CategoryWithTransition = transition(Category);


  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomeWithTransition />} />
            <Route path="/articles" element={<ArticlesWithTransition />} />
            <Route path="/articles/:id" element={<ArticleWithTransition />} />
            <Route
              path="/articles/categories/:name"
              element={<CategoryWithTransition />}
            />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}