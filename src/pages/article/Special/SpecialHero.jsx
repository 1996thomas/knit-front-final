import React from "react";
import Spinner from "./Spinner";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import "./special-hero.scss";
export default function SpecialHero({ isMobile }) {
  const heroTitleRef = useRef(null);
  const heroRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const introRef = useRef(null);
  const neuftroisRef = useRef(null);


  return (
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
        <div className="top">
          <h2>MONSIEUR BONHEUR</h2>
          <h3>
            mise en lumière du
            <br />
            <span ref={neuftroisRef}>93</span>
          </h3>
        </div>
        <div className="bottom">
          <p>
            Dix ans de cheminement photographique plus tard, Monsieur Bonheur,
            artiste originaire d’Aulnay-Sous-Bois sort son premier livre : « La
            trilogie du Bonheur ».
          </p>
          <p>
            Un travail sur le 93, département de la Seine-Saint-Denis, dans
            lequel il a grandi. Avec son appareil compact argentique, clin d’œil
            au Kodak jetable jaune 27 poses de son enfance, il raconte ses
            souvenirs d’adolescence, relate du quotidien des jeunes de quartier
            et dépeint avec fierté la culture de la rue.
          </p>
        </div>
      </section>
      <Spinner />
    </div>
  );
}
