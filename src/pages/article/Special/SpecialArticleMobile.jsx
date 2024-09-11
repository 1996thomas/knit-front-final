import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./special-article-mobile.scss";
import SpecialHero from "./SpecialHero";
import Bounded from "./Bounded";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticleMobile({ isMobile, article }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".section-wrapper");

    sections.forEach((section) => {
      const image = section.querySelector(".sticky-image");
      const question = section.querySelector(".question-section");
      const reponse = section.querySelector(".reponse-section");

      gsap.fromTo(
        image,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
          },
        }
      );

      // Animation for the question
      gsap.fromTo(
        question,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: question,
            start: "top 50%", // Start showing question when it reaches 50% from the top of the viewport
            end: "bottom top", // Keep it visible until it reaches 50% from the bottom of the viewport
            pin: true,
            onLeave: () => gsap.to(question, { opacity: 0 }), // Hide question when leaving
            onEnterBack: () => gsap.to(question, { opacity: 1 }), // Show question when entering back
          },
        }
      );

      // Animation for the answer
      gsap.fromTo(
        reponse,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: reponse,
            start: "top 40%", // Start showing answer when it reaches 50% from the top of the viewport
            end: "bottom top", // Keep it visible until it reaches 50% from the bottom of the viewport
            pin: true,
            onLeave: () => gsap.to(question, { opacity: 0 }), // Hide question when leaving
            onEnterBack: () => gsap.to(question, { opacity: 1 }), // Show question when entering back
          },
          duration: 0.4,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="special__wrapper">
      <SpecialHero isMobile={isMobile} />
      <section
        className="question-reponse__wrapper responsive"
        ref={sectionRef}
      >
        {article.dialog.map((i, index) => (
          <div className="section-wrapper" key={index} id={`section-${index}`}>
            <img
              src={article.carousel[index].attributes.url}
              alt=""
              className="sticky-image"
            />
            <div className="question-section mobile">
              <Bounded enrichedDialog={i.question} className="question" />
            </div>

            <div className="reponse-section mobile">
              <Bounded enrichedDialog={i.reponse} className="reponse" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
