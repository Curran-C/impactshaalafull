import { Link } from "react-router-dom";
import { insta, linkedin } from "../../assets/landingPage";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <h3>Join the Impact Movement</h3>
        <p>
          Ready to make a lasting impact and be part of a community dedicated to
          positive change?
          <br />
          Join Impactshaala today and start your journey towards a better world.
        </p>
        <Link to="/signup">
          <button>Get Started Now!</button>
        </Link>
        {/* <div className="email">
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div> */}
        <div className="links">
          <Link to="/terms-conditions">
            <div>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
            </div>
          </Link>
          <div>
            <a href="https://www.instagram.com/impactshaala/">
              <img src={insta} alt="" />
            </a>
            <a href="https://www.linkedin.com/company/impactshaala/">
              <img src={linkedin} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
