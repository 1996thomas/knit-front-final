import React from "react";
import "./CGU.scss";
import transition from "../../utils/transition/transition";
import { useEffect } from "react";
import { getCGU } from "../../utils/apiCalls";
import { useState } from "react";
import renderRichText from "../../utils/renderRichText";

function CGU() {
  const [Cgu, setCgu] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCGU().then((responseData) => {
      setCgu(responseData);
      setIsLoading(false);
    });
  }, []);
  Cgu &&
    console.log(
      Cgu.data[0].attributes.cgu.map((content) => renderRichText(content))
    );

  return (
    <div className="cgu__wrapper">
      <h2>Mentions légales</h2>
      {!isLoading &&
        Cgu.data[0].attributes.cgu.map((content) => renderRichText(content))}
    </div>
  );
}

export default transition(CGU);
