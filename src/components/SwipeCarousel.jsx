import React from "react";
import "./swipe-carousel.scss";
import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ArticleCover from "./ArticleCover";

const DRAG_BUFFER = 20;
export const SwipeCarousel = ({ articles }) => {
  const [dragging, setDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef();

  const dragX = useMotionValue(0);

  // Add the static article from the public folder
  const staticArticle = {
    title: "Le visage des oublié-e-s - Monsieur Bonheur",
    slug: "/media/special/monsieur-bonheur",
    tags:["Interview", "Monsieur Bonheur"],
    image: "/cover.JPG",
    content:
      "Dix ans de cheminement photographique plus tard, Monsieur Bonheur, artiste originaire d’Aulnay-Sous-Bois sort son premier livre : « La trilogie du Bonheur ». Un travail sur le 93, département de la Seine-Saint-Denis, dans lequel il a grandi. Avec son appareil compact argentique, clin d’œil au Kodak jetable jaune 27 poses de son enfance, il raconte ses souvenirs d’adolescence, relate du quotidien des jeunes de quartier et dépeint avec fierté la culture de la rue.",
  };

  const allArticles = [staticArticle, ...articles];

  const onDragStart = () => {
    setDragging(true);
    clearInterval(intervalRef.current);
  };

  const onDragEnd = () => {
    setDragging(false);
    const x = dragX.get();
    if (allArticles) {
      if (x <= -DRAG_BUFFER && imageIndex < allArticles.length - 1) {
        setImageIndex((prevValue) => prevValue + 1);
      } else if (x >= DRAG_BUFFER && imageIndex > 0) {
        setImageIndex((prevValue) => prevValue - 1);
      }
    }
    setTimeout(() => {
      startAutoScroll();
    }, 3500);
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!dragging) {
        setImageIndex((current) => {
          if (current >= allArticles.length - 1) return 0;
          else return current + 1;
        });
      }
    }, 3500);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [allArticles.length]);

  return (
    <div className="carousel__wrapper">
      <motion.div
        className="images__wrapper"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imageIndex * 100}%`,
        }}
        transition={{
          ease: [0.01, 0.1, 0.75, 1],
          duration: 0.2,
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Images imageIndex={imageIndex} articles={allArticles} />
      </motion.div>
      <Dots
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        articles={allArticles}
      />
    </div>
  );
};

const Images = ({ articles }) => {
  return (
    <>
      {articles &&
        articles.map((article, index) => {
          return <ArticleCover article={article} key={index} index={index} />;
        })}
    </>
  );
};

const Dots = ({ imageIndex, setImageIndex, articles }) => {
  return (
    <div className="dots__wrapper">
      {articles &&
        articles.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => setImageIndex(index)}
              className={imageIndex === index ? "selected" : "default"}
            />
          );
        })}
    </div>
  );
};
