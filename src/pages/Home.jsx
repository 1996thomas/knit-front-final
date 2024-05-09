import transition from "../utils/transition/transition";
import "./home.scss";
const Home = () => {
  return (
    <div className="home">
      <div className="home__video">
        <video autoPlay loop muted src="/lol.mp4"></video>
      </div>
      <div className="about__wrapper">
        <div className="first">
          <h2>A propos de KNIT</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque vel
            delectus minus blanditiis ad aliquid corporis adipisci officiis,
            molestiae deleniti, temporibus obcaecati tempora, ratione quisquam
            exercitationem fugit perspiciatis ullam cupiditate.
          </p>
        </div>
        <div className="second">
          <h2>Notre vision de la culture</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque vel
            delectus minus blanditiis ad aliquid corporis adipisci officiis,
            molestiae deleniti, temporibus obcaecati tempora, ratione quisquam
            exercitationem fugit perspiciatis ullam cupiditate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default transition(Home);
