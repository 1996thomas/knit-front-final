import React, { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./special-article.scss";

gsap.registerPlugin(ScrollTrigger);

export default function QuestionResponse({
  uniqueId,
  question,
  reponse,
  imgsSrc,
}) {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: `#question-wrapper-${uniqueId}`,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .fromTo(
        `#question-wrapper-${uniqueId} .question__frame--left`,
        { xPercent: 100, yPercent: 100, opacity: 0, transformOrigin: "top left" },
        {
          xPercent: -5,
          yPercent: -15,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      )
      .fromTo(
        `#question-wrapper-${uniqueId} .question__frame--right`,
        {
          xPercent: 100,
          yPercent: 100,
          opacity: 0,
          transformOrigin: "bottom right",
        },
        {
          xPercent: 5,
          yPercent: 5,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<" // Démarre en même temps que l'animation de gauche
      )
      .to(
        `#question-wrapper-${uniqueId} .question--paragraph`,
        { opacity: 1, duration: 0.5, ease: "power2.in" },
        "-=0.7" // Démarre juste avant la fin des animations des cadres
      );

    ScrollTrigger.create({
      trigger: `#pinned-${uniqueId}`,
      start: "top top",
      endTrigger: `#whitespace-${uniqueId}`,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: `#question-wrapper-${uniqueId}`,
      start: "top top",
      endTrigger: `#whitespace-${uniqueId}`,
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: `#question-wrapper-${uniqueId}`,
      start: "top top",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const translateY = 5 + (3 + 70 / window.innerHeight) * progress * 100; // Conversion de calc(3vw + 70px) en pourcentage
        const translateX = 25 - 25 * progress;
    
        if (progress > .8) {
          gsap.to(`#revealer-${uniqueId}`, {
            opacity: 1,
            transform: `translate(${translateX}%, ${translateY}%)`,
            ease: "none",
            duration: 0,
          });
        } 
        else {
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
    

    const textOpacityTrigger = ScrollTrigger.create({
      trigger: `#whitespace-${uniqueId}`,
      start: "top 50%",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const scaleProgress = 1 + self.progress;

        // Calculer la taille du scale en fonction des dimensions max
        const scaleX = Math.min(scaleProgress, maxWidth / 100);
        const scaleY = Math.min(scaleProgress, maxHeight / 100);

        const scale = Math.min(scaleX, scaleY);

        gsap.to(`#revealer-${uniqueId}`, {
          transform: `scale(${scale})`,
          ease: "none",
          duration: 0,
        });

        const brightness = Math.max(1 - 0.6 * self.progress, 0.4);

        gsap.to(`#revealer-${uniqueId}`, {
          filter: `brightness(${brightness})`,
          ease: "none",
          duration: "0",
        });
        if (self.progress > 0.99) {
          gsap.to(`#pinned-${uniqueId} p`, {
            opacity: self.progress,
            y: "20vh",
            duration: 0.5,
            ease: "power1.out",
          });
        }
         else {
          gsap.to(`#pinned-${uniqueId} p`, {
            opacity: 0,
            yPercent: 0,
            duration: 0.5,
            ease: "power1.out",
          });
        }
      },
    });

    ScrollTrigger.create({
      trigger: `#large-heading__wrapper-${uniqueId} > p`,
      start: "top center ",
      end: "bottom bottom",
      scrub: true,

      onUpdate: (self) => {
        gsap.to(`#large-heading__wrapper-${uniqueId} > p`, {
          opacity: self.progress,
          transform: "translateX(0)",
          duration: 0.4,
          ease: "sine.inOut",
        });
      },
    });

    return () => {
      textOpacityTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, [uniqueId]);

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
          <span className="question__frame--left" />
          <span className="question__frame--right" />
          <p>{question}</p>
        </div>
      </section>
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
