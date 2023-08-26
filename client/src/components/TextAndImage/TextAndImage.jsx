import "./textAndImage.scss";
import { aboutus1 } from "../../assets/landingPage";

const TextAndImage = ({ title, text1, text2, image, reverse }) => {
  return (
    <div className={`beforeAboutUsWrapperOne ${reverse}`}>
      <div className="left">
        <div className="titleContainer">
          <div className="line"></div>
          <span className="title" id="learnExplore">
            {title}
          </span>
        </div>
        <div className="textContainer">
          <span>{text1}</span>
          <span>{text2}</span>
        </div>
      </div>
      <div className="right">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default TextAndImage;
