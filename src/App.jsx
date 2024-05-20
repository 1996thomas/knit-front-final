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
import NotFound from "./pages/404/NotFound";
import Shop from "./pages/Shop/Shop";
export default function App() {
  const location = useLocation();
  const HomeWithTransition = transition(Home);
  const ArticlesWithTransition = transition(Articles);
  const ArticleWithTransition = transition(Article);
  const CategoryWithTransition = transition(Category);
  const NotFoundWithTransition = transition(NotFound);
  const ShopWithTransition = transition(Shop);

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomeWithTransition />} />
            <Route path="/articles" element={<ArticlesWithTransition />} />
            <Route path="/articles/:id" element={<ArticleWithTransition />} />
            <Route path="/shop" element={<ShopWithTransition />} />
            <Route
              path="/articles/categories/:name"
              element={<CategoryWithTransition />}
            />
            <Route path="*" element={<NotFoundWithTransition />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
