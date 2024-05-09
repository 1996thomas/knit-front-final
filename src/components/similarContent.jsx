import React from "react";
import transition from "../utils/transition/transition";
import "./similarContent.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getArticles } from "../utils/apiCalls";
import { findArticleByTags } from "../utils/function";

const SimilarContent = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((responseData) => {
      const reverseArray = responseData.data.slice().reverse();
      setArticles(reverseArray);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }
  return (
    <div className="similarContent__wrapper">
      <p className="similarContent--title">À LIRE AUSSI</p>
      <div className="reel">{findArticleByTags("Mode", articles)}</div>
    </div>
  );
};

export default transition(SimilarContent);
