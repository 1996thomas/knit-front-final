import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./special-article.scss";
import useOrientation from "../../../utils/useOrientation";
import Spinner from "./Spinner";
gsap.registerPlugin(ScrollTrigger);

export default function QuestionResponse({ item, uniqueId }) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Creating refs for elements
  const questionWrapperRef = useRef(null);
  const questionCarouselRef = useRef(null);
  const paragraphRef = useRef(null);
  const whitespaceRef = useRef(null);
  const pinnedRef = useRef(null);
  const revealerRef = useRef(null);
  const largeHeadingWrapperRef = useRef(null);

  console.log(item);

  useLayoutEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);

    // Timeline pour l'animation des cadres de la question
    const questionFrameAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: questionWrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    questionFrameAnimation.to(
      paragraphRef.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      },
      "-=0.7"
    );

    // ScrollTrigger pour épingler la section du texte
    const pinnedTextTrigger = ScrollTrigger.create({
      trigger: pinnedRef.current,
      start: "top top",
      endTrigger: whitespaceRef.current,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // ScrollTrigger pour épingler la section de la question
    const pinnedQuestionTrigger = ScrollTrigger.create({
      trigger: questionWrapperRef.current,
      start: "top top",
      endTrigger: whitespaceRef.current,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // ScrollTrigger pour animer le carrousel d'images et le revealer
    const carouselAndRevealerTrigger = ScrollTrigger.create({
      trigger: questionWrapperRef.current,
      start: "top top",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const translateY = 5 + (3 + 70 / windowHeight) * progress * 100;
        const translateX = 25 - 25 * progress;

        if (progress > 0.8) {
          gsap.to(revealerRef.current, {
            opacity: 1,
            transform: `translate(${translateX}%, ${translateY}%)`,
            ease: "none",
            duration: 0,
          });
        } else {
          gsap.to(revealerRef.current, {
            opacity: 0,
            transform: "translate(0%, 0%)",
            ease: "none",
            duration: 0,
          });
        }

        gsap.to(questionCarouselRef.current, {
          transform: `translateX(${-translateX}%)`,
          ease: "none",
          duration: 0,
        });
      },
    });

    // ScrollTrigger pour gérer l'opacité et la transformation du texte dans la section pinned
    const scaleTrigger = ScrollTrigger.create({
      trigger: whitespaceRef.current,
      start: "top 30%",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        const scaleProgress = 1 + self.progress;
        const scaleX = Math.min(scaleProgress, window.innerWidth / 100);
        const scaleY = Math.min(scaleProgress, windowHeight / 100);
        const scale = Math.min(scaleX, scaleY);

        gsap.to(revealerRef.current, {
          transform: `scale(${scale})`,
          ease: "none",
          duration: 0,
        });

        if (self.progress > 0.2) {
          const brightnessProgress = (self.progress - 0.2) / 0.8;
          const brightness = Math.max(1 - 0.4 * brightnessProgress, 0.5);
          gsap.to(revealerRef.current, {
            filter: `brightness(${brightness}) blur(${brightness * 0.5}px)`,
            zIndex: 0,
            ease: "power2.out",
            duration: 0.3,
          });
        } else {
          gsap.to(revealerRef.current, {
            filter: `brightness(1)`,
            ease: "none",
            duration: 0,
          });
        }
      },
      onComplete: () => {
        gsap.to(pinnedRef.current.querySelector("p"), {
          opacity: 1,
          y: "20vh",
          duration: 0.5,
          ease: "power1.out",
        });
      },
    });

    const textOpacityTrigger = ScrollTrigger.create({
      trigger: whitespaceRef.current,
      start: "top 20%",
      end: "bottom 50%",
      markers: false,
      onEnter: () => {
        gsap.killTweensOf(pinnedRef.current.querySelector("p"));
        gsap.to(pinnedRef.current.querySelector("p"), {
          opacity: 1,
          y: "20vh",
          duration: 0.5,
          ease: "power1.out",
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(pinnedRef.current.querySelector("p"));
        gsap.to(pinnedRef.current.querySelector("p"), {
          opacity: 0,
          y: "0vh",
          duration: 0.05,
          ease: "power1.out",
        });
      },
    });

    // ScrollTrigger pour animer le texte principal
    const largeHeadingTextTrigger = ScrollTrigger.create({
      trigger: largeHeadingWrapperRef.current.querySelector("p"),
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        gsap.to(largeHeadingWrapperRef.current.querySelector("p"), {
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
    };
  }, [uniqueId, windowHeight]);

  return (
    <>
      <section
        id={`question-wrapper-${uniqueId}`}
        className="question--wrapper"
        ref={questionWrapperRef}
      >
        <div
          className="question--carousel"
          id={`question--carousel-${uniqueId}`}
          ref={questionCarouselRef}
        >
          {item.carouselUrls.map((i, index) => (
            <img src={`${i.attributes.url}`} alt="" key={index} />
          ))}
        </div>
        <div className="question--paragraph" ref={paragraphRef}>
          <span className="question__frame--right" />
          <p>{item.question[0].children[0].text}</p>
        </div>
      </section>
      <Spinner />

      <section
        id={`whitespace-${uniqueId}`}
        className="whitespace"
        ref={whitespaceRef}
      ></section>
      <section id={`pinned-${uniqueId}`} className="pinned" ref={pinnedRef}>
        <p style={{ opacity: 0, transform: "translateY(50px)" }}>
          {item.reponse[0].children[0].text}
        </p>
        <div id={`revealer-${uniqueId}`} className="revealer" ref={revealerRef}>
          <img src={item.carouselUrls[1].attributes.url} alt="" />
        </div>
      </section>
      <section
        className="large-heading__wrapper"
        id={`large-heading__wrapper-${uniqueId}`}
        ref={largeHeadingWrapperRef}
      >
        <span className="grain"></span>
        <p>“Déconstruire certaines idées reçues”</p>
      </section>
    </>
  );
}
