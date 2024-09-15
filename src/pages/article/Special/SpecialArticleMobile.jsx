import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./special-article-mobile.scss";
import SpecialHero from "./SpecialHero";
import Bounded from "./Bounded";
import PromoSection from "./PromoSection";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticleMobile({ isMobile, article }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".section-wrapper");
    const progressBar = document.querySelector(".progress-bar");

    sections.forEach((section) => {
      const image = section.querySelector(".sticky-image");
      const question = section.querySelector(".question-section");

      gsap.fromTo(
        image,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pinSpacing: false,
            pin: false,
          },
        }
      );

      // Animation for the question
      gsap.fromTo(
        question,
        { filter: "opacity(0)" },
        {
          filter: "opacity(1)",
          scrollTrigger: {
            trigger: question,
            start: "top center",
            end: "bottom top",
            pin: true,
            onLeave: () => gsap.to(question, { filter: "opacity(0)" }),
            onLeaveBack: () => gsap.to(question, { filter: "opacity(0)" }),
            onEnter: () => gsap.to(question, { filter: "opacity(1)" }),
            onEnterBack: () => gsap.to(question, { filter: "opacity(1)" }),
          },
        }
      );
    });

    // Mise à jour de la barre de progression
    const updateProgressBar = () => {
      const scrollableHeight =
        sectionRef.current.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollableHeight) * 100;
      progressBar.style.width = `${progress}%`; // Mise à jour de la largeur
    };

    window.addEventListener("scroll", updateProgressBar);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("scroll", updateProgressBar);
    };
  }, []);

  return (
    <div className="special__wrapper">
      <SpecialHero isMobile={isMobile} />
      <section
        className="question-reponse__wrapper responsive"
        ref={sectionRef}
      >
        <div className="progress-bar"></div> {/* Barre de progression */}
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
      <PromoSection isMobile={isMobile} />
    </div>
  );
}
