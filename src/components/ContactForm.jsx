import React, { useState } from "react";
import "./contactForm.scss";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = "Un nom est requis.";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Adresse mail requise.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "L'adresse email n'est pas valide.";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Le message ne peut pas être vide.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact-messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formData,
          }),
        }
      );

      // Get raw response text
      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);

        if (response.ok) {
          setMessage("Votre message a été envoyé avec succès.");
          setFormData({ name: "", email: "", message: "" });
        } else {
          throw new Error(
            data.error
              ? data.error
              : "Une erreur est survenue lors de l’envoi de votre message."
          );
        }
      } catch (parseError) {
        throw new Error("La réponse du serveur n'est pas un JSON valide: " + responseText);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contactForm">
      <div>
        <div className="name">
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Entrez votre nom complet"
            disabled={isSubmitting}
            maxLength={50}
          />
        </div>
        <div className="email">
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Adresse email valide"
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>
      </div>
      <div className="textarea">
        {errors.message && <p className="error">{errors.message}</p>}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Besoin d'info ? Envie de faire une collaboration ? Écris nous ta demande, on te répondras au plus vite"
          disabled={isSubmitting}
          rows={5}
          maxLength={500}
        />
      </div>
      <div className="button">
        {message && <p className="success">{message}</p>}
        <button type="submit" disabled={isSubmitting}>
          Envoyer
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
