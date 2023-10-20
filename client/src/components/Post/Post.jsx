import { useEffect, useState } from "react";
import {
  backblue,
  bookmark,
  bookmarkfilled,
  collaboration,
} from "../../assets/home";

import { corporate, location, nopfp } from "../../assets/profile";

import "./post.scss";
import Tile from "../Tile/Tile";
import { format } from "timeago.js";
import axios from "axios";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import { toast } from "react-toastify";

axios.defaults = {
  withCredentials: true,
};

const Post = ({ post }) => {
  // states
  const [bookmarked, setBookmarked] = useState(false);
  const [user, setUser] = useState();
  const { user: authUser } = useOutletContext();
  const id = authUser?._id;
  const navigate = useNavigate();

  // consts
  const date = new Date(post?.date);

  // side effects
  useEffect(() => {
    const getUser = async () => {
      try {
        // getting post of the user
        const res = await axios.get(
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
        console.log(err);
      }
    };
    getUser();
  }, []);

  // function
  // save and unsave collab posts
  const handleBookmark = async () => {
    setBookmarked(!bookmarked);
    // only works in reverse for some reason
    if (bookmarked === false) {
      console.log("Bookmarked");
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${id}`,
          {
            $push: { bookmarkedPosts: post._id },
          }
        );
        toast.success("Bookmark added");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    } else if (bookmarked === true) {
      console.log("Unbookmarked");
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${id}`,
          {
            $pull: { bookmarkedPosts: post?._id },
          }
        );
        toast.success("Bookmark removed");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ! implement somewhere else do not delete
  const handleChatClick = async () => {
    try {
      const findChat = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/chat/find/${id}/${
          post?.createdById
        }`
      );
      if (!findChat?.data) {
        try {
          const chatRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/chat/`,
            {
              senderId: id,
              recieverId: post?.createdById,
            }
          );
        } catch (err) {
          console.log(err);
        }
        console.log("chat not found");
        navigate(`/chats/${id}`);
      }
      if (findChat?.data) {
        console.log("chat found");
        navigate(`/chats/${id}`);
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
      fromId: id,
      postId: post?._id,
    };
    // todo 3. Check if collab exists
    try {
      // * get all collabs and check if postId in collabs is present in collaborationIds of user
      //get logged in user
      const user = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
      );
      // check if user has started collabing

      // todo 4. if collab exists - show popup saying 'you have already requested to collab with this person'
      try {
        //*check if user is toId
        const isToId = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singletoId/${id}`
        );
        const isFromId = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singlefromId/${
            post?.createdById
          }`
        );
        console.log(isToId?.data.length);
        if (isToId?.data.length !== 0 && isFromId?.data.length !== 0) {
          alert("You have collab with this person");
        } else {
          // *check if user is fromId
          try {
            const isFromId = await axios.get(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/collaboration/singlefromId/${id}`
            );
            const isToId = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/collaboration/singletoId/${
                post?.createdById
              }`
            );
            if (isFromId?.data.length !== 0 && isToId?.data.length !== 0) {
              alert("You have collab with this person!");
            } else {
              // todo 5. if collab doesnt exist - create a new collab
              try {
                const resCollab = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/collaboration/create`,
                  {
                    ...newCollab,
                  }
                );
                //update logged in user
                const resUpdateLoggedInUser = await axios.post(
                  `${
                    import.meta.env.VITE_BASE_URL
                  }/api/company/updateuser/${id}`,
                  {
                    $push: { collaborationIds: resCollab?.data._id },
                  }
                );

                //updated user who posted it
                const resUpdatePostedInUser = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
                    post?.createdById
                  }`,
                  {
                    $push: { collaborationIds: resCollab?.data._id },
                  }
                );
                await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/notification/create`,
                  {
                    fromId: newCollab.fromId,
                    toId: newCollab.toId,
                    title: "New Collab Request",
                    message: "New Collab Request",
                  }
                );
                alert("Successfully sent Collaboration request");
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

  return (
    <div className={user?.name ? "post" : "post bgblue"}>
      <div className="user">
        <div className="userAboutContainer">
          <img src={user?.pfp || nopfp} alt="" className="pfp" />
          <div className="userAbout">
            <Link to={`/profile/${post.createdById}`}>
              <h3>{user?.name || "ImpactShaala"}</h3>
            </Link>
            <div className="tilesContainer">
              {post?.createdById ? (
                <>
                  <Tile image={corporate} type={user?.stakeholder} />
                  <Tile image={location} type={user?.city} />
                </>
              ) : null}
            </div>
          </div>
        </div>
        <img
          src={bookmarked ? bookmarkfilled : bookmark}
          alt="bookmark"
          onClick={() => handleBookmark()}
          className="bookmark"
        />
      </div>
      <div className="container">
        <p className="postDetails">{post?.posDetails}</p>
        <div className="dateandtime">
          <p>{date.toDateString()}</p>
          <p>{post?.time}</p>
        </div>
        <div className="containerFooter">
          <p>{format(post?.createdAt)}</p>
          <div className="links">
            {post?.createdById && id !== post.createdById && (
              <img
                className="collabImage"
                src={collaboration}
                alt=""
                onClick={handleCollabClick}
              />
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
    </div>
  );
};

export default Post;
