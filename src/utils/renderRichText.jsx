import React from "react";
import ParallaxImage from "../components/ParallaxImage"; // Assurez-vous que le chemin est correct
import "./renderRichText.scss";

export function renderRichText(richText) {
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
        return (
          <a
            key={index}
            href={child.url}
            className={getClassName()}
            target={child.newTab ? "_blank" : "_self"}
            rel={child.newTab ? "noopener noreferrer" : undefined}
          >
            {renderChildren(child.children)}
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
            src={richText.image?.url}
            alt="Image"
            className={getClassName()}
          />
        </div>
      );

    case "paragraph":
      return React.createElement(
        "p",
        { key: richText.key, className: getClassName() },
        renderChildren(richText.children)
      );

    case "quote":
      return React.createElement(
        "q",
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
}
