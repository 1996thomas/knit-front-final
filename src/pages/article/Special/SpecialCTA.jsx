import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import "./specialCTA.scss";

export default function SpecialCTA({ marquee }) {
  const location = useLocation();
  const firstText = useRef(null);
  const secondText = useRef(null);
  let xPercent = 0;

  useEffect(() => {
    requestAnimationFrame(animation); // Lance l'animation au montage du composant
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }

    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent + 100 });

    xPercent -= 0.05; // Ajuste cette valeur pour modifier la vitesse de l'animation
    requestAnimationFrame(animation); // Continue l'animation à chaque frame
  };

  return location.pathname === "/media" ? (
    <Link
      className="specialCTA__wrapper"
      to={"/media/special/monsieur-bonheur"}
    >
      <div className="sliderContainer">
        <div className="slider">
          <p ref={firstText}>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
          </p>
          <p ref={secondText}>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
            <span>Interview de monsieur bonheur -</span>
            <span>Clique ici -</span>
          </p>
        </div>
      </div>
    </Link>
  ) : null;
}
