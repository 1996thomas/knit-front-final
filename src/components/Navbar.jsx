import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="logo__wrapper">
        <img src="/KNIT_WHITE.png" alt="" />
      </div>
      {/* <span className="black-gradient" /> */}
      <div className="navbar__wrapper">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`center ${isOpen ? "active" : ""}`}
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
          </motion.nav>
        </motion.div>
      </div>
    </>
  );
}
