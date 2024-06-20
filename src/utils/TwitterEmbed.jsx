// TwitterEmbed.js
import { Tweet } from "react-tweet";

const TwitterEmbed = ({ url }) => {
  const tweetId = url.split("status/")[1];
  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        justifyContent: "center",
        maxWidth: "600px",
        width: "auto",
      }}
    >
      <Tweet id={tweetId} />
    </div>
  );
};

export default TwitterEmbed;
