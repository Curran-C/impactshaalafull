import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import "./signUp.scss";
import { upload } from "../../../../api/utils/upload";
import {
  citizenOptions,
  corporateOptions,
  educationalOptions,
  ngoOptions,
  sectors,
} from "../../constants";
import Backbutton from "../../components/Backbutton/Backbutton";
import { tagsImage } from "../../assets/signUp";
import { Circles } from "react-loader-spinner";
import Cookies from "js-cookie";

const SignUp = () => {
  // states
  const [pfp, setPfp] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [jwtToken, setJwtToken] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [signInState, setSignInState] = useState(true);
  const [signUpState, setSignUpState] = useState(false);
  const [companyDetailsState, setCompanyDetailsState] = useState(false);
  const [locationDetailsState, setLocationDetailsState] = useState(false);
  const [stakeholderState, setStakeholderState] = useState(false);
  const [tagsState, setTagsState] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [newType, setNewType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    city: "",
    state: "",
  });
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
    sector: "",
  });
  const [oldUser, setOldUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    const getLocation = async () => {
      try {
        const { data } = await axios.get("https://ipapi.co/json/", {
          withCredentials: false,
        });
        const { latitude, longitude } = data;
        setLocation({ city: data.city, state: data.region });
        const locationFromGoogle = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAphv25nyRmd3k1SbgHW4gcymZSIqdXS_U`,
          { withCredentials: false }
        );
        console.log(locationFromGoogle);
      } catch (err) {
        console.log(err);
      }
    };
    getLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAphv25nyRmd3k1SbgHW4gcymZSIqdXS_U`;
        fetch(geoUrl)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  // function
  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (tag) {
      setTags((prev) => [...prev, tag]);
    }
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

  const [passwordMissmatch, setPasswordMissmatch] = useState(null);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (newUser?.cpassword) {
      if (newUser.password !== newUser.cpassword) {
        // alert("Password Missmatch");
        setPasswordMissmatch("Password Missmatch");
      } else {
        setSignInState(false);
        setSignUpState(false);
        setCompanyDetailsState(true);
      }
    }
  };

  const [taglineWordLengthWarning, setTaglineWordLengthWarning] = useState(null);
  const [descriptionWordLengthWarning, setDescriptionWordLengthWarning] = useState(null);
  const handleCompanySubmit = (e) => {
    e.preventDefault();
    const taglineWordLength = newUser.tagline.split(/\s+/).length;
    const descriptionWordLength = newUser.description.split(/\s+/).length;
    if (taglineWordLength < 15) {
      setTaglineWordLengthWarning("Tag line should be minimum 15 words");
    } else {
      setTaglineWordLengthWarning("");
    }
    if (descriptionWordLength < 50) {
      setDescriptionWordLengthWarning("Description should be minimum 50 words");
    } else {
      setDescriptionWordLengthWarning("");
    }
    if (taglineWordLength >= 15 && descriptionWordLength >= 50) {
      setCompanyDetailsState(false);
      setLocationDetailsState(true);
    }

  };

  const handleStakeholderSubmit = (e) => {
    e.preventDefault();
    setStakeholderState(false);
    setSignUpState(true);
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    setLocationDetailsState(false);
    setTagsState(true);
  };

  const handleSignInInputChange = (e) => {
    setOldUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSignInChange = () => {
    setSignInState(true);
    setSignUpState(false);
  };
  const handleSignIn = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/login`,
        {
          ...oldUser,
        }
      );
      Cookies.set("accessToken", res.data.token, {
        domain: `.${import.meta.env.VITE_CLIENT_URL}`,
        expires: 7000,
        sameSite: "Lax",
      });
      res.data.info && setIsLoading(true);
      navigate(`/home/${res.data.info._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSwitch = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  const removeTag = (tag) => {
    const newTags = tags.filter((item) => item !== tag);
    setTags(newTags);
  };

  const [tagLineWaring, setTagLineWaring] = useState(null);
  const handleFinalSubmit = async (e) => {
    e?.preventDefault();
    if (tags.length < 5) {
      setTagLineWaring("Minimum of 5 keywords");
    } else {
      setIsLoading(true);
      let pfpUrl, coverPicUrl;
      if (pfp) pfpUrl = await upload(pfp);
      if (coverPic) coverPicUrl = await upload(coverPic);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/register`,
          {
            ...newUser,
            pfp: pfpUrl?.toString(),
            type: newType !== "" ? newType : newUser.type,
            coverPic: coverPicUrl?.toString(),
            tags: tags,
          }
        );
        // const res = await fetch(registerUrl, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(requestBody),
        // });
        console.log(res.data);
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/company/login`,
            {
              email: newUser.email,
              password: newUser.password,
            }
          );
          Cookies.set("accessToken", res.data.token, {
            domain: `.${import.meta.env.VITE_CLIENT_URL}`,
            expires: 7000,
            sameSite: "Lax",
          });
          res.data.info && setIsLoading(false);
          // navigate(`/home/${res.data.info._id}`);
          alert("Sign Up successfull");
          navigate(`/signup`);
          setTagsState(false);
          setSignInState(true);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }

  };

  const handlePincode = async () => {
    console.log(newUser.pinCode);
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/company/getAddress/${newUser.pinCode}`
    );
    // const data = response.data;
    const city = response[0].PostOffice[0].Division;
    const state = response[0].PostOffice[0].State;
    setNewUser(
      {
        city: city,
        state: state
      }
    )
  }

  // constants

  // signin
  const signIn = (
    <div className="signinpage">
      <div className={`signupblue ${hidden ? "visible" : "hidden"}`}>
        <div className="bluecontainer">
          <h1>Hello</h1>
          <p>Enter your personal details and start journey with us</p>
          <button onClick={handleSignUpChange} type="submit">
            Sign Up
          </button>
          <p className="signinToggle" onClick={handleSwitch}>
            Sign in?
          </p>
        </div>
      </div>
      <form
        className={`signup ${hidden ? "hidden" : "visible"}`}
        onSubmit={handleSignIn}
      >
        <h1>Sign In</h1>
        <div className="signupButtons">
          <div id="googlesignin"></div>
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
        <p className="signupToggle" onClick={handleSwitch}>
          Sign up?
        </p>
        {isLoading ? (
          <button>
            <Circles
              height="20"
              width="80"
              color="#fff"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </button>
        ) : (
          <button type="submit">Sign In</button>
        )}
      </form>
    </div>
  );

  // stakeholder
  const stakeholder = (
    <div className="stakeholderCategory">
      <Backbutton trueState={setSignInState} falseState={setStakeholderState} />
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
          <option value="Educational Institution">
            Educational Institutions
          </option>
          <option value="NGO">NGO</option>
          <option value="Corporate">Corporate</option>
          <option value="Working Professional">Working Professional</option>
        </select>
        <select
          required
          onChange={(e) => handleSignUpInputChange(e)}
          className="dropdown"
          name="sector"
          id=""
        >
          <option value="" disabled selected hidden>
            Type {/*//!Previously known as sectors */}
          </option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        <select
          required
          onChange={(e) => handleSignUpInputChange(e)}
          className="dropdown"
          name="type"
          id=""
        >
          <option value="" disabled selected hidden>
            Sub-type {/*//!Previously known as type */}
          </option>
          {newUser?.stakeholder === "Educational Institution" &&
            educationalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          {newUser?.stakeholder === "NGO" &&
            ngoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          {newUser?.stakeholder === "Corporate" &&
            corporateOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          {newUser?.stakeholder === "Working Professional" &&
            citizenOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
        {newUser?.type === "Other" &&
          newUser?.stakeholder === "Working Professional" && (
            <input
              className="otherInput"
              onChange={(e) => setNewType(e.target.value)}
              type="text"
              placeholder="Enter Profession"
              id=""
              required
            />
          )}
        <button type="submit">Next</button>
      </form>
    </div>
  );

  // signup
  const signUp = (
    <div className="signinpage">
      <Backbutton trueState={setStakeholderState} falseState={setSignUpState} />
      <form className="signup" onSubmit={handleSignUpSubmit}>
        <h1>Sign Up</h1>
        <div className="signupButtons">
          <div id="googlesignin"></div>
        </div>
        <div className="or">
          <hr />
          <p>Or</p>
          <hr />
        </div>
        <div className="warning-message">
          <p>{passwordMissmatch}</p>
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
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Enter Confirm password"
            type="password"
            name="cpassword"
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

  const companyDetails = (
    <div className="companyDetails">
      <Backbutton
        trueState={setSignUpState}
        falseState={setCompanyDetailsState}
      />
      <form className="signup" onSubmit={handleCompanySubmit}>
        <h2>{newUser?.stakeholder} Details</h2>
        <div className="warning-message">
          <p>{descriptionWordLengthWarning}</p>
          <p>{taglineWordLengthWarning}</p>
        </div>

        <div className="inputs">
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder={`${newUser?.stakeholder} name`}
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
      <Backbutton
        trueState={setCompanyDetailsState}
        falseState={setLocationDetailsState}
      />
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
              onBlur={handlePincode}
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
              value={newUser.city}
            />
          </div>
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            type="text"
            placeholder="State"
            name="state"
            value={newUser.state}
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            type="number"
            placeholder="Phone number"
            name="phNum"
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Communication Email"
            type="email"
            name="communicationEmail"
            id=""
          />
          <input
            onChange={(e) => handleSignUpInputChange(e)}
            required
            placeholder="Website Link"
            type="text"
            name="websiteLink"
            id=""
          />
        </div>
        <p onClick={getCurrentLocation}>Use my current location</p>
        <button type="submit">Next</button>
      </form>
    </div>
  );

  const tagsPage = (
    <>
      <Backbutton
        trueState={setLocationDetailsState}
        falseState={setTagsState}
      />
      <div className="tagsContainer">
        <img src={tagsImage} alt="enter your tags" />
        <div className="tagsWrapper">
          <form className="tagsInput">
            <h1>What type of collaborations are you looking for?</h1>
            <div className="warning-message">
              <p>{tagLineWaring}</p>
            </div>
            <div className="inputs">
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Ex: Business"
              />
              <button
                onClick={handleTagSubmit}
                type="submit"
                name=""
                id=""
              // hidden
              > Add </button>
            </div>

          </form>
          <div className="tags">
            {tags &&
              tags.map((tag, index) => (
                <div key={index} className="tag">
                  <p>{tag}</p>
                  <p className="x" onClick={() => removeTag(tag)}>
                    X
                  </p>
                </div>
              ))}
          </div>
          {isLoading ? (
            <button>
              <Circles
                height="20"
                width="80"
                color="#fff"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button onClick={handleFinalSubmit}>Sign Up</button>
          )}
        </div>
      </div>
    </>
  );

  // return
  return (
    <div className="container">
      {signInState && signIn}
      {stakeholderState && stakeholder}
      {signUpState && signUp}
      {companyDetailsState && companyDetails}
      {locationDetailsState && locationDetails}
      {tagsState && tagsPage}
    </div>
  );
};
export default SignUp;
