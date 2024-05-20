import React, { useState } from "react";
import "./Shop.scss";
import transition from "../../utils/transition/transition";
import { FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const location = useLocation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/email-lists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { email: email },
          }),
        }
      );
      if (response.ok) {
        setResponseMessage("E-mail envoyé avec succès !");
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Oups ${errorData.message || "quelque chose s'est mal passé"}`
        );
      }
    } catch (error) {
      console.error("Erreur :", error);
      setResponseMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className={`shop__wrapper`}>
      <h2>SHOP</h2>
      <div className="emailList__wrapper">
        <div className="logo">
          <img src="/KNIT_WHITE.png" alt="" />
          <p>Culture Nexus & Innovatives Trends</p>
        </div>
        <div className="email-form__wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              <FaArrowRight color="white" size={20} />
            </button>
          </form>
          {responseMessage && (
            <p
              className={`response-message ${
                responseMessage.startsWith("Oups") ? "error" : ""
              }`}
            >
              {responseMessage}
            </p>
          )}
        </div>
        <div className="shop-status">
          <p>BOUTIQUE TEMPORAIREMENT FERMÉE </p>
          <p>(Renseigne ton mail pour être au courant des prochains drops)</p>
        </div>
      </div>
    </div>
  );
};

export default transition(Shop);
