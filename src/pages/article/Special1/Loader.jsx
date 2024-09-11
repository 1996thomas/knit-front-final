import React, { useState, useEffect, useRef } from "react";
import "./loader.scss";
import { gsap } from "gsap";

export default function Loader({ duration = 3000, onComplete }) {
  const [percentage, setPercentage] = useState(0);
  const loaderRef = useRef(null);
  const tensRef = useRef(null);
  const unitsRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();

    const updatePercentage = () => {
      const elapsed = Date.now() - startTime;
      const newPercentage = Math.min(
        100,
        Math.floor((elapsed / duration) * 50) * 7
      );

      if (newPercentage > percentage) {
        const oldUnits = percentage % 10;
        const newUnits = newPercentage % 10;

        const oldTens = Math.floor(percentage / 10) % 10;
        const newTens = Math.floor(newPercentage / 10) % 10;

        setPercentage(newPercentage);

        if (newTens !== oldTens) {
          scrollDigit(tensRef.current, newTens);
        }
        if (newUnits !== oldUnits) {
          scrollDigit(unitsRef.current, newUnits);
        }
      }

      if (newPercentage >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          gsap.to(loaderRef.current, {
            y: "-100%",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        }, 500);
      }
    };

    const interval = setInterval(updatePercentage, 30);

    return () => clearInterval(interval);
  }, [duration, onComplete, percentage]);

  const scrollDigit = (digitRef, newDigit) => {
    gsap.to(digitRef, {
      y: -newDigit * 100 + "%", // Move to the new digit position
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader__text">
        <div ref={tensRef} className="digit-wrapper">
          <div className="digit-column">
            {[...Array(10).keys()].map((digit) => (
              <span key={digit} className="digit">{digit}</span>
            ))}
          </div>
        </div>
        <div ref={unitsRef} className="digit-wrapper">
          <div className="digit-column">
            {[...Array(10).keys()].map((digit) => (
              <span key={digit} className="digit">{digit}</span>
            ))}
          </div>
        </div>
        %
      </div>
    </div>
  );
}
