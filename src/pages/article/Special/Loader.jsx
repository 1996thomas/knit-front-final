import React, { useState, useEffect, useRef } from "react";
import "./loader.scss";
import { gsap } from "gsap";

export default function Loader({ duration = 3000, onComplete }) {
  const [percentage, setPercentage] = useState(0);
  const loaderRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();

    const updatePercentage = () => {
      const elapsed = Date.now() - startTime;
      const newPercentage = Math.min(
        100,
        Math.floor((elapsed / duration) * 100)
      );
      setPercentage(newPercentage);

      if (newPercentage >= 100) {
        clearInterval(interval);

        // Pause for 500ms, then trigger the animation
        setTimeout(() => {
          gsap.to(loaderRef.current, {
            y: "-100%",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (onComplete) onComplete(); // Notify parent component when animation is complete
            },
          });
        }, 500);
      }
    };

    const interval = setInterval(updatePercentage, 30);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader__text">{`${percentage
        .toString()
        .padStart(3, "0")}%`}</div>
    </div>
  );
}
