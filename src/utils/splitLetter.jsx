import React, { useState } from "react";
import { useEffect } from "react";

function splitLetter(word) {
  const [letterArray, setLetterArray] = useState([]);

  useEffect(() => {
    setLetterArray(word.split(""));
  }, []);

  return letterArray;
}

export default splitLetter;
