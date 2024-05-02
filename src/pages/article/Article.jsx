import React from "react";
import { useParams } from "react-router-dom";
import transition from "../../utils/transition/transition";
import { useState } from "react";
import { useEffect } from "react";
import { getArticle } from "../../utils/apiCalls";
import "./article.scss";
import ArticleCover from "../../components/ArticleCover";
import { renderRichText } from "../../utils/renderRichText";
import SimilarContent from "../../components/similarContent";
import { Link } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticle(id).then((responseData) => {
      setArticle(responseData.data);
      responseData !== undefined && setIsLoading(false);
    });
    console.log("Article in SimilarContent:", article);
  }, []);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }
  console.log(article);
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
            <img src="/ad-nike.jpg" alt="" />
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
      {article && article.attributes && <SimilarContent article={article} />}
    </>
  );
};

export default transition(Article);
