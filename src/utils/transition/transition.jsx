import { motion } from "framer-motion";
import "./transition.scss";

const transition = (Component) => {
  return () => (
    <>
      <Component />
      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1}}
        transition={{ delay: 0.3, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
          transition={{ duration: 1, delay: 1.2 }}
          src="/KNIT_WHITE.png"
          alt=""
        />
      </motion.div>
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>
    </>
  );
};

export default transition;
