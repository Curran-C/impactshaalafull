import axios from "axios";
import "./tags.scss";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const Tags = ({ tags }) => {
  const [accessToken, setAccessToken] = useState();
  const [decodedToken, setDecodedToken] = useState();
  const [seenTags, setSeenTags] = useState();
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const getCookie = () => {
      const cookie = document.cookie;
      const cookies = cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        setAccessToken(decodeURIComponent(cookie[1]));
        accessToken && setDecodedToken(jwtDecode(accessToken));
      }
    };
    getCookie();
    setSeenTags(tags);
  }, [accessToken, tags]);

  const removeTag = async (tag) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          decodedToken?.id
        }`,
        { $pull: { tags: tag } }
      );
      setSeenTags(res?.data?.tags);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleTagAdd = async () => {
    setSeenTags((prev) => [...prev, newTag]);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          decodedToken?.id
        }`,
        { $push: { tags: newTag } }
      );
      setNewTag("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tagsContainer">
      {seenTags?.length !== 0 && (
        <div className="tagsWrapper">
          {seenTags?.map((tag, index) => (
            <div key={index} className="tag">
              <p>{tag}</p>
              <p className="x" onClick={() => removeTag(tag)}>
                X
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="addTags">
        <input
          value={newTag}
          type="text"
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button onClick={handleTagAdd}>Add Tag</button>
      </div>
    </div>
  );
};

export default Tags;
