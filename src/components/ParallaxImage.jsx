import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./parallaxImage.scss"; // Créez ce fichier pour les styles spécifiques

gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({ src, alt, className, figCaption }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // useEffect(() => {
  //   if (imageRef.current && containerRef.current) {
  //     gsap.to(imageRef.current, {
  //       yPercent: -12,
  //       ease: "power1.out",
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: true,
  //       },
  //     });
  //   }
  // }, []);

  return (
    <div ref={containerRef} className="parallax-container">
      <img ref={imageRef} src={src} alt={alt} className={className} />
      {figCaption && <p className="image-caption">{figCaption}</p>}
    </div>
  );
};

export default ParallaxImage;
