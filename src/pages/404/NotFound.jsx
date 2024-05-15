import React from "react";
import "./NotFound.scss";
import transition from "../../utils/transition/transition";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound__wrapper">
      <p>404 page introuvable :/</p>
      <Link to={"/"}>Retour à l'accueil</Link>
    </div>
  );
};

export default transition(NotFound);
