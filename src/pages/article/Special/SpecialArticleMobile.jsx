import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { data, portraitCarousel } from "./data";
import "./special-article-mobile.scss";
import SpecialHero from "./SpecialHero";
import Bounded from "./Bounded";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialArticleMobile({ isMobile, article }) {
  const scrollableSectionRef = useRef(null);
  const imgsContainerRef = useRef(null);
  console.log(article)

  return (
    <div className="special__wrapper">
      <SpecialHero isMobile={isMobile} />
      <section className="question-reponse__wrapper responsive">
        {article.dialog.map((i, index) => (
          <div className="section-wrapper" key={index}>
            <img src={article.carousel[index].attributes.url} alt="" />
            <div className="question-section mobile">
              <Bounded enrichedDialog={i.question} className="question" />
            </div>

            <div className="reponse-section mobile">
              <Bounded enrichedDialog={i.reponse} className="reponse" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
