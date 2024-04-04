import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const variants = {
    open: {
      width: "100vw",
      transition: { duration: 0.5 },
    },
    closed: {
      width: 0,
      transition: { duration: 0.5, when: "afterChildren" },
    },
  };

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const onAnimationComplete = () => {
    if (!isOpen) setShouldRender(false);
  };

  return (
    <div className="navbar__wrapper">
      <button onClick={() => setIsOpen(!isOpen)} className="navbar-button">
        {isOpen ? "Fermer" : "Menu"}
      </button>
      {shouldRender && (
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          className="fullscreen-navbar"
          onAnimationComplete={onAnimationComplete} // Appelé lorsque l'animation est complète
          style={{ originX: 0, originY: 0 }}
        >
          <nav>
            <Link onClick={() => setIsOpen(false)} to={"/"}>
              Home
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/article"}>
              Articles
            </Link>
          </nav>
        </motion.div>
      )}
    </div>
  );
}
