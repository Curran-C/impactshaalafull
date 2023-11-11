import axios from "redaxios";

export const upload = async (file, base64 = false) => {
  let data;

  if (!base64) {
    data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fiverr");
  } else {
    data = {
      file,
      upload_preset: "fiverr",
    };
  }

  const headers = base64 ? { "Content-Type": "application/json" } : undefined;

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dndcersc4/upload",
      data,
      {
        withCredentials: false,
        headers,
      }
    );

    return res.data.url;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
