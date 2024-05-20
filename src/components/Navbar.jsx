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
import RSComp from "./RSComp";
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState();
  const location = useLocation();
  const burgerbutton = useRef(null);

  useEffect(() => {
    getAllTags().then((response) => setTags(response.data));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

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
        className={`navbar__wrapper ${
          location.pathname === "/articles" || location.pathname === "/"
            ? "navbar--transparent"
            : ""
        }`}
      >
        <div className={" logo__wrapper "}>
          <Link to={"/"} onClick={() => setIsOpen(false)}>
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
            <Link
              onClick={() => setIsOpen(false)}
              className="shop"
              to={"/shop"}
            >
              Shop
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/articles"}>
              Articles
            </Link>
            <div className="tags-nav">
              {tags &&
                tags.map((tag, key) => (
                  <Link
                    key={key}
                    onClick={() => setIsOpen(false)}
                    to={`/articles/categories/${tag.attributes.name}`}
                  >
                    {tag.attributes.name}
                  </Link>
                ))}
            </div>
          </motion.nav>
          <RSComp />
        </motion.div>
      </div>
    </>
  );
}
