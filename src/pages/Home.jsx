import { useEffect } from "react";
import { SwipeCarousel } from "../components/SwipeCarousel";
import transition from "../utils/transition/transition";
import "./home.scss";
import { useState } from "react";
import { getArticles } from "../utils/apiCalls";
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
