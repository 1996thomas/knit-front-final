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
import { Helmet } from "react-helmet";

export default function App() {
  const location = useLocation();
  const HomeWithTransition = transition(Home);
  const ArticlesWithTransition = transition(Articles);
  const ArticleWithTransition = transition(Article);
  const CategoryWithTransition = transition(Category);
  const NotFoundWithTransition = transition(NotFound);
  const ShopWithTransition = transition(Shop);
  const CGUWithTransition = transition(CGU);

  return (
    <div className="app">
      <Helmet>
        <title>KNIT - Votre média culturel et boutique en ligne</title>
        <meta
          name="description"
          content="KNIT est un média culturel ainsi qu'une boutique en ligne sur lequel seront exposées des marques streetwear indépendantes."
        />
        <meta property="og:title" content="KNIT" />
        <meta
          property="og:description"
          content="KNIT est un média culturel ainsi qu'une boutique en ligne sur lequel seront exposées des marques streetwear indépendantes."
        />
        <meta
          property="og:image"
          content="https://knit-front-final.vercel.app/android-chrome-256x256.png"
        />
        <meta property="og:url" content="https://knit-front-final.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KNIT" />
        <meta
          name="twitter:description"
          content="KNIT est un média culturel ainsi qu'une boutique en ligne sur lequel seront exposées des marques streetwear indépendantes."
        />
        <meta
          name="twitter:image"
          content="https://knit-front-final.vercel.app/android-chrome-256x256.png"
        />
      </Helmet>
      <Navbar />
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomeWithTransition />} />
            <Route path="/articles" element={<ArticlesWithTransition />} />
            <Route path="/articles/:id" element={<ArticleWithTransition />} />
            <Route path="/shop" element={<ShopWithTransition />} />
            <Route path="/legal" element={<CGUWithTransition />} />
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
