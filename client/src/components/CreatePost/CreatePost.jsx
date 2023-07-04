import "./createPost.scss";

const CreatePost = ({ onCancel }) => {
  return (
    <div className="createPost">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="container">
        <form className="wrapper">
          <h1>New Post</h1>
          <div className="input">
            <h2>Title</h2>
            <input type="text" placeholder="Title" />
          </div>
          <div className="input">
            <h2>Position Name</h2>
            <input type="text" placeholder="Position Name" />
          </div>
          <div className="input">
            <h2>Position Details</h2>
            <textarea rows={10} placeholder="Position Details" type="text" />
          </div>
          <div className="buttons">
            <button
              className="cancel"
              type="button"
              onClick={() => onCancel(false)}
            >
              Cancel
            </button>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
