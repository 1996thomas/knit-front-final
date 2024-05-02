import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { motion } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Power3 } from "gsap/gsap-core";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { getAllTags } from "../utils/apiCalls";
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState();
  const location = useLocation();
  const burgerbutton = useRef(null);
  console.log(location);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      onLeave: () =>
        gsap.to(burgerbutton.current, {
          scale: 1,
          duration: 0.35,
          ease: "power3",
        }),
      onEnterBack: () =>
        gsap.to(burgerbutton.current, {
          scale: 0,
          duration: 0.25,
          ease: "power1.out",
        }),
    });

    return () => trigger.kill(); // Clean up the ScrollTrigger instance when the component unmounts or path changes
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/articles") {
      gsap.set(burgerbutton.current, { scale: 0 });
    } else {
      gsap.set(burgerbutton.current, { scale: 1 });
    }
  }, [location.pathname]);

  useEffect(() => {
    getAllTags().then((response) => setTags(response.data));
  }, []);

  const sidebarVariants = {
    open: {
      scaleX: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      scaleX: 0,
      transition: { duration: 0.3 },
    },
  };

  const linksVariants = {
    open: {
      transition: { delay: 0.5, staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <>
      {location.pathname === "/articles" && (
        <span className="dark-gradient--nav" />
      )}
      <div
        className={
          location.pathname === "/articles"
            ? "fxed navbar__wrapper "
            : " absolute navbar__wrapper "
        }
      >
        <div
          className={
            location.pathname === "/articles"
              ? "fixed logo__wrapper "
              : "absolute logo__wrapper "
          }
        >
          <Link to={"/"}>
            <img src="/KNIT_WHITE_1.png" alt="" />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`center ${isOpen ? "active" : ""}`}
          ref={burgerbutton}
        ></button>
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="fullscreen-navbar"
          style={{ originX: isOpen ? 1 : 0 }}
        >
          <motion.nav
            variants={linksVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <Link onClick={() => setIsOpen(false)} to={"/"}>
              Home
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/articles"}>
              Articles
            </Link>
            <div className="tags-nav">
              {tags &&
                tags.map((tag) => (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to={`/articles/categories/${tag.attributes.name}`}
                  >
                    {tag.attributes.name}
                  </Link>
                ))}
            </div>
          </motion.nav>
        </motion.div>
      </div>
    </>
  );
}
