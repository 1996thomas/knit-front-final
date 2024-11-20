import { useEffect } from "react";
import transition from "../utils/transition/transition";
import "./home.scss";
import { useState } from "react";
import { getArticles } from "../utils/apiCalls";
import { useRef } from "react";
import { ShowSponsoredArticles } from "../utils/function";
import Shop from "./Shop/Shop";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import ArticleCard from "./article/ArticleCard";

gsap.registerPlugin(ScrollToPlugin);

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const reelsRef = useRef([]);
  const scrollButtonRef = useRef(null);

  useEffect(() => {
    getArticles().then((responseData) => {
      const reverseArray = responseData.data.slice().reverse();
      setArticles(reverseArray);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      reelsRef.current.forEach((reel) => {
        gsap.set(reel.children, { opacity: 0 });
        gsap.to(reel.children, {
          scrollTrigger: {
            trigger: reel,
            start: "top 100%",
            toggleActions: "restart pause resume pause",
          },
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.5,
        });
      });

      // Add scroll button event listener
      if (scrollButtonRef.current) {
        scrollButtonRef.current.addEventListener("click", () => {
          gsap.to(window, {
            scrollTo: window.innerHeight,
            duration: 1,
            ease: "power2.inOut",
          });
        });
      }
    }
  }, [isLoading, articles]);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="home">
      <div className="home__video">
        <video
          className="video-desktop"
          playsInline
          autoPlay
          loop
          muted
          src="/video-desktop.mp4"
        />

        <video
          className="video-mobile"
          playsInline
          autoPlay
          loop
          muted
          src="/video-tel.mp4"
        />
        <div className="scrollDown--btn" ref={scrollButtonRef}>
          <FaRegArrowAltCircleDown size={60} />
          <p>Découvrir</p>
        </div>
      </div>
      <div className="sponsoredArticle__wrapper">
        <h2>Derniers articles</h2>
        <div className="reel" ref={(el) => (reelsRef.current[0] = el)}>
          {articles.slice(0,5).map((article, index) => {
            return <ArticleCard key={article.id} index={index} article={article} />;
          })}
          {/* <ShowSponsoredArticles articles={articles} /> */}
        </div>
      </div>
      <Shop />
    </div>
  );
};

export default transition(Home);
