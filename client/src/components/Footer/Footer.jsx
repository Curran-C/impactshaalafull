import { insta, linkedin } from "../../assets/landingPage";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <h3>Join the Impact Movement</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero e .
        </p>
        <a href="/signup">
          <button>Get Started</button>
        </a>
        {/* <div className="email">
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div> */}
        <div className="links">
          <a href="/terms-conditions">
            <div>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
            </div>
          </a>
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
