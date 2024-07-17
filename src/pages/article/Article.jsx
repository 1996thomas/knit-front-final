import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import transition from "../../utils/transition/transition";
import { getAd, getArticle, incrementAd } from "../../utils/apiCalls";
import "./article.scss";
import { renderRichText } from "../../utils/renderRichText";
import SimilarContent from "../../components/similarContent";
import formatFrenchDate from "../../utils/formatFrenchDate";
import gsap from "gsap";
import RSComp from "../../components/RSComp";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [ad, setAd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const parallaxRef = useRef(null);

  useEffect(() => {
    getArticle(id).then((responseData) => {
      setArticle(responseData.data);
      getAd().then((responseData) => {
        setAd(responseData.data);
      });
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        yPercent: 30,
        ease: "power1",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, [article]);

  const handleAdClick = () => {
    if (ad && ad.length > 0) {
      incrementAd(); // Increment adCount when the ad is clicked
    }
  };

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <>
      <div className="article__wrapper">
        <div className="article__header">
          <p className="publishedAt">
            {formatFrenchDate(article.attributes.publishedAt)}
          </p>

          <h2>{article.attributes.title}</h2>
          <div className="tags">
            <div>
              {article.attributes.tags.data.map((tag, key) => (
                <Link to={`/media/categories/${tag.attributes.name}`} key={key}>
                  {tag.attributes.name}
                </Link>
              ))}
            </div>
            {article.attributes.author.data && (
              <Link
                className="author"
                target="_blank"
                to={article.attributes.author.data.attributes.portfolioLink}
              >
                écrit par {article.attributes.author.data.attributes.name}
              </Link>
            )}
          </div>

          <div className="article-banner">
            <img
              ref={parallaxRef}
              src={`${article.attributes.thumbnail.data.attributes.url}`}
              alt={`cover de l'article : ${article.attributes.title}`}
            />
          </div>
          <p className="summary">{article.attributes.summary}</p>
        </div>
        <div className="article__body">
          <div className="ads__wrapper">
            {ad && (
              <a
                className="ad"
                target="_blank"
                href={ad[0].attributes.adLink}
                onClick={handleAdClick}
              >
                <img src={ad[0].attributes.adImg.data.attributes.url} alt="" />
              </a>
            )}
          </div>
          <div className="article-content">
            {article.attributes.content.map((content, index) => (
              <React.Fragment key={index}>
                {renderRichText(content)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {article && article.attributes && (
        <div className="similarContent__wrapper">
          <SimilarContent article={article} />
        </div>
      )}
      <Helmet>
        <title>{article.attributes.title}</title>
        <meta name="description" content={article.attributes.summary} />
        <meta name="keywords" content={"streetwear, fashion, culture"} />
        <meta property="og:title" content="Salut je suis un test" />
        <meta property="og:description" content={article.attributes.summary} />
        <meta
          property="og:image"
          content={article.attributes.thumbnail.data.attributes.url}
        />
        <meta
          property="og:url"
          content={`https://knit-front-final.vercel.app/media/${id}`}
        />
      </Helmet>
    </>
  );
};

export default transition(Article);
