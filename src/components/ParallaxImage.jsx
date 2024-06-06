import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./parallaxImage.scss"; // Créez ce fichier pour les styles spécifiques

gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({ src, alt, className }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && containerRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="parallax-container">
      <img ref={imageRef} src={src} alt={alt} className={className} />
    </div>
  );
};

export default ParallaxImage;
