import React from "react";
import './bounded.scss'

export default function Bounded({ enrichedDialog }) {
  if (!enrichedDialog || enrichedDialog.length === 0) {
    return null; // Ne pas afficher si enrichedDialog est vide
  }

  return (
    <div className="bounded-container">
      {enrichedDialog.map((paragraph, index) => (
        <div key={index} className="bounded-paragraph">
          <p>
            {paragraph.children.map((child, childIndex) => {
              // Créer la classe dynamique en fonction des propriétés bold et italic
              const classNames = `${child.bold ? "bold" : "normal"} ${child.italic ? "italic" : "normal"}`.trim();

              return (
                <span key={childIndex} className={classNames}>
                  {child.text}
                </span>
              );
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
