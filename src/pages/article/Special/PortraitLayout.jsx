import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./special-article.scss";
import { portraitCarousel } from "./data";
import { useState } from "react";
import Loader from "./Loader";

export default function PortraitLayout() {
  const phoneWrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Précharger les images
    const loadImages = () => {
      const promises = portraitCarousel.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(promises)
        .then(() => setImagesLoaded(true))
        .catch((err) => console.error("Failed to load images", err));
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      // Animation pour faire pivoter le téléphone avec une pause avant le yoyo
      gsap.to(phoneWrapperRef.current, {
        rotate: 90,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        repeatDelay: 1.5,
      });

      // Animation du carrousel infini
      const carousel = carouselRef.current;
      const images = gsap.utils.toArray(".carousel__image");

      // Dupliquer les images pour permettre un effet infini
      images.forEach((image) => {
        const clone = image.cloneNode(true);
        carousel.appendChild(clone);
      });

      gsap.to(carousel, {
        xPercent: -100,
        ease: "linear",
        repeat: -1,
        duration: 40,
        modifiers: {
          xPercent: gsap.utils.unitize((value) => parseFloat(value) % 100),
        },
      });
    }
  }, [imagesLoaded]);

  return (
    <div className="portrait__wrapper">
      <div className="portrait__heading">
        <h1>Le visage des oublié-e-s</h1>
        <h2>
          Entretien avec le photographe Marvin Bonheur, une mise en lumière du
          93
        </h2>
      </div>
      <div className="phone__wrapper">
        <img ref={phoneWrapperRef} src="/phone.svg" alt="Phone" />
        <p>Passe en mode paysage pour voir l'article</p>
      </div>
      <div className="portrait-carousel__wrapper">
        <div className="carousel" ref={carouselRef}>
          {portraitCarousel.map((i) => (
            <img className="carousel__image" key={i} src={i} alt="" />
          ))}
        </div>
      </div>
      {loading && <Loader duration={3000} onComplete={handleLoaderComplete} />}
    </div>
  );
}
