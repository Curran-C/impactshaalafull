import { useEffect, useRef, useState } from "react";
import { bookmark, bookmarkfilled, collaboration } from "../../assets/home";

import { corporate, location, nopfp } from "../../assets/profile";

import "./post.scss";
import Tile from "../Tile/Tile";
import { format } from "timeago.js";
import axiosInstance from "../../utils/service";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import { setUserAuth } from "../../store/slices/user";
import { useDispatch } from "react-redux";
import { Popover } from "antd";

const Post = ({ post }) => {
  // states
  const [bookmarked, setBookmarked] = useState(false);
  const [user, setUser] = useState();
  const { user: authUser } = useOutletContext();

  const [collabStatus, setCollabStatus] = useState("");
  const [bookmarkStatus, setBookmarkStatus] = useState("");

  const bookmarkTimeoutRef = useRef(null);
  const collabTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // side effects
  useEffect(() => {
    const getUser = async () => {
      try {
        // getting post of the user
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
            post?.createdById
          }`
        );
        setUser(res.data);
        // checking if user has bookmarked post and setting bookmarked state
        const bookmarkedPosts = authUser?.bookmarkedPosts;
        bookmarkedPosts?.map((bookmarkedPost) => {
          if (bookmarkedPost === post._id) setBookmarked(true);
        });
      } catch (err) {
        console.log("Post ", post._id, err);
      }
    };
    if (post?.createdById) {
      getUser();
    }
  }, []);

  // function

  const handleBookmarkStatus = (message) => {
    setBookmarkStatus(message);

    if (bookmarkTimeoutRef.current) {
      clearTimeout(bookmarkTimeoutRef.current);
    }

    bookmarkTimeoutRef.current = setTimeout(() => {
      setBookmarkStatus("");
    }, 1500);
  };

  const handleCollabRequest = (message) => {
    setCollabStatus(message);

    if (collabTimeoutRef.current) {
      clearTimeout(collabTimeoutRef.current);
    }

    collabTimeoutRef.current = setTimeout(() => {
      setCollabStatus("");
    }, 1500);
  };

  // save and unsave collab posts
  const handleBookmark = async () => {
    setBookmarked(!bookmarked);
    // only works in reverse for some reason
    if (bookmarked === false) {
      try {
        const res = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
            authUser._id
          }`,
          {
            $push: { bookmarkedPosts: post._id },
          }
        );
        dispatch(setUserAuth({ user: res.data }));
        handleBookmarkStatus("Bookmark added");
      } catch (err) {
        console.log(err);
      }
    } else if (bookmarked === true) {
      try {
        const res = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
            authUser._id
          }`,
          {
            $pull: { bookmarkedPosts: post?._id },
          }
        );
        dispatch(setUserAuth({ user: res.data }));
        handleBookmarkStatus("Bookmark removed");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ! implement somewhere else do not delete
  const handleChatClick = async () => {
    try {
      const findChat = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/chat/find/${authUser._id}/${
          post?.createdById
        }`
      );
      if (!findChat?.data) {
        try {
          const chatRes = await axiosInstance.post(
            `${import.meta.env.VITE_BASE_URL}/api/chat/`,
            {
              senderId: authUser._id,
              recieverId: post?.createdById,
            }
          );
        } catch (err) {
          console.log(err);
        }
        console.log("chat not found");
        navigate(`/chats/${authUser._id}`);
      }
      if (findChat?.data) {
        console.log("chat found");
        navigate(`/chats/${authUser._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // implement collaborations
  const handleCollabClick = async () => {
    // todo 0. get id of the user who created post and store in toId
    // todo 1. get id of the current user and store in fromId
    // todo 2. get post id and store in postId
    const newCollab = {
      toId: post?.createdById,
      fromId: authUser._id,
      postId: post?._id,
    };
    // todo 3. Check if collab exists
    try {
      // * get all collabs and check if postId in collabs is present in collaborationIds of user
      //get logged in user
      const user = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${authUser._id}`
      );
      // check if user has started collabing

      // todo 4. if collab exists - show popup saying 'you have already requested to collab with this person'
      try {
        //*check if user is toId
        const isToId = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singletoId/${
            authUser._id
          }`
        );
        const isFromId = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singlefromId/${
            post?.createdById
          }`
        );
        console.log(isToId?.data.length);
        if (isToId?.data.length !== 0 && isFromId?.data.length !== 0) {
          handleCollabRequest("You have collab with this person");
        } else {
          // *check if user is fromId
          try {
            const isFromId = await axiosInstance.get(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/collaboration/singlefromId/${id}`
            );
            const isToId = await axiosInstance.get(
              `${import.meta.env.VITE_BASE_URL}/api/collaboration/singletoId/${
                post?.createdById
              }`
            );
            if (isFromId?.data.length !== 0 && isToId?.data.length !== 0) {
              handleCollabRequest("You have collab with this person!");
            } else {
              // todo 5. if collab doesnt exist - create a new collab
              try {
                const resCollab = await axiosInstance.post(
                  `${import.meta.env.VITE_BASE_URL}/api/collaboration/create`,
                  {
                    ...newCollab,
                  }
                );
                //update logged in user
                const resUpdateLoggedInUser = await axiosInstance.post(
                  `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
                    authUser._id
                  }`,
                  {
                    $push: { collaborationIds: resCollab?.data._id },
                  }
                );

                //updated user who posted it
                const resUpdatePostedInUser = await axiosInstance.post(
                  `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
                    post?.createdById
                  }`,
                  {
                    $push: { collaborationIds: resCollab?.data._id },
                  }
                );
                await axiosInstance.post(
                  `${import.meta.env.VITE_BASE_URL}/api/notification/create`,
                  {
                    fromId: newCollab.fromId,
                    toId: newCollab.toId,
                    title: "New Collab Request",
                    message: "New Collab Request",
                  }
                );
                handleCollabRequest("Successfully sent Collaboration request");
              } catch (err) {
                console.log(err);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleTitleClick = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <div className={user?.name ? "post" : "post bgblue"}>
      <div className="user">
        <div className="userAboutContainer">
          <img src={user?.pfp || nopfp} alt="" className="pfp" />
          <div className="userAbout">
            <Link to={`/profile/${post.createdById}`}>
              <h4>{user?.name || "ImpactShaala"}</h4>
            </Link>
            <div className="tilesContainer">
              {post?.createdById ? (
                <>
                  <Tile
                    image={corporate}
                    type={user?.stakeholder}
                    className="bg-lightblue"
                  />
                  <Tile image={location} type={user?.city} />
                </>
              ) : null}
            </div>
          </div>
        </div>

        <Popover content={bookmarkStatus} trigger="click" open={bookmarkStatus}>
          <img
            src={bookmarked ? bookmarkfilled : bookmark}
            alt="bookmark"
            onClick={() => handleBookmark()}
            className="bookmark_img"
          />
        </Popover>
      </div>
      <div className="container">
        <p className="postDetails" onClick={handleTitleClick}>
          {post?.title}
        </p>
        <div className="dateandtime">
          <p>
            {post?.fromDate &&
              new Date(post?.fromDate).toISOString().split("T")[0]}{" "}
            -{" "}
            {post?.toDate && new Date(post?.toDate).toISOString().split("T")[0]}
          </p>
          <p>{post?.time}</p>
        </div>
        <div className="containerFooter">
          <p>{format(post?.createdAt)}</p>
          <div className="links">
            {post?.createdById && authUser._id !== post.createdById && (
              <Popover
                content={collabStatus}
                trigger="click"
                open={collabStatus}
              >
                <img
                  className="collabImage"
                  src={collaboration}
                  alt=""
                  onClick={handleCollabClick}
                />
              </Popover>
            )}
            {/* {post?.createdById ? (
              <img
                src={backblue}
                alt=""
                onClick={() => navigate(`/profile/${post.createdById}`)}
              />
            ) : null} */}
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="custom-modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <h2>Post Details</h2>
            <hr />
            <table className="postDetails">
              <tbody>
                <tr>
                  <th>Title:</th>
                  <td>{post?.title}</td>
                </tr>
                <tr>
                  <th>Location:</th>
                  <td>{post?.location}</td>
                </tr>
                <tr>
                  <th>Keywords:</th>
                  <td>{post?.keywords?.join(", ")}</td>
                </tr>
                <tr>
                  <th>Collaborate With:</th>
                  <td>{post?.collaborateWith}</td>
                </tr>
                <tr>
                  <th>Objective:</th>
                  <td>{post?.objective}</td>
                </tr>
                <tr>
                  <th>Project Description:</th>
                  <td>{post?.description}</td>
                </tr>
                <tr>
                  <th>Beneficiaries and Gains:</th>
                  <td>{post?.beneficiaries}</td>
                </tr>
                <tr>
                  <th>Resource Needed:</th>
                  <td>{post?.resources}</td>
                </tr>
                <tr>
                  <th>Project Tenure:</th>
                  <td>{post?.tenure}</td>
                </tr>
                <tr>
                  <th>From Date:</th>
                  <td>
                    {post?.fromDate &&
                      new Date(post?.fromDate).toISOString().split("T")[0]}
                  </td>
                </tr>
                <tr>
                  <th>To Date:</th>
                  <td>
                    {post?.fromDate &&
                      new Date(post?.toDate).toISOString().split("T")[0]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
