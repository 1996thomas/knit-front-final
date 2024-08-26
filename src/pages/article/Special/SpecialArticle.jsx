import React, { useEffect, useRef } from "react";
import "./special-article.scss";
import { gsap } from "gsap";
import QuestionResponse from "./QuestionResponse";
import { data } from "./data";

export default function SpecialArticle() {
  const loaderRef = useRef(null);

  // useEffect(() => {
  //   const minimumLoadingTime = 500; // in milliseconds
  //   const startTime = Date.now();
  //   console.log(data);

  //   window.addEventListener("load", () => {
  //     const timeElapsed = Date.now() - startTime;
  //     const remainingTime = minimumLoadingTime - timeElapsed;
  //     const delay = remainingTime > 0 ? remainingTime : 0;
  //     setTimeout(() => {
  //       if (loaderRef.current) {
  //         gsap.to(loaderRef.current, {
  //           opacity: 0,
  //           duration: 1,
  //           ease: "power2.out",
  //           onComplete: () => {
  //             if (loaderRef.current) {
  //               loaderRef.current.style.display = "none";
  //             }
  //           },
  //         });
  //       }
  //     }, delay);
  //   });
  // }, []);

  useEffect(() => {
    // ANIMATION HERO
    gsap.to(".hero", {
      yPercent: -20,
      transform: "scale(0.2)",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".hero > h1", {
      yPercent: -5,
      // scale: 2,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="special-article__wrapper">
      {/* <div className="loader" ref={loaderRef}>
        <div className="loader--heading">
          <img src="/KNIT_WHITE.png" />
          <p>présente</p>
          <h1>MONSIEUR BONHEUR</h1>.
        </div>
        <img src="/50.JPG" alt="" />
      </div> */}
      <div className="container">
        <section className="hero">
          <h1>Le visage des oublié-e-s</h1>
          <div className="hero--info">
            <span>© Marvin Bonheur</span>
            <span>Interview par Paul-Louis Godier</span>
            <span>Septembre 2024</span>
            <span>Réalisé par KNIT</span>
          </div>
        </section>
        <section className="info"></section>
      </div>
      <div className="question-reponse__wrapper">
        {data.map((item, index) => (
          <QuestionResponse
            key={index}
            uniqueId={index} // Ajouter un identifiant unique
            reponse={item.reponse}
            question={item.question}
            imgsSrc={item.imgsSrc}
          />
        ))}
      </div>
    </div>
  );
}
