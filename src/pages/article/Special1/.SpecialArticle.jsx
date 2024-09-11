import React, { useState, useEffect, useRef } from "react";
import "./special-article.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuestionResponse from "./QuestionResponse";
import { data } from "./data";
import useOrientation from "../../../utils/useOrientation";
import PortraitLayout from "./PortraitLayout";
import Loader from "./Loader";
import { getSpecialArticle } from "../../../utils/apiCalls";
import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import NotFound from "../../404/NotFound";
import Spinner from "./Spinner";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticle() {
  const { isDesktop, isPhoneLandscape } = useOrientation();
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineIntroRef = useRef(null);
  const introRef = useRef(null);
  const imageWrapperRef = useRef(null); // Ref for the image wrapper
  const [specialArticle, setSpecialArticle] = useState(null);
  const [dialog, setDialog] = useState([]);
  const [carousel, setCarousel] = useState();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    getSpecialArticle(slug).then((responseData) => {
      setSpecialArticle(responseData);
      setIsLoading(false);
      const dialog = [];
      const carousel = responseData.attributes.specialCarousel.data;

      // Populate dialog array
      dialog.push(responseData.attributes.dialog);
      console.log(dialog);
      // Append 3 URLs from carousel to each dialog entry
      const enrichedDialog = dialog[0].map((entry, index) => {
        const carouselUrls = [
          carousel[(index - 1 + carousel.length) % carousel.length], // carousel[i - 1] (circular)
          carousel[index % carousel.length], // carousel[i]
          carousel[(index + 1) % carousel.length], // carousel[i + 1] (circular)
        ];

        return {
          ...entry,
          carouselUrls: carouselUrls.reverse(),
        };
      });

      setDialog(enrichedDialog);
    });
  }, [slug]);

  useLayoutEffect(() => {
    if (!isLoading && (isDesktop || isPhoneLandscape)) {
      gsap.to(imageWrapperRef.current, {
        width: "33.33%",
        filter: "grayscale(0)",
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top center",
          scrub: true,
        },
      });
    }
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isLoading, isDesktop, isPhoneLandscape]);

  if (!specialArticle) {
    return <NotFound />;
  }

  return (
    <div className={`special-article__wrapper ${loading ? "loading" : ""}`}>
      <Loader duration={3000} onComplete={handleLoaderComplete} />

      {/* Render the content in the background while hidden */}
      <div className={`content ${loading ? "hidden" : ""}`}>
        {isDesktop || isPhoneLandscape ? (
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
            <section className="intro" ref={introRef}>
              <div className="intro-img__wrapper" ref={imageWrapperRef}>
                <img src="/1a.JPG" alt="" />
              </div>
              <div className="top">
                <h2>Entretien Marvin Bonheur</h2>
                <h2>une mise en lumière du 93</h2>
              </div>
              <div className="bottom">
                <p>
                  Dix ans de cheminement photographique plus tard, Monsieur
                  Bonheur, artiste originaire d’Aulnay-Sous-Bois sort son
                  premier livre : « La trilogie du Bonheur ». Un travail sur le
                  93, département de la Seine-Saint-Denis, dans lequel il a
                  grandi. Avec son appareil compact argentique, clin d’œil au
                  Kodak jetable jaune 27 poses de son enfance, il raconte ses
                  souvenirs d’adolescence, relate du quotidien des jeunes de
                  quartier et dépeint avec fierté la culture de la rue.
                </p>
              </div>
            </section>
            <Spinner/>
          </div>
        ) : (
          <PortraitLayout />
        )}

        <div className="question-reponse__wrapper">
          {dialog.map((item, index) => (
            <QuestionResponse key={index} uniqueId={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
