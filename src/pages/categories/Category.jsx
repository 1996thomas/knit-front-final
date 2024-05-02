import React from "react";
import transition from "../../utils/transition/transition";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCategory } from "../../utils/apiCalls";
import { useState } from "react";
import "./category.scss";
import ArticleCard from "../article/ArticleCard";
import { Link } from "react-router-dom";

const Category = () => {
  const name = useParams();
  const nameUppercase = name.name[0].toUpperCase() + name.name.slice(1);

  const [articles, setArticles] = useState();
  useEffect(() => {
    getCategory(nameUppercase).then((responseData) => {
      setArticles(responseData.data);
    });
  }, []);
  return (
    <div className="category__wrapper">
      {articles && articles !== undefined && (
        <>
          <div className="category--header">
            <h2>{nameUppercase}</h2>
            <Link to="/articles">Retour aux articles</Link>
          </div>
          <div className="auto-grid">
            {articles.map((article) => (
              <ArticleCard article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default transition(Category);
