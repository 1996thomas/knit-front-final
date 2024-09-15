import { useState, useEffect } from "react";
import SpecialArticleDesktop from "./SpecialArticleDesktop";
import SpecialArticleMobile from "./SpecialArticleMobile";
import { getSpecialArticle } from "../../../utils/apiCalls";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

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
    return null;
  }
  const handleLoaderComplete = () => {
    setIsLoading(false);
  };
  return (
    <div>
        <Loader duration={3000} onComplete={handleLoaderComplete}/>
      {isMobile ? (
        <SpecialArticleMobile isMobile={isMobile} article={specialArticle} />
      ) : (
        <SpecialArticleDesktop isMobile={isMobile} article={specialArticle} />
      )}
    </div>
  );
}
