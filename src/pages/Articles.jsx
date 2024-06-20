import { useState, useEffect, useRef } from "react";
import { SwipeCarousel } from "../components/SwipeCarousel";
import transition from "../utils/transition/transition";
import "./articles.scss";
import { getAllTags, getArticles } from "../utils/apiCalls";
import { Link } from "react-router-dom";
import { findArticleByTags } from "../utils/function";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Articles = () => {
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
    getAllTags().then((responseData) => {
      setTags(responseData.data);
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
    <div className="articles">
      <SwipeCarousel articles={sponsoredArticles} />
      <div className="tagged-articles__section">
        {tags.map((tag, index) => (
          <div key={index}>
            <div className="tagged-articles--header">
              <h2>{tag.attributes.name}</h2>
              <Link to={`/articles/categories/${tag.attributes.name}`}>Voir tout</Link>
            </div>
            <div className="reel" ref={(el) => (reelsRef.current[index] = el)}>
              {findArticleByTags(tag.attributes.name, articles)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default transition(Articles);
