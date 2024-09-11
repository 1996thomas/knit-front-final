import React from "react";
import FixedCover from "./FixedCover";

export default function QuestionReponse({ data }) {
  return (
    <>
      <div className="question-reponse__wrapper">
        <div className="question">
          <div className="left">
            <img src={data.imgsSrc[0]} alt="" />
          </div>
          <div className="right">
            <p>{data.question}</p>
          </div>
        </div>
        <div className="reponse">{data.reponse}</div>
      </div>
      <>
        {data.heading && (
          <div className="fixed-cover__wrapper">
            <FixedCover img={data.imgsSrc[1]} heading={data.heading} />
          </div>
        )}
      </>
    </>
  );
}
