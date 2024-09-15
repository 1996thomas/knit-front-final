import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaBuyNLarge, FaCartPlus } from "react-icons/fa";
import {
  FaBagShopping,
  FaCartArrowDown,
  FaCartFlatbed,
  FaShop,
} from "react-icons/fa6";
import useOrientation from "../../../utils/useOrientation";

const Spinner = () => {
  const spinnerRef = useRef(null);
  const { isDesktop, isPhoneLandscape } = useOrientation();
  useEffect(() => {
    gsap.to(spinnerRef.current, {
      rotation: 360,
      repeat: -1, // Boucle infinie
      ease: "linear", // Vitesse constante
      duration: 10, // Durée de la rotation
    });
  }, []);

  return (
    <a
      href="https://www.revers-editions.com/marvin-bonheur"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${isPhoneLandscape ? "40px" : "60px"}`,
        height: "60px",
        mixBlendMode:"difference",
        position: "fixed",
        bottom: isPhoneLandscape ? "-10px" : "40px",
        left: "15px",
        zIndex:1000
      }}
    >
      <svg
        ref={spinnerRef}
        width={isPhoneLandscape ? "40" : "60"}
        height="60"
        viewBox="0 0 220 220"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1000 }}
      >
        <circle
          cx="110"
          cy="110"
          r="80"
          fill="none"
          stroke="none"
          id="circlePath"
        />
        <path
          id="textPath"
          d="M 110, 110 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
          fill="none"
        />
        <text fontSize="38" fill="white" fontWeight="bold">
          <textPath
            href="#textPath"
            startOffset="0%"
            textAnchor="middle"
            method="stretch"
            side="left"
            letterSpacing={2}
          >
            TRILOGIE DU BONHEUR TRILOGIE DU BONHEUR
          </textPath>
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // backgroundColor:'red'
        }}
      >
        <FaCartPlus size={isPhoneLandscape ? 12 : 25} color="white" />
      </div>
    </a>
  );
};

export default Spinner;
