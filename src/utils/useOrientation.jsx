import { useState, useEffect } from "react";

const useOrientation = () => {
  const [isPhoneLandscape, setIsPhoneLandscape] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      const isMobile = window.innerWidth <= 950; // Par exemple, moins de 768px pour considérer un téléphone
      setIsPhoneLandscape(isLandscapeMode && isMobile);
      setIsDesktop(window.innerWidth >= 950); // Détection du bureau
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);

    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return { isPhoneLandscape, isDesktop };
};

export default useOrientation;
