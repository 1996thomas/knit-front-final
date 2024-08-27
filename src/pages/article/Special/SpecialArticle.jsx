import React, { useEffect, useRef } from "react";
import "./special-article.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuestionResponse from "./QuestionResponse";
import { data } from "./data";
import useOrientation from "../../../utils/useOrientation";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticle() {
  const isLandscape = useOrientation();
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const heroTitleElement = heroTitleRef.current;

    if (heroElement && heroTitleElement) {
      // ANIMATION HERO
      gsap.to(heroElement, {
        yPercent: -20,
        scale: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
          debounce: 1, // Ajout du debounce pour améliorer la performance
        },
      });

      gsap.to(heroTitleElement, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
          debounce: 1, // Ajout du debounce pour améliorer la performance
        },
      });
    }
  }, []);

  return isLandscape ? (
    <div className="special-article__wrapper">
      <div className="container">
        <section
          className="hero"
          ref={heroRef}
          style={{ willChange: "transform" }}
        >
          <h1 ref={heroTitleRef} style={{ willChange: "transform" }}>
            Le visage des oublié-e-s
          </h1>
          <div className="hero--info">
            <span>© Marvin Bonheur</span>
            <span>Interview par Paul-Louis Godier</span>
            <span>Septembre 2024</span>
            <span>Réalisé par KNIT</span>
          </div>
        </section>
        <section className="info">
          <div className="intro--carousel">
            <img src="/1.JPG" alt="" />
            <img src="/1a.JPG" alt="" />
            <img src="/93e vague.JPG" alt="" />
          </div>
          <div className="intro">
            <p>SALUT</p>
          </div>
        </section>
      </div>
      <div className="question-reponse__wrapper">
        {data.map((item, index) => (
          <QuestionResponse
            key={index}
            uniqueId={index}
            reponse={item.reponse}
            question={item.question}
            imgsSrc={item.imgsSrc}
          />
        ))}
      </div>
    </div>
  ) : (
    <p>Tourne l'écran pour acceder a l'article </p>
  );
}
