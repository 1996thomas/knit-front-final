import React from "react";
import "./promo.scss";
import { FaInstagram } from "react-icons/fa";
export default function PromoSection({ isMobile }) {
  return (
    <section className={`promo-section__wrapper ${isMobile ? "mobile" : ""}`}>
      <p>
        Pour vous procurez « La trilogie du Bonheur » c'est{" "}
        <a
          href=" https://ceeditions.com/fr/produit/la-trilogie-
du-bonheur/	"
          target="_blank"
        >
          ici
        </a>
      </p>
      <div>
        <p>Pour découvrir le travail de Monsieur Bonheur</p>
        <a href="https://www.instagram.com/monsieurbonheur/" target="_blank">
          <FaInstagram size={isMobile ? 40 : 100} />
        </a>
      </div>
    </section>
  );
}
