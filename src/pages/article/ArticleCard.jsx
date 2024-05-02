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

  const { scrollY } = useScroll();
  const articleBodyRef = useRef(null);
  const y = useTransform(scrollY, (value) => `calc(-${value * 0.15}px)`);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    if (articleBodyRef.current) {
      const animation = gsap.to(articleBodyRef.current, {
        yPercent: isHover ? 0 : 70,
        duration: isHover ? 0.2 : 0.4,
        ease: "power3.in",
      });
      return () => animation.kill();
    }
  }, [isHover]);

  return (
    <div
      to={`/articles/${article.id}`}
      className="tagged-article__wrapper"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
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
      <Link
        to={`/articles/${article.id}`}
        className="tagged-article__body"
        ref={articleBodyRef}
      >
        <p className="title">{article.attributes.title}</p>
        <p className="summary">{article.attributes.summary}</p>
      </Link>
    </div>
  );
}
