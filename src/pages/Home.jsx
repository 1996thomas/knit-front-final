import transition from "../utils/transition/transition";
import "./home.scss";
const Home = () => {
  return (
    <div className="home">
      <div className="home__video">
        <video playsInline autoPlay loop muted src="/lol.mp4"></video>
      </div>
    </div>
  );
};

export default transition(Home);
