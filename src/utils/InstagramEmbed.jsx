import "./InstagramEmbed.scss";
import { InstagramEmbed } from "react-social-media-embed";
const InstagramEmbedDiv = ({ url }) => {
  return <InstagramEmbed url={url} width={328} />;
};

export default InstagramEmbedDiv;
