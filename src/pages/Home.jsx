import { useEffect } from "react";
import { SwipeCarousel } from "../components/SwipeCarousel";
import transition from "../utils/transition/transition";
import "./home.scss";
import { useState } from "react";
import { getArticles } from "../utils/apiCalls";
const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sponsoredArticles, setSponsoredArticles] = useState([]);
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

  return (
    <div className="home">
      <div className="home__video">
        <video playsInline autoPlay muted src="/lol.mp4"></video>
      </div>
      <div className="home-articles">
        <h2>TOP ARTICLES</h2>
        <SwipeCarousel articles={sponsoredArticles} />
      </div>
      <div className="home-articles">
        <h2>SHOP</h2>
        <SwipeCarousel articles={sponsoredArticles} />
      </div>

    </div>
  );
};

export default transition(Home);
