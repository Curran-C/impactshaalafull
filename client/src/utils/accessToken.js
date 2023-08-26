import jwtDecode from "jwt-decode";

export const getCookie = () => {
  const cookie = document.cookie;
  const cookies = cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    let accessToken = decodeURIComponent(cookie[1]);
    let decodedAccessToken;
    if (accessToken) decodedAccessToken = jwtDecode(accessToken);
    return decodedAccessToken;
  }
};
