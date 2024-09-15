import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { data, portraitCarousel } from "./data";
import "./special-article-desktop.scss";
import SpecialHero from "./SpecialHero";
import { useEffect } from "react";
import { getSpecialArticle } from "../../../utils/apiCalls";
import { useParams } from "react-router-dom";
import Bounded from "./Bounded";
import PromoSection from "./PromoSection";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticleDesktop({ isMobile, article }) {
  const scrollableSectionRef = useRef(null);
  const imgsContainerRef = useRef(null);
  const qaWrapperRef = useRef(null);
  const progressBar = useRef(null);

  useLayoutEffect(() => {
    const sections = document.querySelectorAll(
      ".scrollable-section .section-wrapper"
    );
    const images = imgsContainerRef.current?.querySelectorAll("img");

    // Initialisation: Cache toutes les images
    if (images) {
      gsap.set(images, { opacity: 0 });
    }

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 20%",
            end: "bottom top",
            onEnter: () => {
              gsap.to(section, { opacity: 1 });

              if (images) {
                gsap.to(images, { opacity: 0 }); // Cache toutes les images
                gsap.to(images[index], { opacity: 1 }); // Affiche l'image correspondant à l'index
              }
            },
            onLeave: () => {
              gsap.to(section, { opacity: 0 });

              if (images) {
                gsap.to(images[index], { opacity: 0 }); // Cache l'image lorsque la section quitte la vue
              }
            },
            onEnterBack: () => {
              gsap.to(section, { opacity: 1 });

              if (images) {
                gsap.to(images, { opacity: 0 }); // Cache toutes les images
                gsap.to(images[index], { opacity: 1 }); // Affiche l'image à nouveau quand on revient en arrière
              }
            },
            onLeaveBack: () => {
              gsap.to(section, { opacity: 0, duration: 0.1 });
              if (images) {
                gsap.to(images[index], { opacity: 0 }); // Cache l'image quand on revient en arrière
              }
            },
            pin: true,
          },
        }
      );
    });
    const updateProgressBar = () => {
      const scrollableHeight =
        qaWrapperRef.current.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollableHeight) * 100;
      progressBar.current.style.width = `${progress}%`; // Mise à jour de la largeur
    };

    window.addEventListener("scroll", updateProgressBar);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("scroll", updateProgressBar);
    };
  }, []);

  return (
    <div className="special__wrapper desktop">
      <SpecialHero isMobile={isMobile} />
      <section className="question-reponse__wrapper" ref={qaWrapperRef}>
        <div className="progress-bar" ref={progressBar}></div>{" "}
        {/* Barre de progression */}
        <div className="spacer"></div>
        <div className="fixed-section">
          <div className="image__wrapper">
            <div className="image__carousel" ref={imgsContainerRef}>
              {article.carousel.map((img, index) => (
                <img
                  key={index}
                  src={img.attributes.url}
                  alt=""
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    opacity: 0, // Toutes les images sont initialisées avec opacity: 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="scrollable-section" ref={scrollableSectionRef}>
          {article.dialog.map((i, index) => (
            <div
              className="section-wrapper"
              key={index}
              id={`section-${index + 1}`}
            >
              {/* Ajout de la classe spécifique pour les questions */}
              <div className="question-section">
                <Bounded enrichedDialog={i.question} className="question" />
              </div>

              {/* Ajout de la classe spécifique pour les réponses */}
              <div className="reponse-section">
                <Bounded enrichedDialog={i.reponse} className="reponse" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <PromoSection/>
    </div>
  );
}
