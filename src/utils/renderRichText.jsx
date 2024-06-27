import React from "react";
import ParallaxImage from "../components/ParallaxImage";
import "./renderRichText.scss";
import InstagramEmbedDiv from "./InstagramEmbed";
import YouTubeEmbed from "./YouTubeEmbed";
import TwitterEmbed from "./TwitterEmbed";

export const renderRichText = (richText) => {
  const isBold = richText.children[0]?.bold === true;
  const isItalic = richText.children[0]?.italic === true;
  const isUnderline = richText.children[0]?.underline === true;
  const isStrikeThrough = richText.children[0]?.strikethrough === true;

  const getClassName = () => {
    const classNames = [`rich-text--${richText.type}`];

    if (richText.type === "heading") {
      const headingLevel = richText.level;
      classNames.push(`rich-text--heading-h${headingLevel}`);
    }

    if (isBold) classNames.push("bold-text");
    if (isItalic) classNames.push("italic-text");
    if (isUnderline) classNames.push("underline-text");
    if (isStrikeThrough) classNames.push("strike-text");

    return classNames.join(" ");
  };

  const renderChildren = (children) => {
    return children.map((child, index) => {
      if (child.type === "text") {
        return child.text;
      } else if (child.type === "link") {
        const instagramUrlPattern =
          /https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+/;
        const youtubeUrlPattern =
          /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/;
        const twitterUrlPattern =
          /https:\/\/x\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/;

        const instagramMatch = child.url.match(instagramUrlPattern);
        const youtubeMatch = child.url.match(youtubeUrlPattern);
        const twitterMatch = child.url.match(twitterUrlPattern);

        if (instagramMatch) {
          return <InstagramEmbedDiv key={index} url={instagramMatch[0]} />;
        }

        if (youtubeMatch) {
          return <YouTubeEmbed key={index} url={youtubeMatch[0]} />;
        }

        if (twitterMatch) {
          return <TwitterEmbed key={index} url={twitterMatch[0]} />;
        }

        const linkChildren = child.children.map((linkChild, linkIndex) => {
          if (linkChild.type === "text") {
            return linkChild.text;
          } else {
            return renderRichText(linkChild);
          }
        });

        return (
          <a
            key={index}
            href={child.url}
            className={getClassName()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkChildren}
          </a>
        );
      } else {
        return renderRichText(child);
      }
    });
  };

  switch (richText.type) {
    case "heading":
      const headingLevel = richText.level;
      return React.createElement(
        `h${headingLevel}`,
        { key: richText.key, className: getClassName() },
        renderChildren(richText.children)
      );

    case "image":
      return (
        <div key={richText.key} className="article-image--wrapper">
          <ParallaxImage
            figCaption={richText.image?.caption}
            src={richText.image?.url}
            alt={richText.image?.caption || "Image"}
            className={getClassName()}
          />
        </div>
      );

    case "paragraph":
      let isEmbed = false;
      if (richText.children.length > 1) {
        if (richText.children[1].type === "link") {
          isEmbed = true;
        }
      }
      return React.createElement(
        isEmbed ? "div" : "p",
        {
          key: richText.key,
          className: getClassName(),
        },
        renderChildren(richText.children)
      );

    case "quote":
      return React.createElement(
        "blockquote",
        { key: richText.key, className: getClassName() },
        renderChildren(richText.children)
      );

    case "list":
      const listType = richText.format === "ordered" ? "ol" : "ul";
      return React.createElement(
        listType,
        { key: richText.key, className: getClassName() },
        richText.children.map((item, index) =>
          React.createElement("li", { key: index, className: getClassName() }, [
            listType === "ul" ? (
              <span key="bullet" className="custom-bullet">
                •{" "}
              </span>
            ) : (
              <span key="number" className="custom-number">
                {index + 1}.{" "}
              </span>
            ),
            renderChildren(item.children),
          ])
        )
      );

    default:
      return null;
  }
};

export default renderRichText;
