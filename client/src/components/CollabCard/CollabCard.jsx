import "./collabCard.scss";

const CollabCard = () => {
  return (
    <div className="collabCard">
      <div className="companyName">
        <img src="https://picsum.photos/200" alt="" />
        <h2>Company Name</h2>
      </div>
      <p className="about">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero{" "}
      </p>
      <button type="button" className="message">
        Message
      </button>
    </div>
  );
};

export default CollabCard;
