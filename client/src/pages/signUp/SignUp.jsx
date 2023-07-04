import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apple, facebook, gmail } from "../../assets/signUp";
import jwt_decode from "jwt-decode";
import { LoginSocialFacebook } from "reactjs-social-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

import "./signUp.scss";
import { upload } from "../../../../api/utils/upload";

const SignUp = () => {
  // states
  const [pfp, setPfp] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [jwtToken, setJwtToken] = useState(null);

  const [signInState, setSignInState] = useState(true);
  const [signUpState, setSignUpState] = useState(false);
  const [companyDetailsState, setCompanyDetailsState] = useState(false);
  const [locationDetailsState, setLocationDetailsState] = useState(false);
  const [stakeholderState, setStakeholderState] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    phNum: "",
    stakeholder: "",
    type: "",
    tagline: "",
    description: "",
    pfp: "",
    coverPic: "",
    addressOne: "",
    addressTwo: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const [oldUser, setOldUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //connecting to facebook
  const handleFacebookCallback = (res) => {
    console.log(res);
  };

  // connecting to google
  const handleGoogleCallback = async (res) => {
    console.log(jwt_decode(res.credential));
    setJwtToken(jwt_decode(res.credential));
    const { email, name, picture } = jwt_decode(res.credential);
    // checking if user already exists and signing them in
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/verifyuser`,
        { email }
      );
      console.log(res?.data._id);
      setLoggedInUser(res?.data._id);
      navigate(`/profile/${res.data._id}`);
    } catch (err) {
      // adding new user
      const { stakeholder, type } = newUser;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/register`,
          {
            name,
            email,
            pfp: picture,
            stakeholder,
            type,
          }
        );
        console.log(res.data);
        navigate(`/googlesignup/${res.data._id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "363281034776-lth0a4mj6bjjatfnaa7q5akbj2tr7s7h.apps.googleusercontent.com",
      callback: handleGoogleCallback,
    });
    google.accounts.id.renderButton(document.getElementById("googlesignin"), {
      theme: "filled_blue",
      shape: "circle",
      ux_mode: "popup",
      text: "continue_with",
      size: "large",
    });
  }, []);

  // function
  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (tag) setTags((prev) => [...prev, tag]);
    setTag("");
  };
  const handleSignUpInputChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSignUpChange = () => {
    setSignInState(false);
    setStakeholderState(true);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setSignInState(false);
    setSignUpState(false);
    // setBlueState(false);
    setCompanyDetailsState(true);
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    setCompanyDetailsState(false);
    setLocationDetailsState(true);
  };

  const handleStakeholderSubmit = (e) => {
    e.preventDefault();
    setStakeholderState(false);
    setSignUpState(true);
  };

  const handleLocationSubmit = async (e) => {
    e?.preventDefault();
    let pfpUrl, coverPicUrl;
    if (pfp) pfpUrl = await upload(pfp);
    if (coverPic) coverPicUrl = await upload(coverPic);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/register`,
        {
          ...newUser,
          pfp: pfpUrl?.toString(),
          coverPic: coverPicUrl?.toString(),
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignInInputChange = (e) => {
    setOldUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(oldUser);
  };
  const handleSignInChange = () => {
    setSignInState(true);
    setSignUpState(false);
  };
  const handleSignIn = async (e) => {
    e?.preventDefault();
    console.log(jwtToken);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/login`,
        {
          ...oldUser,
        }
      );
      console.log(res.data);
      navigate(`/profile/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // constants
  const signUp = (
    <div className="signinpage">
      <form className="signup" onSubmit={handleSignUpSubmit}>
        <h1>Sign Up</h1>
        <div className="signupButtons">
          <div id="googlesignin"></div>
          {/* <LoginSocialFacebook
            appId="6233102716807727"
            onResolve={(res) => console.log(res)}
            onReject={(err) => console.log(err)}
          >
            <button>Facebook</button>
          </LoginSocialFacebook> */}
          {/* <img id="googlesignin" src={gmail} alt="" /> */}
          {/* <img src={apple} alt="" /> */}
          {/* <img src={facebook} alt="" /> */}
        </div>
        <div className="or">
          <hr />
          <p>Or</p>
          <hr />
        </div>
        <div className="inputs">
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Enter your name"
            type="text"
            name="name"
            id=""
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Enter your email"
            type="email"
            name="email"
            id=""
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Enter your password"
            type="password"
            name="password"
            id=""
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <div className="signupblue">
        <div className="bluecontainer">
          <h1>WELCOME BACK</h1>
          <p>
            To Keep connected With us Please login with you login credentials
          </p>
          <button onClick={handleSignInChange} type="submit">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );

  const signIn = (
    <div className="signinpage">
      <div className="signupblue">
        <div className="bluecontainer">
          <h1>Hello</h1>
          <p>Enter your personal details and start journey with us</p>
          <button onClick={handleSignUpChange} type="submit">
            Sign Up
          </button>
        </div>
      </div>
      <form className="signup" onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <div className="signupButtons">
          <div id="googlesignin"></div>
          {/* <FacebookLogin
            appId="6233102716807727"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookCallback}
            icon="fa-facebook"
            textButton={<span></span>}
          /> */}
          {/* <img src={apple} alt="" />
          <img src={facebook} alt="" /> */}
        </div>
        <div className="or">
          <hr />
          <p>Or</p>
          <hr />
        </div>
        <div className="inputs">
          <input
            required
            onChange={(e) => handleSignInInputChange(e)}
            placeholder="Enter your email"
            type="email"
            name="email"
            id=""
          />
          <input
            required
            onChange={(e) => handleSignInInputChange(e)}
            placeholder="Enter your password"
            type="password"
            name="password"
            id=""
          />
        </div>
        <a>Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );

  const companyDetails = (
    <div className="companyDetails">
      <form className="signup" onSubmit={handleCompanySubmit}>
        <h1>Company Details</h1>

        <div className="inputs">
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Company name"
            type="text"
            name="companyName"
            id=""
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Tag Line"
            type="text"
            name="tagline"
          />
          <div className="tag">
            <input
              placeholder="Tags"
              type="text"
              name="tags"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
            <button type="button" onClick={handleTagSubmit}>
              {" "}
              Add{" "}
            </button>
          </div>
          <input type="text" disabled value={tags} />
          <textarea
            placeholder="Description"
            name="description"
            onChange={(e) => handleSignUpInputChange(e)}
          />
        </div>

        <button type="submit">Next</button>
      </form>

      <div className="signup white">
        <div className="upload">
          <span>Profile Picture</span>
          {/* <img src={upload} alt="" /> */}
        </div>
        <input
          required
          type="file"
          className="imageupload"
          name="filename"
          onChange={(e) => setPfp(e.target.files[0])}
        ></input>
      </div>
    </div>
  );

  const locationDetails = (
    <div className="location">
      <div className="signup white">
        <div className="upload">
          <span>Cover Photo</span>
          <input
            required
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
            className="imageupload"
            name="filename"
          ></input>
        </div>
      </div>

      <form className="signup" onSubmit={handleLocationSubmit}>
        <h1>Address</h1>

        <div className="inputs">
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Address 1"
            type="text"
            name="addressOne"
            id=""
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Address 2"
            type="text"
            name="addressTwo"
            id=""
          />
          <div className="pin">
            <input
              onChange={(e) => handleSignUpInputChange(e)}
              required
              placeholder="Pincode"
              type="number"
              name="pinCode"
            />
            <input
              onChange={(e) => handleSignUpInputChange(e)}
              required
              placeholder="City"
              type="text"
              name="city"
            />
          </div>
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            type="text"
            placeholder="State"
            name="state"
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            type="number"
            placeholder="Phone number"
            name="phNum"
          />
        </div>

        <button type="submit">Next</button>
      </form>
    </div>
  );

  const stakeholder = (
    <div className="stakeholderCategory">
      <form onSubmit={handleStakeholderSubmit} className="stakeholderContainer">
        <h1>Give us some Details</h1>
        <select
          required
          onChange={(e) => handleSignUpInputChange(e)}
          className="dropdown"
          name="stakeholder"
          id=""
        >
          <option value="" disabled selected hidden>
            Stakeholder
          </option>
          <option value="School">School</option>
          <option value="NGO">NGO</option>
          <option value="Corporate">Corporate</option>
        </select>
        <select
          required
          onChange={(e) => handleSignUpInputChange(e)}
          className="dropdown"
          name="type"
          id=""
        >
          <option value="" disabled selected hidden>
            Type
          </option>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
        <button type="submit">Next</button>
      </form>
    </div>
  );
  // return
  return (
    <div className="container">
      {signInState && signIn}
      {stakeholderState && stakeholder}
      {signUpState && signUp}
      {companyDetailsState && companyDetails}
      {locationDetailsState && locationDetails}
    </div>
  );
};

export default SignUp;
