import React, { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./special-article.scss";
import useOrientation from "../../../utils/useOrientation";
import Spinner from "./Spinner";
gsap.registerPlugin(ScrollTrigger);

export default function QuestionResponse({
  uniqueId,
  question,
  reponse,
  imgsSrc,
}) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);

    // Initialisation de Lenis pour un défilement lisse

    // Timeline pour l'animation des cadres de la question
    const questionFrameAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: `#question-wrapper-${uniqueId}`,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    questionFrameAnimation.to(
      `#question-wrapper-${uniqueId} > .question--paragraph`,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      },
      "-=0.7"
    );

    // ScrollTrigger pour épingler la section du texte
    const pinnedTextTrigger = ScrollTrigger.create({
      trigger: `#pinned-${uniqueId}`,
      start: "top top",
      endTrigger: `#whitespace-${uniqueId}`,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // ScrollTrigger pour épingler la section de la question
    const pinnedQuestionTrigger = ScrollTrigger.create({
      trigger: `#question-wrapper-${uniqueId}`,
      start: "top top",
      endTrigger: `#whitespace-${uniqueId}`,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // ScrollTrigger pour animer le carrousel d'images et le revealer
    const carouselAndRevealerTrigger = ScrollTrigger.create({
      trigger: `#question-wrapper-${uniqueId}`,
      start: "top top",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const translateY = 5 + (3 + 70 / windowHeight) * progress * 100;
        const translateX = 25 - 25 * progress;

        if (progress > 0.8) {
          gsap.to(`#revealer-${uniqueId}`, {
            opacity: 1,
            transform: `translate(${translateX}%, ${translateY}%)`,
            ease: "none",
            duration: 0,
          });
        } else {
          gsap.to(`#revealer-${uniqueId}`, {
            opacity: 0,
            transform: "translate(0%, 0%)",
            ease: "none",
            duration: 0,
          });
        }

        gsap.to(`#question--carousel-${uniqueId}`, {
          transform: `translateX(${-translateX}%)`,
          ease: "none",
          duration: 0,
        });
      },
    });

    // ScrollTrigger pour gérer l'opacité et la transformation du texte dans la section pinned
    // ScrollTrigger pour gérer le scale et la luminosité
    const scaleTrigger = ScrollTrigger.create({
      trigger: `#whitespace-${uniqueId}`,
      start: "top 30%",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        const scaleProgress = 1 + self.progress;
        const scaleX = Math.min(scaleProgress, window.innerWidth / 100);
        const scaleY = Math.min(scaleProgress, windowHeight / 100);
        const scale = Math.min(scaleX, scaleY);

        // Garder votre scale tel quel
        gsap.to(`#revealer-${uniqueId}`, {
          transform: `scale(${scale})`,
          ease: "none",
          duration: 0,
        });

        // Ajuster l'animation du brightness pour éviter le flash
        if (self.progress > 0.2) {
          // Commencer la luminosité après 20% du scale
          const brightnessProgress = (self.progress - 0.2) / 0.8;
          const brightness = Math.max(1 - 0.4 * brightnessProgress, 0.6); // Ajuster la réduction de brightness
          gsap.to(`#revealer-${uniqueId}`, {
            filter: `brightness(${brightness})`,
            zIndex: 0,
            ease: "power2.out", // Transition douce
            duration: 0.3,
          });
        } else {
          // Assurer une transition lisse sans flash en gardant la luminosité stable avant le seuil
          gsap.to(`#revealer-${uniqueId}`, {
            filter: `brightness(1)`, // Brightness initial à 1
            ease: "none",
            duration: 0,
          });
        }
      },
      onComplete: () => {
        // Lancer l'animation du texte une fois que l'animation du revealer est terminée
        gsap.to(`#pinned-${uniqueId} p`, {
          opacity: 1,
          y: "20vh",
          duration: 0.5,
          ease: "power1.out",
        });
      },
    });

    // ScrollTrigger pour gérer l'animation du texte
    const textOpacityTrigger = ScrollTrigger.create({
      trigger: `#whitespace-${uniqueId}`,
      start: "top 20%",
      end: "bottom 50%",
      markers: false,
      onEnter: () => {
        gsap.to(`#pinned-${uniqueId} p`, {
          opacity: 1,
          y: "20vh",
          duration: 0.5,
          ease: "power1.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(`#pinned-${uniqueId} p`, {
          opacity: 0,
          y: "0vh",
          duration: 0.1, // Petite durée pour une transition rapide
          ease: "power1.out",
        });
      },
    });

    // ScrollTrigger pour animer le texte principal
    const largeHeadingTextTrigger = ScrollTrigger.create({
      trigger: `#large-heading__wrapper-${uniqueId} > p`,
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        gsap.to(`#large-heading__wrapper-${uniqueId} > p`, {
          opacity: 1,
          transform: "translateX(0)",
          duration: 0.4,
          ease: "sine.inOut",
        });
      },
    });

    // Cleanup des triggers et des animations lors du démontage du composant
    return () => {
      window.removeEventListener("resize", updateHeight);
      questionFrameAnimation.kill();
      pinnedTextTrigger.kill();
      pinnedQuestionTrigger.kill();
      carouselAndRevealerTrigger.kill();
      textOpacityTrigger.kill();
      scaleTrigger.kill();
      largeHeadingTextTrigger.kill();
      // gsap.ticker.remove(lenis.raf);
    };
  }, [uniqueId, windowHeight]);

  return (
    <>
      <section
        id={`question-wrapper-${uniqueId}`}
        className="question--wrapper"
      >
        <div
          className="question--carousel"
          id={`question--carousel-${uniqueId}`}
        >
          {imgsSrc.map((i, index) => (
            <img src={i} alt="" key={index} />
          ))}
        </div>
        <div className="question--paragraph">
          <span className="question__frame--right" />
          <p>{question}</p>
        </div>
      </section>
      <Spinner />

      <section id={`whitespace-${uniqueId}`} className="whitespace"></section>
      <section id={`pinned-${uniqueId}`} className="pinned">
        <p style={{ opacity: 0, transform: "translateY(50px)" }}>{reponse}</p>
        <div id={`revealer-${uniqueId}`} className="revealer">
          <img src={imgsSrc[1]} alt="" />
        </div>
      </section>
      <section
        className="large-heading__wrapper"
        id={`large-heading__wrapper-${uniqueId}`}
      >
        <span className="grain"></span>
        <p>“Déconstruire certaines idées reçues”</p>
      </section>
    </>
  );
}
