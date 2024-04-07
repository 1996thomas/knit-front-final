import { SwipeCarousel } from "../components/SwipeCarousel";
import transition from "../utils/transition/transition";
import "./articles.scss";

const imgs = [
  "/image-1.png",
  "/image-2.jpg",
  "/image-3.jpg",
  "/image-1.png",
  "/image-2.jpg",
  "/image-3.jpg",
];

const Articles = () => {
  return (
    <div className="articles">
      <SwipeCarousel />
      <div className="tagged-article__section">
        <h2>Latest articles</h2>
        <div className="reel">
          {imgs.map((img) => (
            <div className="tagged-article__wrapper">
              <div className="tagged-article__header">
                <img src={img} alt="" />
              </div>
              <div className="tagged-article__body">
                <h3>Je suis un titre</h3>
                <p>{img}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default transition(Articles);
