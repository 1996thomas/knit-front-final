import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./parallaxImage.scss";

gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({ src, alt, className, figCaption }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);


  return (
    <div ref={containerRef} className="parallax-container">
      <img ref={imageRef} src={src} alt={alt} className={className} />
      {figCaption && <p className="image-caption">{figCaption}</p>}
    </div>
  );
};

export default ParallaxImage;
