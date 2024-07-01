import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import RSComp from "./RSComp";
import "./footer.scss";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div className="footer__wrapper">
        <div className="rs__wrapper">
          <RSComp color={"white"} flexDirection={"row"} />
        </div>
        <span className="footer--separator" />
        <div className="contact__wrapper">
          <ContactForm />
        </div>
      </div>
      <div className="link">
        <p>
          © {year} - KNIT<Link to={"/legal"}>Mentions légales</Link>
        </p>
      </div>
    </>
  );
}
