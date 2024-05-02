import ArticleCard from "../pages/article/ArticleCard";

export function findArticleByTags(tagName, articles) {

  const taggedArticles = articles
    .filter((article) =>
      article.attributes.tags.data.some((tag) => tag.attributes.name === tagName)
    )
    .map((article, index) => (
      <ArticleCard key={article.id} id={index} article={article} />
    ));

  return taggedArticles.length > 0 ? taggedArticles : false;
}
