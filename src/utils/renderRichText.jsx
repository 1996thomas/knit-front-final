import React from "react";
import "./renderRichText.scss";

export function renderRichText(richText) {
  const isBold = richText.children[0].bold === true;
  const isItalic = richText.children[0].italic === true;
  const isUnderline = richText.children[0].underline === true;
  const isStrikeThrough = richText.children[0].strikethrough === true;

  const getClassName = () => {
    const classNames = [`rich-text--${richText.type}`]; // Ajoute une classe basée sur le type de l'élément
    if (isBold) classNames.push("bold-text");
    if (isItalic) classNames.push("italic-text");
    if (isUnderline) classNames.push("underline-text");
    if (isStrikeThrough) classNames.push("strike-text");

    return classNames.join(" ");
  };

  switch (richText.type) {
    case "heading":
      const headingLevel = richText.level;
      return React.createElement(
        `h${headingLevel}`,
        { key: richText.key, className: getClassName() },
        richText.children[0].text
      );

    case "image":
      return React.createElement("img", {
        key: richText.key,
        src: richText.image.url,
        alt: "Image",
        className: getClassName(),
      });
      break; // Ajoutez un break pour éviter que le code ne continue inutilement

    case "paragraph":
      return React.createElement(
        "p",
        { key: richText.key, className: getClassName() },
        richText.children[0].text
      );

    case "quote":
      return React.createElement(
        "q",
        { key: richText.key, className: getClassName() },
        richText.children[0].text
      );

    case "list":
      const listType = richText.format === "ordered" ? "ol" : "ul";
      return React.createElement(
        listType,
        { key: richText.key, className: getClassName() },
        richText.children.map((item, index) =>
          React.createElement(
            "li",
            { key: index, className: getClassName() }, // Assurez-vous que className est correctement assigné ici aussi
            item.children[0].text
          )
        )
      );

    default:
      return null;
  }
}
