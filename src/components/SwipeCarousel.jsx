import React from "react";
import "./swipe-carousel.scss";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

const imgs = ["/image-1.png", "/image-2.jpg", "/image-3.jpg"];
const DRAG_BUFFER = 20;
export const SwipeCarousel = () => {
  const [dragging, setDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const dragX = useMotionValue(0);

  const onDragStart = () => {
    setDragging(true);
  };
  const onDragEnd = () => {
    setDragging(false);
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && imageIndex < imgs.length - 1) {
      setImageIndex((previousValue) => previousValue + 1);
    } else if (x >= DRAG_BUFFER && imageIndex > 0) {
      setImageIndex((previousValue) => previousValue - 1);
    }
  };

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
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Images imageIndex={imageIndex} />
      </motion.div>
      <Dots imageIndex={imageIndex} setImageIndex={setImageIndex} />
    </div>
  );
};

const Images = ({ imageIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, index) => {
        return (
          <motion.div
            className="image"
            key={index}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100svh",
              width: "100%",
              flexShrink: 0,
            }}
          />
        );
      })}
    </>
  );
};

const Dots = ({ imageIndex, setImageIndex }) => {
  console.log(imageIndex);
  return (
    <div className="dots__wrapper">
      {imgs.map((_, index) => {
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
