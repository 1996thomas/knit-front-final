import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import "../pages/article/article.scss";
import { Link } from "react-router-dom";

const ArticleCover = ({ article, index }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [height, setHeight] = useState(0);

  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

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
        <Link to={`/media/${article.attributes.slug}`}>
          <motion.p
            className="article-title"
            style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0 }}
          >
            {article.attributes.title}
          </motion.p>
          <motion.div
            className="article-summary"
            style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0 }}
          >
            <p>{article.attributes.summary}</p>
          </motion.div>
          <motion.span
            style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0 }}
          >
            <div className="article--link">Voir l'article</div>
          </motion.span>
        </Link>
      </div>
      <motion.div
        className="tags"
        style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0 }}
      >
        {article.attributes.tags.data.map((tag, i) => (
          <Link to={`/media/categories/${tag.attributes.name}`} key={i}>
            {tag.attributes.name}
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ArticleCover;
