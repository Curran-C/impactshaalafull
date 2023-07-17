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
        <div className="email">
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
        <div className="links">
          <a href="/terms-conditions">
            <div>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
            </div>
          </a>
          <div>
            <img src={insta} alt="" />
            <img src={linkedin} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
