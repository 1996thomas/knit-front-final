import React from "react";

export default function FixedCover({ img, heading }) {
  return (
    <div className="fixed-cover__wrapper">
      <img src={img} alt="" />
      <h2>{heading}</h2>
    </div>
  );
}
