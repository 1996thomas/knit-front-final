// TwitterEmbed.js
import { Tweet } from "react-tweet";

const TwitterEmbed = ({ url }) => {
  const tweetId = url.split("status/")[1];
  return <Tweet id={tweetId} />;
};

export default TwitterEmbed;
