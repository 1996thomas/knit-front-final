import { useEffect } from "react";
import { SwipeCarousel } from "../components/SwipeCarousel";
import transition from "../utils/transition/transition";
import "./home.scss";
import { useState } from "react";
import { getArticles } from "../utils/apiCalls";
import { useRef } from "react";
import { ShowSponsoredArticles } from "../utils/function";
import Shop from "./Shop/Shop";
import gsap from "gsap";
const Home = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sponsoredArticles, setSponsoredArticles] = useState([]);
  const reelsRef = useRef([]);

  useEffect(() => {
    getArticles().then((responseData) => {
      const reverseArray = responseData.data.slice().reverse();
      setArticles(reverseArray);
      const sponsored = reverseArray.filter(
        (article) => article.attributes.sponsored
      );
      setSponsoredArticles(sponsored);
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
    }
  }, [isLoading, articles]);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="home">
      <div className="home__video">
        <video playsInline autoPlay loop muted src="/lol.mp4"></video>
      </div>
      <div className="sponsoredArticle__wrapper">
        <h2>Derniers articles</h2>
        <div className="reel" ref={(el) => (reelsRef.current[0] = el)}>
          <ShowSponsoredArticles articles={articles} />
        </div>
      </div>
      <Shop />
    </div>
  );
};

export default transition(Home);
