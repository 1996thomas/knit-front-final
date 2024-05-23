import React, { useEffect } from "react";

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        margin: "0 auto",
        maxWidth: "540px",
        minWidth: "326px",
        width: "calc(100% - 2px)",
        alignSelf:'center'
      }}
    >
      <div style={{ padding: "16px" }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#c9c8cd" }}
        >
          View this post on Instagram
        </a>
      </div>
    </blockquote>
  );
};

export default InstagramEmbed;
