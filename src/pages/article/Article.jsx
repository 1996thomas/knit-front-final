import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import transition from "../../utils/transition/transition";
import { getArticle } from "../../utils/apiCalls";
import "./article.scss";
import { renderRichText } from "../../utils/renderRichText";
import SimilarContent from "../../components/similarContent";
import { forwardRef } from "react";
import formatFrenchDate from "../../utils/formatFrenchDate";
import gsap from "gsap";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const parallaxRef = useRef(null);

  useEffect(() => {
    getArticle(id).then((responseData) => {
      setArticle(responseData.data);
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        yPercent: 40,
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
                <Link
                  to={`/articles/categories/${tag.attributes.name}`}
                  key={key}
                >
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
            <img src="/ad-nike.jpg" alt="Nike Ad" />
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
    </>
  );
};

export default transition(Article);
