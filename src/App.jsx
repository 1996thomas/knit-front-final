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
import NotFound from "./pages/404/NotFound";
import Shop from "./pages/Shop/Shop";
import CGU from "./pages/CGU/CGU";
import SpecialArticle from "./pages/article/Special/SpecialArticle";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import useOrientation from "./utils/useOrientation";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();
  const HomeWithTransition = transition(Home);
  const ArticlesWithTransition = transition(Articles);
  const ArticleWithTransition = transition(Article);
  const CategoryWithTransition = transition(Category);
  const NotFoundWithTransition = transition(NotFound);
  const ShopWithTransition = transition(Shop);
  const CGUWithTransition = transition(CGU);
  const SpecialArticleTransition = transition(SpecialArticle);
  const { isDesktop } = useOrientation();

  function initializeLenis() {
    let lenis = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenis.on("scroll", (e) => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  useEffect(() => {
    isDesktop && initializeLenis();
  }, [isDesktop]);


  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomeWithTransition />} />
            <Route path="/media" element={<ArticlesWithTransition />} />
            <Route path="/media/:slug" element={<ArticleWithTransition />} />
            <Route path="/shop" element={<ShopWithTransition />} />
            <Route path="/legal" element={<CGUWithTransition />} />
            <Route
              path="/media/special/:slug"
              element={<SpecialArticleTransition />}
            />
            <Route
              path="/media/categories/:name"
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
