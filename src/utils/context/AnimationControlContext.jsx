import React, { createContext, useContext, useState } from "react";

const AnimationControlContext = createContext(null);

export const useAnimationControl = () => useContext(AnimationControlContext);

export const AnimationProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerNextAnimation = () => {
    setIsAnimating(false);
    setActiveIndex((prev) => prev + 1);
  };

  const startAnimation = () => {
    setIsAnimating(true);
  };

  return (
    <AnimationControlContext.Provider
      value={{ activeIndex, triggerNextAnimation, startAnimation, isAnimating }}
    >
      {children}
    </AnimationControlContext.Provider>
  );
};
