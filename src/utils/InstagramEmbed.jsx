import "./InstagramEmbed.scss";
import { InstagramEmbed } from "react-social-media-embed";
const InstagramEmbedDiv = ({ url }) => {
  return (
    <InstagramEmbed
      url="https://www.instagram.com/p/CUbHfhpswxt/"
      width={328}
    />
  );
};

export default InstagramEmbedDiv;
