import { useState, useEffect } from "react";
import SpecialArticleDesktop from "./SpecialArticleDesktop";
import SpecialArticleMobile from "./SpecialArticleMobile";
import { getSpecialArticle } from "../../../utils/apiCalls";
import { useParams } from "react-router-dom";

export default function SpecialArticle() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { slug } = useParams();
  const [specialArticle, setSpecialArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSpecialArticle(slug).then((responseData) => {
      setSpecialArticle({
        dialog: responseData.attributes.dialog,
        carousel: responseData.attributes.specialCarousel.data,
      });
      setIsLoading(false);
    });
  }, [slug]);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isLoading) {
    return null; // Ou un spinner/loader si vous le souhaitez
  }

  return isMobile ? (
    <SpecialArticleMobile isMobile={isMobile} article={specialArticle} />
  ) : (
    <SpecialArticleDesktop isMobile={isMobile} article={specialArticle} />
  );
}
