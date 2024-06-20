import "./InstagramEmbed.scss";
import { InstagramEmbed } from "react-social-media-embed";
const InstagramEmbedDiv = ({ url }) => {
  return (
    <div style={{ display: "flex",margin:'0 auto', justifyContent: "center", maxWidth:'600px', width:'auto'}}>
      <InstagramEmbed
        url={url}
        width={"100%"}
      />
    </div>
  );
};

export default InstagramEmbedDiv;
