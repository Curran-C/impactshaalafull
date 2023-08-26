import { back } from "../../assets/signUp";
import "./backbutton.scss";

const Backbutton = ({ trueState, falseState }) => {
  const handleBack = () => {
    trueState(true);
    falseState(false);
  };

  return (
    <div className="backButton">
      <img src={back} alt="go back" onClick={handleBack} />
    </div>
  );
};

export default Backbutton;
