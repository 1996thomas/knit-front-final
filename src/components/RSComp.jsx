import gsap from "gsap";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./RSComp.scss";

export default function RSComp() {
  const homeArray = "INSTAGRAM".split("");
  const articleArray = "TIKTOK".split("");
  const homeLetterRefs = useRef([]);
  const articleLetterRefs = useRef([]);
  useEffect(() => {
    gsap.fromTo(
      homeLetterRefs.current.concat(articleLetterRefs.current),
      { y: -10 },
      {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "bounce",
        repeat: -1,
        yoyo: true,
        delay: 1,
      }
    );
  }, []);

  return (
    <div className="rs-ul">
      <Link
        onClick={() => setIsOpen(false)}
        target="_blank"
        to={"https://www.instagram.com/knit_paris/"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <FaInstagram size={30} color="f4f3ee" style={{ marginRight: "5px" }} />
          {homeArray.map((letter, index) => (
            <div key={index} ref={(el) => (homeLetterRefs.current[index] = el)}>
              {letter}
            </div>
          ))}
        </div>
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        target="_blank"
        to={"https://www.tiktok.com/@knit.paris"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <FaTiktok size={30} color="#f4f3ee" style={{ marginRight: "5px" }} />
          {articleArray.map((letter, index) => (
            <div
              key={index}
              ref={(el) => (articleLetterRefs.current[index] = el)}
            >
              {letter}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
