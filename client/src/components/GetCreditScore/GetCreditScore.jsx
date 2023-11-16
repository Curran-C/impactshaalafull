import { useState } from "react";
// import { upload } from "../../../../api/utils/upload";
import "./GetCreditScore.scss";
import axiosInstance from "../../utils/service";
const GetCreditScore = ({ onCancel, collabId }) => {
  const [document, setDocument] = useState("");

  const handleUpload = async () => {
    let documentUrl;
    // if (document) documentUrl = await upload(document);
    console.log(documentUrl?.toString());
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/documents/upload`,
        {
          collaborationId: collabId,
          document: documentUrl?.toString(),
        }
      );
      console.log(res?.data);
      onCancel(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="getCreditScore">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="uploadPdf">
        <h1>Upload Your PDF</h1>
        <input onChange={(e) => setDocument(e.target.files[0])} type="file" />
        <button className="button" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default GetCreditScore;
