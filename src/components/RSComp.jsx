import gsap from "gsap";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FaInstagram, FaSpotify, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./RSComp.scss";

export default function RSComp({ color, flexDirection }) {
  const homeArray = "INSTAGRAM".split("");
  const articleArray = "TIKTOK".split("");
  const spotifyArray = "SPOTIFY".split("");
  const homeLetterRefs = useRef([]);
  const articleLetterRefs = useRef([]);
  const spotifyLetterRefs = useRef([])
  useEffect(() => {
    gsap.fromTo(
      homeLetterRefs.current.concat(articleLetterRefs.current, spotifyLetterRefs.current),
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
    <div
      className="rs-ul"
      style={{ color: color, flexDirection: flexDirection }}
    >
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
          <FaInstagram size={25} color={color} style={{ marginRight: "5px" }} />
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
          <FaTiktok size={25} color={color} style={{ marginRight: "5px" }} />
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
      <Link
        onClick={() => setIsOpen(false)}
        target="_blank"
        to={"https://open.spotify.com/user/1137917875?si=67216f4e5b52420f"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <FaSpotify size={24} color={color} style={{ marginRight: "5px" }} />
          {spotifyArray.map((letter, index) => (
            <div key={index} ref={(el) => (spotifyLetterRefs.current[index] = el)}>
              {letter}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
