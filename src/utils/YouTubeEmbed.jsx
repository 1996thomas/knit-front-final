// YouTubeEmbed.js
import React from "react";

const YouTubeEmbed = ({ url }) => {
  const videoId = url.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-embed">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
