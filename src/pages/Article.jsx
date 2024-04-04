import { SwipeCarousel } from "../components/SwipeCarousel";
import transition from "../utils/transition/transition";

const Article = () => {
  return <div className="article">
    <SwipeCarousel/>
  </div>;
};

export default transition(Article);
