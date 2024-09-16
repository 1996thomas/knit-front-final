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

  // Use the correct structure for API or static article
  const isApiArticle = !!article.attributes; // Check if the article has the 'attributes' field (API article)
  const backgroundImage = isApiArticle
    ? article.attributes.cover.data.attributes.url
    : article.image; // Use `image` for static article
  const title = isApiArticle ? article.attributes.title : article.title;
  const summary = isApiArticle ? article.attributes.summary : article.content;
  const slug = isApiArticle
    ? `/media/${article.attributes.slug}`
    : article.slug; // Link for static article
  const tags = isApiArticle
    ? article.attributes.tags.data.map((tag) => tag.attributes.name) // API tags
    : article.tags; // Static article tags

  return (
    <motion.div
      ref={ref}
      className="article"
      key={index}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <span className="dark-gradient" />
      <div className="title__wrapper">
        <Link to={slug}>
          <motion.p
            className="article-title"
            style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0 }}
          >
            {title}
          </motion.p>
          <motion.div
            className="article-summary"
            style={{ y: isInView ? y : 0, opacity: isInView ? opacity : 0 }}
          >
            <p>{summary}</p>
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
        {tags &&
          tags.map((tag, i) => (
            <Link
              to={isApiArticle ? `/media/categories/${tag}` : article.slug}
              key={i}
            >
              {tag}
            </Link>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default ArticleCover;
