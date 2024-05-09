import React from "react";
import "./swipe-carousel.scss";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import ArticleCover from "./ArticleCover";
import { useRef } from "react";
import { useEffect } from "react";

const DRAG_BUFFER = 20;
export const SwipeCarousel = ({ articles }) => {
  console.log(articles);
  const [dragging, setDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef();

  const dragX = useMotionValue(0);

  const onDragStart = () => {
    setDragging(true);
    clearInterval(intervalRef.current);
  };
  const onDragEnd = () => {
    setDragging(false);
    const x = dragX.get();
    if (articles) {
      if (x <= -DRAG_BUFFER && imageIndex < articles.length - 1) {
        setImageIndex((previousValue) => previousValue + 1);
      } else if (x >= DRAG_BUFFER && imageIndex > 0) {
        setImageIndex((previousValue) => previousValue - 1);
      }
    }
    setTimeout(() => {
      startAutoScroll();
    }, 3500);
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!dragging) {
        // Only auto-scroll if not currently dragging
        setImageIndex((current) => {
          if (current >= articles.length - 1) return 0;
          else return current + 1;
        });
      }
    }, 3500);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [articles.length]);

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
        <Images imageIndex={imageIndex} articles={articles} />
      </motion.div>
      <Dots
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        articles={articles}
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
