import ContactForm from "./ContactForm";
import RSComp from "./RSComp";
import './footer.scss';

export default function Footer() {
  return (
    <div className="footer__wrapper">
      <div className="rs__wrapper">
          <RSComp/>
      </div>
      <span className="footer--separator" />
      <div className="contact__wrapper">
        <p>CONTACTE NOUS </p>
        <ContactForm />
      </div>
    </div>
  );
}