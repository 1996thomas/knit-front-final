import React from "react";
import "./footer.scss";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer__wrapper">
      <div className="rs__wrapper">
        <p>ABONNE TOI POUR PLUS DE NEWS</p>
        <div className="icons__wrapper">
          <FaInstagram size={80} color="white" />
          <FaTiktok size={80} color="white" />
        </div>
      </div>
      <span className="footer--separator" />
      <div className="contact__wrapper">
        <p>CONTACT NOUS</p>
        <input type="email" placeholder="e-mail" />
        <textarea name="content" id="" cols="30" rows="5"></textarea>
      </div>
    </div>
  );
}
