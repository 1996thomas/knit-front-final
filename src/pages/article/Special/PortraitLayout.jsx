import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./special-article.scss";

export default function PortraitLayout() {
  const phoneWrapperRef = useRef(null);

  useEffect(() => {
    // Animation pour faire pivoter le téléphone avec une pause avant le yoyo
    gsap.to(phoneWrapperRef.current, {
      rotate: 90, // Rotation de 90 degrés
      duration: 1, // Durée de l'animation
      repeat: -1, // Répéter indéfiniment
      yoyo: true, // Revenir à l'état initial avant de recommencer
      ease: "power1.inOut",
      repeatDelay: 1.5, // Pause de 1.5 secondes avant de recommencer
    });
  }, []);

  return (
    <div className="portrait__wrapper">
      <div className="phone__wrapper" ref={phoneWrapperRef}>
        <img src="/phone.svg" alt="Phone" />
      </div>
      <p>Tourne ton téléphone pour accèder à l'article</p>
    </div>
  );
}
