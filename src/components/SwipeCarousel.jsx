import React from "react";
import "./swipe-carousel.scss";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import ArticleCover from "./ArticleCover";
import { Link } from "react-router-dom";
import splitLetter from "../utils/splitLetter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useEffect } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const DRAG_BUFFER = 20;
export const SwipeCarousel = ({ articles }) => {
  console.log(articles);
  const [dragging, setDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const dragX = useMotionValue(0);

  const onDragStart = () => {
    setDragging(true);
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
  };
  const homeArray = "INSTAGRAM".split("");
  const articleArray = "TIKTOK".split("");
  const homeLetterRefs = useRef([]);
  const articleLetterRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      homeLetterRefs.current.concat(articleLetterRefs.current),
      { y: -10 },
      {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "bounce",
        repeat: -1,
        yoyo: true,
        delay: 1,
      }
    );
  }, []);
  return (
    <div className="carousel__wrapper">
      <div className="nav-ul">
        <Link onClick={() => setIsOpen(false)} to={"/"}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <FaInstagram
              size={30}
              color="white"
              style={{ marginRight: "5px" }}
            />
            {homeArray.map((letter, index) => (
              <div
                key={index}
                ref={(el) => (homeLetterRefs.current[index] = el)}
              >
                {letter}
              </div>
            ))}
          </div>
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/articles"}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <FaTiktok size={30} color="white" style={{ marginRight: "5px" }} />
            {articleArray.map((letter, index) => (
              <div
                key={index}
                ref={(el) => (articleLetterRefs.current[index] = el)}
              >
                {letter}
              </div>
            ))}
          </div>
        </Link>
      </div>
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
  console.log(imageIndex);
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
