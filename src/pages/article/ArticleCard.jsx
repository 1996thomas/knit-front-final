import { useRef } from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  if (!article) return null;

  const articleBodyRef = useRef(null);
  const thumbnailUrl = article.attributes.thumbnail.data 
    ? article.attributes.thumbnail.data.attributes.url 
    : "default-thumbnail-url"; // replace with a default image URL if necessary

  return (
    <Link
      to={`/media/${article.attributes.slug}`}
      className="tagged-article__wrapper"
    >
      <div className="tagged-article__header">
        <div className="tags">
          {article.attributes.tags.data.map((tag, key) => (
            <Link to={`/media/categories/${tag.attributes.name}`} key={key}>
              {tag.attributes.name}
            </Link>
          ))}
        </div>
        <img
          src={thumbnailUrl}
          alt={article.attributes.title || "Article Thumbnail"}
        />
      </div>
      <div className="tagged-article__body" ref={articleBodyRef}>
        <p className="title">{article.attributes.title}</p>
        <p className="summary">{article.attributes.summary}</p>
        <p className="article--link">Voir l'article</p>
      </div>
    </Link>
  );
}
