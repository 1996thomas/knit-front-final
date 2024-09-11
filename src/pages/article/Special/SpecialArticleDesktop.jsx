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

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticleDesktop({ isMobile, article }) {
  const scrollableSectionRef = useRef(null);
  const imgsContainerRef = useRef(null);

  console.log(article);

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
              if (images) {
                gsap.to(images, { opacity: 0 }); // Cache toutes les images
                gsap.to(images[index], { opacity: 1 }); // Affiche l'image correspondant à l'index
              }
            },
            onLeave: () => {
              if (images) {
                gsap.to(images[index], { opacity: 0 }); // Cache l'image lorsque la section quitte la vue
              }
            },
            onEnterBack: () => {
              if (images) {
                gsap.to(images, { opacity: 0 }); // Cache toutes les images
                gsap.to(images[index], { opacity: 1 }); // Affiche l'image à nouveau quand on revient en arrière
              }
            },
            onLeaveBack: () => {
              if (images) {
                gsap.to(images[index], { opacity: 0 }); // Cache l'image quand on revient en arrière
              }
            },
            scrub: true,
            pin: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="special__wrapper desktop">
      <SpecialHero isMobile={isMobile} />
      <section className="question-reponse__wrapper">
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
    </div>
  );
}
