import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import transition from "../../utils/transition/transition";
import { getArticle } from "../../utils/apiCalls";
import "./article.scss";
import { renderRichText } from "../../utils/renderRichText";
import SimilarContent from "../../components/similarContent";
import { forwardRef } from "react";

const Article = forwardRef((props, ref) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticle(id).then((responseData) => {
      setArticle(responseData.data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  console.log(ref)

  return (
    <>
      <div className="article__wrapper">
        <div className="article__header">
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
              src={`${article.attributes.thumbnail.data.attributes.url}`}
              alt=""
            />
          </div>
        </div>
        <div className="article__body">
          <div className="ads__wrapper">
            <img src="/ad-nike.jpg" alt="Nike Ad" />
          </div>
          <div className="article-content">
            <p className="summary">{article.attributes.summary}</p>
            {article.attributes.content.map((content, index) => (
              <React.Fragment key={index}>
                {renderRichText(content)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {article && article.attributes && (
        <div className="similarContent__wrapper" ref={ref}>
          <SimilarContent article={article} />
        </div>
      )}
    </>
  );
});

export default transition(Article);
