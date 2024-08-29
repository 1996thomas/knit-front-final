import React, { useState, useEffect, useRef } from "react";
import "./special-article.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuestionResponse from "./QuestionResponse";
import { data } from "./data";
import useOrientation from "../../../utils/useOrientation";
import PortraitLayout from "./PortraitLayout";
import Loader from "./Loader"; // Import the Loader component

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticle() {
  const { isDesktop, isPhoneLandscape } = useOrientation();
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    // if (!loading && (isDesktop || isPhoneLandscape)) {
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: heroRef.current,
    //       start: "top center",
    //     },
    //   });

    //   tl.from(heroRef.current, {
    //     opacity: 0,
    //     y: 50,
    //     duration: 1,
    //     ease: "power2.out",
    //   }).from(
    //     heroTitleRef.current,
    //     {
    //       opacity: 0,
    //       y: 20,
    //       duration: 1,
    //       ease: "power2.out",
    //     },
    //     "-=0.5"
    //   ); // Overlap the animations slightly

    //   // Cleanup on component unmount
    //   return () => {
    //     tl.kill();
    //     ScrollTrigger.kill();
    //   };
    // }
  }, [loading, isDesktop, isPhoneLandscape]);

  return (
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
      {loading && <Loader duration={3000} onComplete={handleLoaderComplete} />}
    </div>
  );
}
