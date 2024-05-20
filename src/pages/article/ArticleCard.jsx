import { useGSAP } from "@gsap/react";
import { useScroll } from "framer-motion";
import { useTransform } from "framer-motion";
import gsap from "gsap";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
export default function ArticleCard({ id, article }) {
  if (!article) return null;

  const articleBodyRef = useRef(null);
  return (
    <div to={`/articles/${article.id}`} className="tagged-article__wrapper">
      <div className="tagged-article__header">
        <div className="tags">
          {article.attributes.tags.data.map((tag, key) => (
            <Link to={`/articles/categories/${tag.attributes.name}`} key={key}>
              {tag.attributes.name}
            </Link>
          ))}
        </div>
        <img
          src={`${article.attributes.thumbnail.data.attributes.url}`}
          alt={article.attributes.title || "Article Thumbnail"}
        />
      </div>
      <div className="tagged-article__body" ref={articleBodyRef}>
        <p className="title">{article.attributes.title}</p>
        <Link to={`/articles/${article.id}`} className="summary">
          {article.attributes.summary}
        </Link>
        <Link to={`/articles/${article.id}`} className="article--link">
          Voir l'article
        </Link>
      </div>
    </div>
  );
}
