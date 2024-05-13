import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./parallaxImage.scss"; // Créez ce fichier pour les styles spécifiques

gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({ src, alt, className }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -30,
        ease: "power1.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return <img ref={imageRef} src={src} alt={alt} className={className} />;
};

export default ParallaxImage;
