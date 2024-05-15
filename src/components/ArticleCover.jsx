import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../pages/article/article.scss";
import { Link } from "react-router-dom";

const ArticleCover = ({ article, index }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Utiliser le useRef pour obtenir la hauteur de l'élément
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  // Calculer l'opacité en fonction du scroll
  const y = useTransform(scrollY, (value) => `calc(-${value * 0.15}px)`);
  const opacity = useTransform(scrollY, [0, height], [1, 0], { clamp: false });

  return (
    <motion.div
      ref={ref}
      className="article"
      key={index}
      style={{
        backgroundImage: `url(${article.attributes.cover.data.attributes.url})`,
      }}
    >
      <span className="dark-gradient" />
      <div className="title__wrapper">
        <motion.p className="article-title" style={{ y, opacity }}>
          {article.attributes.title}
        </motion.p>
        <motion.p className="article-summary" style={{ y, opacity }}>
          <Link to={`/articles/${article.id}`}>
            {article.attributes.summary}
          </Link>
        </motion.p>
        <motion.span style={{ y, opacity }}>
          <Link className="article--link" to={`/articles/${article.id}`}>
            Voir l'article
          </Link>
        </motion.span>
      </div>
      <motion.div className="tags" style={{ y, opacity }}>
        {article.attributes.tags.data.map((tag, i) => (
          <Link to={`/articles/categories/${tag.attributes.name}`} key={i}>
            {tag.attributes.name}{" "}
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ArticleCover;
